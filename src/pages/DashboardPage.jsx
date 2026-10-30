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

/* ── Gráficos Interativos do Perfil Admin (Modo Detalhado) ── */
function AdminTelemetryCharts() {
  const [timeframe, setTimeframe] = useState('24h');
  const [activeMetric, setActiveMetric] = useState('all');
  const [hoverIndex, setHoverIndex] = useState(null);

  const dataset = TELEMETRIA_DATA[timeframe];
  const count = dataset.labels.length;

  const width = 860;
  const height = 240;
  const paddingX = 45;
  const paddingY = 30;
  const innerW = width - paddingX * 2;
  const innerH = height - paddingY * 2;

  const getX = (index) => paddingX + (index / (count - 1)) * innerW;
  const getYPercent = (val) => paddingY + innerH - (val / 100) * innerH;
  const getYTemp = (val) => paddingY + innerH - ((val - 15) / 23) * innerH;
  const getYRSSI = (val) => paddingY + innerH - ((val - (-110)) / 50) * innerH;

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

  const areaSolo = `${pathSolo} L ${getX(count - 1)} ${paddingY + innerH} L ${getX(0)} ${paddingY + innerH} Z`;
  const activeIdx = hoverIndex !== null ? hoverIndex : count - 1;

  return (
    <div className="dash-white-card admin-charts-container" style={{ marginTop: 20 }}>
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

          <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="#E2E8F0" strokeDasharray="4 4" />
          <line x1={paddingX} y1={paddingY + innerH * 0.3} x2={width - paddingX} y2={paddingY + innerH * 0.3} stroke="#E2E8F0" strokeDasharray="3 3" />
          <line x1={paddingX} y1={paddingY + innerH * 0.65} x2={width - paddingX} y2={paddingY + innerH * 0.65} stroke="#E2E8F0" strokeDasharray="3 3" />
          <line x1={paddingX} y1={paddingY + innerH} x2={width - paddingX} y2={paddingY + innerH} stroke="#CBD5E1" strokeWidth="1.25" />

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

/* ── Visão Geral Analista e Administrador IoT (Conforme Figma e Banco de Dados) ── */
function DashboardAnalista() {
  const [viewMode, setViewMode] = useState('resumido');
  const [topologyFilter, setTopologyFilter] = useState('todos');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);
  const [toastVisible, setToastVisible] = useState(true);
  const [fdrFilterEnabled, setFdrFilterEnabled] = useState(true);

  // Nós de sensores mapeados espacialmente conforme imagem aérea de satélite
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
      {/* ── Top Header ── */}
      <TopHeader
        title="Visão Geral do Sistema"
        subtitle="Gerencie preferências da fazenda, parâmetros de sensores, notificações e acessos."
        showResumidoToggle={false}
        dateText="22 de setembro de 2026"
      />

      {/* ── Gateway / Firmware Status Bar ── */}
      <div className="gateway-status-bar" style={{ marginTop: '12px', marginBottom: '16px' }}>
        <div className="gateway-status-left" style={{ flexWrap: 'wrap' }}>
          <span className="dot-mini-green" />
          <strong className="gateway-status-name" style={{ letterSpacing: '0.3px', textTransform: 'uppercase' }}>
            GATEWAY PETROLINA-04
          </strong>
          <span className="gateway-sep">•</span>
          <span className="gateway-status-detail" style={{ letterSpacing: '0.3px', textTransform: 'uppercase' }}>
            US915 CONCENTRADOR ATIVO
          </span>
          <span className="badge-pill badge-firmware">ESP-MESH-v4.2.1-prod</span>
        </div>

        <div className="gateway-status-actions">
          {/* Toggle de Modo: Resumido / Detalhado */}
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

          {/* Botão ThingSpeak */}
          <button type="button" className="btn-sync-thingspeak" title="Sincronizar telemetria via ThingSpeak REST API">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
            </svg>
            Sincronizar Ingestão ThingSpeak
          </button>

          {/* Botão Exportar Telemetria (Dark Green #133E26) */}
          <button
            type="button"
            className="btn-export-telemetria"
            style={{
              background: '#133E26',
              borderRadius: '12px',
              padding: '6px 16px',
              fontWeight: 700,
              fontSize: '12px',
              border: 'none',
              color: '#FFFFFF',
            }}
            title="Exportar dados brutos dos sensores em formato CSV"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6EE7B7" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Exportar Telemetria
          </button>
        </div>
      </div>

      {/* ── 4 KPI Cards (Métricas Principais - Conforme Figma) ── */}
      <section className="dash-kpi-grid analista-kpi-grid">
        {/* KPI 1: Saúde da Rede Mesh */}
        <div className="dash-kpi-card" style={{ padding: '20px 20px 16px' }}>
          <div className="dash-kpi-header">
            <span className="kpi-label-text">SAÚDE DA REDE MESH</span>
            <span className="badge-pill badge-green" style={{ fontSize: '0.68rem', fontWeight: 800 }}>
              EXCELENTE
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '10px' }}>
            <span style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.9px', lineHeight: 1 }}>
              96%
            </span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>
              24 de 25 nós operacionais
            </span>
          </div>
          <div
            className="kpi-exact-footer"
            style={{
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid #F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: '12px', color: '#64748B' }}>
              Latência média: <strong style={{ color: '#1E293B' }}>124 ms</strong>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#047857', fontWeight: 700, fontSize: '12px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Mesh OK
            </span>
          </div>
        </div>

        {/* KPI 2: Sensores & Sondas */}
        <div className="dash-kpi-card" style={{ padding: '20px 20px 16px' }}>
          <div className="dash-kpi-header">
            <span className="kpi-label-text">SENSORES & SONDAS</span>
            <div
              style={{
                width: 28,
                height: 28,
                background: '#EFF6FF',
                border: '1px solid #DBEAFE',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
                <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                <circle cx="12" cy="12" r="2" />
                <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
              </svg>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '10px' }}>
            <span style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.9px', lineHeight: 1 }}>
              24
            </span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>
              unidades ativas
            </span>
          </div>
          <div
            style={{
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid #F1F5F9',
              display: 'flex',
              gap: '8px',
            }}
          >
            <span
              style={{
                background: '#ECFDF5',
                border: '1px solid rgba(167, 243, 208, 0.8)',
                color: '#065F46',
                borderRadius: '8px',
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              16 Solo (FDR)
            </span>
            <span
              style={{
                background: '#F0F9FF',
                border: '1px solid rgba(186, 230, 253, 0.8)',
                color: '#075985',
                borderRadius: '8px',
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
              }}
            >
              8 Microclima (Ar)
            </span>
          </div>
        </div>

        {/* KPI 3: Média Climática & Solo */}
        <div className="dash-kpi-card" style={{ padding: '20px 20px 16px' }}>
          <div className="dash-kpi-header">
            <span className="kpi-label-text">MÉDIA CLIMÁTICA & SOLO</span>
            <span className="badge-pill badge-green" style={{ fontSize: '0.68rem', fontWeight: 800 }}>
              FAIXA ADEQUADA
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginTop: '10px',
            }}
          >
            <div>
              <div style={{ fontSize: '30px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.75px', lineHeight: 1 }}>
                27.4°C
              </div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', marginTop: '4px' }}>
                Temp. Ar (Teto 32°C)
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#1E293B', letterSpacing: '-0.6px', lineHeight: 1 }}>
                46.2%
              </div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', marginTop: '4px' }}>
                Umidade Solo VWC
              </div>
            </div>
          </div>
          <div
            className="kpi-exact-footer"
            style={{
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid #F1F5F9',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              color: '#475569',
            }}
          >
            <svg width="12" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span>Equilíbrio hídrico e térmico sustentado</span>
          </div>
        </div>

        {/* KPI 4: Alertas do Sistema */}
        <div className="dash-kpi-card" style={{ padding: '20px 20px 16px' }}>
          <div className="dash-kpi-header">
            <span className="kpi-label-text">ALERTAS DO SISTEMA</span>
            <span
              style={{
                background: '#FFFBEB',
                border: '1px solid #FDE68A',
                color: '#B45309',
                borderRadius: '9999px',
                padding: '2px 8px',
                fontSize: '10px',
                fontWeight: 800,
                textTransform: 'uppercase',
              }}
            >
              ATENÇÃO LEVE
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '10px',
            }}
          >
            <div>
              <div style={{ fontSize: '36px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.9px', lineHeight: 1 }}>
                2
              </div>
              <div style={{ fontSize: '12px', fontWeight: 500, color: '#64748B', marginTop: '4px' }}>
                Necessitam revisão em campo
              </div>
            </div>
            <div
              style={{
                width: 36,
                height: 36,
                background: '#FFFBEB',
                border: '1px solid #FDE68A',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
          </div>
          <div
            className="kpi-exact-footer"
            style={{
              marginTop: '16px',
              paddingTop: '12px',
              borderTop: '1px solid #F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: '12px', color: '#64748B' }}>
              1 Nível Alto + 1 Nível Médio
            </span>
            <a href="/alertas" style={{ color: '#047857', fontWeight: 700, fontSize: '12px', textDecoration: 'none' }}>
              Ver central de alertas →
            </a>
          </div>
        </div>
      </section>

      {/* ── Gráficos de Telemetria (Aparece somente no modo Detalhado) ── */}
      {viewMode === 'detalhado' && <AdminTelemetryCharts />}

      {/* ── Topologia de Sensores no Campo (Satellite Aerial Map) ── */}
      <div className="dash-white-card sensor-topology-card" style={{ marginTop: 20, padding: '20px 24px' }}>
        <div className="sensor-topology-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          {/* Title Box */}
          <div className="sensor-topology-title-row" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 42,
                height: 42,
                background: '#ECFDF5',
                border: '1px solid #D1FAE5',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#133E26" strokeWidth="2">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
            </div>
            <div>
              <h2 className="card-headline-clean" style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B', margin: 0 }}>
                Topologia de Sensores no Campo
              </h2>
              <p className="card-muted-desc" style={{ fontSize: '11px', fontWeight: 500, color: '#64748B', margin: '2px 0 0' }}>
                Visualização da área de cobertura georreferenciada e dispersão dos nós
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(12px)',
              padding: '4px',
              borderRadius: '16px',
            }}
          >
            <button
              type="button"
              className={`view-toggle-btn ${topologyFilter === 'todos' ? 'active' : ''}`}
              style={{
                background: topologyFilter === 'todos' ? '#133E26' : 'transparent',
                color: topologyFilter === 'todos' ? '#FFFFFF' : '#334155',
                borderRadius: '12px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => setTopologyFilter('todos')}
            >
              Todos (24)
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${topologyFilter === 'solo' ? 'active' : ''}`}
              style={{
                background: topologyFilter === 'solo' ? '#133E26' : 'transparent',
                color: topologyFilter === 'solo' ? '#FFFFFF' : '#334155',
                borderRadius: '12px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => setTopologyFilter('solo')}
            >
              Solo / FDR (16)
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${topologyFilter === 'ar' ? 'active' : ''}`}
              style={{
                background: topologyFilter === 'ar' ? '#133E26' : 'transparent',
                color: topologyFilter === 'ar' ? '#FFFFFF' : '#334155',
                borderRadius: '12px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => setTopologyFilter('ar')}
            >
              Microclima / Ar (8)
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${topologyFilter === 'alerta' ? 'active' : ''}`}
              style={{
                background: topologyFilter === 'alerta' ? '#133E26' : 'transparent',
                color: topologyFilter === 'alerta' ? '#FFFFFF' : '#B45309',
                borderRadius: '12px',
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => setTopologyFilter('alerta')}
            >
              Em Alerta (2)
            </button>
          </div>
        </div>

        {/* Mapa com Imagem de Satélite Real da Fazenda */}
        <div className="sensor-map-container" style={{ height: 460 }}>
          <div
            className="sensor-map-bg"
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'center center',
              transition: 'transform 0.3s ease',
            }}
          >
            {/* SVG Mesh Vector Lines (Dashed verde suave ligando os nós ao gateway) */}
            <svg
              viewBox="0 0 1000 460"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 3,
              }}
            >
              <line x1="580" y1="195" x2="440" y2="165" stroke="#C0ECD9" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.7" />
              <line x1="580" y1="195" x2="490" y2="221" stroke="#C0ECD9" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.7" />
              <line x1="580" y1="195" x2="420" y2="207" stroke="#EF4444" strokeWidth="1.8" strokeDasharray="4 4" strokeOpacity="0.8" />
              <line x1="580" y1="195" x2="720" y2="175" stroke="#C0ECD9" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.7" />
              <line x1="580" y1="195" x2="740" y2="207" stroke="#C0ECD9" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.7" />
              <line x1="580" y1="195" x2="700" y2="235" stroke="#C0ECD9" strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.7" />
            </svg>

            {/* Central LoRa Gateway Pin (Torre Central no centro de operações) */}
            <div
              className="sensor-gateway-beacon"
              style={{
                top: '42.5%',
                left: '58%',
                width: 44,
                height: 44,
                background: '#15803D',
                border: '2.5px solid #FFFFFF',
                boxShadow: '0 0 18px rgba(34, 197, 94, 0.75)',
              }}
              title="Gateway Petrolina-04 • Concentrador US915 Ativo"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
                <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                <circle cx="12" cy="12" r="2" fill="#FFFFFF" />
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
                      className="sensor-node-dot"
                      style={{
                        top: s.top,
                        left: s.left,
                        width: 38,
                        height: 38,
                        background: isRed ? '#BA1A1A' : isBlue ? '#156BDE' : '#15803D',
                        border: '2px solid #FFFFFF',
                        borderRadius: '9999px',
                        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.25)',
                        position: 'absolute',
                        color: '#FFFFFF',
                        fontWeight: 800,
                        fontSize: '11px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        outline: isSelected ? '3px solid #FBBF24' : 'none',
                        outlineOffset: '2px',
                        cursor: 'pointer',
                      }}
                      onClick={() => setSelectedNode(s)}
                      title={`${s.label} (${s.talhao}) • ${s.vwc} • ${s.temp}`}
                    >
                      {s.id}
                      {/* Little indicator sub-dot */}
                      <span
                        style={{
                          position: 'absolute',
                          width: 8,
                          height: 8,
                          right: 2,
                          bottom: 2,
                          borderRadius: '9999px',
                          background: isRed ? '#F06A6A' : isBlue ? '#ADC6FF' : '#95F8A7',
                          border: '1px solid #FFFFFF',
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Compass (N) on Top-Right */}
            <div className="map-compass" style={{ top: 16, right: 16 }}>
              <svg width="34" height="34" viewBox="0 0 30 30" fill="none">
                <circle cx="15" cy="15" r="14" stroke="#CBD5E1" strokeWidth="1.5" fill="rgba(255,255,255,0.95)" />
                <polygon points="15,4 18,15 15,13 12,15" fill="#0F172A" />
                <polygon points="15,26 18,15 15,17 12,15" fill="#94A3B8" />
                <text x="15" y="8" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#0F172A">N</text>
              </svg>
            </div>

            {/* Zoom Controls (+ / -) on Bottom-Right */}
            <div className="map-zoom-controls" style={{ bottom: 20, right: 16 }}>
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
          <div className="sensor-map-footer-info" style={{ bottom: 16, left: 16 }}>
            <div
              className="map-area-badge"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                padding: '10px 16px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  background: '#ECFDF5',
                  border: '1px solid #D1FAE5',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="2">
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.5 8 14 8 14s8-8.5 8-14a8 8 0 0 0-8-8z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B' }}>Área de cultivo</span>
                <span style={{ fontSize: '11px', fontWeight: 500, color: '#64748B' }}>Vale do São Francisco – PE (45.0 ha)</span>
              </div>
            </div>

            {/* Node Info Popover if Selected */}
            {selectedNode && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginLeft: 12,
                  background: 'rgba(15, 23, 42, 0.92)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  padding: '6px 14px',
                  borderRadius: 20,
                  fontSize: '0.78rem',
                }}
              >
                <strong>{selectedNode.label}</strong>
                <span>• {selectedNode.talhao}</span>
                <span style={{ color: '#34D399', fontWeight: 700 }}>VWC: {selectedNode.vwc}</span>
                <span style={{ color: '#38BDF8' }}>Temp: {selectedNode.temp}</span>
                <button
                  type="button"
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '0.9rem' }}
                  onClick={() => setSelectedNode(null)}
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Map Legend Footer */}
        <div
          className="topology-legend-footer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 14,
            paddingTop: 12,
            borderTop: '1px solid rgba(226, 232, 240, 0.9)',
          }}
        >
          <div className="topology-legend-row" style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: '12px', color: '#475569' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 12, height: 12, background: '#10B981', borderRadius: '50%' }} /> Sensores Ativos (22)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 12, height: 12, background: '#EF4444', borderRadius: '50%' }} /> Atenção / Limiar (2)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8, borderLeft: '1px solid #E2E8F0', paddingLeft: 16, color: '#64748B' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
              </svg>
              Taxa ThingSpeak: 5 min (BW 125kHz / US915)
            </span>
          </div>

          <a
            href="/sensores"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: '#F1F5F9',
              borderRadius: '12px',
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 700,
              color: '#334155',
              textDecoration: 'none',
            }}
          >
            Ver telemetria detalhada →
          </a>
        </div>
      </div>

      {/* ── Bottom 2 Columns (Auditoria & Modelos Preditivos) ── */}
      <div className="analista-bottom-grid" style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20 }}>
        {/* Column 1: Auditoria de Ingestão & Leituras Rejeitadas (Tabela leitura_rejeitada) */}
        <div className="dash-white-card" style={{ padding: '24px', borderRadius: '24px', border: '1px solid rgba(226, 232, 240, 0.9)' }}>
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: 16,
              borderBottom: '1px solid #F1F5F9',
              marginBottom: 16,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  background: '#FFFBEB',
                  border: '1px solid rgba(253, 230, 138, 0.7)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B', margin: 0 }}>
                  Auditoria de Ingestão &amp; Leituras Rejeitadas
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                  <span style={{ fontSize: '12px', color: '#64748B' }}>Filtragem de ruídos físicos da tabela</span>
                  <span style={{ background: '#F1F5F9', padding: '1px 5px', borderRadius: 4, fontFamily: 'monospace', fontSize: '11px', color: '#64748B' }}>
                    leitura_rejeitada
                  </span>
                </div>
              </div>
            </div>

            <span
              style={{
                background: 'rgba(254, 243, 199, 0.7)',
                border: '1px solid #FDE68A',
                color: '#92400E',
                borderRadius: '9999px',
                padding: '4px 12px',
                fontSize: '11px',
                fontWeight: 700,
              }}
            >
              2 Descartadas Hoje
            </span>
          </div>

          {/* Item 1: Sonda Solo #SNS-SL-04 */}
          <div
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '16px',
              marginBottom: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <strong style={{ fontSize: '12px', color: '#0F172A', fontWeight: 700 }}>Sonda Solo #SNS-SL-04</strong>
                <span style={{ background: '#D1FAE5', color: '#065F46', padding: '2px 8px', borderRadius: 4, fontSize: '10px', fontWeight: 700 }}>
                  Talhão A1 • Uva Vitória
                </span>
              </div>
              <button
                type="button"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#334155',
                  cursor: 'pointer',
                }}
              >
                Recalibrar Offset
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '12px', color: '#DC2626', fontWeight: 600 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>Motivo: Outlier térmico (temperatura_bruta = 62.4°C acima do limite físico)</span>
            </div>

            <div style={{ marginTop: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: 4 }}>
                <span style={{ color: '#64748B', fontWeight: 500 }}>Confiabilidade do algoritmo pós-descarte</span>
                <strong style={{ color: '#334155', fontWeight: 700 }}>98.4%</strong>
              </div>
              <div style={{ width: '100%', height: 6, background: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: '98.4%', height: '100%', background: '#10B981', borderRadius: '9999px' }} />
              </div>
            </div>
          </div>

          {/* Item 2: Sonda FDR #SNS-SL-07 */}
          <div
            style={{
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <strong style={{ fontSize: '12px', color: '#0F172A', fontWeight: 700 }}>Sonda FDR #SNS-SL-07</strong>
                <span style={{ background: '#E0F2FE', color: '#075985', padding: '2px 8px', borderRadius: 4, fontSize: '10px', fontWeight: 700 }}>
                  Talhão C2 • Manga Palmer
                </span>
              </div>
              <button
                type="button"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '6px 14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#334155',
                  cursor: 'pointer',
                }}
              >
                Ver Log ThingSpeak
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '12px', color: '#B45309', fontWeight: 600 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B45309" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>Motivo: Leitura analógica corrompida (umidade_bruta &lt; 0% VWC)</span>
            </div>

            <div style={{ marginTop: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: 4 }}>
                <span style={{ color: '#64748B', fontWeight: 500 }}>Progresso do reteste automático</span>
                <strong style={{ color: '#334155', fontWeight: 700 }}>65% (48h/72h)</strong>
              </div>
              <div style={{ width: '100%', height: 6, background: '#E2E8F0', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: '65%', height: '100%', background: '#3B82F6', borderRadius: '9999px' }} />
              </div>
            </div>
          </div>

          {/* Bottom Summary */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 16,
              paddingTop: 12,
              borderTop: '1px solid #F1F5F9',
            }}
          >
            <span style={{ fontSize: '12px', color: '#64748B' }}>
              Última sincronização ThingSpeak às <strong style={{ color: '#1E293B' }}>15:42</strong>
            </span>
            <a href="/sensores" style={{ color: '#047857', fontWeight: 700, fontSize: '12px', textDecoration: 'none' }}>
              Histórico completo de descarte →
            </a>
          </div>
        </div>

        {/* Column 2: Modelos Preditivos & Limiares de Alerta (alertas_preditivos & config_parametro) */}
        <div className="dash-white-card" style={{ padding: '24px', borderRadius: '24px', border: '1px solid rgba(0, 0, 0, 0.15)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: 16,
                borderBottom: '1px solid #F1F5F9',
                marginBottom: 16,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    background: '#ECFDF5',
                    border: '1px solid rgba(167, 243, 208, 0.7)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#065F46" strokeWidth="2">
                    <line x1="4" y1="21" x2="4" y2="14" />
                    <line x1="4" y1="10" x2="4" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12" y2="3" />
                    <line x1="20" y1="21" x2="20" y2="16" />
                    <line x1="20" y1="12" x2="20" y2="3" />
                    <line x1="1" y1="14" x2="7" y2="14" />
                    <line x1="9" y1="8" x2="15" y2="8" />
                    <line x1="17" y1="16" x2="23" y2="16" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1E293B', margin: 0 }}>
                    Modelos Preditivos &amp; Limiares de Alerta
                  </h3>
                  <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0' }}>
                    Regras automatizadas de estabilidade e previsão agronômica
                  </p>
                </div>
              </div>

              {/* 3 dots icon */}
              <button
                type="button"
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
                title="Mais opções de configuração"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="1" fill="#94A3B8" />
                  <circle cx="12" cy="5" r="1" fill="#94A3B8" />
                  <circle cx="12" cy="19" r="1" fill="#94A3B8" />
                </svg>
              </button>
            </div>

            {/* Predictive Card: Risco de Déficit Hídrico Severo */}
            <div
              style={{
                background: 'rgba(255, 251, 235, 0.6)',
                border: '1px solid rgba(253, 230, 138, 0.8)',
                borderRadius: '16px',
                padding: '16px',
                marginBottom: 14,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 10, height: 10, background: '#F59E0B', borderRadius: '50%' }} />
                  <strong style={{ fontSize: '12px', color: '#0F172A', fontWeight: 700 }}>
                    Risco de Déficit Hídrico Severo
                  </strong>
                </div>
                <span
                  style={{
                    background: '#FDE68A',
                    color: '#78350F',
                    borderRadius: '4px',
                    padding: '2px 8px',
                    fontSize: '10px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                  }}
                >
                  CORTE PREDITIVO: ALTO
                </span>
              </div>

              <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.45, margin: '6px 0 8px' }}>
                Probabilidade projetada em <strong>84%</strong> para as próximas 12 horas no Talhão A1 com base na evapotranspiração Penman-Monteith.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '12px', color: '#78350F', fontWeight: 700 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2">
                  <path d="M9 18h6M10 22h4" />
                  <path d="M15 2a6 6 0 0 0-6 6c0 2 1 3 2 4v2h6v-2c1-1 2-2 2-4a6 6 0 0 0-4-6z" />
                </svg>
                <span>Ação recomendada: Antecipar irrigação matinal em 40 min.</span>
              </div>
            </div>

            {/* Parameters from config_parametro */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* Item: Frequência ThingSpeak */}
              <div
                style={{
                  background: '#F8FAFC',
                  border: '1px solid rgba(226, 232, 240, 0.8)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      background: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B' }}>
                      Frequência de Ingestão ThingSpeak
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>
                      Balanço de energia solar vs transmissão de pacotes
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    padding: '4px 10px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#334155',
                    textAlign: 'center',
                  }}
                >
                  A cada 5 min (US915)
                </div>
              </div>

              {/* Item: Auto-calibração FDR Switch */}
              <div
                style={{
                  background: '#F8FAFC',
                  border: '1px solid rgba(226, 232, 240, 0.8)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      background: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#1E293B' }}>
                      Filtro de Ruído &amp; Auto-calibração FDR
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>
                      Compensação térmica e salinidade em ciclo de 7 dias
                    </div>
                  </div>
                </div>

                {/* Interactive Toggle */}
                <button
                  type="button"
                  onClick={() => setFdrFilterEnabled(!fdrFilterEnabled)}
                  style={{
                    width: 44,
                    height: 24,
                    background: fdrFilterEnabled ? '#059669' : '#CBD5E1',
                    borderRadius: '9999px',
                    border: 'none',
                    padding: 4,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: fdrFilterEnabled ? 'flex-end' : 'flex-start',
                    boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.2s',
                  }}
                >
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      background: '#FFFFFF',
                      borderRadius: '9999px',
                      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
                    }}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Action Complete Banner (Matching the dark green confirmation banner #133E26) */}
          {toastVisible && (
            <div
              style={{
                marginTop: 14,
                background: '#133E26',
                borderRadius: '16px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0px 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    background: 'rgba(16, 185, 129, 0.3)',
                    border: '1px solid rgba(52, 211, 153, 0.4)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6EE7B7" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#D1FAE5' }}>
                    Transição Concluída com Sucesso
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(110, 231, 183, 0.8)' }}>
                    Integridade de dados 100% sincronizada com canais ThingSpeak.
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setToastVisible(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#6EE7B7',
                  cursor: 'pointer',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                }}
                title="Fechar notificação"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6EE7B7" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Footer ── */}
      <footer
        style={{
          marginTop: 28,
          marginBottom: 16,
          textAlign: 'center',
          fontSize: '11px',
          color: '#94A3B8',
        }}
      >
        Raíz - Plataforma de Inteligência Agro IoT &amp; Logística de Exportação • Conectado via LoRaWAN &amp; ESP32 • Vale do São Francisco
      </footer>
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
