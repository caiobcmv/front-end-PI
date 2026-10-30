import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TopHeader from '../components/TopHeader';
import { useAuth } from '../context/AuthContext';

/* ═══════════════════════════════════════════════════════════════════
   VISÃO ANALISTA (Luiz Felipe) - MATCHING SCREENSHOTS 4 & 5
   ═══════════════════════════════════════════════════════════════════ */
function AlertasAnalistaView() {
  const [activeTab, setActiveTab] = useState('todos');
  const [intervened, setIntervened] = useState(false);
  const [silenced, setSilenced] = useState(false);

  return (
    <div className="dashboard-container alertas-screen-container">
      {/* ── Top Header ── */}
      <TopHeader
        title="Central de Alertas & Incidentes"
        subtitle="Monitoramento em tempo real de desvios térmicos em contêineres reefer, estresse hídrico no campo e gatilhos automatizados."
        showResumidoToggle={false}
        dateText="22 de setembro de 2026"
      />

      {/* ── Subheader Action Bar ── */}
      <div className="gateway-status-bar" style={{ marginTop: '-8px', marginBottom: '8px' }}>
        <div className="gateway-status-left" style={{ flexWrap: 'wrap' }}>
          <span className="dot-mini-green" />
          <strong style={{ fontSize: '0.84rem', color: '#0F172A' }}>
            Monitoramento Ativo
          </strong>
          <span className="gateway-sep">•</span>
          <span style={{ fontSize: '0.82rem', color: '#475569' }}>
            Sensor DHT11 ESP32-C3 & Solo Simulado (ThingSpeak #3500765)
          </span>
          <span className="gateway-sep">•</span>
          <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
            ↻ Sincronizado há 2 min
          </span>
        </div>
        <div className="gateway-status-actions">
          <button type="button" className="btn-alertas-secondary">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Reconhecer Todos
          </button>
          <button type="button" className="btn-export-telemetria">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Exportar Log (CSV)
          </button>
        </div>
      </div>

      {/* ── 4 Top KPI Cards ── */}
      <section className="dash-kpi-grid">
        {/* KPI 1: ALERTAS ATIVOS HOJE */}
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">ALERTAS ATIVOS HOJE</span>
            <span className="badge-pill badge-amber-exact" style={{ fontSize: '0.72rem' }}>
              Atenção Imediata
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 8 }}>
            <div style={{ position: 'relative', width: 48, height: 48, borderRadius: '50%', border: '4px solid #EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0F172A' }}>3</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: '0.78rem', color: '#DC2626', fontWeight: 700 }}>Severidade Crítica: 1 lote</span>
              <span style={{ fontSize: '0.78rem', color: '#D97706', fontWeight: 600 }}>Médio + Baixo: 2 lotes</span>
            </div>
          </div>
          <div className="kpi-exact-footer" style={{ marginTop: 12 }}>
            <span className="kpi-footer-meta">MTTR Médio: <strong>15 min</strong></span>
            <span className="badge-pill badge-green-soft-chip" style={{ fontSize: '0.68rem' }}>0 Reincidências</span>
          </div>
        </div>

        {/* KPI 2: HARDWARE DE CAMPO */}
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">HARDWARE DE CAMPO</span>
            <span className="badge-pill badge-green" style={{ fontSize: '0.72rem' }}>
              Ativo - Bancada
            </span>
          </div>
          <div style={{ marginTop: 10 }}>
            <strong style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', display: 'block' }}>
              DHT11 ESP32-C3
            </strong>
          </div>
          <div className="kpi-exact-footer" style={{ marginTop: 18 }}>
            <span className="kpi-footer-meta" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ color: '#10B981' }}>✳</span> Canal ThingSpeak #3500765
            </span>
            <span className="kpi-footer-meta">1 Leitura/h</span>
          </div>
        </div>

        {/* KPI 3: DESVIO DE CONSERVAÇÃO */}
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">DESVIO DE CONSERVAÇÃO</span>
            <span className="badge-pill badge-risk-pill" style={{ fontSize: '0.72rem' }}>
              Manga - Exportação
            </span>
          </div>
          <div style={{ marginTop: 10 }}>
            <strong style={{ fontSize: '1.35rem', fontWeight: 800, color: '#DC2626', display: 'block' }}>
              +1.8°C Acima
            </strong>
          </div>
          <div className="kpi-exact-footer" style={{ marginTop: 18 }}>
            <span className="kpi-footer-meta">Tmax 13.0°C</span>
            <span style={{ fontSize: '0.78rem', color: '#DC2626', fontWeight: 700 }}>Atual: 14.8°C</span>
          </div>
        </div>

        {/* KPI 4: VALOR EM RISCO */}
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">VALOR EM RISCO</span>
            <span className="badge-pill badge-p1-critico" style={{ fontSize: '0.72rem' }}>
              Risco Crítico
            </span>
          </div>
          <div style={{ marginTop: 10 }}>
            <strong style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F172A', display: 'block' }}>
              30% Perda Prevista
            </strong>
          </div>
          <div className="kpi-exact-footer" style={{ marginTop: 18 }}>
            <span className="kpi-footer-meta">Lote 1.000 kg (Manga)</span>
            <span className="green-text-bold">Mitigável Imediato</span>
          </div>
        </div>
      </section>

      {/* ── Middle: Triagem de Incidentes + Sidebars ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '2.1fr 1fr', gap: 18, marginTop: 16 }}>
        {/* Left Column: Triagem de Incidentes em Aberto */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="dash-white-card" style={{ padding: '20px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
              <div>
                <h2 className="card-headline-clean" style={{ fontSize: '1.02rem' }}>
                  Triagem de Incidentes em Aberto
                </h2>
                <p className="card-muted-desc" style={{ fontSize: '0.78rem' }}>
                  Triagem de eventos reativos e preditivos conforme regras de cortes e parâmetros de conservação
                </p>
              </div>

              <div className="view-toggle-group">
                <button
                  type="button"
                  className={`view-toggle-btn ${activeTab === 'todos' ? 'active' : ''}`}
                  onClick={() => setActiveTab('todos')}
                >
                  Todos (3)
                </button>
                <button
                  type="button"
                  className={`view-toggle-btn ${activeTab === 'critico' ? 'active' : ''}`}
                  onClick={() => setActiveTab('critico')}
                >
                  Crítico (1)
                </button>
                <button
                  type="button"
                  className={`view-toggle-btn ${activeTab === 'medio' ? 'active' : ''}`}
                  onClick={() => setActiveTab('medio')}
                >
                  Médio (1)
                </button>
                <button
                  type="button"
                  className={`view-toggle-btn ${activeTab === 'baixo' ? 'active' : ''}`}
                  onClick={() => setActiveTab('baixo')}
                >
                  Baixo (1)
                </button>
              </div>
            </div>

            {/* Incident Cards Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {/* Incident 1: Crítico • Preditivo (Manga) */}
              {(activeTab === 'todos' || activeTab === 'critico') && (
                <div className="incident-card-detailed incident-card-critico" style={{ padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className="badge-pill badge-p1-critico">CRÍTICO • PREDITIVO</span>
                      <span style={{ fontSize: '0.74rem', color: '#64748B' }}>AALT-2026-004 • Há 14 min</span>
                    </div>
                    <span style={{ fontSize: '0.74rem', color: '#DC2626', fontWeight: 700 }}>
                      PROBABILIDADE DE RISCO: <strong>84%</strong> • Perda 30%
                    </span>
                  </div>

                  <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0F172A', margin: '8px 0 4px' }}>
                    Desvio térmico no lote de Manga (DHT11 Bancada)
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: '#334155', margin: '0 0 10px', lineHeight: 1.45 }}>
                    Projeção de <strong>14.8°C</strong> ultrapassa teto de conservação (Tmax 13.0°C, Embrapa/UC Davis).
                  </p>

                  <div className="prescricao-agronomica-card" style={{ padding: '8px 12px', background: '#F0FDF4', borderColor: '#BBF7D0' }}>
                    <span style={{ fontSize: '0.78rem', color: '#065F46' }}>
                      <strong>Ação Recomendada oficial:</strong> Intervenção logística e operacional imediata no lote.
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        type="button"
                        className="btn-inc-primary-green"
                        style={{ padding: '7px 14px', fontSize: '0.8rem' }}
                        onClick={() => setIntervened(true)}
                      >
                        {intervened ? '✓ Intervenção Solicitada' : 'Intervir Imediatamente'}
                      </button>
                      <button
                        type="button"
                        className="btn-inc-outline"
                        style={{ padding: '7px 12px', fontSize: '0.8rem' }}
                        onClick={() => setSilenced(true)}
                      >
                        {silenced ? 'Silenciado' : 'Silenciar 1h'}
                      </button>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>Cultura: Manga • Destino: Exportação • Lote: 1.000 kg</span>
                      <strong style={{ color: '#DC2626' }}>STATUS: EM ABERTO</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Incident 2: Médio • Reativo (Uva) */}
              {(activeTab === 'todos' || activeTab === 'medio') && (
                <div className="incident-card-detailed incident-card-moderado" style={{ padding: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className="badge-pill badge-p2-atencao">MÉDIO • REATIVO</span>
                      <span style={{ fontSize: '0.74rem', color: '#64748B' }}>AALT-2026-002 • Há 48 min</span>
                    </div>
                    <span style={{ fontSize: '0.74rem', color: '#D97706', fontWeight: 700 }}>
                      PROBABILIDADE DE RISCO: <strong>62%</strong> • Perda 10%
                    </span>
                  </div>

                  <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0F172A', margin: '8px 0 4px' }}>
                    Déficit de umidade relativa no lote de Uva
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: '#334155', margin: '0 0 10px', lineHeight: 1.45 }}>
                    Sensor da câmara de Uva registrou <strong>87.5% UR</strong> vs. limiar seguro de 90.0% a 95.0% (Embrapa Semiárido).
                  </p>

                  <div className="prescricao-agronomica-card" style={{ padding: '8px 12px' }}>
                    <span style={{ fontSize: '0.78rem', color: '#78350F' }}>
                      <strong>Ação Recomendada oficial:</strong> Ajuste preventivo do ambiente e verificação dos sistemas de refrigeração.
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button type="button" className="btn-inc-outline" style={{ padding: '7px 12px', fontSize: '0.8rem' }}>
                        Ajustar Parâmetro
                      </button>
                      <button type="button" className="btn-inc-outline" style={{ padding: '7px 12px', fontSize: '0.8rem' }}>
                        Silenciar 1h
                      </button>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>Cultura: Uva Vitória • Destino: Mercado Interno • Faixa: 90% a 95% UR</span>
                      <strong style={{ color: '#D97706' }}>STATUS: EM ABERTO</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* Incident 3: Baixo • Preditivo (Melão) */}
              {(activeTab === 'todos' || activeTab === 'baixo') && (
                <div className="incident-card-detailed" style={{ padding: 16, borderLeft: '6px solid #10B981' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span className="badge-pill badge-green">BAIXO • PREDITIVO</span>
                      <span style={{ fontSize: '0.74rem', color: '#64748B' }}>AALT-2026-018 • Há 2h</span>
                    </div>
                    <span style={{ fontSize: '0.74rem', color: '#059669', fontWeight: 700 }}>
                      PROBABILIDADE DE RISCO: <strong>42%</strong> • Perda 2%
                    </span>
                  </div>

                  <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0F172A', margin: '8px 0 4px' }}>
                    Oscilação em Melão (12.3°C vs. Tmax 12.0°C)
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: '#334155', margin: '0 0 10px', lineHeight: 1.45 }}>
                    Projeção matemática indica leve tendência na antecâmara. Risco dentro da margem de tolerância.
                  </p>

                  <div className="prescricao-agronomica-card" style={{ padding: '8px 12px', background: '#F8FAFC', borderColor: '#E2E8F0' }}>
                    <span style={{ fontSize: '0.78rem', color: '#334155' }}>
                      <strong>Ação Recomendada oficial:</strong> Observação passiva e acompanhamento da evolução do lote.
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, flexWrap: 'wrap', gap: 8 }}>
                    <button type="button" className="btn-inc-outline" style={{ padding: '7px 12px', fontSize: '0.8rem' }}>
                      Acompanhar Lote
                    </button>
                    <div style={{ fontSize: '0.74rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>Cultura: Melão Amarelo • Destino: Exportação • Faixa: 10.0° a 12.0°C</span>
                      <strong style={{ color: '#059669' }}>STATUS: EM ABERTO</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Severidade + Limiares + Regras + Rota */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Card 1: Severidade & Distribuição */}
          <div className="dash-white-card" style={{ padding: '16px 18px' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Severidade & Distribuição
            </h3>
            <p style={{ fontSize: '0.74rem', color: '#64748B', margin: '2px 0 10px' }}>
              Distribuição atual de incidentes e frações de perda cadastradas
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {/* Donut Circle */}
              <div style={{ position: 'relative', width: 68, height: 68, flexShrink: 0 }}>
                <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10B981" strokeWidth="4.5" strokeDasharray="34, 100" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#F59E0B" strokeWidth="4.5" strokeDasharray="33, 100" strokeDashoffset="-34" />
                  <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#EF4444" strokeWidth="4.5" strokeDasharray="33, 100" strokeDashoffset="-67" />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <strong style={{ fontSize: '0.95rem', color: '#0F172A', lineHeight: 1 }}>3</strong>
                  <span style={{ fontSize: '0.55rem', color: '#64748B' }}>Alertas</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: '0.74rem' }}>
                <span style={{ color: '#DC2626', fontWeight: 600 }}>● Crítico: 1 (33%) • Perda: 30%</span>
                <span style={{ color: '#D97706', fontWeight: 600 }}>● Médio: 1 (33%) • Perda: 10%</span>
                <span style={{ color: '#059669', fontWeight: 600 }}>● Baixo: 1 (34%) • Perda: 2%</span>
              </div>
            </div>
          </div>

          {/* Card 2: Limiares de Conservação */}
          <div className="dash-white-card" style={{ padding: '16px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Limiares de Conservação
              </h3>
              <span className="badge-pill badge-green-soft-chip" style={{ fontSize: '0.68rem' }}>config_parametro</span>
            </div>
            <p style={{ fontSize: '0.72rem', color: '#64748B', margin: '0 0 8px' }}>
              Parâmetros biológicos validados segundo referências UC Davis / Embrapa
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.74rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #F1F5F9' }}>
                <span><strong>MG</strong> Manga (Exportação)</span>
                <span style={{ color: '#059669', fontWeight: 700 }}>10.0°C a 13.0°C • UR: 90-95%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #F1F5F9' }}>
                <span><strong>UV</strong> Uva (Câmara Frigorífica)</span>
                <span style={{ color: '#0284C7', fontWeight: 700 }}>-0.5°C a 2.0°C • UR: 90-95%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span><strong>ML</strong> Melão (Antecâmara)</span>
                <span style={{ color: '#059669', fontWeight: 700 }}>10.0°C a 12.0°C • UR: 85-90%</span>
              </div>
            </div>
          </div>

          {/* Card 3: Regras Preditivas */}
          <div className="dash-white-card" style={{ padding: '16px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Regras Preditivas
              </h3>
              <span className="badge-pill badge-green-soft-chip" style={{ fontSize: '0.68rem' }}>cortes alerta preditivo</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.74rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#DC2626', fontWeight: 700 }}>● Crítico (0.80 - 1.00)</span>
                <span style={{ color: '#991B1B' }}>Intervenção imediata</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#D97706', fontWeight: 700 }}>● Médio (0.50 - 0.79)</span>
                <span style={{ color: '#92400E' }}>Ajuste preventivo</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#059669', fontWeight: 700 }}>● Baixo (0.30 - 0.49)</span>
                <span style={{ color: '#166534' }}>Observação passiva</span>
              </div>
            </div>
          </div>

          {/* Card 4: Rota Portuária de Escoamento */}
          <div className="dash-white-card" style={{ padding: '16px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Rota Portuária de Escoamento
              </h3>
              <span className="badge-pill badge-green" style={{ fontSize: '0.68rem' }}>Exportação</span>
            </div>
            <p style={{ fontSize: '0.72rem', color: '#64748B', margin: '0 0 8px' }}>
              Porto homologado para escoamento do lote sob alerta térmico:
            </p>

            <div style={{ background: '#F0FDF4', border: '1.5px solid #86EFAC', borderRadius: 8, padding: '10px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '0.84rem', color: '#14532D' }}>Porto do Pecém (CE)</strong>
                <span className="badge-ok-dark" style={{ fontSize: '0.64rem' }}>Rota Selecionada</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, fontSize: '0.74rem', marginTop: 6, color: '#166534' }}>
                <span>Origem: <strong>Petrolina / PE</strong></span>
                <span>Distância: <strong>~780 km</strong></span>
                <span>Carga: <strong>1.000 kg Manga</strong></span>
                <span>Tempo est.: <strong>14h 30min</strong></span>
              </div>
              <div style={{ fontSize: '0.68rem', color: '#475569', marginTop: 6 }}>
                Alternativos homologados: Suape/PE • Salvador/BA • Natal/RN
              </div>
            </div>

            <button type="button" className="btn-serie-historica" style={{ marginTop: 10, padding: '8px 12px', fontSize: '0.8rem' }}>
              Atualizar Despacho Portuário
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom: Curva Térmica & Projeção 24h ── */}
      <div className="dash-white-card" style={{ marginTop: 16, padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <h3 className="card-headline-clean" style={{ fontSize: '1rem' }}>
              Curva Térmica & Projeção 24h
            </h3>
            <p className="card-muted-desc" style={{ fontSize: '0.78rem' }}>
              Sensor Físico DHT11 ESP32-C3 vs. Projeção de Machine Learning para Lote Manga
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: '0.78rem' }}>
            <span style={{ color: '#059669', fontWeight: 600 }}>● Faixa Segura (10°C - 13°C)</span>
            <span style={{ color: '#0284C7', fontWeight: 600 }}>— Histórico Real (DHT11)</span>
            <span style={{ color: '#DC2626', fontWeight: 700 }}>--- Projeção (14.8°C)</span>
          </div>
        </div>

        {/* SVG Thermal Curve with Projections */}
        <div style={{ width: '100%', height: 160, background: '#F8FAFC', borderRadius: 8, padding: 12, position: 'relative' }}>
          <svg viewBox="0 0 800 130" style={{ width: '100%', height: '100%' }} preserveAspectRatio="none">
            <defs>
              <linearGradient id="safeZoneGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Safe zone band (10°C - 13°C) */}
            <rect x="30" y="55" width="740" height="45" fill="url(#safeZoneGrad)" />
            <line x1="30" y1="55" x2="770" y2="55" stroke="#10b981" strokeDasharray="3 3" />
            <text x="35" y="50" fill="#047857" fontSize="8.5" fontWeight="600">Tmax Permitido: 13.0°C (UC Davis / Embrapa)</text>

            <line x1="30" y1="100" x2="770" y2="100" stroke="#10b981" strokeDasharray="3 3" />
            <text x="35" y="110" fill="#047857" fontSize="8.5" fontWeight="600">Tmin Permitido: 10.0°C</text>

            {/* Real curve from 00:00 to 14:00 (green to amber) */}
            <path
              d="M 30 90 Q 180 85 360 80 T 520 70"
              fill="none"
              stroke="#0d9488"
              strokeWidth="2.5"
            />

            {/* Projection dashed red line from 14:00 to 22:00 */}
            <path
              d="M 520 70 Q 640 45 740 38"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />

            {/* Projected peak pill */}
            <circle cx="740" cy="38" r="4" fill="#ef4444" />
            <rect x="705" y="16" width="55" height="16" rx="3" fill="#DC2626" />
            <text x="732" y="27" fill="#FFFFFF" fontSize="8" fontWeight="800" textAnchor="middle">+1.8°C</text>

            {/* Timeline */}
            <text x="30" y="125" fill="#64748B" fontSize="9">00:00</text>
            <text x="180" y="125" fill="#64748B" fontSize="9">04:00</text>
            <text x="360" y="125" fill="#64748B" fontSize="9">08:00</text>
            <text x="480" y="125" fill="#64748B" fontSize="9">12:00</text>
            <text x="520" y="125" fill="#0F172A" fontSize="9" fontWeight="800">14:00 (Agora)</text>
            <text x="640" y="125" fill="#DC2626" fontSize="9">+4h Projeção</text>
            <text x="730" y="125" fill="#DC2626" fontSize="9">+8h Projeção</text>
          </svg>
        </div>

        {/* 3 Bottom Stat Boxes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 14 }}>
          <div className="c-highlight-box">
            <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>
              Hardware Fonte
            </span>
            <strong style={{ fontSize: '1rem', color: '#0F172A' }}>Bancada DHT11 ESP32-C3</strong>
            <span style={{ fontSize: '0.72rem', color: '#059669' }}>Machine Learning para Lote Manga</span>
          </div>

          <div className="c-highlight-box">
            <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>
              Frequência Amostral
            </span>
            <strong style={{ fontSize: '1rem', color: '#0F172A' }}>1 Leitura / Hora</strong>
            <span style={{ fontSize: '0.72rem', color: '#0284C7' }}>ThingSpeak Channel #3500765</span>
          </div>

          <div className="c-highlight-box">
            <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>
              Índice Preditivo
            </span>
            <strong style={{ fontSize: '1rem', color: '#DC2626' }}>0.84 Nível Crítico</strong>
            <span style={{ fontSize: '0.72rem', color: '#991B1B' }}>Corte: 0.80 - 1.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   VISÃO GESTORA (Maria Clara) - DO FIGMA ANTERIOR
   ═══════════════════════════════════════════════════════════════════ */
function AlertasGestoraView() {
  const [activeTab, setActiveTab] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [origemFilter, setOrigemFilter] = useState('todas');
  const [safraFilter, setSafraFilter] = useState('atual');
  const [isRecognized, setIsRecognized] = useState(false);
  const [irrigationTriggered, setIrrigationTriggered] = useState(false);
  const [resolvedIncident, setResolvedIncident] = useState(false);

  return (
    <div className="dashboard-container alertas-screen-container">
      {/* ── Top Header ── */}
      <TopHeader
        title="Central de Alertas & Incidentes"
        subtitle="Monitoramento em tempo real de desvios térmicos em contêineres reefer, estresse hídrico no campo e gatilhos automatizados."
        showResumidoToggle={false}
        dateText="22 de setembro de 2026"
      />

      {/* ── Subheader Action Bar ── */}
      <section className="alertas-subbar-row">
        <div className="sensors-active-pill">
          <span className="dot-mini-green" />
          <strong>24 Sensores Ativos em Monitoramento Contínuo</strong>
        </div>

        <div className="alertas-action-btns">
          <button
            type="button"
            className="btn-alertas-secondary"
            onClick={() => setIsRecognized(true)}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>{isRecognized ? 'Todos Reconhecidos' : 'Reconhecer Todos'}</span>
          </button>

          <button type="button" className="btn-alertas-secondary">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Exportar Registro (CSV)</span>
          </button>

          <button type="button" className="btn-alertas-primary">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <span>Regras de Disparo</span>
          </button>
        </div>
      </section>

      {/* ── Top 4 KPI Cards ── */}
      <section className="dash-kpi-grid">
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">ALERTAS ATIVOS</span>
            <div className="kpi-icon-pill icon-amber-pill">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
          </div>
          <div className="kpi-hero-number-with-sub">
            <span className="kpi-hero-number">3</span>
            <span className="kpi-sub-unit">ocorrências ativas</span>
          </div>
          <div className="kpi-exact-footer" style={{ marginTop: '12px' }}>
            <span className="red-text-bold">1 Crítico P1</span>
            <span className="amber-text-bold">2 Moderados P2</span>
          </div>
        </div>

        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">UMIDADE DO SOLO (FDR)</span>
            <div className="kpi-icon-pill icon-amber-pill">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
          </div>
          <div className="kpi-hero-number-with-badge">
            <span className="kpi-hero-number">38,2%</span>
            <span className="badge-pill badge-amber-exact">Abaixo de 50.0%</span>
          </div>
          <div className="kpi-exact-footer" style={{ marginTop: '12px' }}>
            <span className="kpi-footer-meta">Talhão A1 • Uva Vitória</span>
            <span className="amber-text-bold">Murcha Iminente</span>
          </div>
        </div>

        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">TEMPERATURA & MICROCLIMA</span>
            <div className="kpi-icon-pill icon-amber-pill">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
              </svg>
            </div>
          </div>
          <div className="kpi-hero-number-with-badge">
            <span className="kpi-hero-number">+27,4°C</span>
            <span className="badge-pill badge-amber-exact">Estresse Leve</span>
          </div>
          <div className="kpi-exact-footer" style={{ marginTop: '12px' }}>
            <span className="kpi-footer-meta">Talhão B2 • Uva Thompson</span>
            <span className="kpi-footer-meta">Pico 33,8°C dossel</span>
          </div>
          <div className="temp-color-segmented-bar">
            <span className="t-bar-seg seg-green" />
            <span className="t-bar-seg seg-yellow" />
            <span className="t-bar-seg seg-orange" />
          </div>
        </div>

        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">TEMPO DE RESPOSTA (SLA)</span>
            <div className="kpi-icon-pill icon-green-pill">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
          </div>
          <div className="kpi-hero-number-with-badge">
            <div className="kpi-hero-number-with-sub">
              <span className="kpi-hero-number">14</span>
              <span className="kpi-sub-unit">min</span>
            </div>
            <span className="badge-pill badge-green-exact">98% no prazo</span>
          </div>
          <div className="kpi-exact-footer" style={{ marginTop: '12px' }}>
            <span className="kpi-footer-meta">Tempo médio de intervenção</span>
            <span className="kpi-footer-meta">Meta &lt; 20 min</span>
          </div>
        </div>
      </section>

      {/* ── Filter Tabs & Secondary Filters ── */}
      <section className="dash-white-card alertas-filter-controls-card" style={{ marginTop: 16 }}>
        <div className="alertas-main-tabs-row">
          <button
            type="button"
            className={`tab-btn-incident ${activeTab === 'todos' ? 'active' : ''}`}
            onClick={() => setActiveTab('todos')}
          >
            Todos os Incidentes <span className="tab-count-badge">6</span>
          </button>
          <button
            type="button"
            className={`tab-btn-incident ${activeTab === 'critico' ? 'active' : ''}`}
            onClick={() => setActiveTab('critico')}
          >
            <span className="dot-mini-red" /> Críticos / Ação Imediata <span className="tab-count-badge count-red">1</span>
          </button>
          <button
            type="button"
            className={`tab-btn-incident ${activeTab === 'moderado' ? 'active' : ''}`}
            onClick={() => setActiveTab('moderado')}
          >
            <span className="dot-mini-amber" /> Moderados / Atenção <span className="tab-count-badge count-amber">2</span>
          </button>
          <button
            type="button"
            className={`tab-btn-incident ${activeTab === 'preditivo' ? 'active' : ''}`}
            onClick={() => setActiveTab('preditivo')}
          >
            <span className="dot-mini-purple" /> Preditivos IA <span className="tab-count-badge">1</span>
          </button>
          <button
            type="button"
            className={`tab-btn-incident ${activeTab === 'resolvidos' ? 'active' : ''}`}
            onClick={() => setActiveTab('resolvidos')}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            Resolvidos Hoje <span className="tab-count-badge count-green">2</span>
          </button>
        </div>

        <div className="alertas-subfilters-row">
          <div className="alertas-search-input-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por Lote, Talhão ou Equipamento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="alertas-search-box"
            />
          </div>

          <div className="alertas-dropdowns-group">
            <select
              value={origemFilter}
              onChange={(e) => setOrigemFilter(e.target.value)}
              className="alertas-select"
            >
              <option value="todas">Todas as Origens de Hardware</option>
              <option value="reefer">Contêineres Reefer (GPS/4G)</option>
              <option value="campo">Nós de Campo ESP32 (LoRa)</option>
            </select>

            <select
              value={safraFilter}
              onChange={(e) => setSafraFilter(e.target.value)}
              className="alertas-select"
            >
              <option value="atual">Safra Atual: 2024/25 (Todos os Lotes)</option>
              <option value="2025">Safra 2025/26 (Em Planejamento)</option>
            </select>

            <button
              type="button"
              className="btn-limpar-filtros"
              onClick={() => {
                setSearchTerm('');
                setOrigemFilter('todas');
                setSafraFilter('atual');
                setActiveTab('todos');
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              <span>Limpar</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── 2 Main Columns Layout ── */}
      <div className="alertas-two-cols-layout" style={{ marginTop: 16 }}>
        <div className="alertas-left-col">
          {(!activeTab || activeTab === 'todos' || activeTab === 'critico') && (
            <div className="incident-card-detailed incident-card-critico">
              <div className="incident-card-top-line">
                <div className="incident-badges-row">
                  <span className="badge-pill badge-p1-critico">• P1 • CRÍTICO</span>
                  <span className="badge-pill badge-gray-tag">Cadeia Fria</span>
                  <span className="badge-pill badge-risk-pill">Valor em Risco: R$ 42.000</span>
                </div>
                <span className="incident-timestamp-right">Registrado há 28 min</span>
              </div>

              <h3 className="incident-headline">
                Desvio Térmico no Baú Frigorífico (Reefer 40ft) — Lote EXP-2026-08
              </h3>
              <p className="incident-narrative">
                Temperatura interna sustentada em 3.4°C por 28 minutos consecutivos (limite máximo de tolerância para Uva de Mesa em trânsito: 2.0°C). Carga em deslocamento rodoviário na BR-116 em direção ao Porto de Pecém / Embarque MSC Rotterdam.
              </p>

              <div className="incident-telemetry-grid">
                <div className="inc-metric-box inc-box-alert-red">
                  <span className="inc-metric-label">TEMP. ATUAL</span>
                  <strong className="inc-metric-value red-text">3.4°C</strong>
                  <span className="inc-metric-sub">Alvo: 0.5 - 2.0°C</span>
                </div>
                <div className="inc-metric-box">
                  <span className="inc-metric-label">UMIDADE REEFER</span>
                  <strong className="inc-metric-value">91%</strong>
                  <span className="inc-metric-sub">Normal (85-95%)</span>
                </div>
                <div className="inc-metric-box">
                  <span className="inc-metric-label">GÁS ETILENO (C₂H₄)</span>
                  <strong className="inc-metric-value">0.03 ppm</strong>
                  <span className="inc-metric-sub">Seguro (&lt;0.05)</span>
                </div>
                <div className="inc-metric-box">
                  <span className="inc-metric-label">BATERIA GATEWAY</span>
                  <strong className="inc-metric-value">94%</strong>
                  <span className="inc-metric-sub">GSM 4G Operante</span>
                </div>
              </div>

              <div className="reefer-thermal-curve-box">
                <div className="thermal-curve-header">
                  <div className="thermal-curve-title-col">
                    <strong>Curva Térmica da Carga (Últimas 2 Horas)</strong>
                    <span>Escala de 10 min</span>
                  </div>
                  <span className="badge-pill badge-curve-over">+1.4°C acima do setpoint</span>
                </div>

                <div className="thermal-svg-wrap">
                  <svg viewBox="0 0 540 85" className="thermal-chart-svg" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="redCurveGradG" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <line x1="20" y1="45" x2="520" y2="45" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.6" />
                    <text x="25" y="40" fill="#ef4444" fontSize="10" fontWeight="600">Limite de Segurança (2.0°C)</text>
                    <path
                      d="M 40 58 Q 180 50 280 40 T 420 28 T 500 12 L 500 80 L 40 80 Z"
                      fill="url(#redCurveGradG)"
                    />
                    <path
                      d="M 40 58 Q 180 50 280 40 T 420 28 T 500 12"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2.5"
                    />
                  </svg>
                </div>
                <div className="thermal-ticks-row">
                  <span className="thermal-tick-val">10:30 (1.7°C)</span>
                  <span className="thermal-tick-val">11:00 (1.9°C)</span>
                  <span className="thermal-tick-val">11:30 (2.4°C)</span>
                  <span className="thermal-tick-val now-bold">Agora (3.4°C)</span>
                </div>
              </div>

              <div className="incident-actions-row">
                <button type="button" className="btn-inc-danger">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Ligar para Motorista / Frota</span>
                </button>
                <button type="button" className="btn-inc-outline">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                  <span>Telemetria Contínua</span>
                </button>
                <button
                  type="button"
                  className="btn-inc-outline-dark"
                  onClick={() => setResolvedIncident(true)}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{resolvedIncident ? '✓ Atendido' : 'Marcar como Atendido'}</span>
                </button>
              </div>
            </div>
          )}

          {(!activeTab || activeTab === 'todos' || activeTab === 'moderado') && (
            <div className="incident-card-detailed incident-card-moderado">
              <div className="incident-card-top-line">
                <div className="incident-badges-row">
                  <span className="badge-pill badge-p2-atencao">• P2 • ATENÇÃO</span>
                  <span className="badge-pill badge-gray-tag">Manejo de Irrigação</span>
                  <span className="badge-pill badge-gray-tag">Nó ESP32-VU03</span>
                </div>
                <span className="incident-timestamp-right">Registrado há 12 min</span>
              </div>

              <h3 className="incident-headline">
                Estresse Hídrico Crítico no Talhão A1 (Uva Vitória Seedless) — Área: 12,5 ha
              </h3>
              <p className="incident-narrative">
                Umidade volumétrica do solo (VWC) atingiu <strong>38.2%</strong> na profundidade radicular principal de 20cm (limiar de recarga: 50.0%). Temperatura de microclima local em 32.5°C com alta radiação solar no pomar.
              </p>

              <div className="prescricao-agronomica-card">
                <div className="prescricao-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div className="prescricao-content">
                  <strong className="prescricao-title">PRESCRIÇÃO AGRONÔMICA AUTOMATIZADA</strong>
                  <p className="prescricao-desc">
                    Iniciar turno de fertirrigação com lâmina de 4.2mm às 15:30 para restabelecer capacidade de campo sem lixiviação de nutrientes e evitar perda de calibre de baga.
                  </p>
                </div>
              </div>

              <div className="incident-telemetry-grid">
                <div className="inc-metric-box inc-box-alert-red">
                  <span className="inc-metric-label">VWC 20CM</span>
                  <strong className="inc-metric-value red-text">38.2%</strong>
                  <span className="inc-metric-sub">Alvo &gt; 50%</span>
                </div>
                <div className="inc-metric-box">
                  <span className="inc-metric-label">VWC 40CM</span>
                  <strong className="inc-metric-value">46.8%</strong>
                  <span className="inc-metric-sub">Em declínio</span>
                </div>
                <div className="inc-metric-box">
                  <span className="inc-metric-label">TEMP. SOLO</span>
                  <strong className="inc-metric-value">27.1°C</strong>
                  <span className="inc-metric-sub">Normal</span>
                </div>
                <div className="inc-metric-box">
                  <span className="inc-metric-label">VÁLVULA SETOR</span>
                  <strong className="inc-metric-value">Fechada</strong>
                  <span className="inc-metric-sub">Pronta p/ envio</span>
                </div>
              </div>

              <div className="incident-actions-row">
                <button
                  type="button"
                  className="btn-inc-primary-green"
                  onClick={() => setIrrigationTriggered(true)}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  <span>{irrigationTriggered ? '✓ Válvula Disparada' : 'Disparar Válvula de Irrigação (Automação)'}</span>
                </button>
                <button type="button" className="btn-inc-outline">
                  <span>Ver Curva de Umidade</span>
                </button>
                <button type="button" className="btn-inc-ghost">
                  <span>Silenciar 1h</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Channels & Guidelines */}
        <div className="alertas-right-col">
          <div className="dash-white-card matriz-comunicacao-card">
            <div className="config-card-header">
              <div>
                <strong style={{ fontSize: '0.92rem', color: '#0F172A', display: 'block' }}>Matriz de Comunicação</strong>
              </div>
              <span className="badge-pill badge-green" style={{ fontSize: '0.7rem' }}>Failover Ativo</span>
            </div>

            <div className="matriz-channels-list">
              <div className="matriz-item-row">
                <div className="matriz-icon-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  </svg>
                  <div className="matriz-text-col">
                    <span className="matriz-channel-name">Push App Raíz</span>
                    <span className="matriz-channel-target">Equipe de Campo & Agrônomos</span>
                  </div>
                </div>
                <span className="matriz-status-pill pill-online">Online</span>
              </div>

              <div className="matriz-item-row">
                <div className="matriz-icon-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <div className="matriz-text-col">
                    <span className="matriz-channel-name">WhatsApp Cloud API</span>
                    <span className="matriz-channel-target">Transportadoras & Frota Reefer</span>
                  </div>
                </div>
                <span className="matriz-status-pill pill-ativo">Ativo</span>
              </div>

              <div className="matriz-item-row">
                <div className="matriz-icon-title">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <div className="matriz-text-col">
                    <span className="matriz-channel-name">SMS de Emergência</span>
                    <span className="matriz-channel-target">Áreas remotas sem dados</span>
                  </div>
                </div>
                <span className="matriz-status-pill pill-standby">Standby</span>
              </div>
            </div>

            <button type="button" className="btn-testar-rotas">
              Testar Rotas de Disparo
            </button>
          </div>

          <div className="dash-white-card auditoria-recent-card">
            <div className="config-card-header">
              <strong style={{ fontSize: '0.92rem', color: '#0F172A' }}>Log de Auditoria Recente</strong>
              <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Hoje</span>
            </div>

            <div className="auditoria-recent-list">
              <div className="auditoria-item-bullet">
                <span className="audit-dot audit-dot-red" />
                <div className="audit-text-col">
                  <span className="audit-action-bold">SMS disparado para Rodovias Nordeste</span>
                  <span className="audit-detail-sub">Contêiner MS-R04 • 11:42 BRT</span>
                </div>
              </div>

              <div className="auditoria-item-bullet">
                <span className="audit-dot audit-dot-amber" />
                <div className="audit-text-col">
                  <span className="audit-action-bold">Alerta de umidade enviado para Agronomia</span>
                  <span className="audit-detail-sub">Talhão A1 • 11:30 BRT</span>
                </div>
              </div>

              <div className="auditoria-item-bullet">
                <span className="audit-dot audit-dot-green" />
                <div className="audit-text-col">
                  <span className="audit-action-bold">Chamado #4092 marcado como Resolvido</span>
                  <span className="audit-detail-sub">Repetidor LoRa • 11:20 BRT por Carlos E.</span>
                </div>
              </div>

              <div className="auditoria-item-bullet">
                <span className="audit-dot audit-dot-blue" />
                <div className="audit-text-col">
                  <span className="audit-action-bold">Limiar térmico ajustado para Uva Vitória</span>
                  <span className="audit-detail-sub">Central • 09:15 BRT por Eng. Marília</span>
                </div>
              </div>
            </div>

            <Link to="/auditoria" className="btn-ver-auditoria-link">
              Ver Histórico Completo de Auditoria →
            </Link>
          </div>

          <div className="coldchain-guideline-card">
            <span className="guideline-badge-title">DIRETRIZ GLOBAL DE COLD-CHAIN</span>
            <strong className="guideline-bold">Protocolo de Retenção de Fruta</strong>
            <p className="guideline-text">
              Desvios acima de 2.0°C com duração superior a 45 minutos demandam vistoria de termógrafos certificados antes da emissão do Certificado Fitossanitário no porto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   EXPORT DEFAULT: COMPONENTE PRINCIPAL COM SELETOR DE PERFIL
   ═══════════════════════════════════════════════════════════════════ */
export default function AlertasPage() {
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
            Central de Alertas por Perfil:
          </strong>
          <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
            {activeRoleView === 'analista'
              ? 'Visão Analista IoT (Luiz Felipe — Bancada DHT11 ESP32-C3 & Machine Learning)'
              : 'Visão Gestora (Maria Clara — Baú Frigorífico Reefer & Manejo de Irrigação)'}
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

      {activeRoleView === 'analista' ? <AlertasAnalistaView /> : <AlertasGestoraView />}
    </div>
  );
}
