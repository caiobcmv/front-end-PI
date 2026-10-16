import React, { useState, useEffect, useRef } from 'react';
import TopHeader from '../components/TopHeader';
import { getResumoDashboard } from '../services/dashboardService';
import { getSeriesSensores } from '../services/sensorService';

/* ─── Resume uma série em poucos pontos (média por faixa de tempo), só da última semana ─── */
const SETE_DIAS_MS = 7 * 24 * 60 * 60 * 1000;

function resumirSerie(series = [], nPontos = 8) {
  const corte = Date.now() - SETE_DIAS_MS;
  const validos = series
    .map((p) => ({ t: new Date(p.timestamp).getTime(), v: p.value }))
    .filter((p) => Number.isFinite(p.t) && typeof p.v === 'number' && p.t >= corte)
    .sort((a, b) => a.t - b.t);

  if (validos.length < 2) return null;

  const tamanho = validos.length / nPontos;
  const points = [];
  for (let i = 0; i < nPontos; i++) {
    const fatia = validos.slice(Math.floor(i * tamanho), Math.max(Math.floor((i + 1) * tamanho), Math.floor(i * tamanho) + 1));
    points.push(fatia.reduce((acc, x) => acc + x.v, 0) / fatia.length);
  }

  const fmtData = (t) =>
    new Date(t).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', timeZone: 'America/Recife' }).replace('.', '');
  const primeiro = validos[0].t;
  const ultimo = validos[validos.length - 1].t;
  const dates = [0, 1, 2, 3].map((i) => fmtData(primeiro + ((ultimo - primeiro) * i) / 3));

  return { points, dates, atual: validos[validos.length - 1].v };
}

/* ─── Telemetry Sparkline with Y-axis grid, smooth cubic bezier curve, gradient fill & vertex dots ─── */
function TelemetrySensorCard({
  title = 'Umidade do ar',
  value = '--',
  status = null,
  points = [],
  dates = [],
  unit = '%',
  color = '#27AE60',
}) {
  const width = 240;
  const height = 70;
  const padTop = 8;
  const padBottom = 10;
  const graphH = height - padTop - padBottom;
  const hasData = points.length >= 2;
  const numPoints = points.length;

  // Escala do eixo Y calculada a partir dos próprios dados
  const dMin = hasData ? Math.min(...points) : 0;
  const dMax = hasData ? Math.max(...points) : 100;
  const folga = dMax - dMin < 1 ? 1 : (dMax - dMin) * 0.1;
  const yMin = Math.floor(dMin - folga);
  const yMax = Math.ceil(dMax + folga);
  const yMid = Math.round((yMin + yMax) / 2);

  const coords = hasData
    ? points.map((val, idx) => ({
        x: (idx / (numPoints - 1)) * (width - 16) + 8,
        y: padTop + graphH - ((val - yMin) / (yMax - yMin)) * graphH,
      }))
    : [];

  // Create smooth bezier curve path string
  let curvePath = '';
  let fillPath = '';
  if (hasData) {
    curvePath = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const p0 = coords[i];
      const p1 = coords[i + 1];
      const cpx = p0.x + (p1.x - p0.x) / 2;
      curvePath += ` C ${cpx} ${p0.y}, ${cpx} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    fillPath = `${curvePath} L ${coords[coords.length - 1].x} ${height} L ${coords[0].x} ${height} Z`;
  }

  const gradId = `grad-${title.replace(/\s+/g, '')}`;

  return (
    <div className="telemetry-bottom-card">
      <div className="telemetry-card-header">
        <div className="telemetry-title-group">
          <span className="telemetry-icon-badge">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="2.5">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
          </span>
          <span className="telemetry-title">{title}</span>
        </div>
        <div className="telemetry-val-badge">
          <span className="telemetry-value-text">{value}</span>
          {status && <span className="badge-pill badge-green">{status}</span>}
        </div>
      </div>

      <div className="telemetry-chart-container">
        <div className="telemetry-y-axis">
          <span>{hasData ? `${yMax}${unit}` : ''}</span>
          <span>{hasData ? `${yMid}${unit}` : ''}</span>
          <span>{hasData ? `${yMin}${unit}` : ''}</span>
        </div>
        <div className="telemetry-canvas-wrap">
          {hasData ? (
            <svg className="telemetry-svg" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
              <defs>
                <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2ECC71" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#2ECC71" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* 3 Horizontal Dashed Guide Lines */}
              <line x1="8" y1={padTop + graphH * 0.05} x2={width - 8} y2={padTop + graphH * 0.05} stroke="#EEF2EE" strokeWidth="0.8" strokeDasharray="3 3" />
              <line x1="8" y1={padTop + graphH * 0.5} x2={width - 8} y2={padTop + graphH * 0.5} stroke="#EEF2EE" strokeWidth="0.8" strokeDasharray="3 3" />
              <line x1="8" y1={padTop + graphH * 0.95} x2={width - 8} y2={padTop + graphH * 0.95} stroke="#EEF2EE" strokeWidth="0.8" strokeDasharray="3 3" />

              {/* Area Fill */}
              <path d={fillPath} fill={`url(#${gradId})`} />

              {/* Curve Stroke */}
              <path d={curvePath} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

              {/* Vertex Dots */}
              {coords.map((pt, idx) => (
                <circle key={idx} cx={pt.x} cy={pt.y} r="2.8" fill={color} stroke="#ffffff" strokeWidth="1.2" />
              ))}
            </svg>
          ) : (
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: '1.5rem 0 0' }}>
              Sem leituras nos últimos 7 dias
            </p>
          )}
        </div>
      </div>

      <div className="telemetry-x-axis">
        {dates.map((d, idx) => (
          <span key={idx}>{d}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Semi-circle Gauge for Resumo da Produção ─── */
function SemicircleSpeedometer({ value = null }) {
  const size = 180;
  const strokeWidth = 16;
  const radius = (size - strokeWidth * 2) / 2;
  const cx = size / 2;
  const cy = size / 2 + 10;
  const circumference = Math.PI * radius;
  const offset = circumference - ((value ?? 0) / 100) * circumference;

  return (
    <div className="gauge-speedometer-wrap">
      <svg width={size} height={size * 0.58} viewBox={`0 0 ${size} ${size * 0.62}`}>
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Background Arc */}
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Progress Arc */}
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
        />
      </svg>
      <div className="gauge-center-content">
        <span className="gauge-number">{value === null ? '--' : `${value}%`}</span>
      </div>
      <p className="gauge-subtext">% de leituras dentro da faixa nas últimas 24h</p>
    </div>
  );
}

const NIVEL_ALERTA = {
  baixo: { texto: 'Atenção leve', classe: 'badge-amber' },
  médio: { texto: 'Atenção', classe: 'badge-amber' },
  alto: { texto: 'Crítico', classe: 'badge-red' },
};

const CONDICAO = {
  boa: { texto: 'Boa', classe: 'badge-green' },
  atencao: { texto: 'Atenção', classe: 'badge-amber' },
  critica: { texto: 'Crítica', classe: 'badge-red' },
};

export default function DashboardPage() {
  const [isResumido, setIsResumido] = useState(false);
  const [resumo, setResumo] = useState(null);
  const [seriesSensores, setSeriesSensores] = useState(null);

  useEffect(() => {
    let ativo = true;
    getResumoDashboard()
      .then((r) => ativo && setResumo(r))
      .catch(() => {});
    getSeriesSensores()
      .then((d) => ativo && setSeriesSensores(d))
      .catch(() => {});
    return () => {
      ativo = false;
    };
  }, []);

  const cond = resumo?.condicao_geral;
  const cc = resumo?.resumo_condicoes;
  const lotes = resumo?.lotes_monitorados;
  const alertas = resumo?.alertas;

  const pctFaixa = typeof cc?.pct_na_faixa === 'number' ? Math.round(cc.pct_na_faixa) : null;
  const condBadge = CONDICAO[cond?.nivel] ?? null;
  const nivelAlerta = NIVEL_ALERTA[alertas?.maior_nivel] ?? null;
  const pctSaudaveis = cond?.lotes_avaliados
    ? Math.round((100 * cond.lotes_saudaveis) / cond.lotes_avaliados)
    : null;
  const dataHoje = new Date().toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Recife',
  });
  const num = (v, sufixo = '') => (typeof v === 'number' ? `${v.toLocaleString('pt-BR')}${sufixo}` : '--');

  return (
    <div className="dashboard-container">
      {/* ── Top Header ── */}
      <TopHeader
        title="Visão Geral do Sistema"
        subtitle="Gerencie preferências da fazenda, parâmetros de sensores, notificações e acessos."
        showResumidoToggle={true}
        isResumido={isResumido}
        onToggleResumido={setIsResumido}
        dateText={dataHoje}
      />

      {/* ── Top Row: 4 KPI Cards ── */}
      <section className="dash-kpi-grid">
        {/* Card 1: CONDIÇÃO GERAL */}
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">CONDIÇÃO GERAL</span>
            {condBadge && <span className={`badge-pill ${condBadge.classe}`}>{condBadge.texto}</span>}
          </div>
          <div className="dash-kpi-body">
            <span className="kpi-hero-number">{num(pctFaixa, '%')}</span>
            <div className="kpi-icon-ring-wrap">
              <svg width="42" height="42" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="19" stroke="#10b981" strokeWidth="2.5" />
                <path
                  d="M22 13C18 16 16 20 16 24C16 27.3 18.7 30 22 30C25.3 30 28 27.3 28 24C28 20 26 16 22 13Z"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M22 17V26" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className="dash-kpi-footer">
            <span className="kpi-footer-sub">
              {pctFaixa === null ? 'Sem leituras na faixa nas últimas 24h' : 'das leituras dentro da faixa ideal (24h)'}
            </span>
          </div>
        </div>

        {/* Card 2: LOTES EM OPERAÇÃO */}
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">LOTES EM OPERAÇÃO</span>
          </div>
          <div className="dash-kpi-body">
            <div className="kpi-hero-number-with-sub">
              <span className="kpi-hero-number">{num(lotes?.total)}</span>
              <span className="kpi-sub-unit">lotes ativos</span>
            </div>
            <div className="kpi-donut-icon-wrap">
              <svg width="44" height="44" viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="16" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                {/* 3 Colheita (green) */}
                <circle
                  cx="22" cy="22" r="16"
                  fill="none" stroke="#059669" strokeWidth="4"
                  strokeDasharray="100.5" strokeDashoffset="45"
                  strokeLinecap="round"
                  transform="rotate(-90 22 22)"
                />
                {/* 2 Reefer (blue) */}
                <circle
                  cx="22" cy="22" r="16"
                  fill="none" stroke="#0ea5e9" strokeWidth="4"
                  strokeDasharray="100.5" strokeDashoffset="75"
                  strokeLinecap="round"
                  transform="rotate(60 22 22)"
                />
                {/* Center package box */}
                <rect x="18" y="18" width="8" height="8" rx="1.5" fill="#0f766e" />
              </svg>
            </div>
          </div>
          <div className="dash-kpi-footer">
            <div className="kpi-legend-dots">
              <span className="legend-item"><span className="dot-green" /> {num(lotes?.com_sensor_ativo)} com sensor ativo</span>
              <span className="legend-item"><span className="dot-blue" /> {typeof lotes?.total === 'number' ? lotes.total - lotes.com_sensor_ativo : '--'} sem sensor</span>
            </div>
          </div>
        </div>

        {/* Card 3: CADEIA FRIA (REEFER) */}
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">CADEIA FRIA (REEFER)</span>
            <span className="badge-pill badge-green">Faixa Ideal</span>
          </div>
          <div className="dash-kpi-body">
            <span className="kpi-hero-number">+1.2°C</span>
            <div className="kpi-spark-box">
              <svg width="52" height="24" viewBox="0 0 52 24" fill="none">
                <path
                  d="M2 14C10 8 16 18 24 12C32 6 40 16 50 10"
                  stroke="#10b981"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="spark-sub-text">Estável</span>
            </div>
          </div>
          <div className="dash-kpi-footer">
            <span className="kpi-footer-sub">Teto seguro: 2.0°C</span>
          </div>
        </div>

        {/* Card 4: ALERTAS ATIVOS */}
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">ALERTAS ATIVOS</span>
            {nivelAlerta && <span className={`badge-pill ${nivelAlerta.classe}`}>{nivelAlerta.texto}</span>}
          </div>
          <div className="dash-kpi-body">
            <span className="kpi-hero-number">{num(alertas?.abertos)}</span>
            <div className="kpi-icon-box-peach">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
          </div>
          <div className="dash-kpi-footer">
            <span className="kpi-footer-sub">
              {alertas?.abertos === 0 ? 'Nenhum alerta em aberto' : 'Alertas em aberto'}
            </span>
          </div>
        </div>
      </section>

      {/* ── Middle Section: 3 Columns Grid ── */}
      <section className="dash-middle-layout">
        {/* ── Column 1 (Left): Resumo da Produção & Status da Água ── */}
        <div className="dash-mid-col">
          {/* Card: Resumo da produção */}
          <div className="dash-white-card">
            <h2 className="card-headline-clean">Resumo da produção</h2>
            <SemicircleSpeedometer value={pctFaixa} />

            <div className="production-metrics-list">
              <div className="prod-metric-row">
                <div className="prod-metric-left">
                  <span className="prod-indicator-ring ring-green" />
                  <span className="prod-metric-label">Saúde da plantação</span>
                </div>
                <span className="prod-metric-val">{num(pctSaudaveis, '%')}</span>
              </div>
              <div className="prod-metric-row">
                <div className="prod-metric-left">
                  <span className="prod-indicator-ring ring-blue" />
                  <span className="prod-metric-label">Umidade</span>
                </div>
                <span className="prod-metric-val">{num(cc?.umidade_ar_media, '%')}</span>
              </div>
              <div className="prod-metric-row">
                <div className="prod-metric-left">
                  <span className="prod-indicator-icon">🌡️</span>
                  <span className="prod-metric-label">Temperatura</span>
                </div>
                <span className="prod-metric-val">{num(cc?.temperatura_ar_media, '°C')}</span>
              </div>
            </div>
          </div>

          {/* Card: Status da água */}
          <div className="dash-white-card">
            <div className="card-title-with-dot">
              <span className="dot-mini-blue" />
              <h2 className="card-headline-clean">Status da água</h2>
            </div>

            <div className="water-top-panel">
              <div className="water-drop-icon-sq">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#38bdf8">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <div className="water-level-col">
                <div className="water-level-labels">
                  <span className="water-label-sm">Umidade média do solo</span>
                  <span className="water-pct-bold">63%</span>
                </div>
                <div className="water-track">
                  <div className="water-fill-bar" style={{ width: '63%' }} />
                </div>
              </div>
            </div>

            <div className="water-bottom-boxes">
              <div className="water-sub-box">
                <span className="water-box-label">Consumo de hoje</span>
                <span className="water-box-val">4,2 L</span>
              </div>
              <div className="water-sub-box">
                <span className="water-box-label">Irrigação automática</span>
                <span className="badge-pill badge-green-filled">ATIVA</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Column 2 (Center): Operação, Mercado, Ocorrências & Rota Fria ── */}
        <div className="dash-mid-col">
          {/* Card: Janela Ideal de Colheita & Exp. */}
          <div className="dash-white-card">
            <div className="card-header-clean">
              <h3 className="card-subheadline">Janela Ideal de Colheita & Exp.</h3>
              <span className="badge-pill badge-green">88% Eficácia</span>
            </div>
            <h4 className="card-bold-title">Período recomendado: 28/09 a 04/10</h4>
            <p className="card-muted-desc">
              Probabilidade de 88% de máxima qualidade brix e menor perda pós-colheita para despacho marítimo.
            </p>
          </div>

          {/* Card: Preço e Demanda de Mercado */}
          <div className="dash-white-card">
            <div className="card-header-clean">
              <h3 className="card-subheadline">Preço e Demanda de Mercado</h3>
              <span className="meta-source-text">Ceagesp / Export</span>
            </div>
            <div className="market-price-list">
              <div className="market-price-item">
                <span className="market-crop-name">Uva Vitória</span>
                <div className="market-val-group">
                  <span className="market-val-bold">R$ 14,20/kg</span>
                  <span className="market-gain-text">↑ +8%</span>
                </div>
              </div>
              <div className="market-price-item">
                <span className="market-crop-name">Manga Palmer</span>
                <div className="market-val-group">
                  <span className="market-val-bold">R$ 6,80/kg</span>
                  <span className="market-stable-text">estável</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card: Saídas da Faixa na Semana */}
          <div className="dash-white-card">
            <div className="card-header-clean">
              <h3 className="card-subheadline">Saídas da Faixa na Semana</h3>
              <span className="badge-pill badge-amber">3 Registros</span>
            </div>
            <h4 className="card-bold-title">3 ocorrências térmicas registradas</h4>
            <p className="card-muted-desc">
              Eventos de parada técnica em baús frigoríficos com retorno automático para a temperatura ideal (+1.8 °C).
            </p>
          </div>

          {/* Card: Rota Fria: Petrolina → Pecém */}
          <div className="dash-white-card route-card-wrap">
            <div className="card-header-clean">
              <div className="route-header-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" rx="1.5" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                <h3 className="card-subheadline">Rota Fria: Petrolina → Pecém</h3>
              </div>
              <span className="badge-pill badge-green">+1.2°C OK</span>
            </div>
            <p className="route-sub-desc">Reefer MS-904 em trânsito rodoviário</p>

            <div className="route-tracker-visual">
              <div className="route-endpoint">
                <span className="route-pin-dot pin-blue" />
                <span className="route-name">Petrolina</span>
              </div>

              <div className="route-progress-bar-wrap">
                <span className="route-progress-tag">68% do trajeto (642 km)</span>
                <div className="route-track-line">
                  <div className="route-track-fill" style={{ width: '68%' }} />
                </div>
                <button type="button" className="route-refresh-btn" title="Atualizar telemetria GPS">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.5">
                    <path d="M23 4v6h-6" />
                    <path d="M1 20v-6h6" />
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                  </svg>
                </button>
              </div>

              <div className="route-endpoint">
                <span className="route-pin-dot pin-port" />
                <span className="route-name">Pecém</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Column 3 (Right): Monitoramento da Propriedade & Previsão do Tempo ── */}
        <div className="dash-mid-col">
          {/* Card: Monitoramento da propriedade */}
          <div className="dash-white-card card-map-satellite">
            <div className="card-header-clean">
              <h2 className="card-headline-clean">Monitoramento da propriedade</h2>
              <button type="button" className="btn-icon-ghost" title="Expandir visualização">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                </svg>
              </button>
            </div>

            {/* Satellite Map Container */}
            <div className="farm-map-interactive-wrap">
              <img
                src="/farm_satellite_map.jpg"
                alt="Monitoramento de Talhões - Petrolina"
                className="farm-satellite-bg"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />

              {/* Map Floating Zoom Controls */}
              <div className="map-zoom-controls">
                <button type="button" className="zoom-btn">+</button>
                <button type="button" className="zoom-btn">-</button>
                <button type="button" className="zoom-btn">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                </button>
              </div>

              {/* SVG Overlay of Polygons */}
              <svg className="map-polygons-svg" viewBox="0 0 500 280">
                {/* Area A (Green) */}
                <polygon
                  points="210,60 300,55 315,110 220,115"
                  fill="rgba(16, 185, 129, 0.28)"
                  stroke="#10b981"
                  strokeWidth="2.5"
                />
                {/* Area B (Orange) */}
                <polygon
                  points="120,135 340,130 330,195 110,200"
                  fill="rgba(245, 158, 11, 0.28)"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                />
                {/* Area C (Red) */}
                <polygon
                  points="360,70 435,65 425,125 350,130"
                  fill="rgba(239, 68, 68, 0.28)"
                  stroke="#ef4444"
                  strokeWidth="2.5"
                />
              </svg>

              {/* Area Floating Badges */}
              <div className="map-area-tag tag-area-a" style={{ top: '30%', left: '49%' }}>
                <span className="dot-badge-green" /> Área A
              </div>
              <div className="map-area-tag tag-area-b" style={{ top: '60%', left: '45%' }}>
                <span className="dot-badge-amber" /> Área B
              </div>
              <div className="map-area-tag tag-area-c" style={{ top: '34%', left: '76%' }}>
                <span className="dot-badge-red" /> Área C
              </div>
            </div>

            {/* Legend */}
            <div className="map-legend-row">
              <span className="legend-chip"><span className="legend-dot dot-otima" /> Ótima</span>
              <span className="legend-chip"><span className="legend-dot dot-boa" /> Boa</span>
              <span className="legend-chip"><span className="legend-dot dot-atencao" /> Atenção</span>
              <span className="legend-chip"><span className="legend-dot dot-critica" /> Crítica</span>
              <span className="legend-chip"><span className="legend-dot dot-semdados" /> Sem dados</span>
            </div>
          </div>

          {/* Card: Previsão do tempo */}
          <div className="dash-white-card">
            <h2 className="card-headline-clean">Previsão do tempo</h2>

            <div className="weather-current-row">
              <div className="weather-main-left">
                <span className="weather-big-sun">☀️</span>
                <div className="weather-temp-col">
                  <span className="weather-curr-temp">28°C</span>
                  <span className="weather-desc">Ensolarado</span>
                  <span className="weather-feels-like">Sensação térmica 30°C</span>
                </div>
              </div>

              <div className="weather-stats-grid">
                <div className="weather-stat-cell">
                  <span className="weather-stat-label">Umidade</span>
                  <span className="weather-stat-val">62%</span>
                </div>
                <div className="weather-stat-cell">
                  <span className="weather-stat-label">Chuva</span>
                  <span className="weather-stat-val">0 mm</span>
                </div>
                <div className="weather-stat-cell">
                  <span className="weather-stat-label">Vento</span>
                  <span className="weather-stat-val">12 km/h</span>
                </div>
                <div className="weather-stat-cell">
                  <span className="weather-stat-label">UV</span>
                  <span className="weather-stat-val">Moderado</span>
                </div>
              </div>
            </div>

            <div className="weather-forecast-section">
              <span className="weather-forecast-heading">Previsão para os próximos dias</span>
              <div className="weather-days-row">
                {[
                  { day: 'Qua 23/09', icon: '☀️', max: '29°', min: '20°' },
                  { day: 'Qui 24/09', icon: '🌤️', max: '28°', min: '19°' },
                  { day: 'Sex 25/09', icon: '🌧️', max: '27°', min: '18°' },
                  { day: 'Sáb 26/09', icon: '🌧️', max: '27°', min: '18°' },
                  { day: 'Dom 27/09', icon: '⛅', max: '26°', min: '18°' },
                  { day: 'Seg 28/09', icon: '☀️', max: '27°', min: '19°' },
                ].map((item, idx) => (
                  <div key={idx} className="weather-day-item">
                    <span className="weather-day-name">{item.day}</span>
                    <span className="weather-day-icon">{item.icon}</span>
                    <span className="weather-day-range">
                      <strong>{item.max}</strong> / {item.min}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom Row: 4 Telemetry Sensor Cards ── */}
      <section className="dash-telemetry-grid">
        {[
          { chave: 'umidadeAr', titulo: 'Umidade do ar', unit: '%' },
          { chave: 'umidadeSolo', titulo: 'Umidade do solo', unit: '%' },
          { chave: 'temperaturaSolo', titulo: 'Temperatura do solo', unit: '°C' },
          { chave: 'temperaturaAr', titulo: 'Temperatura do ar', unit: '°C' },
        ].map(({ chave, titulo, unit }) => {
          const dado = seriesSensores?.[chave];
          const r = resumirSerie(dado?.series);
          return (
            <TelemetrySensorCard
              key={chave}
              title={titulo}
              unit={unit}
              value={r ? `${r.atual.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}${unit}` : '--'}
              status={r ? (dado.source === 'sensor' ? 'Sensor' : 'Simulado') : null}
              points={r?.points ?? []}
              dates={r?.dates ?? []}
            />
          );
        })}
      </section>
    </div>
  );
}