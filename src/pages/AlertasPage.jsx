import React, { useEffect, useState } from 'react';
import TopHeader from '../components/TopHeader';
import { getAlertas, resolverAlerta } from '../services/alertasService';

export default function AlertasPage() {
  const [activeTab, setActiveTab] = useState('todos');
  const [alerts, setAlerts] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let ativo = true;
    getAlertas()
      .then((lista) => ativo && setAlerts(lista))
      .catch((e) => ativo && setErro(e.friendlyMessage || e.message))
      .finally(() => ativo && setCarregando(false));
    return () => {
      ativo = false;
    };
  }, []);

  const handleResolve = async (id) => {
    try {
      await resolverAlerta(id);
      setAlerts((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: 'resolvido', tipo: 'resolvido' } : a))
      );
    } catch (e) {
      setErro(e.friendlyMessage || e.message);
    }
  };

  const abertos = alerts.filter((a) => a.status === 'ativo');
  const resolvidos = alerts.filter((a) => a.status === 'resolvido');
  const pctResolvidos = alerts.length ? Math.round((100 * resolvidos.length) / alerts.length) : null;
  const temCritico = abertos.some((a) => a.tipo === 'critico');
  const dataHoje = new Date().toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Recife',
  });

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
        dateText={dataHoje}
      />

      {/* ── Top 4 KPI Cards ── */}
      <section className="dash-kpi-grid">
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">ALERTAS ATIVOS</span>
            {abertos.length > 0 && (
              <span className={`badge-pill ${temCritico ? 'badge-red' : 'badge-amber'}`}>
                {temCritico ? 'Crítico' : 'Atenção'}
              </span>
            )}
          </div>
          <div className="dash-kpi-body">
            <span className="kpi-hero-number">{abertos.length}</span>
            <div className="kpi-icon-box-peach">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
          </div>
          <div className="dash-kpi-footer">
            <span className="kpi-footer-sub">
              {abertos.length === 0
                ? 'Nenhum alerta em aberto'
                : `${abertos.filter((a) => a.reativo).length} por leitura · ${abertos.filter((a) => a.preditivo).length} preditivos`}
            </span>
          </div>
        </div>

        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">ALERTAS RESOLVIDOS</span>
            {pctResolvidos !== null && <span className="badge-pill badge-green">{pctResolvidos}% do total</span>}
          </div>
          <div className="dash-kpi-body">
            <span className="kpi-hero-number">{resolvidos.length}</span>
            <div className="kpi-icon-ring-wrap">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
          </div>
          <div className="dash-kpi-footer">
            <span className="kpi-footer-sub">{alerts.length} alertas no histórico recente</span>
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
          {carregando && <p>Carregando alertas...</p>}
          {erro && <p style={{ color: '#b91c1c' }}>{erro}</p>}
          {!carregando && !erro && filteredAlerts.length === 0 && <p>Nenhum alerta nesta categoria.</p>}
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
                    {alert.lote && <span className="alert-tag">🍇 Lote #{alert.lote}</span>}
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