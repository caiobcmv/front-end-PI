import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HistoricoPage() {
  const [selectedSafra, setSelectedSafra] = useState('2025/2026');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="dashboard-container historico-page-container">
      {/* ── Top Header ── */}
      <header className="dash-top-header">
        <div className="dash-top-title-col">
          <h1 className="dash-main-heading">Histórico Safra</h1>
          <p className="dash-main-subtext">
            Registro histórico de colheitas, rendimento por talhão e correlação com dados agroclimáticos
          </p>
        </div>

        <div className="dash-top-actions">
          {/* Safra Selector Pill */}
          <div className="dash-date-pill">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Safra {selectedSafra}</span>
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
            <div className="dash-profile-avatar">MC</div>
            <div className="dash-profile-text">
              <span className="dash-profile-name">Maria Clara</span>
              <span className="dash-profile-role">Gestora Técnica</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Top 4 KPI Cards ── */}
      <section className="dash-kpi-grid historico-kpi-grid">
        {/* KPI 1: PRODUÇÃO TOTAL */}
        <div className="dash-kpi-item historico-kpi-item">
          <div className="kpi-info-col">
            <span className="kpi-meta-label">PRODUÇÃO TOTAL</span>
            <div className="kpi-main-number-unit">
              <span className="kpi-main-number">1.480</span>
              <span className="kpi-unit-txt">ton</span>
            </div>
            <span className="kpi-badge-gain">
              <span className="gain-arrow">↑</span> +12% vs ciclo anterior
            </span>
          </div>
          <div className="kpi-icon-square kpi-icon-green-sq">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
        </div>

        {/* KPI 2: PRODUTIVIDADE MÉDIA */}
        <div className="dash-kpi-item historico-kpi-item">
          <div className="kpi-info-col">
            <span className="kpi-meta-label">PRODUTIVIDADE MÉDIA</span>
            <div className="kpi-main-number-unit">
              <span className="kpi-main-number">34,2</span>
              <span className="kpi-unit-txt">ton/ha</span>
            </div>
            <span className="kpi-status-sub grey-text">Meta da safra: 32,0 ton/ha</span>
          </div>
          <div className="kpi-icon-square kpi-icon-blue-sq">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
        </div>

        {/* KPI 3: EFICIÊNCIA HÍDRICA */}
        <div className="dash-kpi-item historico-kpi-item">
          <div className="kpi-info-col">
            <span className="kpi-meta-label">EFICIÊNCIA HÍDRICA</span>
            <div className="kpi-main-number-unit">
              <span className="kpi-main-number">4,1</span>
              <span className="kpi-unit-txt">m³/ton</span>
            </div>
            <span className="kpi-status-sub green-text">-8.4% de água aplicada</span>
          </div>
          <div className="kpi-icon-square kpi-icon-cyan-sq">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2">
              <path d="M10 2v7.31L4.69 17.5A2 2 0 0 0 6.38 21h11.24a2 2 0 0 0 1.69-3.5L14 9.31V2" />
              <line x1="8" y1="2" x2="16" y2="2" />
              <line x1="6" y1="14" x2="18" y2="14" />
            </svg>
          </div>
        </div>

        {/* KPI 4: GRAU BRIX MÉDIO */}
        <div className="dash-kpi-item historico-kpi-item">
          <div className="kpi-info-col">
            <span className="kpi-meta-label">GRAU BRIX MÉDIO</span>
            <div className="kpi-main-number-unit">
              <span className="kpi-main-number">18,2°</span>
              <span className="kpi-unit-txt">Brix</span>
            </div>
            <span className="kpi-status-sub purple-text">Padrão Exportação A+</span>
          </div>
          <div className="kpi-icon-square kpi-icon-purple-sq">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
        </div>
      </section>

      {/* ── Middle Section: Comparativo de Rendimento + Classificação da Colheita ── */}
      <section className="historico-middle-grid">
        {/* Left: Comparativo de Rendimento entre Safras */}
        <div className="dash-white-card card-comparativo">
          <div className="card-header-row">
            <div>
              <h2 className="card-headline">Comparativo de Rendimento entre Safras</h2>
              <p className="card-subtext">Evolução de produtividade e consumo hídrico nos últimos 3 ciclos</p>
            </div>
            {/* Chart Legend */}
            <div className="comparativo-legend">
              <div className="c-legend-item">
                <span className="c-leg-sq sq-green" />
                <span>Produtividade (ton/ha)</span>
              </div>
              <div className="c-legend-item">
                <span className="c-leg-sq sq-blue" />
                <span>Volume Hídrico (m³/ha)</span>
              </div>
            </div>
          </div>

          {/* 3 Cycle Rows */}
          <div className="comparativo-bars-container">
            {/* Cycle 1: 2023/2024 */}
            <div className="c-cycle-row">
              <div className="c-cycle-header">
                <span className="c-cycle-title">Safra 2023/2024 (Ciclo Anterior)</span>
                <span className="c-cycle-metric">28,4 ton/ha • 182 m³/ha</span>
              </div>
              <div className="c-stacked-bar-track">
                <div className="c-bar-segment seg-green" style={{ width: '58%' }} />
                <div className="c-bar-segment seg-blue" style={{ width: '18%' }} />
              </div>
            </div>

            {/* Cycle 2: 2024/2025 */}
            <div className="c-cycle-row">
              <div className="c-cycle-header">
                <span className="c-cycle-title">Safra 2024/2025 (Ciclo Base)</span>
                <span className="c-cycle-metric">30,5 ton/ha • 168 m³/ha</span>
              </div>
              <div className="c-stacked-bar-track">
                <div className="c-bar-segment seg-green" style={{ width: '64%' }} />
                <div className="c-bar-segment seg-blue" style={{ width: '16%' }} />
              </div>
            </div>

            {/* Cycle 3: 2025/2026 (Atual) */}
            <div className="c-cycle-row active-cycle">
              <div className="c-cycle-header">
                <div className="c-cycle-title-with-badge">
                  <span className="c-cycle-title">Safra 2025/2026 (Atual)</span>
                  <span className="badge-pill badge-green">Atual</span>
                </div>
                <strong className="c-cycle-metric-bold">34,2 ton/ha • 140 m³/ha</strong>
              </div>
              <div className="c-stacked-bar-track">
                <div className="c-bar-segment seg-green-dark" style={{ width: '74%' }} />
                <div className="c-bar-segment seg-blue-dark" style={{ width: '12%' }} />
              </div>
            </div>
          </div>

          {/* 3 Metric Sub-Cards */}
          <div className="comparativo-submetrics-row">
            <div className="c-metric-box">
              <span className="c-metric-lbl">Ganho de Eficiência</span>
              <strong className="c-metric-val val-green">+19.8%</strong>
            </div>
            <div className="c-metric-box">
              <span className="c-metric-lbl">Economia Hídrica</span>
              <strong className="c-metric-val val-blue">42 m³/ha</strong>
            </div>
            <div className="c-metric-box">
              <span className="c-metric-lbl">Índice Qualidade</span>
              <strong className="c-metric-val val-purple">94.2 / 100</strong>
            </div>
          </div>
        </div>

        {/* Right: Classificação da Colheita */}
        <div className="dash-white-card card-classificacao">
          <div className="card-header-row">
            <div>
              <h2 className="card-headline">Classificação da Colheita</h2>
              <p className="card-subtext">Distribuição qualitativa do volume colhido</p>
            </div>
          </div>

          <div className="classificacao-list">
            {/* Cat 1: Exportação */}
            <div className="classif-item">
              <div className="classif-top-line">
                <div className="classif-title-dot">
                  <span className="dot-mini-green" />
                  <strong>Exportação (Europa / EUA)</strong>
                </div>
                <strong className="classif-pct val-green">65%</strong>
              </div>
              <div className="classif-track">
                <div className="classif-fill fill-green" style={{ width: '65%' }} />
              </div>
              <span className="classif-sub">962 ton • Brix &gt; 18° • Calibre Extra</span>
            </div>

            {/* Cat 2: Mercado Interno */}
            <div className="classif-item">
              <div className="classif-top-line">
                <div className="classif-title-dot">
                  <span className="dot-mini-blue" />
                  <strong>Mercado Interno (Ceasas/Redes)</strong>
                </div>
                <strong className="classif-pct val-blue">25%</strong>
              </div>
              <div className="classif-track">
                <div className="classif-fill fill-blue" style={{ width: '25%' }} />
              </div>
              <span className="classif-sub">370 ton • Brix 15-17.9° • Padrão A</span>
            </div>

            {/* Cat 3: Processamento */}
            <div className="classif-item">
              <div className="classif-top-line">
                <div className="classif-title-dot">
                  <span className="dot-mini-amber" />
                  <strong>Processamento (Sucos/Derivados)</strong>
                </div>
                <strong className="classif-pct val-amber">10%</strong>
              </div>
              <div className="classif-track">
                <div className="classif-fill fill-amber" style={{ width: '10%' }} />
              </div>
              <span className="classif-sub">148 ton • Alta doçura, descarte de calibre</span>
            </div>
          </div>

          {/* Compliance GlobalG.A.P. */}
          <div className="globalgap-compliance-box">
            <div className="globalgap-icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <div className="globalgap-text">
              <strong className="globalgap-title">GlobalG.A.P. Compliance</strong>
              <span className="globalgap-sub">Lote 100% auditado por telemetria</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom Section: Desempenho por Talhão + Correlação IoT ── */}
      <section className="historico-bottom-grid">
        {/* Left: Desempenho por Talhão (Table) */}
        <div className="dash-white-card card-talhoes-table">
          <div className="card-header-row">
            <div>
              <h2 className="card-headline">Desempenho por Talhão</h2>
              <p className="card-subtext">Discriminação detalhada de colheita e consumo por lote monitorado</p>
            </div>
            <span className="talhoes-count-sub">Exibindo 4 de 12 talhões</span>
          </div>

          {/* Table */}
          <div className="table-wrapper">
            <table className="talhoes-data-table">
              <thead>
                <tr>
                  <th>TALHÃO</th>
                  <th>CULTURA</th>
                  <th>ÁREA (HA)</th>
                  <th>PRODUTIVIDADE REAL</th>
                  <th>CONSUMO ÁGUA</th>
                  <th>BRIX</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 */}
                <tr>
                  <td>
                    <div className="talhao-name-cell">
                      <span className="dot-mini-green" />
                      <div>
                        <strong>Talhão</strong>
                        <div>A1</div>
                      </div>
                    </div>
                  </td>
                  <td>Uva Vitória</td>
                  <td>12.5</td>
                  <td><strong className="val-green">36.8 ton/ha</strong></td>
                  <td>3.9 m³/ton</td>
                  <td><strong>19.2°</strong></td>
                  <td><span className="badge-pill badge-green">Concluído</span></td>
                </tr>

                {/* Row 2 */}
                <tr>
                  <td>
                    <div className="talhao-name-cell">
                      <span className="dot-mini-green" />
                      <div>
                        <strong>Talhão</strong>
                        <div>A2</div>
                      </div>
                    </div>
                  </td>
                  <td>Uva Crimson</td>
                  <td>10.0</td>
                  <td><strong className="val-green">34.5 ton/ha</strong></td>
                  <td>4.1 m³/ton</td>
                  <td><strong>18.5°</strong></td>
                  <td><span className="badge-pill badge-green">Concluído</span></td>
                </tr>

                {/* Row 3 */}
                <tr>
                  <td>
                    <div className="talhao-name-cell">
                      <span className="dot-mini-amber" />
                      <div>
                        <strong>Talhão</strong>
                        <div>B1</div>
                      </div>
                    </div>
                  </td>
                  <td>Uva Thompson</td>
                  <td>14.0</td>
                  <td><strong>31.2 ton/ha</strong></td>
                  <td>4.4 m³/ton</td>
                  <td><strong>17.8°</strong></td>
                  <td><span className="badge-pill badge-amber">Em Colheita</span></td>
                </tr>

                {/* Row 4 */}
                <tr>
                  <td>
                    <div className="talhao-name-cell">
                      <span className="dot-mini-blue" />
                      <div>
                        <strong>Talhão</strong>
                        <div>B2</div>
                      </div>
                    </div>
                  </td>
                  <td>Uva Autumn Crisp</td>
                  <td>8.5</td>
                  <td><strong className="val-green">35.0 ton/ha</strong></td>
                  <td>4.0 m³/ton</td>
                  <td><strong>18.0°</strong></td>
                  <td><span className="badge-pill badge-blue-soft">Planejado</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="table-footer-row">
            <span className="table-total-txt">Total de 45.0 hectares monitorados</span>
            <div className="pagination-group">
              <button type="button" className="btn-page">Anterior</button>
              <button
                type="button"
                className={`btn-page ${currentPage === 1 ? 'page-active' : ''}`}
                onClick={() => setCurrentPage(1)}
              >
                1
              </button>
              <button
                type="button"
                className={`btn-page ${currentPage === 2 ? 'page-active' : ''}`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
              <button
                type="button"
                className={`btn-page ${currentPage === 3 ? 'page-active' : ''}`}
                onClick={() => setCurrentPage(3)}
              >
                3
              </button>
              <button type="button" className="btn-page">Próximo</button>
            </div>
          </div>
        </div>

        {/* Right: Correlação IoT */}
        <div className="dash-white-card card-correlacao">
          <div className="card-header-row">
            <div>
              <h2 className="card-headline">Correlação IoT</h2>
              <p className="card-subtext">Impacto das variáveis microclimáticas na produtividade aferida</p>
            </div>
            <span className="badge-pill badge-grey">ESP-NOW Mesh</span>
          </div>

          <div className="correlacao-cards-stack">
            {/* Insight 1: Umidade do Solo */}
            <div className="correlacao-insight-box">
              <div className="insight-top-line">
                <div className="insight-icon-title">
                  <div className="insight-icon-sq icon-blue">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="#0284c7">
                      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    </svg>
                  </div>
                  <div>
                    <strong className="insight-title">Umidade do Solo</strong>
                    <div className="insight-sub-vwc">(VWC)</div>
                  </div>
                </div>
                <span className="badge-pill badge-green">+14% brix</span>
              </div>
              <p className="insight-paragraph">
                Manutenção controlada da umidade em 28-32% no estágio de maturação induziu maior concentração de açúcares sem rachadura de bagas.
              </p>
            </div>

            {/* Insight 2: Molhamento Foliar */}
            <div className="correlacao-insight-box">
              <div className="insight-top-line">
                <div className="insight-icon-title">
                  <div className="insight-icon-sq icon-green">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5" />
                      <path d="M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <strong className="insight-title">Molhamento Foliar & Míldio</strong>
                </div>
                <span className="badge-pill badge-green">-92% perdas</span>
              </div>
              <p className="insight-paragraph">
                Alertas precoces de condensação noturna viabilizaram pulverizações pontuais, preservando 100% dos cachos no Talhão A1.
              </p>
            </div>
          </div>

          {/* Bottom link */}
          <Link to="/sensores" className="btn-link-telemetria">
            <span>Acessar série temporal completa de telemetria</span>
            <span>&gt;</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
