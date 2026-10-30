import React, { useState } from 'react';
import TopHeader from '../components/TopHeader';
import { useAuth } from '../context/AuthContext';

/* ── Visão Geral para Gestora ── */
import DashboardGestora from './DashboardGestora';

/* ── Visão Geral Analista (Luiz Felipe) ── */
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
        title="Visão Geral do Sistema"
        subtitle="Gerencie preferências da fazenda, parâmetros de sensores, notificações e acessos."
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
            Sincronizar Ingestão ThingSpeak
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

      {/* ── 4 KPI Cards (Analista) ── */}
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
            <span style={{ fontSize: '0.74rem', color: '#475569' }}>Equilíbrio hídrico e térmico sustentado</span>
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

      {/* ── Topologia de Sensores no Campo (Satellite Aerial Map) ── */}
      <div className="dash-white-card sensor-topology-card">
        <div className="sensor-topology-header">
          <div className="sensor-topology-title-row">
            <div className="config-icon-sq icon-green">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
            </div>
            <div>
              <h2 className="card-headline-clean" style={{ fontSize: '1rem' }}>Topologia de Sensores no Campo</h2>
              <p className="card-muted-desc">Visualização da área de cobertura georreferenciada e dispersão dos nós</p>
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
            {/* SVG Mesh Vector Lines (Dashed links connecting Gateway to Nodes) */}
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
              {/* Lines from Gateway (580, 189) to nodes */}
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
      <div className="analista-bottom-grid">
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
  const isAnalistaUser = user?.role === 'Analista';
  const [manualRoleView, setManualRoleView] = useState(null);
  const activeRoleView = manualRoleView !== null ? manualRoleView : (isAnalistaUser ? 'analista' : 'gestora');

  return (
    <div>
      {/* ── Subheader Profile Tab Switcher ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 10,
          background: '#FFFFFF',
          padding: '8px 16px',
          borderRadius: 'var(--ios-radius-md)',
          border: '1.5px solid #E2E8F0',
          marginBottom: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="dot-mini-green" />
          <strong style={{ fontSize: '0.84rem', color: '#0F172A' }}>
            Visão Geral por Perfil:
          </strong>
          <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
            {activeRoleView === 'analista'
              ? 'Visão Analista IoT (Luiz Felipe — Topologia Espacial & Ingestão ThingSpeak)'
              : 'Visão Gestora (Maria Clara — Balanço Agronômico & Classificação Comercial)'}
          </span>
        </div>

        <div className="view-toggle-group">
          <button
            type="button"
            className={`view-toggle-btn ${activeRoleView === 'analista' ? 'active' : ''}`}
            onClick={() => setManualRoleView('analista')}
          >
            📡 Analista IoT (Luiz Felipe)
          </button>
          <button
            type="button"
            className={`view-toggle-btn ${activeRoleView === 'gestora' ? 'active' : ''}`}
            onClick={() => setManualRoleView('gestora')}
          >
            👩‍🌾 Gestora (Maria Clara)
          </button>
        </div>
      </div>

      {activeRoleView === 'analista' ? <DashboardAnalista /> : <DashboardGestora />}
    </div>
  );
}
