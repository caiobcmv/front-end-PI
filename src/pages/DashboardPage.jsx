import React, { useState } from 'react';
import TopHeader from '../components/TopHeader';
import { useAuth } from '../context/AuthContext';

/* ── Visão Geral para Gestora ── */
import DashboardGestora from './DashboardGestora';

/* ── Dados de Telemetria e Séries para Perfil Admin/Analista ── */
const TELEMETRIA_DATA = {
  '24h': {
    labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', 'Agora (22:45)'],
    solo: [44.2, 44.8, 45.1, 46.5, 48.2, 47.6, 46.8, 45.9, 45.2, 46.0, 46.5, 46.2],
    tempAr: [21.5, 20.8, 20.4, 22.1, 25.4, 28.7, 31.2, 30.8, 29.1, 26.5, 24.8, 24.2],
    tempSolo: [23.1, 22.8, 22.5, 22.9, 23.6, 24.8, 25.9, 26.2, 25.8, 25.1, 24.5, 24.1],
    rssi: [-84, -83, -83, -82, -80, -79, -78, -80, -81, -81, -82, -81],
    pdr: [99.5, 99.8, 100, 100, 99.6, 99.8, 99.9, 99.8, 100, 99.7, 99.8, 99.8],
  },
  '7d': {
    labels: ['Sex 23', 'Sáb 24', 'Dom 25', 'Seg 26', 'Ter 27', 'Qua 28', 'Hoje (29)'],
    solo: [45.8, 47.2, 46.5, 44.9, 48.4, 47.1, 46.2],
    tempAr: [27.8, 28.1, 26.9, 29.2, 28.5, 27.6, 27.4],
    tempSolo: [24.5, 24.9, 24.2, 25.1, 24.8, 24.4, 24.1],
    rssi: [-82, -81, -83, -80, -81, -82, -81],
    pdr: [99.7, 99.9, 99.8, 99.6, 100, 99.8, 99.8],
  },
  '30d': {
    labels: ['01 Out', '05 Out', '10 Out', '15 Out', '20 Out', '25 Out', 'Hoje'],
    solo: [44.0, 46.8, 48.5, 45.2, 47.0, 46.4, 46.2],
    tempAr: [26.5, 27.2, 28.8, 29.5, 28.1, 27.0, 27.4],
    tempSolo: [23.8, 24.2, 25.0, 25.4, 24.6, 24.0, 24.1],
    rssi: [-83, -82, -80, -81, -82, -81, -81],
    pdr: [99.5, 99.7, 99.9, 99.8, 99.8, 99.7, 99.8],
  },
};

/* ── Gráficos Interativos do Perfil Admin (Apple Human Interface Style) ── */
function AdminTelemetryCharts() {
  const [timeframe, setTimeframe] = useState('24h');
  const [activeMetric, setActiveMetric] = useState('all'); // 'all' | 'solo' | 'temp' | 'lora'
  const [hoverIndex, setHoverIndex] = useState(null);

  const dataset = TELEMETRIA_DATA[timeframe];
  const count = dataset.labels.length;

  // Dimensões do canvas SVG
  const width = 860;
  const height = 240;
  const paddingX = 45;
  const paddingY = 30;
  const innerW = width - paddingX * 2;
  const innerH = height - paddingY * 2;

  // Função utilitária para mapear valores nos eixos
  const getX = (index) => paddingX + (index / (count - 1)) * innerW;
  
  // Normalização de umidade (0 a 100%)
  const getYPercent = (val) => paddingY + innerH - (val / 100) * innerH;
  // Normalização de temperatura (15°C a 38°C)
  const getYTemp = (val) => paddingY + innerH - ((val - 15) / 23) * innerH;
  // Normalização de RSSI (-110 a -60 dBm)
  const getYRSSI = (val) => paddingY + innerH - ((val - (-110)) / 50) * innerH;

  // Cria caminho SVG Bezier suave
  const createSmoothPath = (pts) => {
    if (pts.length === 0) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? 0 : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return d;
  };

  const ptsSolo = dataset.solo.map((v, i) => ({ x: getX(i), y: getYPercent(v), v }));
  const ptsTempAr = dataset.tempAr.map((v, i) => ({ x: getX(i), y: getYTemp(v), v }));
  const ptsTempSolo = dataset.tempSolo.map((v, i) => ({ x: getX(i), y: getYTemp(v), v }));
  const ptsRSSI = dataset.rssi.map((v, i) => ({ x: getX(i), y: getYRSSI(v), v }));

  const pathSolo = createSmoothPath(ptsSolo);
  const pathTempAr = createSmoothPath(ptsTempAr);
  const pathTempSolo = createSmoothPath(ptsTempSolo);
  const pathRSSI = createSmoothPath(ptsRSSI);

  // Área preenchida sob a curva de solo
  const areaSolo = `${pathSolo} L ${getX(count - 1)} ${paddingY + innerH} L ${getX(0)} ${paddingY + innerH} Z`;

  const activeIdx = hoverIndex !== null ? hoverIndex : count - 1;

  return (
    <div className="dash-white-card admin-charts-container" style={{ marginTop: 20 }}>
      {/* Header com Estilo Apple */}
      <div className="admin-charts-header">
        <div className="admin-charts-title-col">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="dot-mini-green" />
            <h2 className="card-headline-clean" style={{ fontSize: '1.08rem', margin: 0 }}>
              Telemetria Contínua de Campo & Conectividade LoRaWAN
            </h2>
            <span className="badge-pill badge-green" style={{ fontSize: '0.72rem' }}>ThingSpeak Online</span>
          </div>
          <p className="card-muted-desc" style={{ marginTop: 4, marginBottom: 0 }}>
            Curvas de calibração em tempo real das sondas FDR, microclima e estabilidade de pacotes RF US915
          </p>
        </div>

        <div className="admin-charts-controls">
          {/* Métrica Selector (Apple Segmented Style) */}
          <div className="apple-segmented-control" role="tablist">
            <button
              type="button"
              className={`apple-segmented-item ${activeMetric === 'all' ? 'active' : ''}`}
              onClick={() => setActiveMetric('all')}
            >
              Visão Completa
            </button>
            <button
              type="button"
              className={`apple-segmented-item ${activeMetric === 'solo' ? 'active' : ''}`}
              onClick={() => setActiveMetric('solo')}
            >
              Umidade Solo
            </button>
            <button
              type="button"
              className={`apple-segmented-item ${activeMetric === 'temp' ? 'active' : ''}`}
              onClick={() => setActiveMetric('temp')}
            >
              Temperatura
            </button>
            <button
              type="button"
              className={`apple-segmented-item ${activeMetric === 'lora' ? 'active' : ''}`}
              onClick={() => setActiveMetric('lora')}
            >
              Sinal LoRa
            </button>
          </div>

          {/* Timeframe Selector (Apple Pills) */}
          <div className="apple-segmented-control" role="tablist">
            {['24h', '7d', '30d'].map((p) => (
              <button
                key={p}
                type="button"
                className={`apple-segmented-item ${timeframe === p ? 'active' : ''}`}
                onClick={() => {
                  setTimeframe(p);
                  setHoverIndex(null);
                }}
              >
                {p === '24h' ? '24 Horas' : p === '7d' ? '7 Dias' : '30 Dias'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Legenda Dinâmica e Indicadores de Estado */}
      <div className="admin-chart-legend-bar">
        {(activeMetric === 'all' || activeMetric === 'solo') && (
          <div className="legend-chip">
            <span className="legend-chip-dot" style={{ background: '#10B981' }} />
            <span className="legend-chip-name">Umidade do Solo FDR:</span>
            <strong>{dataset.solo[activeIdx]}% VWC</strong>
          </div>
        )}
        {(activeMetric === 'all' || activeMetric === 'temp') && (
          <>
            <div className="legend-chip">
              <span className="legend-chip-dot" style={{ background: '#0071E3' }} />
              <span className="legend-chip-name">Temp. Ar:</span>
              <strong>{dataset.tempAr[activeIdx]}°C</strong>
            </div>
            <div className="legend-chip">
              <span className="legend-chip-dot" style={{ background: '#F59E0B' }} />
              <span className="legend-chip-name">Temp. Solo:</span>
              <strong>{dataset.tempSolo[activeIdx]}°C</strong>
            </div>
          </>
        )}
        {(activeMetric === 'all' || activeMetric === 'lora') && (
          <div className="legend-chip">
            <span className="legend-chip-dot" style={{ background: '#0D9488' }} />
            <span className="legend-chip-name">Sinal RSSI:</span>
            <strong>{dataset.rssi[activeIdx]} dBm</strong>
          </div>
        )}
        <div style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#64748B' }}>
          Registro selecionado: <strong style={{ color: '#0F172A' }}>{dataset.labels[activeIdx]}</strong>
        </div>
      </div>

      {/* SVG Interativo com Gráficos Apple */}
      <div className="admin-chart-canvas-wrap">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="admin-chart-svg"
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id="appleGreenArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.32" />
              <stop offset="85%" stopColor="#10B981" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="appleBlueArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0071E3" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#0071E3" stopOpacity="0.0" />
            </linearGradient>
            <filter id="appleShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Linhas de Faixa e Eixo Horizontal */}
          <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="#E2E8F0" strokeDasharray="4 4" />
          <line x1={paddingX} y1={paddingY + innerH * 0.3} x2={width - paddingX} y2={paddingY + innerH * 0.3} stroke="#E2E8F0" strokeDasharray="3 3" />
          <line x1={paddingX} y1={paddingY + innerH * 0.65} x2={width - paddingX} y2={paddingY + innerH * 0.65} stroke="#E2E8F0" strokeDasharray="3 3" />
          <line x1={paddingX} y1={paddingY + innerH} x2={width - paddingX} y2={paddingY + innerH} stroke="#CBD5E1" strokeWidth="1.25" />

          {/* Marcadores de Faixa Agronômica Ideal */}
          <rect
            x={paddingX}
            y={getYPercent(70)}
            width={innerW}
            height={getYPercent(40) - getYPercent(70)}
            fill="rgba(16, 185, 129, 0.05)"
          />
          <text x={width - paddingX - 4} y={getYPercent(70) - 4} textAnchor="end" fill="#10B981" fontSize="9" fontWeight="600">
            Capacidade de Campo (Ótimo 70%)
          </text>
          <text x={width - paddingX - 4} y={getYPercent(25) - 4} textAnchor="end" fill="#DC2626" fontSize="9" fontWeight="600">
            Limite de Estresse Hídrico (25%)
          </text>

          {/* Curvas Conforme Métrica Ativa */}
          {(activeMetric === 'all' || activeMetric === 'solo') && (
            <>
              <path d={areaSolo} fill="url(#appleGreenArea)" />
              <path d={pathSolo} fill="none" stroke="#10B981" strokeWidth="2.75" strokeLinecap="round" />
            </>
          )}

          {(activeMetric === 'all' || activeMetric === 'temp') && (
            <>
              <path d={pathTempSolo} fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 2" strokeLinecap="round" />
              <path d={pathTempAr} fill="none" stroke="#0071E3" strokeWidth="2.5" strokeLinecap="round" />
            </>
          )}

          {(activeMetric === 'all' || activeMetric === 'lora') && (
            <path d={pathRSSI} fill="none" stroke="#0D9488" strokeWidth="2.2" strokeLinecap="round" />
          )}

          {/* Rótulos de Tempo no Eixo X */}
          {dataset.labels.map((lbl, i) => (
            <text
              key={lbl}
              x={getX(i)}
              y={height - 8}
              textAnchor={i === 0 ? 'start' : i === count - 1 ? 'end' : 'middle'}
              fill="#64748B"
              fontSize="9.5"
              fontWeight={i === activeIdx ? '700' : '500'}
            >
              {lbl}
            </text>
          ))}

          {/* Linha vertical e círculos interativos de hover */}
          {activeIdx !== null && (
            <g>
              <line
                x1={getX(activeIdx)}
                y1={paddingY}
                x2={getX(activeIdx)}
                y2={paddingY + innerH}
                stroke="#64748B"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />

              {(activeMetric === 'all' || activeMetric === 'solo') && (
                <circle
                  cx={getX(activeIdx)}
                  cy={ptsSolo[activeIdx].y}
                  r="5.5"
                  fill="#10B981"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  filter="url(#appleShadow)"
                />
              )}

              {(activeMetric === 'all' || activeMetric === 'temp') && (
                <circle
                  cx={getX(activeIdx)}
                  cy={ptsTempAr[activeIdx].y}
                  r="5.5"
                  fill="#0071E3"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  filter="url(#appleShadow)"
                />
              )}

              {(activeMetric === 'all' || activeMetric === 'lora') && (
                <circle
                  cx={getX(activeIdx)}
                  cy={ptsRSSI[activeIdx].y}
                  r="5"
                  fill="#0D9488"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  filter="url(#appleShadow)"
                />
              )}
            </g>
          )}

          {/* Áreas transparentes para captura de hover do mouse */}
          {dataset.labels.map((_, i) => {
            const segW = innerW / (count - 1);
            return (
              <rect
                key={i}
                x={getX(i) - segW / 2}
                y={paddingY}
                width={segW}
                height={innerH}
                fill="transparent"
                style={{ cursor: 'crosshair' }}
                onMouseEnter={() => setHoverIndex(i)}
              />
            );
          })}
        </svg>
      </div>

      {/* 4 Cards de Métricas e Confiabilidade no Padrão Apple */}
      <div className="admin-charts-stat-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-label">Balanço Hídrico (Talhão A1)</div>
          <div className="admin-stat-value-row">
            <span className="admin-stat-value" style={{ color: '#047857' }}>46,2%</span>
            <span className="badge-pill badge-green" style={{ fontSize: '0.68rem' }}>Faixa Ideal</span>
          </div>
          <p className="admin-stat-sub">Sem déficit hídrico · Próxima irrigação prevista para 06:00</p>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-label">Amplitude Térmica Diária</div>
          <div className="admin-stat-value-row">
            <span className="admin-stat-value" style={{ color: '#0071E3' }}>20,4°C — 31,2°C</span>
          </div>
          <p className="admin-stat-sub">Pico térmico ocorrido às 13:45 · Resfriamento noturno normal</p>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-label">Integridade do Enlace LoRa</div>
          <div className="admin-stat-value-row">
            <span className="admin-stat-value" style={{ color: '#0D9488' }}>-81 dBm</span>
            <span className="badge-pill badge-green" style={{ fontSize: '0.68rem' }}>PDR 99.8%</span>
          </div>
          <p className="admin-stat-sub">Gateway Petrolina-04 ativo · 0 pacotes perdidos na última hora</p>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-label">Cadência de Ingestão</div>
          <div className="admin-stat-value-row">
            <span className="admin-stat-value" style={{ color: '#0F172A' }}>5 min</span>
            <span className="badge-pill badge-firmware" style={{ fontSize: '0.68rem' }}>ThingSpeak REST</span>
          </div>
          <p className="admin-stat-sub">Entry ID #14.892 · Latência de ingestão de 124 ms</p>
        </div>
      </div>
    </div>
  );
}

/* ── Visão Geral Analista e Administrador IoT ── */
function DashboardAnalista() {
  const [viewMode, setViewMode] = useState('detalhado');
  const [topologyFilter, setTopologyFilter] = useState('todos');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);

  // Sensores mapeados espacialmente conforme imagem aérea de satélite
  const sensorNodes = [
    { id: '03', label: 'SNS-SL-03', type: 'solo', status: 'ativo', top: '36%', left: '44%', vwc: '37.8%', temp: '25.8°C', talhao: 'Talhão A2 • Uva Crimson' },
    { id: '01', label: 'SNS-SL-01', type: 'solo', status: 'ativo', top: '48%', left: '49%', vwc: '46.2%', temp: '24.5°C', talhao: 'Talhão A1 • Uva Vitória' },
    { id: '19', label: 'SNS-SL-19', type: 'alerta', status: 'critico', top: '45%', left: '42%', vwc: '38.2%', temp: '27.4°C', talhao: 'Talhão A1 • Estresse Hídrico P1' },
    { id: '04', label: 'SNS-AR-04', type: 'ar', status: 'ativo', top: '38%', left: '72%', vwc: '48.1%', temp: '26.1°C', talhao: 'Talhão B1 • Microclima' },
    { id: '08', label: 'SNS-AR-08', type: 'ar', status: 'ativo', top: '45%', left: '74%', vwc: '50.4%', temp: '27.0°C', talhao: 'Talhão B2 • Estação Ar' },
    { id: '07', label: 'SNS-AR-07', type: 'ar', status: 'ativo', top: '51%', left: '70%', vwc: '47.5%', temp: '26.8°C', talhao: 'Talhão C1 • Microclima' },
  ];

  const filteredNodes = sensorNodes.filter((node) => {
    if (topologyFilter === 'todos') return true;
    if (topologyFilter === 'solo') return node.type === 'solo';
    if (topologyFilter === 'ar') return node.type === 'ar';
    if (topologyFilter === 'alerta') return node.type === 'alerta';
    return true;
  });

  const handleZoomIn = () => setZoomLevel((z) => Math.min(1.4, +(z + 0.1).toFixed(2)));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(0.9, +(z - 0.1).toFixed(2)));

  return (
    <div className="dashboard-container analista-dashboard">
      <TopHeader
        title="Painel de Controle IoT & Telemetria"
        subtitle="Monitoramento em tempo real de sensores agroclimáticos, topologia LoRaWAN e integridade de ingestão."
        showResumidoToggle={false}
        dateText="22 de setembro de 2026"
      />

      {/* ── Gateway / Firmware Status Bar ── */}
      <div className="gateway-status-bar">
        <div className="gateway-status-left">
          <span className="dot-mini-green" />
          <strong className="gateway-status-name">GATEWAY PETROLINA-04</strong>
          <span className="gateway-sep">•</span>
          <span className="gateway-status-detail">US915 CONCENTRADOR ATIVO</span>
          <span className="badge-pill badge-firmware">ESP-MESH-v4.2.1-prod</span>
        </div>
        <div className="gateway-status-actions">
          <div className="view-toggle-group">
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'resumido' ? 'active' : ''}`}
              onClick={() => setViewMode('resumido')}
            >
              Resumido
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'detalhado' ? 'active' : ''}`}
              onClick={() => setViewMode('detalhado')}
            >
              Detalhado
            </button>
          </div>
          <button type="button" className="btn-sync-thingspeak" title="Sincronizar telemetria via ThingSpeak REST API">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
            </svg>
            Sincronizar ThingSpeak
          </button>
          <button type="button" className="btn-export-telemetria" title="Exportar dados brutos dos sensores em formato CSV">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Exportar Telemetria
          </button>
        </div>
      </div>

      {/* ── 4 KPI Cards (Admin / Analista) ── */}
      <section className="dash-kpi-grid analista-kpi-grid">
        {/* KPI 1: Saúde da Rede Mesh */}
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">SAÚDE DA REDE MESH</span>
            <span className="badge-pill badge-green">EXCELENTE</span>
          </div>
          <div className="kpi-hero-number-with-sub" style={{ marginTop: 8 }}>
            <span className="kpi-hero-number">96%</span>
          </div>
          <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: 4 }}>
            24 de 25 nós operacionais
          </div>
          <div className="kpi-exact-footer">
            <span className="kpi-footer-meta">Latência média: <strong>124 ms</strong></span>
            <span className="badge-pill badge-green" style={{ fontSize: '0.68rem' }}>Mesh OK</span>
          </div>
        </div>

        {/* KPI 2: Sensores & Sondas */}
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">SENSORES & SONDAS</span>
            <div className="kpi-icon-pill icon-blue-pill">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2">
                <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                <circle cx="12" cy="12" r="2" />
                <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
              </svg>
            </div>
          </div>
          <div className="kpi-hero-number-with-sub" style={{ marginTop: 8 }}>
            <span className="kpi-hero-number">24</span>
            <span className="kpi-sub-unit">unidades ativas</span>
          </div>
          <div className="analista-sensor-breakdown">
            <span className="sensor-breakdown-item">
              <strong>16</strong> Solo (FDR)
            </span>
            <span className="sensor-breakdown-item">
              <strong>8</strong> Microclima (Ar)
            </span>
          </div>
        </div>

        {/* KPI 3: Média Climática & Solo */}
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">MÉDIA CLIMÁTICA & SOLO</span>
            <span className="badge-pill badge-green">FAIXA ADEQUADA</span>
          </div>
          <div className="kpi-hero-number-with-sub" style={{ marginTop: 8 }}>
            <span className="kpi-hero-number">27,4°C</span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: 4 }}>
            Temp. Ar (Teto 32°C)
          </div>
          <div className="kpi-exact-footer">
            <span className="kpi-footer-meta" style={{ color: '#0284C7', fontWeight: 700 }}>46,2% Umidade Solo VWC</span>
            <span style={{ fontSize: '0.74rem', color: '#475569' }}>Equilíbrio hídrico sustentado</span>
          </div>
        </div>

        {/* KPI 4: Alertas do Sistema */}
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">ALERTAS DO SISTEMA</span>
            <span className="badge-pill badge-amber-exact">ATENÇÃO LEVE</span>
          </div>
          <div className="kpi-hero-number-with-sub" style={{ marginTop: 8 }}>
            <span className="kpi-hero-number">2</span>
          </div>
          <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: 4 }}>
            Necessitam revisão em campo
          </div>
          <div className="kpi-exact-footer">
            <span style={{ fontSize: '0.78rem', color: '#64748B' }}>1 Nível Alto + 1 Nível Médio</span>
            <a href="/alertas" className="kpi-link-btn">Ver central de alertas →</a>
          </div>
        </div>
      </section>

      {/* ── Gráficos de Telemetria e Monitoramento do Perfil Admin (NOVO & CORRIGIDO) ── */}
      <AdminTelemetryCharts />

      {/* ── Topologia de Sensores no Campo (Satellite Aerial Map) ── */}
      <div className="dash-white-card sensor-topology-card" style={{ marginTop: 20 }}>
        <div className="sensor-topology-header">
          <div className="sensor-topology-title-row">
            <div className="config-icon-sq icon-green">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
            </div>
            <div>
              <h2 className="card-headline-clean" style={{ fontSize: '1rem' }}>Topologia Espacial de Sensores no Campo</h2>
              <p className="card-muted-desc">Visualização georreferenciada da cobertura LoRa e dispersão das sondas</p>
            </div>
          </div>
          <div className="topology-filter-tabs">
            <button
              type="button"
              className={`tab-btn-incident ${topologyFilter === 'todos' ? 'active' : ''}`}
              onClick={() => setTopologyFilter('todos')}
            >
              Todos (24)
            </button>
            <button
              type="button"
              className={`tab-btn-incident ${topologyFilter === 'solo' ? 'active' : ''}`}
              onClick={() => setTopologyFilter('solo')}
            >
              Solo / FDR (16)
            </button>
            <button
              type="button"
              className={`tab-btn-incident ${topologyFilter === 'ar' ? 'active' : ''}`}
              onClick={() => setTopologyFilter('ar')}
            >
              Microclima / Ar (8)
            </button>
            <button
              type="button"
              className={`tab-btn-incident ${topologyFilter === 'alerta' ? 'active' : ''}`}
              onClick={() => setTopologyFilter('alerta')}
              style={{ color: '#DC2626' }}
            >
              <span className="dot-mini-red" />
              Em Alerta (2)
            </button>
          </div>
        </div>

        {/* Mapa com Imagem de Satélite Real da Fazenda */}
        <div className="sensor-map-container">
          <div
            className="sensor-map-bg"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center',
              transition: 'transform 0.3s ease',
            }}
          >
            {/* SVG Mesh Vector Lines */}
            <svg
              viewBox="0 0 1000 440"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 3,
              }}
            >
              <line x1="580" y1="189" x2="440" y2="158" stroke="#34D399" strokeWidth="1.75" strokeDasharray="4 4" strokeOpacity="0.75" />
              <line x1="580" y1="189" x2="490" y2="211" stroke="#34D399" strokeWidth="1.75" strokeDasharray="4 4" strokeOpacity="0.75" />
              <line x1="580" y1="189" x2="420" y2="198" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 4" strokeOpacity="0.85" />
              <line x1="580" y1="189" x2="720" y2="167" stroke="#38BDF8" strokeWidth="1.75" strokeDasharray="4 4" strokeOpacity="0.75" />
              <line x1="580" y1="189" x2="740" y2="198" stroke="#38BDF8" strokeWidth="1.75" strokeDasharray="4 4" strokeOpacity="0.75" />
              <line x1="580" y1="189" x2="700" y2="224" stroke="#38BDF8" strokeWidth="1.75" strokeDasharray="4 4" strokeOpacity="0.75" />
            </svg>

            {/* Central LoRa Gateway Pin */}
            <div
              className="sensor-gateway-beacon"
              style={{ top: '43%', left: '58%' }}
              title="Gateway Petrolina-04 • Concentrador US915 Ativo"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                <circle cx="12" cy="12" r="2" fill="#34D399" />
                <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
              </svg>
            </div>

            {/* Sensor Nodes on Agricultural Parcels */}
            <div className="sensor-map-overlay" style={{ zIndex: 4 }}>
              <div className="sensor-map-grid">
                {filteredNodes.map((s) => {
                  const isRed = s.type === 'alerta';
                  const isBlue = s.type === 'ar';
                  const isSelected = selectedNode?.id === s.id;

                  return (
                    <button
                      type="button"
                      key={s.id}
                      className={`sensor-node-dot ${
                        isRed ? 'sensor-node-red' : isBlue ? 'sensor-node-blue' : 'sensor-node-green'
                      }`}
                      style={{
                        top: s.top,
                        left: s.left,
                        outline: isSelected ? '3px solid #FBBF24' : 'none',
                        outlineOffset: '2px',
                      }}
                      onClick={() => setSelectedNode(s)}
                      title={`${s.label} (${s.talhao}) • ${s.vwc} • ${s.temp}`}
                    >
                      {s.id}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Compass (N) on Top-Right */}
            <div className="map-compass">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                <circle cx="15" cy="15" r="14" stroke="#CBD5E1" strokeWidth="1.5" fill="rgba(255,255,255,0.92)" />
                <polygon points="15,4 18,15 15,13 12,15" fill="#0F172A" />
                <polygon points="15,26 18,15 15,17 12,15" fill="#94A3B8" />
                <text x="15" y="8" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#0F172A">N</text>
              </svg>
            </div>

            {/* Zoom Controls (+ / -) on Bottom-Right */}
            <div className="map-zoom-controls">
              <button
                type="button"
                className="map-zoom-btn"
                onClick={handleZoomIn}
                title="Aumentar Zoom do Mapa"
              >
                +
              </button>
              <button
                type="button"
                className="map-zoom-btn"
                onClick={handleZoomOut}
                title="Diminuir Zoom do Mapa"
              >
                −
              </button>
            </div>
          </div>

          {/* Bottom Area Badge (Left) */}
          <div className="sensor-map-footer-info">
            <div className="map-area-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <circle cx="12" cy="10" r="3" />
                <path d="M12 2a8 8 0 0 0-8 8c0 5.5 8 14 8 14s8-8.5 8-14a8 8 0 0 0-8-8z" />
              </svg>
              <span>Área de cultivo</span>
              <strong>Vale do São Francisco – PE (45.0 ha)</strong>
            </div>

            {/* Node Info Popover if Selected */}
            {selectedNode && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginLeft: 10,
                  background: 'rgba(15, 23, 42, 0.88)',
                  backdropFilter: 'blur(6px)',
                  color: '#FFFFFF',
                  padding: '5px 12px',
                  borderRadius: 20,
                  fontSize: '0.76rem',
                }}
              >
                <strong>{selectedNode.label}</strong>
                <span>• {selectedNode.talhao}</span>
                <span style={{ color: '#34D399', fontWeight: 700 }}>VWC: {selectedNode.vwc}</span>
                <span style={{ color: '#38BDF8' }}>Temp: {selectedNode.temp}</span>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '0.85rem' }}
                  onClick={() => setSelectedNode(null)}
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Map Legend & Link */}
        <div className="topology-legend-footer">
          <div className="topology-legend-row">
            <span className="topo-leg-item">
              <span className="dot-mini-green" /> Sensores Ativos (22)
            </span>
            <span className="topo-leg-item">
              <span className="dot-mini-amber" /> Atenção / Limiar (2)
            </span>
            <span className="topo-leg-item" style={{ color: '#475569', fontSize: '0.75rem' }}>
              ↻ Taxa ThingSpeak: 5 min (BW 125kHz / US915)
            </span>
          </div>
          <a href="/sensores" className="btn-ver-telemetria-link">
            Ver telemetria detalhada →
          </a>
        </div>
      </div>

      {/* ── Bottom 2 Columns ── */}
      <div className="analista-bottom-grid" style={{ marginTop: 20 }}>
        {/* Auditoria de Ingestão & Leituras Rejeitadas */}
        <div className="dash-white-card">
          <div className="config-card-header" style={{ marginBottom: 14 }}>
            <div className="config-title-icon-row">
              <div className="config-icon-sq icon-teal">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Auditoria de Ingestão & Leituras Rejeitadas
                </h3>
              </div>
            </div>
            <span className="badge-pill badge-amber-exact">2 Descartadas Hoje</span>
          </div>

          <div className="audit-ingestao-list">
            <div className="audit-ing-item">
              <div className="audit-ing-header">
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569' }}>
                  Filtragem de ruídos físicos na tabela <code>leitura_rejeitada</code>
                </span>
              </div>
            </div>

            {/* Sonda 1 */}
            <div className="audit-ing-sensor-card">
              <div className="audit-ing-sensor-header">
                <span className="audit-sensor-label">Sonda Solo #SNS–SL–04</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span className="badge-pill badge-green-soft-chip">Talhão A1 • Uva Vitória</span>
                </div>
                <button type="button" className="btn-alertas-secondary" style={{ padding: '4px 10px', fontSize: '0.74rem' }}>
                  Recalibrar Offset
                </button>
              </div>
              <div className="audit-ing-reason">
                <span className="dot-mini-red" style={{ width: 6, height: 6 }} />
                <span>Motivo: Outlier térmico (temperatura_bruta = 62.4°C acima do limite físico)</span>
              </div>
              <div className="audit-ing-bar-row">
                <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Confiabilidade do algoritmo pós-descarte</span>
                <div style={{ flex: 1, height: 4, background: '#E2E8F0', borderRadius: 4, margin: '0 8px' }}>
                  <div style={{ width: '98.4%', height: '100%', background: '#10B981', borderRadius: 4 }} />
                </div>
                <strong style={{ fontSize: '0.78rem', color: '#065F46' }}>98.4%</strong>
              </div>
            </div>

            {/* Sonda 2 */}
            <div className="audit-ing-sensor-card">
              <div className="audit-ing-sensor-header">
                <span className="audit-sensor-label">Sonda FDR #SNS–SL–07</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span className="badge-pill badge-green-soft-chip">Talhão C2 • Manga Palmer</span>
                </div>
                <button type="button" className="btn-alertas-secondary" style={{ padding: '4px 10px', fontSize: '0.74rem' }}>
                  Ver Log ThingSpeak
                </button>
              </div>
              <div className="audit-ing-reason">
                <span className="dot-mini-amber" style={{ width: 6, height: 6 }} />
                <span>Motivo: Leitura analógica corrompida (umidade_bruta &lt; 0% VWC)</span>
              </div>
              <div className="audit-ing-bar-row">
                <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Progresso do reteste automático</span>
                <div style={{ flex: 1, height: 4, background: '#E2E8F0', borderRadius: 4, margin: '0 8px' }}>
                  <div style={{ width: '65%', height: '100%', background: '#0EA5E9', borderRadius: 4 }} />
                </div>
                <strong style={{ fontSize: '0.78rem', color: '#0284C7' }}>65% (48h/72h)</strong>
              </div>
            </div>

            <div style={{ fontSize: '0.74rem', color: '#64748B', marginTop: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span>Última sincronização ThingSpeak às <strong>15:42</strong></span>
              <a href="/sensores" style={{ color: '#059669', fontWeight: 600 }}>Histórico completo de descarte →</a>
            </div>
          </div>
        </div>

        {/* Modelos Preditivos & Limiares de Alerta */}
        <div className="dash-white-card">
          <div className="config-card-header" style={{ marginBottom: 14 }}>
            <div className="config-title-icon-row">
              <div className="config-icon-sq icon-teal">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Modelos Preditivos & Limiares de Alerta
                </h3>
                <p style={{ fontSize: '0.76rem', color: '#64748B', margin: 0 }}>
                  Regras automatizadas de estabilidade e previsão agronômica
                </p>
              </div>
            </div>
          </div>

          <div className="predictive-models-list">
            {/* Modelo 1: Risco de Déficit Hídrico */}
            <div className="predictive-model-card model-critical">
              <div className="model-card-header">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span className="dot-mini-amber" />
                    <strong style={{ fontSize: '0.88rem', color: '#0F172A' }}>Risco de Déficit Hídrico Severo</strong>
                  </div>
                  <span className="badge-pill badge-risk-pill">CORTE PREDITIVO: ALTO</span>
                </div>
              </div>
              <p style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.5, margin: '8px 0' }}>
                Probabilidade projetada em <strong>84%</strong> para as próximas 12 horas no Talhão A1 com base na evapotranspiração Penman-Monteith.
              </p>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: '0.78rem', color: '#65A30D' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.5 8 14 8 14s8-8.5 8-14a8 8 0 0 0-8-8z" />
                </svg>
                <span>Ação recomendada: <strong>Antecipar irrigação matinal em 40 min.</strong></span>
              </div>
            </div>

            {/* Config items */}
            <div className="predictive-config-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="config-icon-sq icon-teal" style={{ width: 28, height: 28 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A' }}>Frequência de Ingestão ThingSpeak</div>
                  <div style={{ fontSize: '0.74rem', color: '#64748B' }}>Balanço de energia solar na transmissão de pacotes</div>
                </div>
              </div>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#059669', textAlign: 'right' }}>
                A cada 5 min<br />
                <span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 500 }}>(US915)</span>
              </span>
            </div>

            <div className="predictive-config-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="config-icon-sq icon-green" style={{ width: 28, height: 28 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A' }}>Filtro de Ruído & Auto-calibração FDR</div>
                  <div style={{ fontSize: '0.74rem', color: '#64748B' }}>Compensação térmica e salinidade em ciclo de 7 dias</div>
                </div>
              </div>
              <label className="switch-toggle-label" style={{ flexShrink: 0 }}>
                <input type="checkbox" defaultChecked />
                <span className="switch-toggle-slider" />
              </label>
            </div>

            {/* Success toast */}
            <div className="audit-success-toast">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <div>
                <strong>Transição Concluída com Sucesso</strong>
                <p style={{ margin: 0, fontSize: '0.74rem', color: '#047857' }}>
                  Integridade de dados 100% sincronizada com canais ThingSpeak.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Router por Perfil com Seletor Rápido ── */
export default function DashboardPage() {
  const { user } = useAuth();
  const isAdminOrAnalista =
    user?.role === 'Admin IoT' ||
    user?.role === 'Admin' ||
    user?.role === 'Administrador' ||
    user?.role === 'Analista' ||
    user?.email?.toLowerCase()?.includes('admin') ||
    user?.email?.toLowerCase()?.includes('analista');

  const [manualRoleView, setManualRoleView] = useState(null);
  const activeRoleView = manualRoleView !== null ? manualRoleView : (isAdminOrAnalista ? 'admin' : 'gestora');

  return (
    <div>
      {/* ── Subheader Profile Tab Switcher (Apple Segmented Style) ── */}
      <div className="dash-profile-subheader-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="dot-mini-green" />
          <strong style={{ fontSize: '0.84rem', color: '#0F172A' }}>
            Visão Geral por Perfil:
          </strong>
          <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
            {activeRoleView === 'admin' || activeRoleView === 'analista'
              ? 'Painel Admin IoT & Analista (Gráficos de Telemetria, Topologia Espacial & ThingSpeak)'
              : 'Visão Gestora (Maria Clara — Balanço Agronômico & Classificação Comercial)'}
          </span>
        </div>

        <div className="apple-segmented-control">
          <button
            type="button"
            className={`apple-segmented-item ${activeRoleView === 'admin' || activeRoleView === 'analista' ? 'active' : ''}`}
            onClick={() => setManualRoleView('admin')}
          >
            ⚡ Perfil Admin IoT / Analista
          </button>
          <button
            type="button"
            className={`apple-segmented-item ${activeRoleView === 'gestora' ? 'active' : ''}`}
            onClick={() => setManualRoleView('gestora')}
          >
            👩‍🌾 Perfil Gestora (Maria Clara)
          </button>
        </div>
      </div>

      {activeRoleView === 'admin' || activeRoleView === 'analista' ? (
        <DashboardAnalista />
      ) : (
        <DashboardGestora />
      )}
    </div>
  );
}
