import React, { useState } from 'react';
import TopHeader from '../components/TopHeader';

export default function AlertasPage() {
  const [activeTab, setActiveTab] = useState('todos');
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      prioridade: 'P1',
      tipo: 'critico',
      titulo: 'Reefer MS-912: Elevação térmica transitória (+1.8°C)',
      descricao: 'Baú frigorífico em trânsito rodoviário registrou oscilação térmica próxima ao teto seguro (2.0°C). Sistema de retorno automático acionado.',
      localizacao: 'BR-407, Km 45 (Juazeiro)',
      data: '22/09/2026 às 20:30',
      status: 'ativo',
      canais: ['Push App', 'WhatsApp', 'SMS Urgent'],
      cultura: 'Uva Crimson (R$ 297.000)',
    },
    {
      id: 2,
      prioridade: 'P2',
      tipo: 'moderado',
      titulo: 'Talhão 04: Umidade do solo abaixo do setpoint (38%)',
      descricao: 'Sensor de umidade profunda no setor de Uva Vitória indicou necessidade de suplementação hídrica antes do pico de temperatura matinal.',
      localizacao: 'Talhão 04 - Polo Sul',
      data: '22/09/2026 às 19:15',
      status: 'ativo',
      canais: ['Push App', 'E-mail Diário'],
      cultura: 'Uva Vitória',
    },
    {
      id: 3,
      prioridade: 'P1',
      tipo: 'resolvido',
      titulo: 'Reefer MS-904: Parada técnica com porta entreaberta sanada',
      descricao: 'Parada programada para inspeção fiscal na divisa de estado. Retorno imediato à faixa ideal (+1.2°C).',
      localizacao: 'Posto Fiscal Penaforte',
      data: '22/09/2026 às 14:20',
      status: 'resolvido',
      canais: ['Push App', 'WhatsApp'],
      cultura: 'Uva Vitória (Seedless)',
    },
    {
      id: 4,
      prioridade: 'P2',
      tipo: 'resolvido',
      titulo: 'Talhão 02: Rajada de vento superior a 35 km/h',
      descricao: 'Alerta preventivo para fechamento parcial de cortinas de proteção contra murcha de folhagem.',
      localizacao: 'Talhão 02 - Polo Sul',
      data: '22/09/2026 às 11:05',
      status: 'resolvido',
      canais: ['Push App'],
      cultura: 'Manga Palmer',
    },
  ]);

  const handleResolve = (id) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'resolvido', tipo: 'resolvido' } : a))
    );
  };

  const filteredAlerts = alerts.filter((a) => {
    if (activeTab === 'todos') return true;
    if (activeTab === 'critico') return a.tipo === 'critico';
    if (activeTab === 'moderado') return a.tipo === 'moderado';
    if (activeTab === 'resolvidos') return a.status === 'resolvido';
    return true;
  });

  return (
    <div className="dashboard-container alertas-page-wrap">
      {/* ── Top Header ── */}
      <TopHeader
        title="Central de Monitoramento e Alertas"
        subtitle="Matriz de escalonamento de incidentes agroclimáticos e cadeia de frio em tempo real."
        showResumidoToggle={false}
        dateText="22 de setembro de 2026"
      />

      {/* ── Top 4 KPI Cards ── */}
      <section className="dash-kpi-grid">
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">ALERTAS ATIVOS</span>
            <span className="badge-pill badge-amber">Atenção Leve</span>
          </div>
          <div className="dash-kpi-body">
            <span className="kpi-hero-number">2</span>
            <div className="kpi-icon-box-peach">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
          </div>
          <div className="dash-kpi-footer">
            <span className="kpi-footer-sub">1 Reefer rodoviário · 1 Solo campo</span>
          </div>
        </div>

        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">RESOLVIDOS HOJE</span>
            <span className="badge-pill badge-green">100% Mitigados</span>
          </div>
          <div className="dash-kpi-body">
            <span className="kpi-hero-number">14</span>
            <div className="kpi-icon-ring-wrap">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
          </div>
          <div className="dash-kpi-footer">
            <span className="kpi-footer-sub">Tempo médio de resposta: 9 min</span>
          </div>
        </div>

        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">REDE ESP32 / LORA</span>
            <span className="badge-pill badge-green">Conectado</span>
          </div>
          <div className="dash-kpi-body">
            <span className="kpi-hero-number">99.8%</span>
            <div className="kpi-spark-box">
              <span className="spark-sub-text green-text">28 nós online</span>
            </div>
          </div>
          <div className="dash-kpi-footer">
            <span className="kpi-footer-sub">Gateway Polo Sul sem perdas de pacotes</span>
          </div>
        </div>

        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">CONFORMIDADE CARGO-SLA</span>
            <span className="badge-pill badge-green">Protegido</span>
          </div>
          <div className="dash-kpi-body">
            <span className="kpi-hero-number">100%</span>
            <div className="kpi-icon-box-peach" style={{ background: '#ecfdf5' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
          </div>
          <div className="dash-kpi-footer">
            <span className="kpi-footer-sub">R$ 0,00 de prejuízo por desvio térmico</span>
          </div>
        </div>
      </section>

      {/* ── Alerts Filter Tabs & List ── */}
      <section className="dash-white-card alerts-feed-card">
        <div className="card-header-clean">
          <div>
            <h2 className="card-headline-clean">Ocorrências Operacionais & Disparos</h2>
            <p className="card-muted-desc">Filtre alertas por gravidade e execute ações de protocolo</p>
          </div>

          <div className="filter-pill-selector">
            <button
              type="button"
              className={`filter-btn ${activeTab === 'todos' ? 'active' : ''}`}
              onClick={() => setActiveTab('todos')}
            >
              Todos ({alerts.length})
            </button>
            <button
              type="button"
              className={`filter-btn ${activeTab === 'critico' ? 'active' : ''}`}
              onClick={() => setActiveTab('critico')}
            >
              Críticos P1 ({alerts.filter((a) => a.tipo === 'critico').length})
            </button>
            <button
              type="button"
              className={`filter-btn ${activeTab === 'moderado' ? 'active' : ''}`}
              onClick={() => setActiveTab('moderado')}
            >
              Moderados P2 ({alerts.filter((a) => a.tipo === 'moderado').length})
            </button>
            <button
              type="button"
              className={`filter-btn ${activeTab === 'resolvidos' ? 'active' : ''}`}
              onClick={() => setActiveTab('resolvidos')}
            >
              Resolvidos ({alerts.filter((a) => a.status === 'resolvido').length})
            </button>
          </div>
        </div>

        <div className="alerts-feed-list">
          {filteredAlerts.map((alert) => (
            <div key={alert.id} className={`alert-feed-item status-${alert.tipo}`}>
              <div className="alert-feed-left-bar" />
              <div className="alert-feed-main">
                <div className="alert-feed-header-line">
                  <div className="alert-title-badges">
                    <span className={`badge-pill ${alert.tipo === 'critico' ? 'badge-red' : alert.tipo === 'moderado' ? 'badge-amber' : 'badge-green'}`}>
                      {alert.prioridade} · {alert.status === 'ativo' ? 'Ativo' : 'Resolvido'}
                    </span>
                    <strong className="alert-item-title">{alert.titulo}</strong>
                  </div>
                  <span className="alert-item-timestamp">{alert.data}</span>
                </div>

                <p className="alert-item-description">{alert.descricao}</p>

                <div className="alert-meta-footer">
                  <div className="alert-details-tags">
                    <span className="alert-tag">📍 {alert.localizacao}</span>
                    <span className="alert-tag">🍇 {alert.cultura}</span>
                    {alert.canais.map((c, i) => (
                      <span key={i} className="alert-channel-chip">
                        ✓ {c}
                      </span>
                    ))}
                  </div>

                  {alert.status === 'ativo' && (
                    <div className="alert-actions-group">
                      <button
                        type="button"
                        className="btn-resolve-alert"
                        onClick={() => handleResolve(alert.id)}
                      >
                        Reconhecer & Resolver
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
