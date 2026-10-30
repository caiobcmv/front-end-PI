import React, { useState } from 'react';
import TopHeader from '../components/TopHeader';
import { useAuth } from '../context/AuthContext';

export default function HistoricoPage() {
  const { user } = useAuth();
  const isAnalista = user?.role === 'Analista';

  const [activeTalhaoTab, setActiveTalhaoTab] = useState('todos');

  return (
    <div className="dashboard-container historico-page-container">
      {/* ── Top Header ── */}
      <TopHeader
        title={isAnalista ? 'Histórico Safra & Correlação' : 'Histórico Safra'}
        subtitle="Registro histórico de colheitas, rendimento por talhão e correlação com dados agroclimáticos"
        showResumidoToggle={false}
        dateText={isAnalista ? '22 de setembro de 2026' : 'Safra 2025/2026'}
      />

      {/* ── Subheader Sync Bar (Analista) ── */}
      {isAnalista && (
        <div className="gateway-status-bar" style={{ marginTop: '-6px' }}>
          <div className="gateway-status-left" style={{ flexWrap: 'wrap' }}>
            <span className="dot-mini-green" />
            <strong style={{ fontSize: '0.84rem', color: '#0F172A' }}>
              Safra 2025/2026 Ativa • Petrolina (45.0 ha)
            </strong>
            <span className="gateway-sep">•</span>
            <span style={{ fontSize: '0.82rem', color: '#475569' }}>
              Variedades: Uva Vitória, Crimson, Thompson • 4 Talhões Homologados
            </span>
            <span className="gateway-sep">•</span>
            <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
              ↻ Sincronizado há 2 min
            </span>
          </div>
          <div className="gateway-status-actions">
            <button type="button" className="btn-sync-thingspeak">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
              </svg>
              Sincronizar ThingSpeak
            </button>
            <button type="button" className="btn-export-telemetria">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Exportar Histórico (CSV/PDF)
            </button>
          </div>
        </div>
      )}

      {/* ── Top 4 KPI Cards ── */}
      <section className="dash-kpi-grid historico-kpi-grid-exact">
        {/* KPI 1: PRODUÇÃO TOTAL */}
        <div className="dash-kpi-card kpi-card-exact">
          <div className="kpi-header-exact">
            <span className="kpi-label-text">
              {isAnalista ? 'PRODUÇÃO TOTAL DA SAFRA' : 'PRODUÇÃO TOTAL'}
            </span>
            {isAnalista ? (
              <span className="badge-pill badge-green" style={{ fontSize: '0.68rem', fontWeight: 800 }}>
                META ATINGIDA
              </span>
            ) : (
              <div className="kpi-icon-pill icon-teal-pill">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
              </div>
            )}
          </div>
          <div className="kpi-hero-number-with-sub">
            <span className="kpi-hero-number">1.480</span>
            <span className="kpi-sub-unit">ton</span>
          </div>
          <div className="kpi-exact-footer" style={{ marginTop: 12 }}>
            <span className="green-text-bold">
              {isAnalista ? '+11.8% vs ciclo anterior' : '↑ +12% vs ciclo anterior'}
            </span>
            <span className="kpi-footer-meta">
              {isAnalista ? '32.9 ton/ha médio' : '1.480 / 1.600 ton'}
            </span>
          </div>
        </div>

        {/* KPI 2: EFICIÊNCIA HÍDRICA */}
        <div className="dash-kpi-card kpi-card-exact">
          <div className="kpi-header-exact">
            <span className="kpi-label-text">
              {isAnalista ? 'EFICIÊNCIA HÍDRICA (ETA)' : 'PRODUTIVIDADE MÉDIA'}
            </span>
            {isAnalista ? (
              <span className="badge-pill badge-green-soft-chip" style={{ fontSize: '0.68rem', fontWeight: 800 }}>
                OTIMIZADO
              </span>
            ) : (
              <div className="kpi-icon-pill icon-green-pill">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </div>
            )}
          </div>
          <div className="kpi-hero-number-with-sub">
            <span className="kpi-hero-number">{isAnalista ? '4,1' : '34,2'}</span>
            <span className="kpi-sub-unit">{isAnalista ? 'm³/ton' : 'ton/ha'}</span>
          </div>
          <div className="kpi-exact-footer" style={{ marginTop: 12 }}>
            <span className="green-text-bold">
              {isAnalista ? 'Umidade solo (FDR): 58% VWC' : '+2,2 ton/ha acima da meta'}
            </span>
            <span className="kpi-footer-meta">
              {isAnalista ? 'Manejo Sustentável' : 'Meta: 32,0'}
            </span>
          </div>
        </div>

        {/* KPI 3: GRAU BRIX MÉDIO & CALIBRE */}
        <div className="dash-kpi-card kpi-card-exact">
          <div className="kpi-header-exact">
            <span className="kpi-label-text">
              {isAnalista ? 'GRAU BRIX MÉDIO & CALIBRE' : 'EFICIÊNCIA HÍDRICA'}
            </span>
            {isAnalista ? (
              <span className="badge-pill badge-green" style={{ fontSize: '0.68rem', fontWeight: 800 }}>
                EXPORTAÇÃO A+
              </span>
            ) : (
              <div className="kpi-icon-pill icon-blue-pill">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
            )}
          </div>
          <div className="kpi-hero-number-with-sub">
            <span className="kpi-hero-number">{isAnalista ? '18,2°' : '4,1'}</span>
            <span className="kpi-sub-unit">{isAnalista ? 'Brix' : 'm³/ton'}</span>
          </div>
          <div className="kpi-exact-footer" style={{ marginTop: 12 }}>
            <span className="kpi-footer-meta">
              {isAnalista ? 'Calibre médio: 22mm' : 'Alta Eficiência'}
            </span>
            <span className="green-text-bold">
              {isAnalista ? '100% Frutas Comercial' : '-42 m³/ha vs 23/24'}
            </span>
          </div>
        </div>

        {/* KPI 4: AUDITORIA DE DADOS (Analista) ou GRAU BRIX (Gestora) */}
        <div className="dash-kpi-card kpi-card-exact">
          <div className="kpi-header-exact">
            <span className="kpi-label-text">
              {isAnalista ? 'AUDITORIA DE DADOS & SONDAS' : 'GRAU BRIX MÉDIO'}
            </span>
            {isAnalista ? (
              <span className="badge-pill badge-amber-exact" style={{ fontSize: '0.68rem', fontWeight: 800 }}>
                99.8% ÍNTEGRO
              </span>
            ) : (
              <div className="kpi-icon-pill icon-rosette-pill">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
            )}
          </div>
          <div className="kpi-hero-number-with-sub">
            <span className="kpi-hero-number">{isAnalista ? '99.8%' : '18,2°'}</span>
            <span className="kpi-sub-unit">{isAnalista ? 'Taxa de Integridade' : 'Brix'}</span>
          </div>
          <div className="kpi-exact-footer" style={{ marginTop: 12 }}>
            <span className="kpi-footer-meta">
              {isAnalista ? '24 Sensores homologados' : '14° Mesa • 16° Premium'}
            </span>
            <span className="green-text-bold">
              {isAnalista ? '2 descartes saneados hoje' : '18.2° Atual'}
            </span>
          </div>
        </div>
      </section>

      {/* ── Comparativo Visual de Rendimento entre Safras ── */}
      <section className="dash-white-card card-comparativo" style={{ marginTop: 16 }}>
        <div className="card-header-clean">
          <div>
            <div className="card-title-with-dot">
              <span className="dot-dark-green" />
              <h2 className="card-headline-clean">
                {isAnalista
                  ? 'Comparativo de Rendimento & Eficiência Hídrica entre Safras'
                  : 'Comparativo Visual de Rendimento entre Safras'}
              </h2>
            </div>
            {isAnalista && (
              <p className="card-muted-desc" style={{ marginTop: 2 }}>
                Evolução Multiciclo (23/24 - 25/26) • Climatologia Média do Vale do São Francisco
              </p>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {isAnalista && (
              <div className="view-toggle-group">
                {['todos', 'vitoria', 'thompson', 'crimson'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`view-toggle-btn ${activeTalhaoTab === t ? 'active' : ''}`}
                    onClick={() => setActiveTalhaoTab(t)}
                  >
                    {t === 'todos' ? 'Todos os Talhões' : t === 'vitoria' ? 'Uva Vitória' : t === 'thompson' ? 'Thompson' : 'Crimson'}
                  </button>
                ))}
              </div>
            )}
            <div className="comparativo-legend">
              <div className="c-legend-item">
                <span className="c-leg-circle bg-emerald" />
                <span>Produtividade (ton/ha)</span>
              </div>
              <div className="c-legend-item">
                <span className="c-leg-circle bg-cyan" />
                <span>Consumo Água (m³/ha)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="comparativo-bars-stack">
          {/* Cycle 1: 2023/2024 */}
          <div className="cycle-item-block">
            <div className="cycle-item-header">
              <span className="cycle-year-title">Safra 2023/2024</span>
              <span className="cycle-metric-txt">28,4 ton/ha • 182 m³/ha</span>
            </div>
            <div className="cycle-bars-pair">
              <div className="cycle-single-bar bar-green-light" style={{ width: '58%' }}>
                <span className="bar-inner-label">Produtividade</span>
                <span className="bar-inner-val">28,4 ton/ha</span>
              </div>
              <div className="cycle-single-bar bar-blue-light" style={{ width: '68%' }}>
                <span className="bar-inner-label">Consumo Hídrico</span>
                <span className="bar-inner-val">182 m³/ha</span>
              </div>
            </div>
          </div>

          {/* Cycle 2: 2024/2025 */}
          <div className="cycle-item-block">
            <div className="cycle-item-header">
              <span className="cycle-year-title">Safra 2024/2025</span>
              <span className="cycle-metric-txt">30,5 ton/ha • 168 m³/ha</span>
            </div>
            <div className="cycle-bars-pair">
              <div className="cycle-single-bar bar-green-light" style={{ width: '64%' }}>
                <span className="bar-inner-label">Produtividade</span>
                <span className="bar-inner-val">30,5 ton/ha</span>
              </div>
              <div className="cycle-single-bar bar-blue-light" style={{ width: '61%' }}>
                <span className="bar-inner-label">Consumo Hídrico</span>
                <span className="bar-inner-val">168 m³/ha</span>
              </div>
            </div>
          </div>

          {/* Cycle 3: 2025/2026 (Ativo) */}
          <div className="cycle-item-block">
            <div className="cycle-item-header">
              <div className="cycle-year-title">
                <strong>Safra 2025/2026 (Atual)</strong>
                <span className="badge-ciclo-ativo">CICLO ATIVO</span>
              </div>
              <span className="cycle-metric-txt" style={{ color: '#0F172A', fontWeight: 800 }}>
                34,2 ton/ha • 140 m³/ha
              </span>
            </div>
            <div className="cycle-bars-pair">
              <div className="cycle-single-bar bar-green-hero" style={{ width: '74%' }}>
                <span className="bar-inner-label">↑ Produtividade</span>
                <span className="bar-inner-val">34,2 ton/ha (+12.1%)</span>
              </div>
              <div className="cycle-single-bar bar-blue-hero" style={{ width: '51%' }}>
                <span className="bar-inner-label">↓ Consumo Reduzido</span>
                <span className="bar-inner-val">140 m³/ha (-16.7%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Bottom Highlights */}
        <div className="comparativo-bottom-highlights">
          <div className="c-highlight-box">
            <div className="c-hl-icon-val">
              <span style={{ fontSize: '1.2rem', color: '#10b981' }}>🌱</span>
              <div>
                <strong className="c-hl-val">+19.8%</strong>
                <span className="c-hl-tag"> Eficiência</span>
              </div>
            </div>
            <span className="c-hl-label">
              {isAnalista ? 'Produtividade x Adubo' : 'PRODUTIVIDADE X INSUMO'}
            </span>
          </div>

          <div className="c-highlight-box">
            <div className="c-hl-icon-val">
              <span style={{ fontSize: '1.2rem', color: '#0284c7' }}>💧</span>
              <div>
                <strong className="c-hl-val">42 m³/ha</strong>
                <span className="c-hl-tag"> Poupados</span>
              </div>
            </div>
            <span className="c-hl-label">
              {isAnalista ? 'Gestão solar FDR' : 'GESTÃO IOT LORA'}
            </span>
          </div>

          <div className="c-highlight-box">
            <div className="c-hl-icon-val">
              <span style={{ fontSize: '1.2rem', color: '#059669' }}>🏆</span>
              <div>
                <strong className="c-hl-val">94.2 / 100</strong>
              </div>
            </div>
            <span className="c-hl-label">
              {isAnalista ? 'Índice Fisiológico Superior' : 'ÍNDICE QUALIDADE'}
            </span>
          </div>
        </div>
      </section>

      {/* ── Correlação Fenológica (Analista) ── */}
      {isAnalista && (
        <section className="dash-white-card" style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
            <div>
              <div className="card-title-with-dot">
                <span className="dot-dark-green" />
                <h3 className="card-headline-clean" style={{ fontSize: '1.05rem' }}>
                  Correlação Fenológica: Umidade de Solo (VWC) vs. Acúmulo de Brix
                </h3>
              </div>
              <p className="card-muted-desc">
                Curva contínua de monitoramento com sondas capacitivas FDR ao longo do ciclo de maturação
              </p>
            </div>
            <span className="badge-pill badge-green-light-pill">Pivot FDR 30/60 Ativo</span>
          </div>

          {/* Fenological Chart */}
          <div style={{ width: '100%', height: 160, background: '#F8FAFC', borderRadius: 8, padding: '12px 16px', position: 'relative' }}>
            <svg viewBox="0 0 700 130" style={{ width: '100%', height: '100%' }} preserveAspectRatio="none">
              <defs>
                <linearGradient id="phenoFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Curve: Brix accumulation (green ascending) */}
              <path
                d="M 30 100 Q 200 95 380 65 T 670 30"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
              />

              {/* Curve: Soil Moisture VWC (blue slightly descending) */}
              <path
                d="M 30 40 Q 220 50 420 65 T 670 70 L 670 120 L 30 120 Z"
                fill="url(#phenoFill)"
              />
              <path
                d="M 30 40 Q 220 50 420 65 T 670 70"
                fill="none"
                stroke="#0284c7"
                strokeWidth="2"
              />

              {/* Milestones */}
              <text x="30" y="125" fill="#64748B" fontSize="9">Início Maturação (Semana 1)</text>
              <text x="240" y="125" fill="#64748B" fontSize="9">Enveramento / Pinta (Semana 4)</text>
              <text x="470" y="125" fill="#64748B" fontSize="9">Acúmulo Máximo (Semana 6)</text>
              <text x="630" y="125" fill="#64748B" fontSize="9">Colheita Homologada (Semana 8)</text>
            </svg>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 12 }}>
            <div className="c-highlight-box">
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0F172A' }}>28% - 32% VWC</span>
              <span style={{ fontSize: '0.74rem', color: '#64748B' }}>FAIXA DE MATURAÇÃO (Teor medido 10-30h)</span>
            </div>
            <div className="c-highlight-box">
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#059669' }}>+14% Brix</span>
              <span style={{ fontSize: '0.74rem', color: '#64748B' }}>ACÚMULO DE SÓLIDOS (Sem desidratar engaço)</span>
            </div>
            <div className="c-highlight-box">
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0369A1' }}>0% Baixo Risco</span>
              <span style={{ fontSize: '0.74rem', color: '#64748B' }}>RISCO MÍLDIO (Sensor sem molhamento)</span>
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom Section: Destino da Produção & Desempenho por Talhão ── */}
      <section className="historico-bottom-grid" style={{ marginTop: 16 }}>
        {/* Left: Destino da Produção & Conformidade */}
        <div className="dash-white-card card-classificacao">
          <div className="card-header-clean">
            <div className="card-title-with-dot">
              <span className="dot-dark-green" />
              <h2 className="card-headline-clean">
                {isAnalista ? 'Destino da Produção & Conformidade' : 'Classificação Comercial'}
              </h2>
            </div>
            <span className="badge-pill badge-green-soft-chip">Volume Total</span>
          </div>

          {/* SVG Donut */}
          <div className="donut-chart-svg-wrap">
            <svg viewBox="0 0 36 36" className="donut-chart-svg">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="3.8"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#10B981"
                strokeWidth="3.8"
                strokeDasharray="65, 100"
                strokeLinecap="round"
              />
            </svg>
            <div className="donut-inner-txt">
              <span className="donut-hero-pct">65%</span>
              <span className="donut-sub-cat">EXPORTAÇÃO</span>
            </div>
          </div>

          <div className="classificacao-legend-list">
            <div className="classif-legend-item">
              <div className="classif-item-left">
                <span className="dot-green-light" />
                <span>Exportação (Europa/EUA)</span>
              </div>
              <strong className="classif-item-right">65% (962 ton)</strong>
            </div>

            <div className="classif-legend-item">
              <div className="classif-item-left">
                <span className="dot-blue-light" />
                <span>Mercado Interno</span>
              </div>
              <strong className="classif-item-right">25% (370 ton)</strong>
            </div>

            <div className="classif-legend-item">
              <div className="classif-item-left">
                <span className="dot-gray-dark" />
                <span>Processamento / Sucos</span>
              </div>
              <strong className="classif-item-right">10% (148 ton)</strong>
            </div>
          </div>

          {/* GlobalG.A.P. Compliance Box */}
          <div className="globalgap-compliance-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
              <div>
                <strong className="globalgap-title">GlobalG.A.P. Compliance</strong>
                <span className="globalgap-sub">Auditado LoRaWAN contínuo</span>
              </div>
            </div>
            <span className="badge-ok-dark">100% OK</span>
          </div>
        </div>

        {/* Right: Desempenho por Talhão & Lote */}
        <div className="dash-white-card">
          <div className="card-header-clean">
            <div className="card-title-with-dot">
              <span className="dot-dark-green" />
              <h2 className="card-headline-clean">
                {isAnalista ? 'Desempenho por Talhão & Lote' : 'Desempenho por Talhão'}
              </h2>
            </div>
            <span className="badge-pill badge-green-light-pill">4 talhões monitorados</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
            {[
              { id: 'Talhão A1', fruta: 'Uva Vitória', area: '12.5 ha', prod: '36.8 ton/ha', brix: '18.2°', status: 'Concluído' },
              { id: 'Talhão A2', fruta: 'Uva Crimson', area: '10.0 ha', prod: '34.5 ton/ha', brix: '18.5°', status: 'Concluído' },
              { id: 'Talhão B1', fruta: 'Uva Thompson', area: '14.0 ha', prod: '31.2 ton/ha', brix: '17.8°', status: 'Em Colheita' },
              { id: 'Talhão B2', fruta: 'Uva Autumn Crisp', area: '8.5 ha', prod: '35.0 ton/ha', brix: '18.0°', status: 'Planejado' },
            ].map((t) => (
              <div key={t.id} className="correlacao-insight-box">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className="talhao-badge-tag tag-green-pill">{t.id}</span>
                    <strong style={{ fontSize: '0.88rem', color: '#0F172A' }}>{t.fruta}</strong>
                    <span style={{ fontSize: '0.78rem', color: '#64748B' }}>({t.area})</span>
                  </div>
                  <span className="badge-pill badge-green-soft-chip">{t.brix} Brix</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.82rem', marginTop: 4 }}>
                  <span style={{ color: '#065F46', fontWeight: 700 }}>Produtividade: {t.prod}</span>
                  <span className={`badge-pill ${t.status === 'Concluído' ? 'badge-green' : t.status === 'Em Colheita' ? 'badge-amber-exact' : 'badge-gray-tag'}`}>
                    {t.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {isAnalista && (
            <button type="button" className="btn-serie-historica" style={{ marginTop: 16 }}>
              Exportar Relatório Detalhado de Lotes
            </button>
          )}
        </div>
      </section>
    </div>
  );
}
