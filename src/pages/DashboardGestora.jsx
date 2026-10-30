import React, { useState, useEffect } from 'react';
import TopHeader from '../components/TopHeader';
import { getResumoDashboard } from '../services/dashboardService';
import { getSeriesSensores } from '../services/sensorService';
import '../styles/dashboard-views.css';

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

/* ─── Semicircle Speedometer with Mathematically Centered Text (FE-D10) ─── */
function SemicircleSpeedometer({
  value = 90,
  label = null,
  subtext = null,
  size = 200,
  strokeWidth = 16,
  id = 'speedo-default',
  gradientType = 'cool',
}) {
  const valNum = typeof value === 'number' && Number.isFinite(value) ? Math.min(Math.max(Math.round(value), 0), 100) : 90;
  const radius = (size - strokeWidth * 2) / 2;
  const cx = size / 2;
  const cy = size / 2 - 4;
  const circumference = Math.PI * radius;
  const offset = circumference * (1 - valNum / 100);
  const gradId = `grad-${id}`;

  return (
    <div className="gauge-speedometer-wrap">
      <svg width={size} height={size * 0.58} viewBox={`0 0 ${size} ${size * 0.58}`} style={{ overflow: 'visible' }}>
        <defs>
          {gradientType === 'warm' ? (
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="35%" stopColor="#f59e0b" />
              <stop offset="70%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          ) : (
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="60%" stopColor="#059669" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          )}
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
          stroke={`url(#${gradId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />

        {/* Centered Number in SVG */}
        <text
          x={cx}
          y={label ? cy - 14 : cy - 4}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: `${size > 185 ? 40 : 34}px`,
            fontWeight: 800,
            fill: '#0f172a',
          }}
        >
          {valNum}%
        </text>

        {/* Optional Centered Sublabel in SVG (only for short tags like 'LEITURAS CONFORMES') */}
        {label && (
          <text
            x={cx}
            y={cy + 18}
            textAnchor="middle"
            dominantBaseline="central"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11.5px',
              fontWeight: 800,
              letterSpacing: '0.07em',
              fill: '#1e293b',
              textTransform: 'uppercase',
            }}
          >
            {label}
          </text>
        )}
      </svg>

      {/* External Subtext (natural text wrap, never clipped, high contrast) */}
      {subtext && (
        <p className="gauge-subtext-clean">
          {subtext}
        </p>
      )}
    </div>
  );
}


/* ─── Condição Geral Gauge (Resumido Card 1) - Barra em cima e 96% centralizado ─── */
function CondicaoGeralGauge({ value = 96 }) {
  const size = 150;
  const cx = 75;
  const cy = 64;
  const r = 48;
  const strokeWidth = 10;
  const circumference = Math.PI * r;
  const valNum = typeof value === 'number' && Number.isFinite(value) ? Math.round(value) : 96;
  const offset = circumference - (valNum / 100) * circumference;

  return (
    <div className="resumido-gauge-box">
      <svg width={size} height="95" viewBox="0 0 150 95">
        <defs>
          <linearGradient id="condGeralGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="65%" stopColor="#059669" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        {/* Background Arc ("barra em cima") */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Progress Arc ("barra em cima") */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="url(#condGeralGrad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />

        {/* Subtle needle pip on arc rim */}
        <circle cx={cx - 30} cy={cy - 37} r="3.5" fill="#0f172a" />
        <line x1={cx - 30} y1={cy - 37} x2={cx - 37} y2={cy - 44} stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />

        {/* 96% Centralizado exatamente com a barra em cima */}
        <text
          x={cx}
          y={cy - 14}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '32px',
            fontWeight: 800,
            fill: '#0f172a',
          }}
        >
          {valNum}%
        </text>

        {/* Badge Ótimo Centralizado */}
        <g transform={`translate(${cx - 25}, ${cy + 3})`}>
          <rect width="50" height="18" rx="9" fill="#dcfce7" stroke="#bbf7d0" strokeWidth="1" />
          <text
            x="25"
            y="9.5"
            textAnchor="middle"
            dominantBaseline="central"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              fontWeight: 700,
              fill: '#15803d',
            }}
          >
            Ótimo
          </text>
        </g>

        {/* Label ÍNDICE GERAL Centralizado */}
        <text
          x={cx}
          y={cy + 29}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.06em',
            fill: '#64748b',
            textTransform: 'uppercase',
          }}
        >
          ÍNDICE GERAL
        </text>
      </svg>
    </div>
  );
}

/* ─── Donut Chart for Lotes em Operação (Resumido Card 2) ─── */
function DonutCapacityChart({ total = 6, max = 8, colheita = 3, reefer = 2, maturacao = 1 }) {
  const size = 105;
  const cx = 52.5;
  const cy = 52.5;
  const r = 38;
  const strokeWidth = 11;
  const c = 2 * Math.PI * r;

  const lenColheita = (colheita / total) * c;
  const lenReefer = (reefer / total) * c;
  const lenMaturacao = (maturacao / total) * c;

  const offColheita = 0;
  const offReefer = -lenColheita;
  const offMaturacao = -(lenColheita + lenReefer);

  return (
    <div className="resumido-donut-box">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth={strokeWidth} />
        {/* Colheita (green) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#10b981"
          strokeWidth={strokeWidth}
          strokeDasharray={`${Math.max(lenColheita - 3, 1)} ${c - lenColheita + 3}`}
          strokeDashoffset={offColheita}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
        {/* Reefer (blue) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#0284c7"
          strokeWidth={strokeWidth}
          strokeDasharray={`${Math.max(lenReefer - 3, 1)} ${c - lenReefer + 3}`}
          strokeDashoffset={offReefer}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
        {/* Maturação (orange) */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#f59e0b"
          strokeWidth={strokeWidth}
          strokeDasharray={`${Math.max(lenMaturacao - 3, 1)} ${c - lenMaturacao + 3}`}
          strokeDashoffset={offMaturacao}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
        {/* Centered Text */}
        <text x={cx} y={cy - 6} textAnchor="middle" dominantBaseline="central" className="donut-svg-hero">
          {total}/{max}
        </text>
        <text x={cx} y={cy + 13} textAnchor="middle" dominantBaseline="central" className="donut-svg-sub">
          CAPACIDADE
        </text>
      </svg>
    </div>
  );
}

/* ─── Compact Bezier Chart for Resumido Telemetria ─── */
function ResumidoCompactCurveChart({
  title,
  badgeText,
  badgeClass = 'badge-green',
  points = [58, 60, 64, 66, 63, 62],
  color = '#10b981',
}) {
  const width = 280;
  const height = 65;
  const padTop = 6;
  const padBottom = 8;
  const graphH = height - padTop - padBottom;
  const minVal = Math.min(...points);
  const maxVal = Math.max(...points);
  const folga = Math.max((maxVal - minVal) * 0.15, 1);
  const yMin = minVal - folga;
  const yMax = maxVal + folga;

  const coords = points.map((val, idx) => ({
    x: (idx / (points.length - 1)) * (width - 16) + 8,
    y: padTop + graphH - ((val - yMin) / (yMax - yMin)) * graphH,
  }));

  let curvePath = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const p0 = coords[i];
    const p1 = coords[i + 1];
    const cpx = p0.x + (p1.x - p0.x) / 2;
    curvePath += ` C ${cpx} ${p0.y}, ${cpx} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  const fillPath = `${curvePath} L ${coords[coords.length - 1].x} ${height} L ${coords[0].x} ${height} Z`;
  const gradId = `resumido-grad-${title.replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <div className="resumido-telemetry-card">
      <div className="resumido-telemetry-card-top">
        <span className="resumido-telemetry-name">{title}</span>
        <span className={`badge-pill ${badgeClass}`}>{badgeText}</span>
      </div>

      <div style={{ width: '100%', height: '65px', overflow: 'hidden' }}>
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.28" />
              <stop offset="100%" stopColor={color} stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d={fillPath} fill={`url(#${gradId})`} />
          <path d={curvePath} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      </div>

      <div className="resumido-telemetry-x-axis">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>Agora</span>
      </div>
    </div>
  );
}

/* ─── Telemetry Sensor Card (Detalhado View) ─── */
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

  const gradId = `grad-${title.replace(/[^a-zA-Z0-9]/g, '')}`;

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

              <line x1="8" y1={padTop + graphH * 0.05} x2={width - 8} y2={padTop + graphH * 0.05} stroke="#EEF2EE" strokeWidth="0.8" strokeDasharray="3 3" />
              <line x1="8" y1={padTop + graphH * 0.5} x2={width - 8} y2={padTop + graphH * 0.5} stroke="#EEF2EE" strokeWidth="0.8" strokeDasharray="3 3" />
              <line x1="8" y1={padTop + graphH * 0.95} x2={width - 8} y2={padTop + graphH * 0.95} stroke="#EEF2EE" strokeWidth="0.8" strokeDasharray="3 3" />

              <path d={fillPath} fill={`url(#${gradId})`} />
              <path d={curvePath} fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

              {coords.map((pt, idx) => (
                <circle key={idx} cx={pt.x} cy={pt.y} r="2.8" fill={color} stroke="#ffffff" strokeWidth="1.2" />
              ))}
            </svg>
          ) : (
            <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '1.5rem 0 0', textAlign: 'center' }}>
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
  // FE-D10: Persistent toggle between Resumido and Detalhado view
  const [isResumido, setIsResumido] = useState(() => {
    const saved = localStorage.getItem('dashboard_resumido');
    return saved !== null ? saved === 'true' : true;
  });

  const [activeTelemetryTab, setActiveTelemetryTab] = useState('24h');
  const [resumo, setResumo] = useState(null);
  const [seriesSensores, setSeriesSensores] = useState(null);

  const handleToggleResumido = (checked) => {
    setIsResumido(checked);
    localStorage.setItem('dashboard_resumido', String(checked));
  };

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

  // Dados com fallback fiel ao mockup
  const cond = resumo?.condicao_geral;
  const cc = resumo?.resumo_condicoes;
  const lotes = resumo?.lotes_monitorados;
  const alertas = resumo?.alertas;

  const pctFaixa = typeof cc?.pct_na_faixa === 'number' ? Math.round(cc.pct_na_faixa) : 90;
  const pctGeral = typeof cond?.pct_faixa === 'number' ? Math.round(cond.pct_faixa) : 96;
  const totalLotes = typeof lotes?.total === 'number' ? lotes.total : 6;
  const ativosComSensor = typeof lotes?.com_sensor_ativo === 'number' ? lotes.com_sensor_ativo : 3;
  const alertasAbertos = typeof alertas?.abertos === 'number' ? alertas.abertos : 2;

  const condBadge = cond?.nivel ? CONDICAO[cond.nivel] : { texto: 'Excelente', classe: 'badge-green' };
  const nivelAlerta = alertas?.maior_nivel ? NIVEL_ALERTA[alertas.maior_nivel] : { texto: 'Atenção Leve', classe: 'badge-amber' };

  const dataHoje = new Date().toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Recife',
  });

  // Series default fallback for Detalhado
  const defaultDates = ['01 Jun', '03 Jun', '05 Jun', '07 Jun'];
  const defaultPointsMap = {
    umidadeAr: [55, 62, 59, 62],
    umidadeSolo: [50, 54, 60, 58],
    temperaturaSolo: [22, 23.5, 25, 24.5],
    temperaturaAr: [24, 26, 29, 27.8],
  };

  return (
    <div className="dashboard-container">
      {/* ── Top Header with Resumido / Detalhado Toggle (FE-D10) ── */}
      <TopHeader
        title="Visão Geral do Sistema"
        subtitle="Gerencie preferências da fazenda, parâmetros de sensores, notificações e acessos."
        showResumidoToggle={true}
        isResumido={isResumido}
        onToggleResumido={handleToggleResumido}
        dateText={dataHoje}
      />

      {/* ═══════════════════════════════════════════════════════════
         ─── RESUMIDO VIEW (MATCHING IMAGE 1) ───
         ═══════════════════════════════════════════════════════════ */}
      <div
        className="dash-resumido-root"
        style={{ display: isResumido ? 'flex' : 'none' }}
        aria-hidden={!isResumido}
      >
        {/* ── Resumido Top 3-Card Grid ── */}
        <section className="dash-resumido-top-grid">
          {/* Card 1: CONDIÇÃO GERAL */}
          <div className="resumido-kpi-card">
            <div className="resumido-kpi-header">
              <span className="resumido-kpi-title">CONDIÇÃO GERAL</span>
              <span className="badge-pill badge-green">Excelente</span>
            </div>

            <div className="resumido-kpi-body">
              {/* Condição Geral Gauge: Barra em cima com 96% e rótulos perfeitamente centralizados */}
              <CondicaoGeralGauge value={pctGeral} />

              {/* Progress Bars Column */}
              <div className="resumido-bars-col">
                <div className="resumido-bar-row">
                  <div className="resumido-bar-labels">
                    <span className="resumido-bar-name">Água & Solo</span>
                    <span className="resumido-bar-pct">98%</span>
                  </div>
                  <div className="resumido-track">
                    <div className="resumido-fill fill-blue" style={{ width: '98%' }} />
                  </div>
                </div>

                <div className="resumido-bar-row">
                  <div className="resumido-bar-labels">
                    <span className="resumido-bar-name">Saúde Foliar</span>
                    <span className="resumido-bar-pct">96%</span>
                  </div>
                  <div className="resumido-track">
                    <div className="resumido-fill fill-teal" style={{ width: '96%' }} />
                  </div>
                </div>

                <div className="resumido-bar-row">
                  <div className="resumido-bar-labels">
                    <span className="resumido-bar-name">Microclima</span>
                    <span className="resumido-bar-pct">94%</span>
                  </div>
                  <div className="resumido-track">
                    <div className="resumido-fill fill-cyan" style={{ width: '94%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="resumido-kpi-footer">
              <span>Parâmetros 100% ideais</span>
              <span style={{ color: '#059669', fontWeight: 600 }}>● 24h Conforme</span>
            </div>
          </div>

          {/* Card 2: LOTES EM OPERAÇÃO */}
          <div className="resumido-kpi-card">
            <div className="resumido-kpi-header">
              <span className="resumido-kpi-title">LOTES EM OPERAÇÃO</span>
              <span className="badge-pill badge-blue">6 Ativos</span>
            </div>

            <div className="resumido-kpi-body">
              {/* Donut Chart with Centered 6/8 CAPACIDADE */}
              <DonutCapacityChart total={totalLotes} max={8} colheita={3} reefer={2} maturacao={1} />

              {/* Legend Column */}
              <div className="resumido-legend-col">
                <div className="resumido-legend-row">
                  <div className="resumido-legend-left">
                    <span className="dot-green" /> Colheita
                  </div>
                  <span className="resumido-legend-count">3 lotes</span>
                </div>
                <div className="resumido-legend-row">
                  <div className="resumido-legend-left">
                    <span className="dot-blue" /> Reefer / Frio
                  </div>
                  <span className="resumido-legend-count">2 lotes</span>
                </div>
                <div className="resumido-legend-row">
                  <div className="resumido-legend-left">
                    <span style={{ width: '7px', height: '7px', backgroundColor: '#f59e0b', borderRadius: '50%', display: 'inline-block' }} /> Maturação
                  </div>
                  <span className="resumido-legend-count">1 lote</span>
                </div>
              </div>
            </div>

            <div className="resumido-kpi-footer" style={{ justifyContent: 'flex-start', gap: '1.25rem' }}>
              <span><span className="dot-green" /> 3 Colheita</span>
              <span><span className="dot-blue" /> 2 Reefer</span>
              <span><span style={{ width: '7px', height: '7px', backgroundColor: '#f59e0b', borderRadius: '50%', display: 'inline-block' }} /> 1 Maturação</span>
            </div>
          </div>

          {/* Card 3: PREVISÃO DO TEMPO */}
          <div className="resumido-kpi-card">
            <div className="resumido-kpi-header">
              <span className="resumido-kpi-title">PREVISÃO DO TEMPO</span>
              <span className="badge-pill badge-yellow-loc">📍 Petrolina, PE • Hoje</span>
            </div>

            <div className="resumido-weather-body">
              <div className="resumido-weather-left">
                <span className="resumido-weather-sun-icon">☀️</span>
                <div className="resumido-weather-temp-group">
                  <span className="resumido-weather-big-temp">28°C</span>
                  <span className="resumido-weather-condition-text">Ensolarado • Vento 12 km/h</span>
                </div>
              </div>

              <div className="resumido-weather-periods">
                <div className="resumido-weather-period-col">
                  <span className="resumido-period-tag">MANHÃ</span>
                  <span className="resumido-period-deg">22°</span>
                </div>
                <div className="resumido-weather-period-col">
                  <span className="resumido-period-tag">TARDE</span>
                  <span className="resumido-period-deg">31°</span>
                </div>
                <div className="resumido-weather-period-col">
                  <span className="resumido-period-tag">NOITE</span>
                  <span className="resumido-period-deg">24°</span>
                </div>
              </div>
            </div>

            <div className="resumido-weather-bottom-stats">
              <div className="resumido-stat-item">
                <span className="resumido-stat-label">UMIDADE</span>
                <span className="resumido-stat-val">62%</span>
              </div>
              <div className="resumido-stat-item">
                <span className="resumido-stat-label">CHUVA</span>
                <span className="resumido-stat-val">0 mm</span>
              </div>
              <div className="resumido-stat-item">
                <span className="resumido-stat-label">UV</span>
                <span className="resumido-stat-val" style={{ color: '#059669' }}>Mod.</span>
              </div>
              <div className="resumido-stat-item">
                <span className="resumido-stat-label">Qua</span>
                <span className="resumido-stat-val">29°</span>
              </div>
              <div className="resumido-stat-item">
                <span className="resumido-stat-label">Qui</span>
                <span className="resumido-stat-val">28°</span>
              </div>
              <div className="resumido-stat-item">
                <span className="resumido-stat-label">Sex</span>
                <span className="resumido-stat-val">27°</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Resumido Middle 2-Card Grid (~38% / ~62%) ── */}
        <section className="dash-resumido-mid-grid">
          {/* Card Left: RESUMO DAS CONDIÇÕES & CULTURAS */}
          <div className="resumido-conditions-card">
            <div>
              <div className="resumido-kpi-header" style={{ marginBottom: '0.25rem' }}>
                <span className="resumido-kpi-title">RESUMO DAS CONDIÇÕES & CULTURAS</span>
              </div>

              {/* Speedometer Gauge: 90% LEITURAS CONFORMES (Centered & Vibrant) */}
              <div className="resumido-speedometer-box">
                <SemicircleSpeedometer
                  value={pctFaixa}
                  id="resumido-conditions"
                  label="LEITURAS CONFORMES"
                  size={205}
                  strokeWidth={18}
                  gradientType="cool"
                />
              </div>

              {/* 3 Metric Rows */}
              <div className="resumido-metric-bars-stack">
                <div className="resumido-bar-row">
                  <div className="resumido-bar-labels">
                    <span className="resumido-bar-name">
                      <span className="dot-green" style={{ marginRight: '6px' }} />
                      Saúde da Plantação (NDVI)
                    </span>
                    <span className="resumido-bar-pct">85%</span>
                  </div>
                  <div className="resumido-track">
                    <div className="resumido-fill fill-teal" style={{ width: '85%' }} />
                  </div>
                </div>

                <div className="resumido-bar-row">
                  <div className="resumido-bar-labels">
                    <span className="resumido-bar-name">
                      <span className="dot-blue" style={{ marginRight: '6px' }} />
                      Umidade Média do Dossel
                    </span>
                    <span className="resumido-bar-pct">67%</span>
                  </div>
                  <div className="resumido-track">
                    <div className="resumido-fill fill-blue" style={{ width: '67%' }} />
                  </div>
                </div>

                <div className="resumido-bar-row">
                  <div className="resumido-bar-labels">
                    <span className="resumido-bar-name">
                      <span style={{ width: '7px', height: '7px', backgroundColor: '#f59e0b', borderRadius: '50%', display: 'inline-block', marginRight: '6px' }} />
                      Temperatura Foliar
                    </span>
                    <span className="resumido-bar-pct">27°C</span>
                  </div>
                  <div className="resumido-track">
                    <div className="resumido-fill fill-orange" style={{ width: '54%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 2-Col Info Box */}
            <div className="resumido-bottom-info-box">
              <div>
                <div className="resumido-box-col-title">CULTURAS</div>
                <div className="resumido-crop-item">
                  <span>Vitória:</span>
                  <strong style={{ color: '#059669' }}>55%</strong>
                </div>
                <div className="resumido-crop-item">
                  <span>Palmer:</span>
                  <strong style={{ color: '#0284c7' }}>35%</strong>
                </div>
                <div className="resumido-crop-item">
                  <span>Outras:</span>
                  <strong>10%</strong>
                </div>
              </div>

              <div>
                <div className="resumido-box-col-title">STATUS ÁGUA</div>
                <div className="resumido-water-stat-row">
                  <span className="resumido-water-hero">63%</span>
                  <span className="badge-pill badge-green" style={{ padding: '1px 8px' }}>Auto</span>
                </div>
                <span className="resumido-water-sub">4.200 Litros</span>
              </div>
            </div>
          </div>

          {/* Card Right: MONITORAMENTO DA PROPRIEDADE & TALHÕES */}
          <div className="resumido-map-card">
            <div>
              <div className="resumido-map-header">
                <div className="resumido-map-title-group">
                  <h2 className="resumido-map-title">MONITORAMENTO DA PROPRIEDADE & TALHÕES</h2>
                  <span className="resumido-map-sub">Fazenda Vale das Uvas • Setor 04 (48 ha)</span>
                </div>

                <div className="resumido-map-controls">
                  <span className="badge-pill badge-green">sentinel-2</span>
                  <div className="map-zoom-controls" style={{ position: 'static' }}>
                    <button type="button" className="zoom-btn" title="Aumentar zoom">+</button>
                    <button type="button" className="zoom-btn" title="Diminuir zoom">-</button>
                    <button type="button" className="zoom-btn" title="Expandir visualização">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Satellite Map with Overlays */}
              <div className="resumido-map-viewport">
                <img
                  src="/farm_satellite_map.jpg"
                  alt="Monitoramento de Talhões - Petrolina"
                  className="resumido-map-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />

                {/* SVG Polygon outlines for parcels */}
                <svg className="map-polygons-svg" viewBox="0 0 500 280">
                  <polygon points="120,50 260,40 270,110 130,120" fill="rgba(16, 185, 129, 0.25)" stroke="#10b981" strokeWidth="2" />
                  <polygon points="290,45 440,35 430,115 280,125" fill="rgba(245, 158, 11, 0.25)" stroke="#f59e0b" strokeWidth="2" />
                  <polygon points="110,140 320,135 305,210 100,215" fill="rgba(2, 132, 199, 0.25)" stroke="#0284c7" strokeWidth="2" />
                </svg>

                {/* Tag Talhão A • Vitória */}
                <div className="resumido-map-tag" style={{ top: '22%', left: '16%' }}>
                  <span className="dot-green" />
                  <span>Talhão A • Vitória</span>
                  <span className="tag-badge-green">NDVI 0.88</span>
                </div>

                {/* Tag Talhão C • Palmer */}
                <div className="resumido-map-tag" style={{ top: '20%', left: '56%' }}>
                  <span style={{ width: '7px', height: '7px', backgroundColor: '#f59e0b', borderRadius: '50%', display: 'inline-block' }} />
                  <span>Talhão C • Palmer</span>
                  <span className="tag-badge-orange">Alerta Hídrico</span>
                </div>

                {/* Tag Gateway Central ESP32 */}
                <div className="resumido-map-tag" style={{ top: '48%', left: '42%' }}>
                  <span className="dot-green" />
                  <span>Gateway Central ESP32</span>
                </div>

                {/* Tag Talhão B • Thompson */}
                <div className="resumido-map-tag" style={{ top: '65%', left: '20%' }}>
                  <span className="dot-blue" />
                  <span>Talhão B • Thompson</span>
                  <span className="tag-badge-blue">VWC 48%</span>
                </div>
              </div>
            </div>

            <div className="resumido-map-footer">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span className="legend-chip"><span className="legend-dot dot-otima" /> Ótimo</span>
                <span className="legend-chip"><span className="legend-dot dot-boa" /> Atenção</span>
                <span className="legend-chip"><span className="legend-dot dot-critica" /> Crítico</span>
              </div>
              <span>Passagem orbital há 42 min</span>
            </div>
          </div>
        </section>

        {/* ── Resumido Bottom Section: TELEMETRIA DE CAMPO (24H) ── */}
        <section className="resumido-telemetry-section">
          <div className="resumido-telemetry-header">
            <div>
              <h3 className="resumido-telemetry-title">TELEMETRIA DE CAMPO (24H)</h3>
              <p className="resumido-telemetry-sub">Leituras em tempo real dos nós LoRaWAN distribuídos nos talhões</p>
            </div>

            <div className="resumido-time-pills">
              <button
                type="button"
                className={`time-pill-btn ${activeTelemetryTab === '24h' ? 'active' : ''}`}
                onClick={() => setActiveTelemetryTab('24h')}
              >
                24h
              </button>
              <button
                type="button"
                className={`time-pill-btn ${activeTelemetryTab === '7d' ? 'active' : ''}`}
                onClick={() => setActiveTelemetryTab('7d')}
              >
                7 Dias
              </button>
              <button
                type="button"
                className={`time-pill-btn ${activeTelemetryTab === '30d' ? 'active' : ''}`}
                onClick={() => setActiveTelemetryTab('30d')}
              >
                30 Dias
              </button>
            </div>
          </div>

          <div className="resumido-telemetry-grid">
            <ResumidoCompactCurveChart
              title="Umidade do Ar"
              badgeText="62% Ideal"
              badgeClass="badge-green"
              points={[58, 62, 60, 65, 63, 62]}
              color="#10b981"
            />
            <ResumidoCompactCurveChart
              title="Umidade do Solo"
              badgeText="58% Ideal"
              badgeClass="badge-green"
              points={[52, 54, 59, 61, 57, 58]}
              color="#0d9488"
            />
            <ResumidoCompactCurveChart
              title="Temperatura do Solo"
              badgeText="24.5°C Segura"
              badgeClass="badge-blue"
              points={[22.5, 23.2, 25.1, 25.4, 24.8, 24.5]}
              color="#0284c7"
            />
            <ResumidoCompactCurveChart
              title="Temperatura do Ar"
              badgeText="27.8°C Ideal"
              badgeClass="badge-green"
              points={[23.5, 25.2, 28.5, 29.1, 28.2, 27.8]}
              color="#10b981"
            />
          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════════════════════════════
         ─── DETALHADO VIEW (MATCHING IMAGE 2) ───
         ═══════════════════════════════════════════════════════════ */}
      <div
        className="dash-detalhado-root"
        style={{ display: !isResumido ? 'flex' : 'none' }}
        aria-hidden={isResumido}
      >
        {/* ── Top Row: 4 KPI Cards ── */}
        <section className="dash-kpi-grid">
          {/* Card 1: CONDIÇÃO GERAL */}
          <div className="dash-kpi-card">
            <div className="dash-kpi-header">
              <span className="kpi-label-text">CONDIÇÃO GERAL</span>
              {condBadge && <span className={`badge-pill ${condBadge.classe}`}>{condBadge.texto}</span>}
            </div>
            <div className="dash-kpi-body">
              <span className="kpi-hero-number">{pctGeral}%</span>
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
              <span className="kpi-footer-sub">Parâmetros 100% ideais</span>
            </div>
          </div>

          {/* Card 2: LOTES EM OPERAÇÃO */}
          <div className="dash-kpi-card">
            <div className="dash-kpi-header">
              <span className="kpi-label-text">LOTES EM OPERAÇÃO</span>
            </div>
            <div className="dash-kpi-body">
              <div className="kpi-hero-number-with-sub">
                <span className="kpi-hero-number">{totalLotes}</span>
                <span className="kpi-sub-unit">lotes ativos</span>
              </div>
              <div className="kpi-donut-icon-wrap">
                <svg width="44" height="44" viewBox="0 0 44 44">
                  <circle cx="22" cy="22" r="16" fill="none" stroke="#e2e8f0" strokeWidth="4" />
                  <circle
                    cx="22" cy="22" r="16"
                    fill="none" stroke="#059669" strokeWidth="4"
                    strokeDasharray="100.5" strokeDashoffset="45"
                    strokeLinecap="round"
                    transform="rotate(-90 22 22)"
                  />
                  <circle
                    cx="22" cy="22" r="16"
                    fill="none" stroke="#0ea5e9" strokeWidth="4"
                    strokeDasharray="100.5" strokeDashoffset="75"
                    strokeLinecap="round"
                    transform="rotate(60 22 22)"
                  />
                  <rect x="18" y="18" width="8" height="8" rx="1.5" fill="#0f766e" />
                </svg>
              </div>
            </div>
            <div className="dash-kpi-footer">
              <div className="kpi-legend-dots">
                <span className="legend-item"><span className="dot-green" /> {ativosComSensor} Colheita</span>
                <span className="legend-item"><span className="dot-blue" /> 2 Reefer</span>
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
              <span className="kpi-hero-number">{alertasAbertos}</span>
              <div className="kpi-icon-box-peach">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
            </div>
            <div className="dash-kpi-footer">
              <span className="kpi-footer-sub">Necessário atenção</span>
            </div>
          </div>
        </section>

        {/* ── Middle Section: 3 Columns Grid ── */}
        <section className="dash-middle-layout">
          {/* ── Column 1 (Left): Resumo da Produção & Status da Água ── */}
          <div className="dash-mid-col">
            {/* Card: Resumo da produção with Centered Gauge */}
            <div className="dash-white-card">
              <h2 className="card-headline-clean">Resumo da produção</h2>
              <SemicircleSpeedometer
                value={pctFaixa}
                id="detalhado-prod"
                subtext="% de leituras dentro da faixa nas últimas 24h"
                size={190}
                strokeWidth={16}
                gradientType="warm"
              />

              <div className="production-metrics-list">
                <div className="prod-metric-row">
                  <div className="prod-metric-left">
                    <span className="prod-indicator-ring ring-green" />
                    <span className="prod-metric-label">Saúde da plantação</span>
                  </div>
                  <span className="prod-metric-val">85%</span>
                </div>
                <div className="prod-metric-row">
                  <div className="prod-metric-left">
                    <span className="prod-indicator-ring ring-blue" />
                    <span className="prod-metric-label">Umidade</span>
                  </div>
                  <span className="prod-metric-val">67%</span>
                </div>
                <div className="prod-metric-row">
                  <div className="prod-metric-left">
                    <span className="prod-indicator-icon">🌡️</span>
                    <span className="prod-metric-label">Temperatura</span>
                  </div>
                  <span className="prod-metric-val">27°C</span>
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
                    <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
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

                <svg className="map-polygons-svg" viewBox="0 0 500 280">
                  <polygon points="210,60 300,55 315,110 220,115" fill="rgba(16, 185, 129, 0.28)" stroke="#10b981" strokeWidth="2.5" />
                  <polygon points="120,135 340,130 330,195 110,200" fill="rgba(245, 158, 11, 0.28)" stroke="#f59e0b" strokeWidth="2.5" />
                  <polygon points="360,70 435,65 425,125 350,130" fill="rgba(239, 68, 68, 0.28)" stroke="#ef4444" strokeWidth="2.5" />
                </svg>

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
            { chave: 'umidadeAr', titulo: 'Umidade do ar', unit: '%', defVal: '62%', color: '#10b981' },
            { chave: 'umidadeSolo', titulo: 'Umidade do solo', unit: '%', defVal: '58%', color: '#0d9488' },
            { chave: 'temperaturaSolo', titulo: 'Temperatura do solo', unit: '°C', defVal: '48%', color: '#0284c7' },
            { chave: 'temperaturaAr', titulo: 'Temperatura do ar', unit: '°C', defVal: '48%', color: '#10b981' },
          ].map(({ chave, titulo, unit, defVal, color }) => {
            const dado = seriesSensores?.[chave];
            const r = resumirSerie(dado?.series);
            return (
              <TelemetrySensorCard
                key={chave}
                title={titulo}
                unit={unit}
                color={color}
                value={r ? `${r.atual.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}${unit}` : defVal}
                status={r ? (dado.source === 'sensor' ? 'Sensor' : 'Ideal') : 'Ideal'}
                points={r?.points ?? defaultPointsMap[chave]}
                dates={r?.dates ?? defaultDates}
              />
            );
          })}
        </section>
      </div>
    </div>
  );
}