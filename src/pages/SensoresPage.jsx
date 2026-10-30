import React, { useState } from 'react';
import TopHeader from '../components/TopHeader';

export default function SensoresPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const channelDataMap = {
    '246901': {
      label: 'Lote 1 • Uva Niágara (Talhão A1)',
      soilPath: 'M 40 70 Q 200 60 380 90 T 580 80 T 740 75',
      soilArea: 'M 40 70 Q 200 60 380 90 T 580 80 T 740 75 L 740 160 L 40 160 Z',
      tempPath: 'M 40 120 Q 220 110 400 65 T 560 50 T 740 110',
      peakText: 'PICO 31.2°C às 13:45',
      peakX: 560,
      peakY: 50,
      tempSoloAr: '{curChannel.tempSoloAr}',
      umidSoloAr: '{curChannel.umidSoloAr}',
      entry: '#14.892',
    },
    '246902': {
      label: 'Lote 2 • Uva Crimson (Talhão A2)',
      soilPath: 'M 40 95 Q 200 85 380 110 T 580 100 T 740 92',
      soilArea: 'M 40 95 Q 200 85 380 110 T 580 100 T 740 92 L 740 160 L 40 160 Z',
      tempPath: 'M 40 110 Q 220 100 400 55 T 560 38 T 740 105',
      peakText: 'PICO 32.8°C às 14:10',
      peakX: 560,
      peakY: 38,
      tempSoloAr: '25.8°C / 31.5°C',
      umidSoloAr: '37.8% / 52.0%',
      entry: '#14.589',
    },
    '246903': {
      label: 'Lote 3 • Thompson Seedless (Talhão B1)',
      soilPath: 'M 40 55 Q 200 50 380 65 T 580 60 T 740 58',
      soilArea: 'M 40 55 Q 200 50 380 65 T 580 60 T 740 58 L 740 160 L 40 160 Z',
      tempPath: 'M 40 130 Q 220 120 400 80 T 560 65 T 740 120',
      peakText: 'PICO 29.4°C às 13:15',
      peakX: 560,
      peakY: 65,
      tempSoloAr: '23.8°C / 26.5°C',
      umidSoloAr: '52.1% / 66.4%',
      entry: '#11.204',
    },
  };
  const curChannel = channelDataMap[selectedChannel] || channelDataMap['246901'];

  const sensores = [
    {
      id: 'SNS-SL-001',
      sub: 'Id_sensor: 1 • Sonda FDR Solo A1',
      tipo: 'FDR Capacitivo • Solo',
      lote: 'Lote 1 (Talhão A1)',
      fruta: 'Uva Niágara',
      canal: 'Ch 246901',
      entry: '#14.892',
      leitura: '48.2% solo • 24.5°C solo',
      leituraAmbiente: '28.1°C ar • 59% umid.',
      status: 'Ativo',
    },
    {
      id: 'SNS-AR-002',
      sub: 'Id_sensor: 2 • Estação Microclima A1',
      tipo: 'BHT22/DHT21 • Ar',
      lote: 'Lote 1 (Talhão A1)',
      fruta: 'Uva Niágara',
      canal: 'Ch 246901',
      entry: '#14.892',
      leitura: '28.1°C ar • 59.4% umid.',
      leituraAmbiente: 'temp_solo vinculada: 24.5°C',
      status: 'Ativo',
    },
    {
      id: 'SNS-SL-003',
      sub: 'Id_sensor: 3 • Sonda FDR Solo A2',
      tipo: 'TDR Analítico • Solo',
      lote: 'Lote 2 (Talhão A2)',
      fruta: 'Uva Crimson',
      canal: 'Ch 246902',
      entry: '#14.589',
      leitura: '37.8% solo • 25.8°C solo',
      leituraAmbiente: '31.5°C ar • 52% umid.',
      status: 'Ativo',
    },
    {
      id: 'SNS-SL-025',
      sub: 'Id_sensor: 25 • Sonda Bancada Teste',
      tipo: 'FDR Calibração • Solo',
      lote: 'Lote 3 (Talhão B1)',
      fruta: 'Thompson Seedless',
      canal: 'Ch 246903',
      entry: '#11.204',
      leitura: '-- / --',
      leituraAmbiente: 'Pivot pausado para calibração',
      status: 'Inativo',
    },
  ];

  return (
    <div className="dashboard-container sensores-analista-page">
      {/* ── Top Header ── */}
      <TopHeader
        title="Sensores & Telemetria de Campo"
        subtitle="Monitoramento contínuo de nós sensores, calibração FDR e streaming via ThingSpeak IoT."
        showResumidoToggle={false}
        dateText="22 de setembro de 2026"
      />

      {/* ── Header Badge Sync Bar ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '-10px', marginBottom: '8px' }}>
        <span className="badge-pill badge-green-soft-chip" style={{ fontSize: '0.78rem', padding: '4px 12px' }}>
          ● ThingSpeak IoT Sync a cada 5m • Tabela leitura_climatica
        </span>
      </div>

      {/* ── 4 Top KPI Cards ── */}
      <section className="dash-kpi-grid">
        {/* KPI 1: Sensores Ativos */}
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">SENSORES ATIVOS (SENSOR)</span>
            <div className="kpi-icon-pill icon-teal-pill">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
                <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                <circle cx="12" cy="12" r="2" />
                <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
              </svg>
            </div>
          </div>
          <div className="kpi-hero-number-with-sub" style={{ marginTop: 8 }}>
            <span className="kpi-hero-number">24/26</span>
            <span className="kpi-sub-unit">status = 'ativo'</span>
          </div>
          <div className="kpi-exact-footer" style={{ marginTop: 12 }}>
            <span className="kpi-footer-meta">(O12 Ar + 12 Solo)</span>
            <span className="amber-text-bold">2 inativos</span>
          </div>
        </div>

        {/* KPI 2: Umidade Climatica */}
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">UMIDADE (LEITURA_CLIMATICA)</span>
            <div className="kpi-icon-pill icon-green-pill">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </div>
          </div>
          <div className="kpi-hero-number-with-sub" style={{ marginTop: 8 }}>
            <span className="kpi-hero-number">46,8%</span>
            <span className="kpi-sub-unit">umidade_solo méd.</span>
          </div>
          {/* Mini sparkline */}
          <div style={{ height: 20, width: '100%', margin: '6px 0' }}>
            <svg viewBox="0 0 100 20" style={{ width: '100%', height: '100%' }}>
              <path d="M 0 14 Q 25 10 50 12 T 100 4" fill="none" stroke="#10b981" strokeWidth="2" />
            </svg>
          </div>
          <div className="kpi-exact-footer">
            <span className="kpi-footer-meta">Solo: <strong>46.8%</strong></span>
            <span className="kpi-footer-meta">Ar: <strong>61.2%</strong> (Ambiente)</span>
          </div>
        </div>

        {/* KPI 3: Temperatura */}
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">TEMPERATURA (AR & SOLO)</span>
            <div className="kpi-icon-pill icon-blue-pill">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2">
                <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
              </svg>
            </div>
          </div>
          <div className="kpi-hero-number-with-sub" style={{ marginTop: 8 }}>
            <span className="kpi-hero-number">+27,4°C</span>
            <span className="kpi-sub-unit">temperatura [ar]</span>
          </div>
          <div className="kpi-exact-footer" style={{ marginTop: 12 }}>
            <span className="kpi-footer-meta">temperatura_solo: <strong>24.1°C</strong></span>
            <span className="kpi-footer-meta blue-text">Delta: 3.3°C</span>
          </div>
        </div>

        {/* KPI 4: Ingestao & Rejeicao */}
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">INGESTÃO & REJEIÇÃO</span>
            <div className="kpi-icon-pill icon-green-pill">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
          <div className="kpi-hero-number-with-sub" style={{ marginTop: 8 }}>
            <span className="kpi-hero-number">99.8%</span>
            <span className="kpi-sub-unit">taxa sucesso</span>
          </div>
          <div className="kpi-exact-footer" style={{ marginTop: 12 }}>
            <span className="kpi-footer-meta">ThingSpeak API: Rejeitados: <strong>2 hoje</strong></span>
            <span className="kpi-footer-meta">entry_id verificado: <strong>alertas ativos: 2</strong></span>
          </div>
        </div>
      </section>

      {/* ── Middle: Correlação Multidimensional: Leitura Climática ── */}
      <div className="dash-white-card" style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <h2 className="card-headline-clean" style={{ fontSize: '1.05rem' }}>
              Correlação Multidimensional: Leitura Climática
            </h2>
            <p className="card-muted-desc">
              Série temporal de leitura_climatica: temperatura vs umidade e temperatura_solo vs umidade_solo
            </p>
          </div>
          <select
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
            className="alertas-select"
            style={{ fontWeight: 700 }}
          >
            <option value="246901">Lote 1 • Uva Niágara (Channel 246901)</option>
            <option value="246902">Lote 2 • Uva Crimson (Channel 246902)</option>
            <option value="246903">Lote 3 • Thompson Seedless (Channel 246903)</option>
          </select>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '0.8rem', color: '#475569', marginBottom: 12 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
            umidade_solo (%)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0284C7' }} />
            temperatura (°C - ar)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0D9488' }} />
            umidade (ar)
          </span>
          <span style={{ marginLeft: 'auto', fontSize: '0.74rem', color: '#64748B' }}>24h (ThingSpeak)</span>
        </div>

        {/* Big Multidimensional SVG Chart */}
        <div style={{ width: '100%', height: 200, position: 'relative', background: '#F8FAFC', borderRadius: 8, padding: 12 }}>
          <svg viewBox="0 0 800 180" style={{ width: '100%', height: '100%' }} preserveAspectRatio="none">
            <defs>
              <linearGradient id="greenFillGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Threshold lines */}
            <line x1="40" y1="50" x2="760" y2="50" stroke="#CBD5E1" strokeDasharray="3 3" />
            <text x="765" y="53" fill="#64748B" fontSize="9">Capacidade de Campo (80%)</text>

            <line x1="40" y1="130" x2="760" y2="130" stroke="#FCA5A5" strokeDasharray="3 3" />
            <text x="765" y="133" fill="#DC2626" fontSize="9">Ponto de Murcha (20%)</text>

            {/* Curve 1: Umidade Solo (green filled) */}
            <path
              d={curChannel.soilArea}
              fill="url(#greenFillGrad)"
            />
            <path
              d={curChannel.soilPath}
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
            />

            {/* Curve 2: Temperatura Ar (blue) */}
            <path
              d={curChannel.tempPath}
              fill="none"
              stroke="#0284c7"
              strokeWidth="2.5"
            />

            {/* Peak point indicator */}
            <circle cx={curChannel.peakX} cy={curChannel.peakY} r="5" fill="#0284c7" stroke="#FFFFFF" strokeWidth="2" />
            <rect x={curChannel.peakX - 44} y={curChannel.peakY - 26} width="92" height="18" rx="4" fill="#0F172A" />
            <text x={curChannel.peakX + 2} y={curChannel.peakY - 14} fill="#FFFFFF" fontSize="8.5" fontWeight="700" textAnchor="middle">{curChannel.peakText}</text>

            {/* Time ticks */}
            <text x="40" y="175" fill="#64748B" fontSize="10">00:00</text>
            <text x="200" y="175" fill="#64748B" fontSize="10">04:00</text>
            <text x="360" y="175" fill="#64748B" fontSize="10">08:00</text>
            <text x="520" y="175" fill="#64748B" fontSize="10">12:00 (Pico Irrigação)</text>
            <text x="660" y="175" fill="#64748B" fontSize="10">16:00</text>
            <text x="740" y="175" fill="#64748B" fontSize="10">20:00 Agora (14:30)</text>
          </svg>
        </div>

        {/* 3 Bottom Summary Pills */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginTop: 14 }}>
          <div className="c-highlight-box">
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A' }}>
              24.1°C / 27.4°C
            </span>
            <span style={{ fontSize: '0.74rem', color: '#64748B' }}>temperatura_solo / ar</span>
          </div>

          <div className="c-highlight-box">
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A' }}>
              46.8% / 61.2%
            </span>
            <span style={{ fontSize: '0.74rem', color: '#64748B' }}>umidade_solo / ar</span>
          </div>

          <div className="c-highlight-box">
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#065F46' }}>
              entry_id {curChannel.entry}
            </span>
            <span style={{ fontSize: '0.74rem', color: '#64748B' }}>ThingSpeak feed verificado</span>
          </div>
        </div>
      </div>

      {/* ── Table: Inventário de Sensores (Tabela sensor & lote) ── */}
      <div className="dash-white-card" style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <h2 className="card-headline-clean" style={{ fontSize: '1.05rem' }}>
              Inventário de Sensores (Tabela sensor & lote)
            </h2>
            <p className="card-muted-desc">
              Relação de nós cadastrados, canais ThingSpeak e últimas medições em leitura_climatica
            </p>
          </div>
          <span className="badge-pill badge-green-light-pill">24 sensores cadastrados</span>
        </div>

        {/* Search Input */}
        <div className="talhoes-search-box" style={{ marginBottom: 14 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="talhoes-search-input"
            placeholder="Filtrar por sensor nome, lote, ambiente ('ar' / 'solo') ou status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="table-wrapper">
          <table className="talhoes-data-table">
            <thead>
              <tr>
                <th>ID / NOME (SENSOR)</th>
                <th>TIPO / AMBIENTE</th>
                <th>LOTE / FRUTA</th>
                <th>CHANNEL THINGSPEAK</th>
                <th>ÚLTIMA LEITURA (LEITURA_CLIMATICA)</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {sensores.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <strong style={{ color: '#0F172A', fontSize: '0.88rem' }}>{s.id}</strong>
                      <span style={{ fontSize: '0.74rem', color: '#64748B' }}>{s.sub}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge-pill badge-green-soft-chip">{s.tipo}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <strong style={{ fontSize: '0.85rem', color: '#1E293B' }}>{s.lote}</strong>
                      <span style={{ fontSize: '0.74rem', color: '#64748B' }}>{s.fruta}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <strong style={{ fontSize: '0.85rem', color: '#0284C7' }}>{s.canal}</strong>
                      <span style={{ fontSize: '0.72rem', color: '#64748B' }}>entry_id: {s.entry}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <strong style={{ fontSize: '0.85rem', color: '#065F46' }}>{s.leitura}</strong>
                      <span style={{ fontSize: '0.72rem', color: '#64748B' }}>{s.leituraAmbiente}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge-pill ${s.status === 'Ativo' ? 'badge-green' : 'badge-amber-exact'}`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="table-footer-row">
          <span className="table-total-txt">Exibindo 1-4 de 24 sensores</span>
          <div className="pagination-group">
            <button type="button" className="btn-page" disabled>Anterior</button>
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
            <button type="button" className="btn-page">Próximo</button>
          </div>
        </div>
      </div>

      {/* ── Bottom: 2 Side-by-Side Cards (Alertas Preditivos + Auditoria) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
        {/* Alertas Preditivos por Sensor */}
        <div className="dash-white-card">
          <div className="config-card-header" style={{ marginBottom: 12 }}>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Alertas Preditivos por Sensor
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#64748B', margin: '2px 0 0' }}>
                Classificação probabilística de estresse hídrico e patológico
              </p>
            </div>
            <span className="badge-pill badge-green-soft-chip">alertas_preditivos</span>
          </div>

          {/* Donut Chart: 92% */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '12px 0' }}>
            <div style={{ position: 'relative', width: 120, height: 120 }}>
              <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
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
                  strokeDasharray="92, 100"
                  strokeLinecap="round"
                />
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <strong style={{ fontSize: '1.3rem', color: '#0F172A', display: 'block', lineHeight: 1 }}>92%</strong>
                <span style={{ fontSize: '0.62rem', color: '#64748B', textTransform: 'uppercase' }}>Precisão (r &gt; 0.84)</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="dot-mini-green" /> Severidade 'baixa' (prob &lt; 0.35)
              </span>
              <strong>22 sensores</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="dot-mini-amber" /> Severidade 'moderada' (0.35 - 0.70)
              </span>
              <strong>2 sensores</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="dot-mini-red" /> Severidade 'alta' (prob &gt; 0.70)
              </span>
              <strong>0 sensores</strong>
            </div>
          </div>

          <div className="c-highlight-box" style={{ marginTop: 14 }}>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#92400E' }}>
                Corte Predição Ativo
              </div>
              <span style={{ fontSize: '0.74rem', color: '#78350F' }}>
                Sensor #07 • prob_risco = 0.58 • Lote 2
              </span>
            </div>
            <span className="badge-pill badge-amber-exact" style={{ marginLeft: 'auto' }}>Moderada</span>
          </div>
        </div>

        {/* Auditoria & Leituras Rejeitadas */}
        <div className="dash-white-card">
          <div className="config-card-header" style={{ marginBottom: 12 }}>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Auditoria & Leituras Rejeitadas
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#64748B', margin: '2px 0 0' }}>
                Descartes por inconsistência física ou falha de canal ThingSpeak
              </p>
            </div>
            <span className="badge-pill badge-green-soft-chip">leitura_rejeitada</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div className="correlacao-insight-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '0.84rem', color: '#DC2626' }}>temperatura_bruta &gt; 60°C</strong>
                <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Hoje 14:12</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#475569', margin: '2px 0' }}>
                Motivo: Outlier de sensor térmico (78.4°C) • Sensor #02 • Ar • Ch 246901
              </p>
              <span style={{ fontSize: '0.72rem', color: '#0284C7' }}>umidade_limiar: 52%</span>
            </div>

            <div className="correlacao-insight-box">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '0.84rem', color: '#DC2626' }}>umidade_bruta &lt; 0%</strong>
                <span style={{ fontSize: '0.72rem', color: '#64748B' }}>Ontem 22:40</span>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#475569', margin: '2px 0' }}>
                Motivo: Leitura analógica corrompida (-4.2%) • Sensor #14 • Solo • Ch 246903
              </p>
              <span style={{ fontSize: '0.72rem', color: '#0284C7' }}>temp_banco: 23.1°C</span>
            </div>

            <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 6, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem', color: '#1E3A8A' }}>
                Limiares Preditivos ATIVOS: Corte: probabilidade_risco &gt;= 0.50 = Severidade moderada
              </span>
              <strong style={{ fontSize: '0.82rem', color: '#1D4ED8' }}>1 corte ativo</strong>
            </div>

            <button type="button" className="btn-serie-historica" style={{ marginTop: 4 }}>
              Log de Ingestão ThingSpeak →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
