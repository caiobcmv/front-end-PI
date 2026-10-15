import React, { useState } from 'react';
import TopHeader from '../components/TopHeader';

export default function HistoricoPage() {
  const [selectedSafra, setSelectedSafra] = useState('2025/2026');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="dashboard-container historico-page-container">
      {/* ── Top Header ── */}
      <TopHeader
        title="Histórico Safra"
        subtitle="Registro histórico de colheitas, rendimento por talhão e correlação com dados agroclimáticos."
        showResumidoToggle={false}
        dateText={`Safra ${selectedSafra}`}
      />

      {/* ── Top 4 KPI Cards (matching the standard Raíz design) ── */}
      <section className="dash-kpi-grid">
        {/* KPI 1 */}
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">PRODUÇÃO TOTAL</span>
            <span className="badge-pill badge-green">+12% vs ciclo anterior</span>
          </div>
          <div className="dash-kpi-body">
            <div className="kpi-hero-number-with-sub">
              <span className="kpi-hero-number">1.480</span>
              <span className="kpi-sub-unit">ton</span>
            </div>
            <div className="kpi-icon-ring-wrap">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
          </div>
          <div className="dash-kpi-footer">
            <span className="kpi-footer-sub">Meta consolidada em 102.8%</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">PRODUTIVIDADE MÉDIA</span>
            <span className="badge-pill badge-green">Alta Eficiência</span>
          </div>
          <div className="dash-kpi-body">
            <div className="kpi-hero-number-with-sub">
              <span className="kpi-hero-number">34,2</span>
              <span className="kpi-sub-unit">ton/ha</span>
            </div>
            <div className="kpi-spark-box">
              <span className="spark-sub-text green-text">+3.2 ton/ha média</span>
            </div>
          </div>
          <div className="dash-kpi-footer">
            <span className="kpi-footer-sub">Meta estipulada: 32,0 ton/ha</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">EFICIÊNCIA HÍDRICA</span>
            <span className="badge-pill badge-green">-8.4% água</span>
          </div>
          <div className="dash-kpi-body">
            <div className="kpi-hero-number-with-sub">
              <span className="kpi-hero-number">4,1</span>
              <span className="kpi-sub-unit">m³/ton</span>
            </div>
            <div className="kpi-icon-box-peach" style={{ background: '#e0f2fe' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </div>
          </div>
          <div className="dash-kpi-footer">
            <span className="kpi-footer-sub">Manejo irrigado com déficit controlado</span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">GRAU BRIX MÉDIO</span>
            <span className="badge-pill badge-green">Exportação A+</span>
          </div>
          <div className="dash-kpi-body">
            <div className="kpi-hero-number-with-sub">
              <span className="kpi-hero-number">18,2°</span>
              <span className="kpi-sub-unit">Brix</span>
            </div>
            <div className="kpi-icon-box-peach" style={{ background: '#f3e8ff' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
          </div>
          <div className="dash-kpi-footer">
            <span className="kpi-footer-sub">100% elegível para despacho marítimo UE</span>
          </div>
        </div>
      </section>

      {/* ── Middle Section: Comparativo & Classificação ── */}
      <section className="historico-middle-grid">
        {/* Left: Comparativo de Rendimento */}
        <div className="dash-white-card card-comparativo">
          <div className="card-header-clean">
            <div>
              <h2 className="card-headline-clean">Comparativo de Rendimento entre Safras</h2>
              <p className="card-muted-desc">Evolução de produtividade e consumo hídrico nos últimos 3 ciclos</p>
            </div>
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

          <div className="comparativo-bars-container">
            {/* Cycle 1 */}
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

            {/* Cycle 2 */}
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

            {/* Cycle 3 */}
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
          <div className="card-header-clean">
            <div>
              <h2 className="card-headline-clean">Classificação da Colheita</h2>
              <p className="card-muted-desc">Distribuição qualitativa do volume colhido</p>
            </div>
          </div>

          <div className="classificacao-list">
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

          <div className="globalgap-compliance-box">
            <div className="globalgap-icon-wrap">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <div className="globalgap-text">
              <strong className="globalgap-title">GlobalG.A.P. Compliance</strong>
              <span className="globalgap-sub">Lote 100% auditado por telemetria e sem resíduos</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom Section: Desempenho por Talhão ── */}
      <section className="dash-white-card card-talhoes-table">
        <div className="card-header-clean">
          <div>
            <h2 className="card-headline-clean">Desempenho por Talhão</h2>
            <p className="card-muted-desc">Discriminação detalhada de colheita e consumo por lote monitorado</p>
          </div>
          <span className="talhoes-count-sub">Exibindo 4 de 12 talhões</span>
        </div>

        <div className="table-responsive-wrapper">
          <table className="clean-data-table">
            <thead>
              <tr>
                <th>TALHÃO</th>
                <th>CULTURA</th>
                <th>ÁREA (HA)</th>
                <th>PRODUTIVIDADE REAL</th>
                <th>CONSUMO ÁGUA</th>
                <th>BRIX MÉDIO</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Talhão A1</strong></td>
                <td>Uva Vitória</td>
                <td>12.5</td>
                <td><strong className="green-text">36.8 ton/ha</strong></td>
                <td>3.9 m³/ton</td>
                <td><strong>19.2° Brix</strong></td>
                <td><span className="badge-pill badge-green">Concluído</span></td>
              </tr>
              <tr>
                <td><strong>Talhão A2</strong></td>
                <td>Uva Crimson</td>
                <td>10.0</td>
                <td><strong className="green-text">34.5 ton/ha</strong></td>
                <td>4.1 m³/ton</td>
                <td><strong>18.5° Brix</strong></td>
                <td><span className="badge-pill badge-green">Concluído</span></td>
              </tr>
              <tr>
                <td><strong>Talhão B1</strong></td>
                <td>Uva Thompson</td>
                <td>14.0</td>
                <td><strong>31.2 ton/ha</strong></td>
                <td>4.4 m³/ton</td>
                <td><strong>17.8° Brix</strong></td>
                <td><span className="badge-pill badge-amber">Em Colheita</span></td>
              </tr>
              <tr>
                <td><strong>Talhão B2</strong></td>
                <td>Manga Palmer</td>
                <td>8.5</td>
                <td><strong className="green-text">35.0 ton/ha</strong></td>
                <td>4.0 m³/ton</td>
                <td><strong>18.0° Brix</strong></td>
                <td><span className="badge-pill badge-gray-soft">Planejado</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
