import React, { useState } from 'react';

export default function ConfiguracaoPage() {
  // Interactive Settings State
  const [rainCompensation, setRainCompensation] = useState(true);
  const [telemetryAlert, setTelemetryAlert] = useState(true);
  const [weeklyCalibration, setWeeklyCalibration] = useState(true);
  const [tempUnit, setTempUnit] = useState('C'); // 'C' or 'F'
  const [irrigationUnit, setIrrigationUnit] = useState('L'); // 'L' or 'm3'
  const [pushNotification, setPushNotification] = useState(true);
  const [dailyEmail, setDailyEmail] = useState(true);
  const [interval, setInterval] = useState('5min');

  return (
    <div className="dashboard-container config-page-container">
      {/* ── Top Header ── */}
      <header className="dash-top-header">
        <div className="dash-top-title-col">
          <h1 className="dash-main-heading">Configurações do Sistema</h1>
          <p className="dash-main-subtext">
            Gerencie preferências da fazenda, parâmetros de sensores, notificações e acessos.
          </p>
        </div>

        <div className="dash-top-actions">
          {/* Date Selector Pill */}
          <div className="dash-date-pill">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>22 de setembro de 2026</span>
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
              <span className="dash-profile-role">Gestora</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main Layout: 3 Columns ── */}
      <div className="config-grid-layout">
        {/* ── Column 1 (Left): Informações da Propriedade + Regras e Gatilhos ── */}
        <div className="config-col-left">
          {/* Card 1: Informações da Propriedade */}
          <div className="dash-white-card config-card-property">
            <div className="card-header-row">
              <div className="config-header-left">
                <div className="config-icon-badge badge-green-light">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                </div>
                <div>
                  <h2 className="config-card-title uppercase-title">INFORMAÇÕES DA PROPRIEDADE</h2>
                  <p className="config-card-sub">Dados cadastrais e zoneamento</p>
                </div>
              </div>
              <span className="badge-pill badge-green dot-inside">
                <span className="dot-mini-green" /> Ativo
              </span>
            </div>

            {/* Farm Banner with Photo */}
            <div className="farm-photo-banner">
              <img
                src="/fazenda_raiztech_banner.jpg"
                alt="Fazenda RaizTech"
                className="farm-banner-img"
              />
              <div className="farm-banner-overlay">
                <div className="farm-name-tag">
                  <span className="dot-mini-green" />
                  <span>Fazenda RaizTech - Polo Sul</span>
                </div>
                <div className="farm-gps-tag">
                  <span>GPS: -21.1775, -47.8103</span>
                </div>
              </div>
            </div>

            {/* Property Stats */}
            <div className="farm-stats-row">
              <div className="farm-stat-col">
                <span className="farm-stat-label">ÁREA MONITORADA</span>
                <div className="farm-stat-val">
                  <strong>1.250 ha</strong> <span className="stat-parentheses">(8 talhões)</span>
                </div>
              </div>
              <div className="farm-stat-col">
                <span className="farm-stat-label">CLASSIFICAÇÃO DE SOLO</span>
                <div className="farm-stat-val">
                  <strong>Latossolo Vermelho</strong>
                </div>
              </div>
            </div>

            {/* Active Cultures */}
            <div className="farm-cultures-section">
              <span className="farm-stat-label">CULTURAS ATIVAS EM MONITORAMENTO</span>
              <div className="cultures-tags-row">
                <span className="culture-pill pill-green">
                  <span className="culture-emoji">🍇</span> Uva
                </span>
                <span className="culture-pill pill-amber">
                  <span className="culture-emoji">🍓</span> Morango
                </span>
                <span className="culture-pill pill-green">
                  <span className="culture-emoji">🥬</span> Hortaliças Orgânicas
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <button type="button" className="btn-edit-farm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              <span>Editar dados da fazenda</span>
            </button>
          </div>

          {/* Card 4: Regras e Gatilhos de Alerta */}
          <div className="dash-white-card config-card-alerts">
            <div className="card-header-row">
              <div className="config-header-left">
                <div className="config-icon-badge badge-amber-light">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div>
                  <h2 className="config-card-title">Regras e Gatilhos de Alerta</h2>
                  <p className="config-card-sub">Limiares críticos para disparos de emergência</p>
                </div>
              </div>
              <span className="header-meta-txt">2 Alertas ativos</span>
            </div>

            {/* Alert Rule 1 */}
            <div className="alert-rule-row">
              <div className="alert-rule-info">
                <div className="alert-rule-title-line">
                  <span className="dot-mini-amber" />
                  <strong>Temperatura Máxima do Ar</strong>
                </div>
                <span className="alert-rule-sub">Estresse térmico da lavoura</span>
              </div>
              <div className="alert-rule-right">
                <span className="alert-condition-val">&gt; 32°C</span>
                <span className="badge-pill badge-amber">Alerta Moderado</span>
              </div>
            </div>

            {/* Alert Rule 2 */}
            <div className="alert-rule-row">
              <div className="alert-rule-info">
                <div className="alert-rule-title-line">
                  <span className="dot-mini-red" />
                  <strong>Ponto de Murcha (Solo)</strong>
                </div>
                <span className="alert-rule-sub">Déficit hídrico severo</span>
              </div>
              <div className="alert-rule-right">
                <span className="alert-condition-val">&lt; 40%</span>
                <span className="badge-pill badge-red">Crítico</span>
              </div>
            </div>

            {/* Notification Channels */}
            <div className="notification-channels-section">
              <span className="channels-section-title">Canais de Notificação Direta</span>

              <label className="channel-checkbox-item">
                <input
                  type="checkbox"
                  checked={pushNotification}
                  onChange={(e) => setPushNotification(e.target.checked)}
                  className="channel-chk"
                />
                <span className="channel-chk-custom">✓</span>
                <span className="channel-chk-label">Notificações Push</span>
                <span className="badge-pill badge-green channel-badge">Em tempo real</span>
              </label>

              <label className="channel-checkbox-item">
                <input
                  type="checkbox"
                  checked={dailyEmail}
                  onChange={(e) => setDailyEmail(e.target.checked)}
                  className="channel-chk"
                />
                <span className="channel-chk-custom">✓</span>
                <span className="channel-chk-label">Relatório Diário Matinal por E-mail</span>
                <span className="badge-pill badge-grey channel-badge">05:30 AM</span>
              </label>
            </div>
          </div>
        </div>

        {/* ── Column 2 (Middle): Equipe e Acessos ── */}
        <div className="config-col-middle">
          <div className="dash-white-card config-card-team">
            <div className="card-header-row">
              <div className="config-header-left">
                <div className="config-icon-badge badge-teal-light">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h2 className="config-card-title">Equipe e Acessos</h2>
              </div>
              <span className="header-meta-txt">3 ativos</span>
            </div>

            {/* Team Members List */}
            <div className="team-members-list">
              {/* Member 1 */}
              <div className="team-member-item">
                <div className="member-avatar avatar-mint">MC</div>
                <div className="member-info-col">
                  <strong className="member-name">Maria Clara</strong>
                  <span className="member-role">Gestora Geral</span>
                </div>
                <span className="badge-pill badge-teal-soft">Total</span>
              </div>

              {/* Member 2 */}
              <div className="team-member-item">
                <div className="member-avatar avatar-blue">CE</div>
                <div className="member-info-col">
                  <strong className="member-name">Carlos Eduardo</strong>
                  <span className="member-role">Agrônomo Chefe</span>
                </div>
                <span className="badge-pill badge-green">Edição</span>
              </div>

              {/* Member 3 */}
              <div className="team-member-item">
                <div className="member-avatar avatar-slate">JP</div>
                <div className="member-info-col">
                  <strong className="member-name">João Pedro</strong>
                  <span className="member-role">Técnico Irrigação</span>
                </div>
                <span className="badge-pill badge-slate">Operador</span>
              </div>
            </div>

            {/* Invite Button */}
            <button type="button" className="btn-invite-operator">
              + Convidar novo operador
            </button>
          </div>
        </div>

        {/* ── Column 3 (Right): Limiares Ideais de Calibração + UNIDADES & PADRÕES ── */}
        <div className="config-col-right">
          {/* Card 3: Limiares Ideais de Calibração */}
          <div className="dash-white-card config-card-calibration">
            <div className="card-header-row">
              <div className="config-header-left">
                <div className="config-icon-badge badge-teal-light">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
                    <line x1="4" y1="21" x2="4" y2="14" />
                    <line x1="4" y1="10" x2="4" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12" y2="3" />
                    <line x1="20" y1="21" x2="20" y2="16" />
                    <line x1="20" y1="12" x2="20" y2="3" />
                    <line x1="1" y1="14" x2="7" y2="14" />
                    <line x1="9" y1="8" x2="15" y2="8" />
                    <line x1="17" y1="16" x2="23" y2="16" />
                  </svg>
                </div>
                <h2 className="config-card-title">Limiares Ideais de Calibração</h2>
              </div>
              <span className="badge-pill badge-green dot-inside">
                <span className="dot-mini-green" /> 24 Conectados
              </span>
            </div>

            {/* Sub-header */}
            <div className="calibration-sub-header">
              <div className="config-icon-badge badge-teal-mini">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </div>
              <div>
                <h3 className="sub-header-title">CALIBRAÇÃO DE SENSORES</h3>
                <p className="sub-header-desc">Faixas de controle e telemetria</p>
              </div>
            </div>

            {/* Calibration Sliders */}
            <div className="calibration-sliders-group">
              {/* Slider 1: Umidade do Solo Alvo */}
              <div className="calib-slider-item">
                <div className="calib-top-line">
                  <div className="calib-label-dot">
                    <span className="dot-mini-green" />
                    <strong>Umidade do Solo Alvo</strong>
                  </div>
                  <div className="calib-val-range">
                    <span className="range-highlight">50% - 70%</span>
                    <span className="range-actual">(Atual: 58%)</span>
                  </div>
                </div>

                <div className="calib-range-track-wrap">
                  <div className="calib-multi-track">
                    <div className="track-segment track-grey-left" style={{ width: '45%' }} />
                    <div className="track-segment track-green-active" style={{ width: '30%' }}>
                      <span className="track-active-label">Faixa Ideal (50-70%)</span>
                    </div>
                    <div className="track-segment track-grey-right" style={{ width: '25%' }} />
                  </div>
                  <div className="calib-track-labels">
                    <span>Seco (&lt;30%)</span>
                    <span>Saturado (&gt;80%)</span>
                  </div>
                </div>
              </div>

              {/* Slider 2: Temperatura Máxima Tolerada */}
              <div className="calib-slider-item">
                <div className="calib-top-line">
                  <div className="calib-label-dot">
                    <span className="dot-mini-amber" />
                    <strong>Temperatura Máxima Tolerada</strong>
                  </div>
                  <div className="calib-val-range">
                    <span className="range-highlight-amber">32°C</span>
                    <span className="range-actual">(Gatilho: 30°C)</span>
                  </div>
                </div>

                <div className="calib-range-track-wrap">
                  <div className="calib-multi-track">
                    <div className="track-segment track-grey-left" style={{ width: '25%' }} />
                    <div className="track-segment track-amber-active" style={{ width: '55%' }}>
                      <span className="track-active-label">Ideal 22-28°C</span>
                    </div>
                    <div className="track-segment track-red-end" style={{ width: '20%' }} />
                  </div>
                  <div className="calib-track-labels">
                    <span>Mínima 18°C</span>
                    <span className="red-label">Crítico &gt;32°C</span>
                  </div>
                </div>
              </div>

              {/* Slider 3: Nutrientes do Solo (NPK) */}
              <div className="calib-slider-item">
                <div className="calib-top-line">
                  <div className="calib-label-dot">
                    <span className="dot-mini-purple" />
                    <strong>Nutrientes do Solo (NPK)</strong>
                  </div>
                  <div className="calib-val-range">
                    <span className="range-highlight-purple">80 - 95 ppm</span>
                    <span className="range-actual">(88 ppm)</span>
                  </div>
                </div>

                <div className="calib-range-track-wrap">
                  <div className="calib-multi-track">
                    <div className="track-segment track-grey-left" style={{ width: '35%' }} />
                    <div className="track-segment track-purple-active" style={{ width: '38%' }}>
                      <span className="track-active-label">Adequado (80-95 ppm)</span>
                    </div>
                    <div className="track-segment track-grey-right" style={{ width: '27%' }} />
                  </div>
                  <div className="calib-track-labels">
                    <span>Baixo (&lt;80)</span>
                    <span>Excesso (&gt;110)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Interactive Toggle Switches */}
            <div className="toggles-list-section">
              {/* Toggle 1 */}
              <div className="toggle-switch-row" onClick={() => setRainCompensation(!rainCompensation)}>
                <div className="toggle-text-col">
                  <strong>Compensação por previsão de chuva</strong>
                  <p>Evita irrigação caso haja probabilidade &gt; 60%</p>
                </div>
                <div className={`switch-pill ${rainCompensation ? 'switch-on' : 'switch-off'}`}>
                  <span className="switch-knob" />
                </div>
              </div>

              {/* Toggle 2 */}
              <div className="toggle-switch-row" onClick={() => setTelemetryAlert(!telemetryAlert)}>
                <div className="toggle-text-col">
                  <strong>Alerta de perda de telemetria</strong>
                  <p>Notificar se sensor ficar inativo por mais de 15 min</p>
                </div>
                <div className={`switch-pill ${telemetryAlert ? 'switch-on' : 'switch-off'}`}>
                  <span className="switch-knob" />
                </div>
              </div>

              {/* Toggle 3 */}
              <div className="toggle-switch-row" onClick={() => setWeeklyCalibration(!weeklyCalibration)}>
                <div className="toggle-text-col">
                  <strong>Auto-calibração semanal</strong>
                  <p>Ajuste de zero dos sensores capacitivos</p>
                </div>
                <div className={`switch-pill ${weeklyCalibration ? 'switch-on' : 'switch-off'}`}>
                  <span className="switch-knob" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: UNIDADES & PADRÕES */}
          <div className="dash-white-card config-card-units">
            <div className="card-header-row">
              <div className="config-header-left">
                <div className="config-icon-badge badge-teal-light">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
                    <line x1="4" y1="21" x2="4" y2="14" />
                    <line x1="4" y1="10" x2="4" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12" y2="3" />
                    <line x1="20" y1="21" x2="20" y2="16" />
                    <line x1="20" y1="12" x2="20" y2="3" />
                  </svg>
                </div>
                <div>
                  <h2 className="config-card-title uppercase-title">UNIDADES & PADRÕES</h2>
                  <p className="config-card-sub">Formatação métrica e frequências</p>
                </div>
              </div>
              <span className="badge-pill badge-grey">SI [Métrico]</span>
            </div>

            {/* Setting 1: Temperature Unit */}
            <div className="unit-setting-block">
              <div className="unit-label-line">
                <span className="unit-label">UNIDADE DE TEMPERATURA</span>
                <span className="unit-std-badge">Padrão ABNT</span>
              </div>

              <div className="segmented-two-pill">
                <button
                  type="button"
                  className={`segment-btn ${tempUnit === 'C' ? 'active' : ''}`}
                  onClick={() => setTempUnit('C')}
                >
                  {tempUnit === 'C' && <span className="dot-mini-green" />}
                  <span>°C (Celsius)</span>
                </button>
                <button
                  type="button"
                  className={`segment-btn ${tempUnit === 'F' ? 'active' : ''}`}
                  onClick={() => setTempUnit('F')}
                >
                  {tempUnit === 'F' && <span className="dot-mini-green" />}
                  <span>°F (Fahrenheit)</span>
                </button>
              </div>
            </div>

            {/* Setting 2: Irrigation Volume */}
            <div className="unit-setting-block">
              <div className="unit-label-line">
                <span className="unit-label">VOLUME DE IRRIGAÇÃO</span>
                <span className="unit-sub-grey">Taxa por hectare</span>
              </div>

              <div className="segmented-two-pill">
                <button
                  type="button"
                  className={`segment-btn ${irrigationUnit === 'L' ? 'active' : ''}`}
                  onClick={() => setIrrigationUnit('L')}
                >
                  {irrigationUnit === 'L' && <span className="dot-mini-green" />}
                  <span>Litros (L)</span>
                </button>
                <button
                  type="button"
                  className={`segment-btn ${irrigationUnit === 'm3' ? 'active' : ''}`}
                  onClick={() => setIrrigationUnit('m3')}
                >
                  {irrigationUnit === 'm3' && <span className="dot-mini-green" />}
                  <span>m³ (Metros cúbicos)</span>
                </button>
              </div>
            </div>

            {/* Setting 3: LoRaWAN Telemetry Interval */}
            <div className="unit-setting-block">
              <span className="unit-label">INTERVALO DE TELEMETRIA LORAWAN</span>
              <div className="dropdown-select-pill">
                <select
                  value={interval}
                  onChange={(e) => setInterval(e.target.value)}
                  className="native-select-overlay"
                >
                  <option value="1min">A cada 1 minuto (Modo Teste)</option>
                  <option value="5min">A cada 5 minutos (Recomendado - Alta Precisão)</option>
                  <option value="15min">A cada 15 minutos (Econômico)</option>
                  <option value="30min">A cada 30 minutos (Bateria Longa Duração)</option>
                </select>
                <span className="select-display-txt">
                  {interval === '5min'
                    ? 'A cada 5 minutos (Recomendado - Alta Precisão)'
                    : interval === '1min'
                    ? 'A cada 1 minuto (Modo Teste)'
                    : interval === '15min'
                    ? 'A cada 15 minutos (Econômico)'
                    : 'A cada 30 minutos (Bateria Longa Duração)'}
                </span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>

            {/* Timezone Footer */}
            <div className="config-footer-timezone">
              <span className="tz-check">✓</span>
              <span>Fuso horário: <strong>America/Sao_Paulo (UTC-3)</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
