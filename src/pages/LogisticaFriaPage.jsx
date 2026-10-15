import React, { useState } from 'react';
import TopHeader from '../components/TopHeader';

/* ─── Telemetry Sparkline Chart for Reefer #04 (04:00, 08:00, 12:00, Agora) ─── */
function ReeferThermalHistoryChart() {
  return (
    <div className="reefer-sparkline-wrap">
      {/* SVG Vector Chart */}
      <svg
        className="reefer-sparkline-svg"
        viewBox="0 0 280 64"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="reeferAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Safe margin dashed reference lines */}
        <line
          x1="10"
          y1="16"
          x2="270"
          y2="16"
          stroke="#94a3b8"
          strokeWidth="0.8"
          strokeDasharray="3 3"
          opacity="0.4"
        />
        <line
          x1="10"
          y1="48"
          x2="270"
          y2="48"
          stroke="#94a3b8"
          strokeWidth="0.8"
          strokeDasharray="3 3"
          opacity="0.4"
        />

        {/* Gradient Area Fill */}
        <path
          d="M 20 38 C 60 38, 60 32, 100 32 C 140 32, 140 18, 180 18 C 220 18, 220 25, 260 25 L 260 62 L 20 62 Z"
          fill="url(#reeferAreaGrad)"
        />

        {/* Smooth Emerald Curve Line */}
        <path
          d="M 20 38 C 60 38, 60 32, 100 32 C 140 32, 140 18, 180 18 C 220 18, 220 25, 260 25"
          stroke="#10b981"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Vertex Data Dots */}
        <circle cx="20" cy="38" r="3.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.8" />
        <circle cx="100" cy="32" r="3.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.8" />
        <circle cx="180" cy="18" r="3.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.8" />
        <circle cx="260" cy="25" r="3.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.8" />
      </svg>

      {/* 4 Timestamp & Temp Labels */}
      <div className="reefer-sparkline-labels">
        <div className="spark-lbl-col">
          <span className="spark-lbl-time">04:00</span>
          <span className="spark-lbl-temp">(1.1°C)</span>
        </div>
        <div className="spark-lbl-col">
          <span className="spark-lbl-time">08:00</span>
          <span className="spark-lbl-temp">(1.2°C)</span>
        </div>
        <div className="spark-lbl-col">
          <span className="spark-lbl-time">12:00</span>
          <span className="spark-lbl-temp">(1.4°C)</span>
        </div>
        <div className="spark-lbl-col">
          <span className="spark-lbl-time">Agora</span>
          <span className="spark-lbl-temp">(1.3°C)</span>
        </div>
      </div>
    </div>
  );
}

export default function LogisticaFriaPage() {
  const [selectedLotTab, setSelectedLotTab] = useState('lote04');
  const [filterFrota, setFilterFrota] = useState('todos');

  return (
    <div className="dashboard-container logistica-screen-container">
      {/* ── Top Header ── */}
      <TopHeader
        title="Logística Fria"
        subtitle="Monitoramento de cadeia de frio, rotas marítimas e telemetria de baú em trânsito"
        showResumidoToggle={false}
        dateText="22 de setembro de 2026"
      />

      {/* ── Top 4 KPI Cards (Matching Exact Image 1) ── */}
      <section className="dash-kpi-grid">
        {/* KPI 1: CARGAS EM TRÂNSITO */}
        <div className="dash-kpi-card logistica-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">CARGAS EM TRÂNSITO</span>
            <span className="badge-pill badge-green dot-inside">
              <span className="dot-mini-green" /> Real
            </span>
          </div>
          <div className="dash-kpi-body">
            <div className="kpi-hero-number-with-sub">
              <span className="kpi-hero-number">2 cargas</span>
              <span className="kpi-sub-unit green-text" style={{ fontWeight: 700 }}>ativas</span>
            </div>
          </div>
          <div className="dash-kpi-footer">
            <span className="kpi-footer-sub">1 para Porto de Pecém, 1 para Porto de Suape</span>
          </div>
        </div>

        {/* KPI 2: CONFORMIDADE TÉRMICA */}
        <div className="dash-kpi-card logistica-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">CONFORMIDADE TÉRMICA</span>
            <span className="badge-pill badge-blue-soft">Calculado</span>
          </div>
          <div className="dash-kpi-body">
            <div className="kpi-hero-number-with-sub" style={{ alignItems: 'center', gap: '0.65rem' }}>
              <span className="kpi-hero-number">98.4%</span>
              <span className="badge-pill badge-green">Alvo Ideal</span>
            </div>
          </div>
          <div className="dash-kpi-footer">
            <span className="kpi-footer-sub">Faixa: 0.5°C a 2.0°C (Uvas) | 10°C a 12°C (Manga)</span>
          </div>
        </div>

        {/* KPI 3: TEMPO MÉDIO ATÉ PORTO */}
        <div className="dash-kpi-card logistica-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">TEMPO MÉDIO ATÉ PORTO</span>
            <span className="badge-pill badge-amber-soft">Estimado</span>
          </div>
          <div className="dash-kpi-body">
            <div className="kpi-hero-number-with-sub" style={{ justifyContent: 'space-between', width: '100%' }}>
              <span className="kpi-hero-number">14h 20m</span>
              <div className="kpi-mini-dist-text">
                <strong>790 km</strong>
                <span>rota</span>
              </div>
            </div>
          </div>
          <div className="dash-kpi-footer">
            <span className="kpi-footer-sub">Previsão sincronizada com ETA dos berços</span>
          </div>
        </div>

        {/* KPI 4: VALOR DA CARGA EM RISCO */}
        <div className="dash-kpi-card logistica-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">VALOR DA CARGA EM RISCO</span>
            <span className="badge-pill badge-amber-soft">Estimado</span>
          </div>
          <div className="dash-kpi-body">
            <div className="kpi-hero-number-with-sub" style={{ justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <span className="kpi-hero-number green-dark-text">R$ 0,00</span>
              <span className="badge-pill badge-green">Protegido</span>
            </div>
          </div>
          <div className="dash-kpi-footer">
            <span className="kpi-footer-sub">Nenhum lote fora de faixa crítica de conservação</span>
          </div>
        </div>
      </section>

      {/* ── Middle Section: Tabs + Route Simulator Box + Active Reefer Telemetry ── */}
      <section className="logistica-simulator-row">
        {/* Left Big Card: Tabs + Route Simulator */}
        <div className="dash-white-card logistica-route-main-card">
          {/* Top Lot Tabs */}
          <div className="logistica-lot-tabs-header">
            <div className="lot-tabs-pills">
              <button
                type="button"
                className={`lot-tab-pill ${selectedLotTab === 'lote04' ? 'active' : ''}`}
                onClick={() => setSelectedLotTab('lote04')}
              >
                Lote #04 - Uva Vitória (Petrolina → Pecém)
              </button>
              <button
                type="button"
                className={`lot-tab-pill ${selectedLotTab === 'lote08' ? 'active' : ''}`}
                onClick={() => setSelectedLotTab('lote08')}
              >
                Lote #08 - Manga Palmer (Suape)
              </button>
            </div>
          </div>

          {/* Current estimated position status badge */}
          <div className="route-position-pill-row">
            <span className="pos-badge-live">
              <span className="dot-mini-green" /> Posição estimada às 15:15
            </span>
            <span className="pos-badge-highway">BR-116 NORTE</span>
          </div>

          {/* Dark Simulated Route Canvas/Map */}
          <div className="route-dark-map-box">
            <div className="route-map-top-bar">
              <div className="route-map-titles">
                <strong className="route-map-title">Rota estimada</strong>
                <span className="route-map-sub">Origem, checkpoints e posição estimada</span>
              </div>
              <span className="badge-simulado">Simulado</span>
            </div>

            {/* Visual Checkpoints Node Line */}
            <div className="route-checkpoints-track">
              <div className="checkpoint-node">
                <div className="node-dot node-origem" />
                <span className="node-label">Origem</span>
              </div>

              <div className="checkpoint-line-segment filled" />

              <div className="checkpoint-node">
                <div className="node-dot node-passed" />
                <span className="node-label">Checkpoint 1</span>
              </div>

              <div className="checkpoint-line-segment filled" />

              {/* Active Current Position Node with Callout */}
              <div className="checkpoint-node active-node">
                <div className="active-callout-pill">Posição estimada</div>
                <div className="node-dot node-current">
                  <div className="pulse-ring" />
                </div>
                <span className="node-label">Checkpoint 2</span>
              </div>

              <div className="checkpoint-line-segment remaining" />

              <div className="checkpoint-node">
                <div className="node-dot node-dest" />
                <span className="node-label">Destino</span>
              </div>
            </div>
          </div>

          {/* Progress Bar under dark container */}
          <div className="route-progress-details-bar">
            <div className="prog-text-row">
              <strong className="prog-label-main">Progresso do Percurso: 62% concluído</strong>
              <span className="prog-label-sub">490 km de 790 km percorridos (Restam 300 km)</span>
            </div>
            <div className="prog-track-groove">
              <div className="prog-fill-emerald" style={{ width: '62%' }} />
            </div>
            <div className="prog-timestamps-row">
              <span>Saída: Petrolina (06:00)</span>
              <strong>Previsão Chegada no Porto (ETA): Hoje às 22:45</strong>
              <span>Pecém / CE</span>
            </div>
          </div>
        </div>

        {/* Right Card: TELEMETRIA LOTE ATIVO (Reefer #04) */}
        <div className="dash-white-card logistica-telemetry-panel-card">
          <div className="telemetry-panel-header">
            <div>
              <span className="telemetry-meta-pretitle">TELEMETRIA LOTE ATIVO</span>
              <h2 className="telemetry-main-title">Baú Frigorífico #04</h2>
            </div>
            <span className="badge-pill badge-green dot-inside">
              <span className="dot-mini-green" /> Perfeita Conservação
            </span>
          </div>

          {/* Temperatura Interna Atual */}
          <div className="telemetry-sub-metric-block">
            <div className="metric-header-line">
              <span className="metric-headline-label">Temperatura Interna Atual</span>
            </div>
            <div className="temp-hero-badge-row">
              <span className="temp-huge-num">+1.3°C</span>
              <span className="badge-pill badge-green-light-pill">
                Alvo:<br />0.5°C a 2.0°C
              </span>
              <div className="temp-thermometer-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
                </svg>
              </div>
            </div>
            <span className="temp-sensor-meta">Uva Vitória Exportação • Sonda Central e Traseira</span>
          </div>

          {/* Umidade Relativa */}
          <div className="telemetry-sub-metric-block">
            <div className="metric-header-line">
              <span className="metric-headline-label">Umidade Relativa</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2.5">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </div>
            <div className="humidity-hero-row">
              <span className="humidity-huge-num">92%</span>
            </div>
            <span className="humidity-benefit-text">Evita desidratação do engaço</span>
          </div>

          {/* Histórico Térmico (Últimas 12h) */}
          <div className="telemetry-sub-metric-block border-top-divider">
            <div className="metric-header-line">
              <span className="metric-headline-label">Histórico Térmico (Últimas 12h)</span>
              <span className="margem-segura-tag">Margem segura: 0.5°C – 2.0°C</span>
            </div>

            {/* Sparkline Canvas Chart with 04:00, 08:00, 12:00, Agora */}
            <ReeferThermalHistoryChart />
          </div>
        </div>
      </section>

      {/* ── Section: Linha do Tempo da Viagem & Controle Sanitário (4 Pontos) ── */}
      <section className="dash-white-card logistica-milestones-card">
        <div className="card-header-clean">
          <div className="milestone-title-row">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <h2 className="card-headline-clean">Linha do Tempo da Viagem & Controle Sanitário</h2>
          </div>
          <span className="badge-pill badge-green">4 Pontos de Checagem</span>
        </div>

        <div className="milestones-steps-grid">
          {/* Milestone 1 */}
          <div className="milestone-step-card">
            <div className="milestone-status-header">
              <span className="milestone-status-badge badge-realizado">REALIZADO</span>
              <span className="milestone-time">06:00</span>
            </div>
            <strong className="milestone-place-title">Packing House</strong>
            <span className="milestone-sub-info">Petrolina • Paletização & Lacre</span>
            <span className="milestone-temp-status green-text">Temp Baú: +1,0°C</span>
          </div>

          {/* Milestone 2 */}
          <div className="milestone-step-card">
            <div className="milestone-status-header">
              <span className="milestone-status-badge badge-liberado">LIBERADO</span>
              <span className="milestone-time">10:30</span>
            </div>
            <strong className="milestone-place-title">Posto Fiscal Salgueiro</strong>
            <span className="milestone-sub-info">SEFAZ + Guia Fitossanitária</span>
            <span className="milestone-temp-status green-text">Temp Baú: +1,2°C</span>
          </div>

          {/* Milestone 3: PONTO ATUAL (Highlighted) */}
          <div className="milestone-step-card current-active-step">
            <div className="milestone-status-header">
              <span className="milestone-status-badge badge-ponto-atual">
                <span className="dot-mini-green" /> PONTO ATUAL
              </span>
              <span className="milestone-time">15:15</span>
            </div>
            <strong className="milestone-place-title">Região de Jaguaribe/CE</strong>
            <span className="milestone-sub-info">Em trânsito • BR-116 Km 302</span>
            <span className="milestone-temp-status green-text">Temp Baú: +1,4°C</span>
          </div>

          {/* Milestone 4 */}
          <div className="milestone-step-card">
            <div className="milestone-status-header">
              <span className="milestone-status-badge badge-estimado">ESTIMADO</span>
              <span className="milestone-time">22:45</span>
            </div>
            <strong className="milestone-place-title">Porto do Pecém</strong>
            <span className="milestone-sub-info">Terminal Contêiner Reefer</span>
            <span className="milestone-temp-status grey-text">Plug-in pátio refrigerado</span>
          </div>
        </div>
      </section>

      {/* ── Section: Frota Refrigerada & Rastreio de Lotes em Trânsito (Exact Table) ── */}
      <section className="dash-white-card logistica-fleet-table-card">
        <div className="fleet-table-header-row">
          <div>
            <h2 className="card-headline-clean">Frota Refrigerada & Rastreio de Lotes em Trânsito</h2>
            <p className="card-muted-desc">Acompanhamento de telemetria térmica em tempo real da colheita ao porto</p>
          </div>
          <div className="fleet-filter-pills">
            <span className="fleet-filter-label">Filtrar status:</span>
            <button
              type="button"
              className={`fleet-filter-btn ${filterFrota === 'todos' ? 'active' : ''}`}
              onClick={() => setFilterFrota('todos')}
            >
              Todos (3)
            </button>
            <button
              type="button"
              className={`fleet-filter-btn ${filterFrota === 'transito' ? 'active' : ''}`}
              onClick={() => setFilterFrota('transito')}
            >
              Em Trânsito (2)
            </button>
            <button
              type="button"
              className={`fleet-filter-btn ${filterFrota === 'atencao' ? 'active' : ''}`}
              onClick={() => setFilterFrota('atencao')}
            >
              Atenção (1)
            </button>
          </div>
        </div>

        <div className="table-responsive-wrapper">
          <table className="clean-data-table logistica-table">
            <thead>
              <tr>
                <th>LOTE / CARGA</th>
                <th>VEÍCULO & CONDUTOR</th>
                <th>ORIGEM → DESTINO</th>
                <th>ETAPA / PROGRESSO</th>
                <th>TEMP. ATUAL VS ALVO</th>
                <th>PREVISÃO (ETA)</th>
                <th>STATUS DE RISCO</th>
                <th>AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1: Lote #04 */}
              <tr>
                <td>
                  <div className="table-lote-col">
                    <div className="lote-title-dot">
                      <span className="dot-mini-green" />
                      <strong>Lote #04 - Uva Vitória</strong>
                    </div>
                    <span className="table-sub-detail">22 toneladas • Paletes Termoselados</span>
                  </div>
                </td>
                <td>
                  <div className="table-driver-col">
                    <strong>Scania R450 (ABC-4F20)</strong>
                    <span className="table-sub-detail">Carlos M. • CNH 032831</span>
                  </div>
                </td>
                <td>
                  <div className="table-route-col">
                    <strong>Petrolina → Pecém (CE)</strong>
                    <span className="table-sub-detail">Via BR-116 Norte</span>
                  </div>
                </td>
                <td style={{ minWidth: '150px' }}>
                  <div className="table-prog-col">
                    <div className="table-prog-bar">
                      <div className="table-prog-fill green" style={{ width: '62%' }} />
                    </div>
                    <div className="table-prog-labels">
                      <strong>62%</strong>
                      <span>490/790 km</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="table-temp-compare-col">
                    <strong className="green-text" style={{ fontSize: '0.92rem' }}>+1.3°C</strong>
                    <span className="table-alvo-chip">Alvo: 0.5°-2.0°C</span>
                    <span className="table-desvio-sub green-text">Ideal (Desvio nulo)</span>
                  </div>
                </td>
                <td>
                  <div className="table-eta-col">
                    <strong>Hoje às 22:45</strong>
                    <span className="table-sub-detail">No horário previsto</span>
                  </div>
                </td>
                <td>
                  <span className="badge-pill badge-green">Baixo Risco</span>
                </td>
                <td>
                  <button type="button" className="btn-table-details">
                    Detalhes Telemetria
                  </button>
                </td>
              </tr>

              {/* Row 2: Lote #08 */}
              <tr>
                <td>
                  <div className="table-lote-col">
                    <div className="lote-title-dot">
                      <span className="dot-mini-teal" />
                      <strong>Lote #08 - Manga Palmer</strong>
                    </div>
                    <span className="table-sub-detail">18 toneladas • Maturação Nível 2</span>
                  </div>
                </td>
                <td>
                  <div className="table-driver-col">
                    <strong>Volvo FH 540 (KJH-8821)</strong>
                    <span className="table-sub-detail">Marcos S. • CNH 449210</span>
                  </div>
                </td>
                <td>
                  <div className="table-route-col">
                    <strong>Petrolina → Suape (PE)</strong>
                    <span className="table-sub-detail">Via BR-232 Leste</span>
                  </div>
                </td>
                <td style={{ minWidth: '150px' }}>
                  <div className="table-prog-col">
                    <div className="table-prog-bar">
                      <div className="table-prog-fill green" style={{ width: '28%' }} />
                    </div>
                    <div className="table-prog-labels">
                      <strong>28%</strong>
                      <span>210/720 km</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="table-temp-compare-col">
                    <strong className="green-text" style={{ fontSize: '0.92rem' }}>+11.2°C</strong>
                    <span className="table-alvo-chip">Alvo: 10.0°-12.0°C</span>
                    <span className="table-desvio-sub green-text">Ideal (Desvio nulo)</span>
                  </div>
                </td>
                <td>
                  <div className="table-eta-col">
                    <strong>Amanhã às 05:30</strong>
                    <span className="table-sub-detail">No horário previsto</span>
                  </div>
                </td>
                <td>
                  <span className="badge-pill badge-green">Baixo Risco</span>
                </td>
                <td>
                  <button type="button" className="btn-table-details">
                    Detalhes Telemetria
                  </button>
                </td>
              </tr>

              {/* Row 3: Lote #02 */}
              <tr>
                <td>
                  <div className="table-lote-col">
                    <div className="lote-title-dot">
                      <span className="dot-mini-amber" />
                      <strong>Lote #02 - Uva Crimson</strong>
                    </div>
                    <span className="table-sub-detail">20 toneladas • Embalagem Clamshell</span>
                  </div>
                </td>
                <td>
                  <div className="table-driver-col">
                    <strong>Mercedes Actros (PQR-3310)</strong>
                    <span className="table-sub-detail">João P. • CNH 189204</span>
                  </div>
                </td>
                <td>
                  <div className="table-route-col">
                    <strong>Petrolina → Salvador (BA)</strong>
                    <span className="table-sub-detail">Via BR-407 / BR-324</span>
                  </div>
                </td>
                <td style={{ minWidth: '150px' }}>
                  <div className="table-prog-col">
                    <div className="table-prog-bar">
                      <div className="table-prog-fill amber" style={{ width: '96%' }} />
                    </div>
                    <div className="table-prog-labels">
                      <strong>96%</strong>
                      <span>485/510 km</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="table-temp-compare-col">
                    <strong className="amber-text" style={{ fontSize: '0.92rem' }}>+1.8°C</strong>
                    <span className="table-alvo-chip" style={{ background: '#fef3c7', color: '#92400e' }}>Alvo: 0.5°-2.0°C</span>
                    <span className="table-desvio-sub amber-text">Atenção Leve (+0.3°C subindo)</span>
                  </div>
                </td>
                <td>
                  <div className="table-eta-col">
                    <strong>Hoje às 17:15</strong>
                    <span className="table-sub-detail">Chegada Iminente</span>
                  </div>
                </td>
                <td>
                  <span className="badge-pill badge-amber dot-inside">
                    <span className="dot-mini-amber" /> Atenção
                  </span>
                </td>
                <td>
                  <button type="button" className="btn-table-action-orange">
                    Ver Alerta
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer Branding Note */}
      <footer className="logistica-footer-brand-note">
        Raíz - Plataforma de Inteligência Agro IoT & Logística de Exportação • Conectado via LoRaWAN & ESP32 • Vale do São Francisco
      </footer>
    </div>
  );
}
