import React, { useState } from 'react';
import TopHeader from '../components/TopHeader';

export default function RedeEsp32Page() {
  const [filterType, setFilterType] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  const sensoresInventario = [
    {
      code: '#SNS-SL-01',
      num: '#01',
      talhao: 'Talhão A1 • Uva Vitória',
      lote: 'id_lote: 1',
      ambiente: 'Ambiente: Solo (FDR)',
      channelId: '246901',
      status: 'Ativo',
    },
    {
      code: '#SNS-AR-02',
      num: '#02',
      talhao: 'Talhão A1 • Microclima',
      lote: 'id_lote: 1',
      ambiente: 'Ambiente: Ar (Temp/Umid)',
      channelId: '248902',
      status: 'Ativo',
    },
    {
      code: '#SNS-SL-03',
      num: '#03',
      talhao: 'Talhão B2 • Uva Thompson',
      lote: 'id_lote: 2',
      ambiente: 'Ambiente: Solo (FDR)',
      channelId: '248905',
      status: 'Ativo',
    },
  ];

  return (
    <div className="dashboard-container rede-esp32-page">
      {/* ── Top Header ── */}
      <TopHeader
        title="Rede ESP32 & Topologia"
        subtitle="Mapeamento espacial de nós sensores LoRaWAN, enlaces de radiofrequência e telemetria de sinal."
        showResumidoToggle={false}
        dateText="22 de setembro de 2026"
      />

      {/* ── Subheader Sync Bar ── */}
      <div className="gateway-status-bar" style={{ marginTop: '-8px', marginBottom: '8px' }}>
        <div className="gateway-status-left" style={{ flexWrap: 'wrap' }}>
          <span className="dot-mini-green" />
          <strong style={{ fontSize: '0.84rem', color: '#0F172A' }}>
            Gateway Petrolina-04 Conectado
          </strong>
          <span className="gateway-sep">•</span>
          <span style={{ fontSize: '0.82rem', color: '#475569' }}>
            US915 (Canal 915 MHz)
          </span>
          <span className="gateway-sep">•</span>
          <span style={{ fontSize: '0.82rem', color: '#475569' }}>
            24 Sensores Ativos
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
            Exportar (CSV)
          </button>
        </div>
      </div>

      {/* ── 4 Top KPI Cards ── */}
      <section className="dash-kpi-grid">
        {/* KPI 1: DISPONIBILIDADE DA REDE */}
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">DISPONIBILIDADE DA REDE</span>
            <span className="badge-pill badge-green" style={{ fontSize: '0.72rem' }}>
              ● Excelente
            </span>
          </div>
          <div className="kpi-hero-number-with-sub" style={{ marginTop: 6 }}>
            <span className="kpi-hero-number">96%</span>
            <span className="kpi-sub-unit" style={{ fontSize: '0.84rem' }}>
              24 de 25 nós ativos
            </span>
          </div>
          <div className="kpi-exact-footer" style={{ marginTop: 12 }}>
            <span className="kpi-footer-meta">Latência média: <strong>118 ms</strong></span>
            <span className="badge-pill badge-green" style={{ fontSize: '0.72rem' }}>Mesh OK</span>
          </div>
        </div>

        {/* KPI 2: SENSORES POR AMBIENTE */}
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">SENSORES POR AMBIENTE</span>
            <div className="kpi-icon-pill icon-teal-pill">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
                <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                <circle cx="12" cy="12" r="2" />
                <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
              </svg>
            </div>
          </div>
          <div className="kpi-hero-number-with-sub" style={{ marginTop: 6 }}>
            <span className="kpi-hero-number">24</span>
            <span className="kpi-sub-unit" style={{ fontSize: '0.84rem' }}>instalados em campo</span>
          </div>
          <div className="kpi-exact-footer" style={{ marginTop: 12 }}>
            <span style={{ fontSize: '0.76rem', color: '#0369A1', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span className="dot-blue-light" /> <strong>16</strong> Solo (FDR)
            </span>
            <span style={{ fontSize: '0.76rem', color: '#0C4A6E', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span className="dot-mini-blue" /> <strong>8</strong> Ar (Microclima)
            </span>
          </div>
        </div>

        {/* KPI 3: INGESTÃO THINGSPEAK */}
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">INGESTÃO THINGSPEAK</span>
            <span className="badge-pill badge-blue-pill" style={{ fontSize: '0.72rem', background: '#E0F2FE', color: '#0369A1', border: '1px solid #BAE6FD' }}>
              ■ Estável
            </span>
          </div>
          <div className="kpi-hero-number-with-sub" style={{ marginTop: 6 }}>
            <span className="kpi-hero-number">99.8%</span>
            <span className="kpi-sub-unit" style={{ fontSize: '0.84rem' }}>Taxa de Sucesso</span>
          </div>
          <div className="kpi-exact-footer" style={{ marginTop: 12 }}>
            <span className="kpi-footer-meta">Cadência de lote: <strong>300s (5 min)</strong></span>
            <span className="kpi-footer-meta">Batch Write: <strong>200</strong></span>
          </div>
        </div>

        {/* KPI 4: LEITURAS REJEITADAS */}
        <div className="dash-kpi-card">
          <div className="dash-kpi-header">
            <span className="kpi-label-text">LEITURAS REJEITADAS</span>
            <span className="badge-pill badge-amber-exact" style={{ fontSize: '0.72rem' }}>
              Atenção Leve
            </span>
          </div>
          <div className="kpi-hero-number-with-sub" style={{ marginTop: 6 }}>
            <span className="kpi-hero-number">2</span>
            <span className="kpi-sub-unit" style={{ fontSize: '0.84rem' }}>Descartes hoje</span>
          </div>
          <div className="kpi-exact-footer" style={{ marginTop: 12 }}>
            <span className="kpi-footer-meta" style={{ fontSize: '0.74rem' }}>1 outlier térmico, 1 sinal anl</span>
            <span className="badge-pill badge-green-soft-chip" style={{ fontSize: '0.68rem' }}>Auto-filtro</span>
          </div>
        </div>
      </section>

      {/* ── Middle: Map + Technical Inventory ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: 16, marginTop: 16 }}>
        {/* Left: Topologia Espacial dos Nós LoRaWAN */}
        <div className="dash-white-card" style={{ padding: '20px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h2 className="card-headline-clean" style={{ fontSize: '1rem' }}>
                  Topologia Espacial dos Nós LoRaWAN
                </h2>
                <span className="badge-pill badge-green-soft-chip" style={{ fontSize: '0.72rem' }}>Petrolina 45.0 ha</span>
              </div>
              <p className="card-muted-desc" style={{ fontSize: '0.78rem' }}>
                Distribuição georreferenciada dos nós ESP32 e links de radiofrequência ao Gateway
              </p>
            </div>

            <div className="view-toggle-group">
              <button
                type="button"
                className={`view-toggle-btn ${filterType === 'todos' ? 'active' : ''}`}
                onClick={() => setFilterType('todos')}
              >
                Todos (24)
              </button>
              <button
                type="button"
                className={`view-toggle-btn ${filterType === 'solo' ? 'active' : ''}`}
                onClick={() => setFilterType('solo')}
              >
                Solo (16)
              </button>
              <button
                type="button"
                className={`view-toggle-btn ${filterType === 'ar' ? 'active' : ''}`}
                onClick={() => setFilterType('ar')}
              >
                Ar (8)
              </button>
            </div>
          </div>

          {/* Spatial Map Canvas */}
          <div className="spatial-lora-map-container">
            {/* SVG Network Map */}
            <svg viewBox="0 0 560 260" className="spatial-lora-svg">
              <defs>
                <radialGradient id="meshCenterGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Dark Map Canvas Background with River / Roads simulation */}
              <rect width="560" height="260" fill="#1C2D27" rx="8" />

              {/* River curvature */}
              <path
                d="M 120 0 Q 220 80 340 140 T 560 210"
                fill="none"
                stroke="#243F35"
                strokeWidth="42"
                opacity="0.8"
              />

              {/* Sector Labels */}
              <text x="350" y="110" fill="#4E7A6B" fontSize="9" fontWeight="700">Mandacaru</text>
              <text x="210" y="130" fill="#4E7A6B" fontSize="9" fontWeight="700">Juazeiro</text>

              {/* Talhão Overlay Boxes on top-left */}
              <g transform="translate(14, 14)">
                <rect width="180" height="22" rx="4" fill="rgba(15, 56, 44, 0.85)" stroke="#22543D" />
                <circle cx="10" cy="11" r="3" fill="#10B981" />
                <text x="20" y="14" fill="#D1FAE5" fontSize="8.5" fontWeight="700">Talhão A1: Uva Vitória (12.4 ha)</text>

                <rect y="26" width="180" height="22" rx="4" fill="rgba(15, 56, 44, 0.85)" stroke="#22543D" />
                <circle cx="10" cy="37" r="3" fill="#0EA5E9" />
                <text x="20" y="40" fill="#BAE6FD" fontSize="8.5" fontWeight="700">Talhão B2: Uva Thompson (18.1 ha)</text>

                <rect y="52" width="180" height="22" rx="4" fill="rgba(15, 56, 44, 0.85)" stroke="#22543D" />
                <circle cx="10" cy="63" r="3" fill="#10B981" />
                <text x="20" y="66" fill="#D1FAE5" fontSize="8.5" fontWeight="700">Talhão C1/C2: Manga (14.5 ha)</text>
              </g>

              {/* Mesh center glow around Gateway */}
              <circle cx="250" cy="120" r="85" fill="url(#meshCenterGlow)" />

              {/* LoRa RF Transmission Links (Dashed lines to Gateway) */}
              <line x1="250" y1="120" x2="180" y2="105" stroke="#10B981" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.8" />
              <line x1="250" y1="120" x2="310" y2="95" stroke="#0EA5E9" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.8" />
              <line x1="250" y1="120" x2="335" y2="135" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.8" />
              <line x1="250" y1="120" x2="200" y2="140" stroke="#0EA5E9" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.8" />
              <line x1="250" y1="120" x2="160" y2="130" stroke="#EF4444" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.8" />

              {/* CENTRAL GATEWAY PIN */}
              <g transform="translate(250, 120)">
                <circle r="14" fill="#0F382C" stroke="#10B981" strokeWidth="2" />
                {/* Radio waves icon */}
                <path d="M -5 -2 Q 0 -6 5 -2 M -7 -4 Q 0 -10 7 -4 M 0 2 L 0 5" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
                <rect x="-48" y="16" width="96" height="15" rx="3" fill="#0F382C" stroke="#10B981" strokeWidth="0.8" />
                <text x="0" y="27" fill="#86EFAC" fontSize="7" fontWeight="800" textAnchor="middle">GATEWAY PETROLINA-04</text>
              </g>

              {/* SENSOR NODES */}
              {/* Node N-01 • Solo */}
              <g transform="translate(180, 105)">
                <circle r="8" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
                <rect x="-24" y="10" width="48" height="13" rx="2" fill="#0F172A" />
                <text x="0" y="19" fill="#FFFFFF" fontSize="6.5" fontWeight="700" textAnchor="middle">N-01 • Solo</text>
              </g>

              {/* Node N-02 • Ar */}
              <g transform="translate(310, 95)">
                <circle r="9" fill="#0EA5E9" stroke="#FFFFFF" strokeWidth="1.5" />
                <rect x="-22" y="11" width="44" height="13" rx="2" fill="#0F172A" />
                <text x="0" y="20" fill="#FFFFFF" fontSize="6.5" fontWeight="700" textAnchor="middle">N-02 • Ar</text>
              </g>

              {/* Node N-03 • Atenção */}
              <g transform="translate(335, 135)">
                <circle r="8" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />
                <rect x="-30" y="10" width="60" height="13" rx="2" fill="#78350F" />
                <text x="0" y="19" fill="#FEF3C7" fontSize="6.5" fontWeight="700" textAnchor="middle">N-03 • Atenção</text>
              </g>

              {/* Node N-04 • Solo */}
              <g transform="translate(200, 140)">
                <circle r="8" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
                <rect x="-24" y="10" width="48" height="13" rx="2" fill="#0F172A" />
                <text x="0" y="19" fill="#FFFFFF" fontSize="6.5" fontWeight="700" textAnchor="middle">N-04 • Solo</text>
              </g>

              {/* Node N-05 • Rejeição */}
              <g transform="translate(160, 130)">
                <polygon points="0,-9 9,7 -9,7" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.2" />
                <text x="0" y="5" fill="#FFFFFF" fontSize="8" fontWeight="900" textAnchor="middle">!</text>
                <rect x="-26" y="9" width="52" height="13" rx="2" fill="#991B1B" />
                <text x="0" y="18" fill="#FEE2E2" fontSize="6.5" fontWeight="700" textAnchor="middle">N-05 • Rejeição</text>
              </g>
            </svg>
          </div>

          {/* Map Bottom Legend */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, flexWrap: 'wrap', gap: 8, fontSize: '0.74rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#14532D', fontWeight: 600 }}>
                <span className="dot-mini-green" /> Nós Ativos (22 nós &gt; -85 dBm)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#92400E', fontWeight: 600 }}>
                <span className="dot-mini-amber" /> Atenção / Limiar (2 nós)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#0369A1', fontWeight: 600 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0EA5E9' }} /> Gateway US915 Concentrador
              </span>
            </div>
            <span style={{ color: '#64748B', fontWeight: 600 }}>
              Banda US915 • SF7 • BW 125 kHz
            </span>
          </div>
        </div>

        {/* Right: Inventário Técnico de Sensores */}
        <div className="dash-white-card" style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
            <div>
              <h2 className="card-headline-clean" style={{ fontSize: '1rem' }}>
                Inventário Técnico de Sensores
              </h2>
              <p className="card-muted-desc" style={{ fontSize: '0.78rem' }}>
                Tabela 'sensor' • Lotes vinculados
              </p>
            </div>
            <span className="badge-pill badge-green-light-pill" style={{ fontSize: '0.74rem' }}>
              24 Ativos
            </span>
          </div>

          {/* Search box */}
          <div className="talhoes-search-box" style={{ marginBottom: 12, padding: '6px 10px' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              className="talhoes-search-input"
              placeholder="Buscar sensor, lote ou channel_id..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ fontSize: '0.82rem' }}
            />
          </div>

          {/* Sensor Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
            {sensoresInventario.map((s) => (
              <div key={s.code} className="correlacao-insight-box" style={{ padding: '9px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <strong style={{ fontSize: '0.86rem', color: '#0F172A' }}>{s.code}</strong>
                    <span style={{ fontSize: '0.74rem', color: '#059669', fontWeight: 700 }}>{s.num}</span>
                    <span style={{ fontSize: '0.74rem', color: '#475569' }}>{s.talhao}</span>
                  </div>
                  <span className="badge-pill badge-green" style={{ fontSize: '0.68rem', padding: '2px 7px' }}>
                    {s.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: 2 }}>{s.lote}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.74rem', marginTop: 4, color: '#334155' }}>
                  <span>{s.ambiente}</span>
                  <span style={{ color: '#0284C7', fontWeight: 600 }}>channel_id: {s.channelId}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom: Histórico de Transmissão & Sinal 24h ── */}
      <div className="dash-white-card" style={{ marginTop: 16, padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h3 className="card-headline-clean" style={{ fontSize: '1rem' }}>
                Histórico de Transmissão & Sinal 24h
              </h3>
              <span className="badge-pill badge-green-soft-chip" style={{ fontSize: '0.72rem' }}>
                Média Global do Enlace
              </span>
            </div>
            <p className="card-muted-desc" style={{ fontSize: '0.78rem' }}>
              Variação do RSSI médio (-dBm) e integridade dos pacotes transmitidos por amostragem horária
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: '0.78rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#065F46', fontWeight: 700 }}>
              <span className="dot-mini-green" /> RSSI Médio (-81 dBm)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#0369A1', fontWeight: 700 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0EA5E9' }} /> Integridade PDR (99.8%)
            </span>
          </div>
        </div>

        {/* 24h Wave Signal Chart */}
        <div style={{ width: '100%', height: 160, background: '#F8FAFC', borderRadius: 8, padding: 12, position: 'relative' }}>
          <svg viewBox="0 0 800 130" style={{ width: '100%', height: '100%' }} preserveAspectRatio="none">
            <defs>
              <linearGradient id="signalGreenGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="signalBlueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Time labels above */}
            <text x="30" y="16" fill="#64748B" fontSize="9">00:00</text>
            <text x="160" y="16" fill="#64748B" fontSize="9">04:00</text>
            <text x="300" y="16" fill="#64748B" fontSize="9">08:00 (Irrigação)</text>
            <text x="460" y="16" fill="#64748B" fontSize="9">12:00 (Pico Solar)</text>
            <text x="600" y="16" fill="#64748B" fontSize="9">16:00</text>
            <text x="700" y="16" fill="#64748B" fontSize="9">20:00</text>
            <text x="750" y="16" fill="#065F46" fontSize="9" fontWeight="800">Agora (22:45)</text>

            {/* Green Wave (RSSI) */}
            <path
              d="M 30 75 Q 160 55 300 45 T 460 38 T 600 50 T 750 48 L 750 120 L 30 120 Z"
              fill="url(#signalGreenGrad)"
            />
            <path
              d="M 30 75 Q 160 55 300 45 T 460 38 T 600 50 T 750 48"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
            />

            {/* Blue Wave (PDR Integrity) */}
            <path
              d="M 30 85 Q 160 80 300 90 T 460 82 T 600 95 T 750 80 L 750 120 L 30 120 Z"
              fill="url(#signalBlueGrad)"
            />
            <path
              d="M 30 85 Q 160 80 300 90 T 460 82 T 600 95 T 750 80"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* 3 Bottom Stat Boxes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 14 }}>
          <div className="c-highlight-box">
            <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>
              MARGEM DE SINAL
            </span>
            <strong style={{ fontSize: '1.15rem', color: '#0F172A' }}>+19.2 dBm</strong>
            <span style={{ fontSize: '0.74rem', color: '#059669', fontWeight: 600 }}>Estabilidade excelente</span>
          </div>

          <div className="c-highlight-box">
            <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>
              PERDA DE PACOTES
            </span>
            <strong style={{ fontSize: '1.15rem', color: '#0F172A' }}>0.18%</strong>
            <span style={{ fontSize: '0.74rem', color: '#64748B' }}>Tolerância máxima: 1.5%</span>
          </div>

          <div className="c-highlight-box">
            <span style={{ fontSize: '0.72rem', color: '#64748B', textTransform: 'uppercase', fontWeight: 700 }}>
              THROUGHPUT MÉDIO
            </span>
            <strong style={{ fontSize: '1.15rem', color: '#0F172A' }}>5.47 kbps</strong>
            <span style={{ fontSize: '0.74rem', color: '#0284C7', fontWeight: 600 }}>Alocação 100% nominal</span>
          </div>
        </div>
      </div>
    </div>
  );
}
