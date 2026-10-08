import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/* ─── Telemetry Sparkline with Y-axis grid, smooth cubic bezier curve, gradient fill & vertex dots ─── */
function TelemetryChart({ color = '#10b981', points = [22, 24, 25, 23, 22, 65, 30] }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth || 260;
    const height = 75;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    const padTop = 8;
    const padBottom = 8;
    const graphH = height - padTop - padBottom;
    const numPoints = points.length;

    // Grid lines for 100%, 50%, 0%
    ctx.setLineDash([2, 4]);
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;

    [0.1, 0.5, 0.95].forEach((pct) => {
      const yLine = padTop + graphH * (1 - pct);
      ctx.beginPath();
      ctx.moveTo(0, yLine);
      ctx.lineTo(width, yLine);
      ctx.stroke();
    });
    ctx.setLineDash([]); // Reset dash

    const coords = points.map((val, idx) => ({
      x: (idx / (numPoints - 1)) * width,
      y: padTop + graphH - (val / 100) * graphH,
    }));

    // Area Gradient Fill
    const rgbMatch = color.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    const r = rgbMatch ? parseInt(rgbMatch[1], 16) : 16;
    const g = rgbMatch ? parseInt(rgbMatch[2], 16) : 185;
    const b = rgbMatch ? parseInt(rgbMatch[3], 16) : 129;

    const gradient = ctx.createLinearGradient(0, padTop, 0, height);
    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.28)`);
    gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, 0.08)`);
    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0.0)`);

    ctx.beginPath();
    ctx.moveTo(coords[0].x, coords[0].y);
    for (let i = 0; i < coords.length - 1; i++) {
      const p0 = coords[i];
      const p1 = coords[i + 1];
      const cpx1 = p0.x + (p1.x - p0.x) / 2;
      const cpy1 = p0.y;
      const cpx2 = p0.x + (p1.x - p0.x) / 2;
      const cpy2 = p1.y;
      ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, p1.x, p1.y);
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Line Stroke
    ctx.beginPath();
    ctx.moveTo(coords[0].x, coords[0].y);
    for (let i = 0; i < coords.length - 1; i++) {
      const p0 = coords[i];
      const p1 = coords[i + 1];
      const cpx1 = p0.x + (p1.x - p0.x) / 2;
      const cpy1 = p0.y;
      const cpx2 = p0.x + (p1.x - p0.x) / 2;
      const cpy2 = p1.y;
      ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, p1.x, p1.y);
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    // Data point dots
    coords.forEach((pt) => {
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();
    });
  }, [points, color]);

  return (
    <div className="telemetry-chart-container">
      <div className="telemetry-y-axis">
        <span>100%</span>
        <span>50%</span>
        <span>0%</span>
      </div>
      <div className="telemetry-canvas-wrap">
        <canvas ref={canvasRef} className="telemetry-canvas" />
      </div>
    </div>
  );
}

/* ─── Donut Chart for Resumo das Condições ─── */
function ConditionsDonut({ value = 91 }) {
  const size = 160;
  const strokeWidth = 18;
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="conditions-donut-wrapper">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={cx} cy={cy} r={r}
          fill="none" stroke="#f3f4f6"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={cx} cy={cy} r={r}
          fill="none" stroke="url(#donutGrad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
        <defs>
          <linearGradient id="donutGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
      <div className="donut-center-text">
        <span className="donut-val">{value}%</span>
      </div>
    </div>
  );
}

/* ─── UV Index Badge ─── */
function UVBadge({ value = 4 }) {
  const getLevel = (v) => {
    if (v <= 2) return { label: 'Baixo', color: '#10b981' };
    if (v <= 5) return { label: 'Moderado', color: '#f59e0b' };
    if (v <= 7) return { label: 'Alto', color: '#f97316' };
    if (v <= 10) return { label: 'Muito alto', color: '#ef4444' };
    return { label: 'Extremo', color: '#7c3aed' };
  };
  const level = getLevel(value);

  return (
    <div className="uv-badge-wrapper">
      <div className="uv-badge-arc" style={{ borderColor: level.color }}>
        <span className="uv-badge-number" style={{ color: level.color }}>UV {value}</span>
        <span className="uv-badge-label">{level.label}</span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const userName = user?.name || 'Maria Clara';
  const userRole = user?.role || 'Gestora';
  const initials = userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  const today = new Date();
  const dateStr = today.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <div className="dashboard-container">
      {/* ── Top Header ── */}
      <header className="dash-top-header">
        <div className="dash-top-title-col">
          <h1 className="dash-main-heading">Visão Geral do Sistema</h1>
          <p className="dash-main-subtext">
            Gerencie preferências da fazenda, parâmetros de sensores, notificações e acessos.
          </p>
        </div>

        <div className="dash-top-actions">
          {/* Date Selector Pill */}
          <div className="dash-date-pill">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{dateStr}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {/* Notification Button */}
          <div className="dash-bell-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="bell-badge-orange">2</span>
          </div>

          {/* User Profile */}
          <div className="dash-profile-pill">
            <div className="dash-profile-avatar">{initials}</div>
            <div className="dash-profile-text">
              <span className="dash-profile-name">{userName}</span>
              <span className="dash-profile-role">{userRole}</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── 4 Top KPI Cards ── */}
      <section className="dash-kpi-grid">
        {/* KPI 1: Condição Geral */}
        <div className="dash-kpi-item">
          <div className="kpi-icon-circle kpi-bg-green">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="kpi-info-col">
            <span className="kpi-meta-label">CONDIÇÃO GERAL
              <span className="kpi-badge-inline badge-green">Detalhes</span>
            </span>
            <span className="kpi-main-number green-text" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Boa
            </span>
            <span className="kpi-status-sub green-text">Tudo dentro do ideal</span>
          </div>
        </div>

        {/* KPI 2: Lotes Monitorados */}
        <div className="dash-kpi-item">
          <div className="kpi-icon-circle kpi-bg-teal">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </div>
          <div className="kpi-info-col">
            <span className="kpi-meta-label">LOTES MONITORADOS
              <span className="kpi-badge-inline badge-teal">Real</span>
            </span>
            <span className="kpi-main-number">
              <strong>6</strong> <span className="kpi-of-total">de 8 lotes</span>
            </span>
            <span className="kpi-status-sub grey-text">com sensor ativo (75%)</span>
            <div className="kpi-mini-bar">
              <div className="kpi-mini-bar-fill" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>

        {/* KPI 3: Sensores Ativos */}
        <div className="dash-kpi-item">
          <div className="kpi-icon-circle kpi-bg-teal">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <line x1="12" y1="20" x2="12.01" y2="20" />
            </svg>
          </div>
          <div className="kpi-info-col">
            <span className="kpi-meta-label">SENSORES ATIVOS
              <span className="kpi-badge-inline badge-red-light">Real + Simulado</span>
            </span>
            <span className="kpi-main-number">
              <strong>24</strong> <span className="kpi-of-total">de 28</span>
            </span>
            <span className="kpi-status-sub grey-text">sensores operantes</span>
            <div className="kpi-mini-detail">
              <span>10 reais na rede LoRa · 6 simulados</span>
            </div>
          </div>
        </div>

        {/* KPI 4: Alertas Ativos */}
        <div className="dash-kpi-item">
          <div className="kpi-icon-circle kpi-bg-amber">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div className="kpi-info-col">
            <span className="kpi-meta-label">ALERTAS ATIVOS
              <span className="kpi-badge-inline badge-amber-light-pill">Ação rqd.</span>
            </span>
            <span className="kpi-main-number amber-text">2</span>
            <span className="kpi-status-sub grey-text">1 ação crítica, 1 aviso de risco baixo</span>
            <Link to="/mercado" className="kpi-link-action">Ver sumário de alertas →</Link>
          </div>
        </div>
      </section>

      {/* ── Fluxo Operacional dos Lotes ── */}
      <section className="dash-flow-section">
        <div className="flow-header-row">
          <h2 className="flow-title">FLUXO OPERACIONAL DOS LOTES</h2>
          <span className="badge-pill badge-green">Tempo Real</span>
          <span className="flow-safra-info">Safra Vigente 2026/2 — Total de 22 lotes cadastrados</span>
        </div>
        <div className="flow-pipeline">
          {[
            { label: 'ETAPA 1', title: 'Em produção', count: '3 lotes', color: 'green', active: false },
            { label: 'ETAPA 2', title: 'Pronto p/ colheita', count: '1 lote', color: 'green', active: false },
            { label: 'ETAPA 3', title: 'Colhido', count: '1 lote', color: 'green', active: false },
            { label: 'ETAPA 4 (CRÍTICA)', title: 'Em transporte', count: '2 lotes', color: 'teal', active: true },
            { label: 'ETAPA 5', title: 'Armazenado', count: '1 lote', color: 'green', active: false },
            { label: 'ETAPA FINAL', title: 'Finalizado', count: '14 na safra', color: 'green', active: false },
          ].map((step, idx) => (
            <div key={idx} className={`flow-step ${step.active ? 'flow-step-active' : ''}`}>
              <div className="flow-step-header">
                <span className={`flow-dot flow-dot-${step.color}`}></span>
                <span className="flow-step-label">{step.label}</span>
              </div>
              <span className="flow-step-title">{step.title}</span>
              <span className="flow-step-count">{step.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Middle Section: 4-Column Grid ── */}
      <section className="dash-middle-grid">
        {/* Column 1: Resumo das Condições + Índice UV */}
        <div className="dash-col-stacked">
          {/* Resumo das Condições */}
          <div className="dash-white-card card-conditions">
            <div className="card-header-row">
              <h2 className="card-headline">RESUMO DAS CONDIÇÕES</h2>
              <span className="badge-pill badge-green">Detalhes</span>
            </div>

            <ConditionsDonut value={91} />

            <div className="conditions-legend">
              <div className="cond-legend-row">
                <span className="cond-dot" style={{ background: '#10b981' }}></span>
                <span>% de lotes em faixa ideal nos últimos 24h</span>
              </div>
              <div className="cond-legend-row">
                <span className="cond-dot" style={{ background: '#3b82f6' }}></span>
                <span>Dentro do ideal: <strong>91% dos registros</strong></span>
              </div>
              <div className="cond-legend-row">
                <span className="cond-dot" style={{ background: '#f59e0b' }}></span>
                <span>Umidade do ar: média <strong>64%</strong></span>
              </div>
              <div className="cond-legend-row">
                <span className="cond-dot" style={{ background: '#ef4444' }}></span>
                <span>Temperatura e umidade: <strong>27,4°C</strong> / ideal</span>
              </div>
              <div className="cond-legend-row">
                <span className="cond-dot" style={{ background: '#8b5cf6' }}></span>
                <span>Déficit Press. Vapor (VPD): <strong>0,86 kPa</strong> / Bom</span>
              </div>
            </div>

            <div className="cond-timestamp">Sessão no período: 28/09 a 04/10</div>
          </div>

          {/* Índice UV & Risco Climático */}
          <div className="dash-white-card card-uv-risk">
            <div className="card-header-row">
              <h2 className="card-headline">ÍNDICE UV E RISCO CLIMÁTICO (IA)</h2>
              <span className="badge-pill badge-green">Previsão</span>
            </div>

            <div className="uv-risk-body">
              <UVBadge value={4} />

              <div className="uv-risk-details">
                <div className="uv-detail-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  <span>Condição ideal para colheita matinal e colheita noturna</span>
                </div>
              </div>

              <div className="uv-risk-alerts">
                <span className="uv-risk-title">ALERTA DE RISCO CLIMÁTICO</span>
                <div className="uv-alert-row">
                  <span className="badge-pill badge-amber">Médio</span>
                  <span>Moderado</span>
                </div>
                <div className="uv-alert-detail">
                  <span className="uv-alert-rec">Condições estáveis com alerta de calor onda fraca prevista para o final da tarde nos próximos 5 dias — risco mín: 0.08, risco méd: 0.23.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2: Status da Água + Recomendação IA */}
        <div className="dash-col-stacked">
          {/* Status da Água */}
          <div className="dash-white-card card-water-status">
            <div className="card-header-row">
              <h2 className="card-headline">STATUS DA ÁGUA</h2>
              <span className="badge-pill badge-green">Detalhes</span>
            </div>

            <div className="water-card-body">
              <div className="water-mid-row">
                <div className="water-icon-box">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#38bdf8">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                  </svg>
                </div>
                <div className="water-progress-col">
                  <span className="water-metric-title">Umidade média do solo</span>
                  <div className="water-num-and-bar">
                    <span className="water-big-pct">83%</span>
                    <div className="water-bar-track">
                      <div className="water-bar-fill" style={{ width: '83%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="water-stats-bottom-row">
                <div className="water-stat-item">
                  <span className="wstat-sub">Consumo de hoje (estimado)</span>
                  <span className="wstat-main-num">4.200 L</span>
                </div>
                <div className="water-stat-item align-right">
                  <span className="wstat-sub">Irrigação automática</span>
                  <span className="badge-pill-solid-green">Ativa</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recomendação IA */}
          <div className="dash-white-card card-ai-rec">
            <div className="card-header-row">
              <div className="ai-rec-title-row">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
                <h2 className="card-headline">RECOMENDAÇÃO IA</h2>
              </div>
            </div>

            <div className="ai-rec-body">
              <div className="ai-rec-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" /></svg>
                <div className="ai-rec-text">
                  <strong>Irrigar das 06:00, cerca de 3,8 mm (1.250 L/lote).</strong>
                </div>
              </div>
              <div className="ai-rec-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                <div className="ai-rec-text">
                  <strong>Motivo:</strong> Compensar elevação de VPD previsto de 1,2 kPa nas próximas 12h e manter solo entre 60–80% da CC.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Janela Ideal + Preço e Demanda + Saúde da Fruta */}
        <div className="dash-col-stacked">
          {/* Janela Ideal de Colheita & Exportação */}
          <div className="dash-white-card card-harvest-window">
            <div className="card-header-row">
              <h2 className="card-headline">Janela Ideal de Colheita & Exp.</h2>
              <span className="badge-pill badge-green" style={{ fontSize: '0.6rem' }}>96% Pronto</span>
            </div>
            <p className="harvest-desc">
              Período recomendado: <strong>29/09 a 04/10</strong>
            </p>
            <p className="harvest-detail">
              Fruta tipica de ITK de 83% na faixa de preferência para mercado europeu (calibre G5-G7).
            </p>
            <div className="harvest-action-row">
              <button className="btn-harvest">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                Selet. lotes para embarque
              </button>
            </div>
          </div>

          {/* Preço e Demanda de Mercado */}
          <div className="dash-white-card card-market-price">
            <div className="card-header-row">
              <h2 className="card-headline">Preço e Demanda de Mercado</h2>
            </div>
            <div className="market-grid">
              <div className="market-row">
                <span className="market-label">Uva Vitória</span>
                <span className="market-origin">Centro-Oeste</span>
                <span className="market-val">R$ 14,20/kg ↑ +1%</span>
              </div>
              <div className="market-row">
                <span className="market-label">Manga Palmer</span>
                <span className="market-origin">Nordeste</span>
                <span className="market-val">R$ 6,90/kg ↓ contra-safra</span>
              </div>
            </div>
          </div>

          {/* Saúde da Fruta na Semana */}
          <div className="dash-white-card card-fruit-health">
            <div className="card-header-row">
              <h2 className="card-headline">Saúde da Fruta na Semana</h2>
            </div>
            <div className="fruit-health-body">
              <div className="fruit-stat-row">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                <span><strong>3</strong> ocorrências térmicas registradas</span>
              </div>
              <p className="fruit-stat-desc">
                Exposição acima do ponto ótimo em lote específico, sem impacto significativo sobre a qualidade.
              </p>
            </div>
          </div>
        </div>

        {/* Column 4: Weather Cards (Petrolina & Recife) */}
        <div className="dash-col-stacked col-right-map-weather">
          {/* Petrolina, PE */}
          <div className="dash-white-card card-weather-city weather-petrolina">
            <div className="weather-city-header">
              <div className="weather-city-loc">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><circle cx="12" cy="10" r="3" /><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 0 0-16 0c0 3 2.7 7.1 8 11.7z" /></svg>
                <span className="weather-city-name">Petrolina, PE</span>
              </div>
              <div className="weather-city-badges">
                <span className="badge-pill badge-amber">Real + Simulado</span>
              </div>
            </div>

            <div className="weather-city-body">
              <div className="weather-city-icon-temp">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="0.5">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                  <line x1="12" y1="21" x2="12" y2="23" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                  <line x1="1" y1="12" x2="3" y2="12" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                  <line x1="21" y1="12" x2="23" y2="12" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <div className="weather-temp-block">
                  <span className="weather-temp-big">28°</span>
                  <span className="weather-temp-unit">C</span>
                </div>
              </div>
              <div className="weather-city-date">
                Hoje, {today.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </div>
              <div className="weather-city-condition">Predomínio de Sol</div>
              <div className="weather-city-sub">Sensação térmica de 30°C</div>

              <div className="weather-mini-stats">
                <div className="wms-item">
                  <span className="wms-label">Umidade</span>
                  <span className="wms-val">62%</span>
                </div>
                <div className="wms-item">
                  <span className="wms-label">Chuva</span>
                  <span className="wms-val">0 mm</span>
                </div>
                <div className="wms-item">
                  <span className="wms-label">Vento</span>
                  <span className="wms-val">12 km/h</span>
                </div>
                <div className="wms-item">
                  <span className="wms-label">Pressão</span>
                  <span className="wms-val">24 km/h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recife, PE */}
          <div className="dash-white-card card-weather-city weather-recife">
            <div className="weather-city-header">
              <div className="weather-city-loc">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2"><circle cx="12" cy="10" r="3" /><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 0 0-16 0c0 3 2.7 7.1 8 11.7z" /></svg>
                <span className="weather-city-name">Recife, PE</span>
              </div>
              <div className="weather-city-badges">
                <span className="badge-pill" style={{ background: '#e0f2fe', color: '#0284c7' }}>API Meteo</span>
              </div>
            </div>

            <div className="weather-city-body">
              <div className="weather-city-icon-temp">
                <svg width="48" height="48" viewBox="0 0 64 64">
                  <circle cx="40" cy="28" r="12" fill="#94a3b8" opacity="0.35" />
                  <circle cx="28" cy="32" r="14" fill="#cbd5e1" />
                  <circle cx="40" cy="36" r="10" fill="#e2e8f0" />
                  <path d="M20 44 L24 52 L28 44" fill="#60a5fa" opacity="0.6" />
                  <path d="M30 44 L34 54 L38 44" fill="#60a5fa" opacity="0.5" />
                  <path d="M40 44 L44 50 L48 44" fill="#60a5fa" opacity="0.4" />
                </svg>
                <div className="weather-temp-block">
                  <span className="weather-temp-big">22°</span>
                  <span className="weather-temp-unit">C</span>
                </div>
              </div>
              <div className="weather-city-date">
                Hoje, {today.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
              </div>
              <div className="weather-city-condition">Predomínio de chuva</div>
              <div className="weather-city-sub">Sensação térmica de 20°C</div>

              <div className="weather-mini-stats">
                <div className="wms-item">
                  <span className="wms-label">Umidade</span>
                  <span className="wms-val">88%</span>
                </div>
                <div className="wms-item">
                  <span className="wms-label">Chuva</span>
                  <span className="wms-val">18 mm</span>
                </div>
                <div className="wms-item">
                  <span className="wms-label">Vento</span>
                  <span className="wms-val">24 km/h</span>
                </div>
                <div className="wms-item">
                  <span className="wms-label">Pressão</span>
                  <span className="wms-val">24 km/h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Weather Forecast - Next 5 Days ── */}
      <section className="dash-forecast-row">
        <div className="forecast-tabs">
          <span className="forecast-tab-title">PREVISÃO DOS PRÓXIMOS 5 DIAS</span>
          <div className="forecast-tab-options">
            <button className="forecast-tab">24h</button>
            <button className="forecast-tab active">7 dias</button>
            <button className="forecast-tab">30 dias</button>
          </div>
        </div>
        <div className="forecast-days-grid">
          {[
            { day: 'Qui 23/07', icon: '☀️', high: '28°', low: '20°' },
            { day: 'Sex 04/03', icon: '☀️', high: '28°', low: '19°' },
            { day: 'Sáb 25/09', icon: '⛅', high: '27°', low: '19°' },
            { day: 'Dom 26/09', icon: '🌤', high: '28°', low: '18°' },
            { day: 'Seg 27/09', icon: '☀️', high: '27°', low: '19°' },
            { day: 'Ter 28/09', icon: '☀️', high: '27°', low: '18°' },
            { day: 'Qua 29/09', icon: '⛅', high: '26°', low: '18°' },
          ].map((d, i) => (
            <div key={i} className="forecast-day-card">
              <span className="fday-name">{d.day}</span>
              <span className="fday-icon">{d.icon}</span>
              <div className="fday-temps">
                <span className="fday-high">{d.high}</span>
                <span className="fday-sep">/</span>
                <span className="fday-low">{d.low}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom Section: Telemetria de Campo (Sensores) ── */}
      <section className="dash-telemetry-section">
        <div className="telemetry-section-header">
          <div>
            <h2 className="telemetry-section-title">Telemetria de Campo (Sensores)</h2>
            <span className="telemetry-section-sub">Métricas de sensores atuando em dados reais e estáticos</span>
          </div>
          <div className="telemetry-period-tabs">
            <button className="tperiod-tab">24h</button>
            <button className="tperiod-tab active">7 dias</button>
            <button className="tperiod-tab">30 dias</button>
          </div>
        </div>

        <div className="dash-telemetry-grid">
          {/* Sensor 1: Umidade do Ar */}
          <div className="dash-white-card telemetry-card">
            <div className="telemetry-card-header">
              <div className="telemetry-title-left">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#10b981">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
                <span className="telemetry-label">Umidade do Ar</span>
              </div>
              <div className="telemetry-right-val">
                <span className="telemetry-val-num">62%</span>
                <span className="badge-pill badge-green">Ideal</span>
              </div>
            </div>
            <TelemetryChart color="#10b981" points={[55, 58, 62, 60, 58, 65, 62]} />
            <div className="telemetry-x-axis">
              <span>01 Jun</span>
              <span>03 Jun</span>
              <span>05 Jun</span>
              <span>07 Jun</span>
            </div>
          </div>

          {/* Sensor 2: Temperatura do Ar */}
          <div className="dash-white-card telemetry-card">
            <div className="telemetry-card-header">
              <div className="telemetry-title-left">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                  <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
                </svg>
                <span className="telemetry-label">Temperatura do Ar</span>
              </div>
              <div className="telemetry-right-val">
                <span className="telemetry-val-num">27.8 °C</span>
                <span className="badge-pill badge-green">Ideal</span>
              </div>
            </div>
            <TelemetryChart color="#10b981" points={[50, 55, 60, 58, 62, 55, 52]} />
            <div className="telemetry-x-axis">
              <span>01 Jun</span>
              <span>03 Jun</span>
              <span>05 Jun</span>
              <span>07 Jun</span>
            </div>
          </div>

          {/* Sensor 3: Umidade do Solo */}
          <div className="dash-white-card telemetry-card">
            <div className="telemetry-card-header">
              <div className="telemetry-title-left">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                  <path d="M2 12l10 5 10-5" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                </svg>
                <span className="telemetry-label">Umidade do Solo</span>
              </div>
              <div className="telemetry-right-val">
                <span className="telemetry-val-num">58%</span>
                <span className="badge-pill" style={{ background: '#e0f2fe', color: '#0284c7' }}>Em teste</span>
              </div>
            </div>
            <TelemetryChart color="#3b82f6" points={[40, 45, 50, 55, 52, 58, 60]} />
            <div className="telemetry-x-axis">
              <span>01 Jun</span>
              <span>03 Jun</span>
              <span>05 Jun</span>
              <span>07 Jun</span>
            </div>
          </div>

          {/* Sensor 4: Temperatura do Solo */}
          <div className="dash-white-card telemetry-card">
            <div className="telemetry-card-header">
              <div className="telemetry-title-left">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                  <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
                </svg>
                <span className="telemetry-label">Temperatura do Solo</span>
              </div>
              <div className="telemetry-right-val">
                <span className="telemetry-val-num">24.5 °C</span>
                <span className="badge-pill" style={{ background: '#fef3c7', color: '#b45309' }}>Sem lote at. atrib.</span>
              </div>
            </div>
            <TelemetryChart color="#f59e0b" points={[35, 38, 42, 40, 45, 48, 44]} />
            <div className="telemetry-x-axis">
              <span>01 Jun</span>
              <span>03 Jun</span>
              <span>05 Jun</span>
              <span>07 Jun</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="dash-footer">
        <span>Dados: Plataforma de rastreabilidade pós-colheita — Logística IoT · Conectividade LoRaWAN / MQTT / HTTP · Vale das Uvas · Setor 04 · Petrolina, PE</span>
      </footer>
    </div>
  );
}
