import React, { useState } from 'react';
import TopHeader from '../components/TopHeader';
import { useAuth } from '../context/AuthContext';

/* ═══════════════════════════════════════════════════════════════════
   VISÃO ANALISTA (Luiz Felipe) - PARÂMETROS TÉCNICOS & IOT
   ═══════════════════════════════════════════════════════════════════ */
function ConfiguracaoAnalistaView() {
  // Gateway & LoRaWAN States
  const [gatewayId, setGatewayId] = useState('GATEWAY-PETROLINA-04');
  const [freqBanda, setFreqBanda] = useState('US915');
  const [sf, setSf] = useState('SF7');
  const [bandwidth, setBandwidth] = useState('125');
  const [txPower, setTxPower] = useState('+19.2 dBm');
  const [sleepInterval, setSleepInterval] = useState('300');
  const [showKeys, setShowKeys] = useState(false);

  // ThingSpeak API States
  const [channelBancada, setChannelBancada] = useState('3500765');
  const [channelCampo, setChannelCampo] = useState('246901');
  const [writeApiKey, setWriteApiKey] = useState('W8Q9K3L92M7P3Y7Z');
  const [readApiKey, setReadApiKey] = useState('R4T2N8V6X1Z39K1M');
  const [batchBuffer, setBatchBuffer] = useState('200');
  const [webhookUrl, setWebhookUrl] = useState('https://api.thingspeak.com/update.json');
  const [testConnStatus, setTestConnStatus] = useState(null);

  // Machine Learning & Predictive Cutoffs
  const [corteCritico, setCorteCritico] = useState('0.80');
  const [corteModerado, setCorteModerado] = useState('0.50');
  const [corteBaixo, setCorteBaixo] = useState('0.30');
  const [janelaProjecao, setJanelaProjecao] = useState('24h');
  const [sensibilidadeBrix, setSensibilidadeBrix] = useState('18.2');

  // FDR Calibration & Filters
  const [autoCalibFdr, setAutoCalibFdr] = useState(true);
  const [descarteTermico, setDescarteTermico] = useState('60.0');
  const [descarteHidrico, setDescarteHidrico] = useState('0.0');
  const [offsetA1, setOffsetA1] = useState('+1.2');
  const [offsetA2, setOffsetA2] = useState('0.0');
  const [offsetB1, setOffsetB1] = useState('-0.5');
  const [offsetB2, setOffsetB2] = useState('+0.8');

  // Telecom Channels
  const [telecomPush, setTelecomPush] = useState(true);
  const [telecomWhatsapp, setTelecomWhatsapp] = useState(true);
  const [telecomSms, setTelecomSms] = useState(false);
  const [telecomPorto, setTelecomPorto] = useState(true);

  // Toast
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3500);
  };

  const handleTestConnection = () => {
    setTestConnStatus('testando');
    setTimeout(() => {
      setTestConnStatus('sucesso');
      setTimeout(() => setTestConnStatus(null), 4000);
    }, 900);
  };

  return (
    <div className="config-fields-wrap" style={{ marginTop: 14 }}>
      {isSaved && (
        <div className="save-toast-banner" role="status" style={{ marginBottom: 16 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Parâmetros técnicos do Gateway LoRaWAN e ThingSpeak salvos e sincronizados com a bancada!</span>
        </div>
      )}

      {testConnStatus === 'sucesso' && (
        <div className="audit-success-toast" style={{ marginBottom: 16 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <div>
            <strong>Conexão ThingSpeak Verificada com Sucesso</strong>
            <p style={{ margin: 0, fontSize: '0.74rem', color: '#047857' }}>
              Canal #3500765 respondendo com latência de 58ms. 24 nós reconhecidos.
            </p>
          </div>
        </div>
      )}

      <div className="config-two-columns-grid">
        {/* ═════════ COLUNA ESQUERDA (HARDWARE & REDE) ═════════ */}
        <div className="config-column">
          {/* Card 1: CONCENTRADOR GATEWAY & TOPOLOGIA LORAWAN */}
          <div className="dash-white-card config-card-section">
            <div className="config-card-header">
              <div className="config-title-icon-row">
                <div className="config-icon-sq icon-green">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                    <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                    <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
                  </svg>
                </div>
                <div>
                  <h2 className="config-section-title">CONCENTRADOR GATEWAY & TOPOLOGIA LORAWAN</h2>
                  <p className="config-section-subtitle">Configurações de RF, modulação e cadência de transmissão</p>
                </div>
              </div>
              <span className="badge-pill badge-green-light-pill">ESP-MESH v4.2.1-prod</span>
            </div>

            <div className="config-fields-form">
              {/* Gateway ID */}
              <div className="config-field-item">
                <label className="config-field-label">Identificador do Gateway Concentrador</label>
                <input
                  type="text"
                  className="config-text-input"
                  value={gatewayId}
                  onChange={(e) => setGatewayId(e.target.value)}
                />
              </div>

              {/* Banda & SF */}
              <div className="config-two-inputs-row">
                <div className="config-field-item flex-1">
                  <label className="config-field-label">Banda de Frequência</label>
                  <select
                    className="config-select-input"
                    value={freqBanda}
                    onChange={(e) => setFreqBanda(e.target.value)}
                  >
                    <option value="US915">US915 (915 MHz - Anatel)</option>
                    <option value="AU915">AU915 (Australiana)</option>
                    <option value="EU868">EU868 (Europeia)</option>
                  </select>
                </div>

                <div className="config-field-item flex-1">
                  <label className="config-field-label">Spreading Factor (SF)</label>
                  <select
                    className="config-select-input"
                    value={sf}
                    onChange={(e) => setSf(e.target.value)}
                  >
                    <option value="SF7">SF7 (Alta taxa / 118ms)</option>
                    <option value="SF8">SF8 (Equilibrado)</option>
                    <option value="SF10">SF10 (Alcance Máximo)</option>
                  </select>
                </div>
              </div>

              {/* Bandwidth & Potência TX */}
              <div className="config-two-inputs-row">
                <div className="config-field-item flex-1">
                  <label className="config-field-label">Largura de Banda (BW)</label>
                  <select
                    className="config-select-input"
                    value={bandwidth}
                    onChange={(e) => setBandwidth(e.target.value)}
                  >
                    <option value="125">125 kHz (Padrão US915)</option>
                    <option value="250">250 kHz</option>
                    <option value="500">500 kHz</option>
                  </select>
                </div>

                <div className="config-field-item flex-1">
                  <label className="config-field-label">Potência TX do Rádio</label>
                  <input
                    type="text"
                    className="config-text-input"
                    value={txPower}
                    onChange={(e) => setTxPower(e.target.value)}
                  />
                </div>
              </div>

              {/* Intervalo de Amostragem */}
              <div className="config-field-item">
                <label className="config-field-label">
                  Intervalo de Amostragem & Deep-Sleep
                </label>
                <div className="input-with-unit-badge">
                  <input
                    type="number"
                    className="config-text-input"
                    value={sleepInterval}
                    onChange={(e) => setSleepInterval(e.target.value)}
                  />
                  <span className="input-unit-tag">segundos (5 min)</span>
                </div>
              </div>

              {/* Chaves de Criptografia LoRaWAN OTAA */}
              <div className="config-field-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <label className="config-field-label" style={{ margin: 0 }}>Chaves de Ativação OTAA (ESP32 Nodes)</label>
                  <button
                    type="button"
                    onClick={() => setShowKeys(!showKeys)}
                    style={{ background: 'none', border: 'none', color: '#059669', fontSize: '0.74rem', cursor: 'pointer', fontWeight: 700 }}
                  >
                    {showKeys ? 'Ocultar Chaves' : 'Revelar Chaves'}
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div className="config-input-with-button">
                    <input
                      type="text"
                      className="config-text-input"
                      readOnly
                      value={showKeys ? '70 B3 D5 7E D0 04 A1 B2' : '•••• •••• •••• ••••'}
                      style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}
                    />
                    <span className="badge-pill badge-gray-soft" style={{ fontSize: '0.7rem' }}>DevEUI</span>
                  </div>
                  <div className="config-input-with-button">
                    <input
                      type="text"
                      className="config-text-input"
                      readOnly
                      value={showKeys ? '2B 7E 15 16 28 AE D2 A6 AB F7 15 88 09 CF 4F 3C' : '•••• •••• •••• •••• •••• •••• •••• ••••'}
                      style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}
                    />
                    <span className="badge-pill badge-gray-soft" style={{ fontSize: '0.7rem' }}>AppKey</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: INGESTÃO THINGSPEAK & API IOT */}
          <div className="dash-white-card config-card-section">
            <div className="config-card-header">
              <div className="config-title-icon-row">
                <div className="config-icon-sq icon-teal">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                </div>
                <div>
                  <h2 className="config-section-title">INGESTÃO THINGSPEAK & API IOT</h2>
                  <p className="config-section-subtitle">Chaves de API REST, canais e buffers de contingência</p>
                </div>
              </div>
              <span className="badge-pill badge-green">99.8% Disponível</span>
            </div>

            <div className="config-fields-form">
              {/* Canais ThingSpeak */}
              <div className="config-two-inputs-row">
                <div className="config-field-item flex-1">
                  <label className="config-field-label">Canal DHT11 & Bancada</label>
                  <input
                    type="text"
                    className="config-text-input"
                    value={channelBancada}
                    onChange={(e) => setChannelBancada(e.target.value)}
                  />
                </div>
                <div className="config-field-item flex-1">
                  <label className="config-field-label">Canal Sondas de Campo</label>
                  <input
                    type="text"
                    className="config-text-input"
                    value={channelCampo}
                    onChange={(e) => setChannelCampo(e.target.value)}
                  />
                </div>
              </div>

              {/* Chaves de API */}
              <div className="config-two-inputs-row">
                <div className="config-field-item flex-1">
                  <label className="config-field-label">Write API Key</label>
                  <input
                    type={showKeys ? 'text' : 'password'}
                    className="config-text-input"
                    value={writeApiKey}
                    onChange={(e) => setWriteApiKey(e.target.value)}
                    style={{ fontFamily: 'monospace' }}
                  />
                </div>
                <div className="config-field-item flex-1">
                  <label className="config-field-label">Read API Key</label>
                  <input
                    type={showKeys ? 'text' : 'password'}
                    className="config-text-input"
                    value={readApiKey}
                    onChange={(e) => setReadApiKey(e.target.value)}
                    style={{ fontFamily: 'monospace' }}
                  />
                </div>
              </div>

              {/* Buffer Local & Webhook */}
              <div className="config-two-inputs-row">
                <div className="config-field-item flex-1">
                  <label className="config-field-label">Buffer Batch Write</label>
                  <div className="input-with-unit-badge">
                    <input
                      type="number"
                      className="config-text-input"
                      value={batchBuffer}
                      onChange={(e) => setBatchBuffer(e.target.value)}
                    />
                    <span className="input-unit-tag">leituras</span>
                  </div>
                </div>
                <div className="config-field-item flex-2">
                  <label className="config-field-label">Endpoint de Ingestão</label>
                  <input
                    type="text"
                    className="config-text-input"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                  />
                </div>
              </div>

              {/* Test Button */}
              <div style={{ marginTop: 6, display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  className="btn-alertas-secondary"
                  onClick={handleTestConnection}
                  disabled={testConnStatus === 'testando'}
                  style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                >
                  {testConnStatus === 'testando' ? 'Testando Conexão...' : '⚡ Testar Conexão ThingSpeak'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ═════════ COLUNA DIREITA (ML, AUDITORIA & ALERTAS) ═════════ */}
        <div className="config-column">
          {/* Card 3: MODELOS PREDITIVOS & MACHINE LEARNING */}
          <div className="dash-white-card config-card-section">
            <div className="config-card-header">
              <div className="config-title-icon-row">
                <div className="config-icon-sq icon-teal">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </div>
                <div>
                  <h2 className="config-section-title">MODELOS PREDITIVOS & MACHINE LEARNING</h2>
                  <p className="config-section-subtitle">Limiares de corte probabilístico e janelas temporais de predição</p>
                </div>
              </div>
              <span className="badge-pill badge-green">Penman-Monteith v2.4</span>
            </div>

            <div className="config-fields-form">
              {/* Limiares Preditivos P1, P2, P3 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                <div className="config-field-item">
                  <label className="config-field-label" style={{ color: '#DC2626' }}>Corte Crítico (P1)</label>
                  <input
                    type="text"
                    className="config-text-input text-center"
                    value={corteCritico}
                    onChange={(e) => setCorteCritico(e.target.value)}
                    style={{ fontWeight: 800, color: '#DC2626' }}
                  />
                  <span style={{ fontSize: '0.68rem', color: '#64748B', textAlign: 'center', display: 'block', marginTop: 2 }}>≥ 80% Risco</span>
                </div>

                <div className="config-field-item">
                  <label className="config-field-label" style={{ color: '#D97706' }}>Corte Moderado (P2)</label>
                  <input
                    type="text"
                    className="config-text-input text-center"
                    value={corteModerado}
                    onChange={(e) => setCorteModerado(e.target.value)}
                    style={{ fontWeight: 800, color: '#D97706' }}
                  />
                  <span style={{ fontSize: '0.68rem', color: '#64748B', textAlign: 'center', display: 'block', marginTop: 2 }}>50% a 79%</span>
                </div>

                <div className="config-field-item">
                  <label className="config-field-label" style={{ color: '#059669' }}>Corte Baixo (P3)</label>
                  <input
                    type="text"
                    className="config-text-input text-center"
                    value={corteBaixo}
                    onChange={(e) => setCorteBaixo(e.target.value)}
                    style={{ fontWeight: 800, color: '#059669' }}
                  />
                  <span style={{ fontSize: '0.68rem', color: '#64748B', textAlign: 'center', display: 'block', marginTop: 2 }}>30% a 49%</span>
                </div>
              </div>

              {/* Janela de Projeção & Sensibilidade Brix */}
              <div className="config-two-inputs-row">
                <div className="config-field-item flex-1">
                  <label className="config-field-label">Janela Temporal de Projeção</label>
                  <select
                    className="config-select-input"
                    value={janelaProjecao}
                    onChange={(e) => setJanelaProjecao(e.target.value)}
                  >
                    <option value="12h">12 horas à frente</option>
                    <option value="24h">24 horas contínuas (Padrão)</option>
                    <option value="48h">48 horas (Horizonte Estendido)</option>
                  </select>
                </div>

                <div className="config-field-item flex-1">
                  <label className="config-field-label">Sensibilidade Brix vs VWC</label>
                  <div className="input-with-unit-badge">
                    <input
                      type="text"
                      className="config-text-input"
                      value={sensibilidadeBrix}
                      onChange={(e) => setSensibilidadeBrix(e.target.value)}
                    />
                    <span className="input-unit-tag">° Brix</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: FILTROS DE AUDITORIA & CALIBRAÇÃO DE SONDAS FDR */}
          <div className="dash-white-card config-card-section">
            <div className="config-card-header">
              <div className="config-title-icon-row">
                <div className="config-icon-sq icon-teal">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div>
                  <h2 className="config-section-title">FILTROS DE AUDITORIA & CALIBRAÇÃO FDR</h2>
                  <p className="config-section-subtitle">Tolerância para descarte de ruído térmico e compensação ômica</p>
                </div>
              </div>
            </div>

            <div className="config-fields-form">
              {/* Auto Calibration Toggle */}
              <div className="cargo-sla-switch-card" style={{ padding: '10px 14px' }}>
                <div className="cargo-sla-left">
                  <div className="sla-text-col">
                    <strong className="sla-title">Filtro de Ruído & Auto-calibração FDR</strong>
                    <p className="sla-sub">Compensação térmica e salinidade em ciclo de 7 dias</p>
                  </div>
                </div>
                <label className="switch-toggle-label">
                  <input
                    type="checkbox"
                    checked={autoCalibFdr}
                    onChange={(e) => setAutoCalibFdr(e.target.checked)}
                  />
                  <span className="switch-toggle-slider" />
                </label>
              </div>

              {/* Limiares de Descarte */}
              <div className="config-two-inputs-row">
                <div className="config-field-item flex-1">
                  <label className="config-field-label">Teto Descarte Térmico</label>
                  <div className="input-with-unit-badge">
                    <input
                      type="text"
                      className="config-text-input"
                      value={descarteTermico}
                      onChange={(e) => setDescarteTermico(e.target.value)}
                    />
                    <span className="input-unit-tag">&gt; 60°C</span>
                  </div>
                </div>

                <div className="config-field-item flex-1">
                  <label className="config-field-label">Piso Descarte Hídrico</label>
                  <div className="input-with-unit-badge">
                    <input
                      type="text"
                      className="config-text-input"
                      value={descarteHidrico}
                      onChange={(e) => setDescarteHidrico(e.target.value)}
                    />
                    <span className="input-unit-tag">&lt; 0% VWC</span>
                  </div>
                </div>
              </div>

              {/* Offsets por Talhão */}
              <div className="config-field-item">
                <label className="config-field-label">Offsets Manuais de Calibração FDR (% VWC)</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>Talhão A1</span>
                    <input
                      type="text"
                      className="config-text-input text-center"
                      value={offsetA1}
                      onChange={(e) => setOffsetA1(e.target.value)}
                    />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>Talhão A2</span>
                    <input
                      type="text"
                      className="config-text-input text-center"
                      value={offsetA2}
                      onChange={(e) => setOffsetA2(e.target.value)}
                    />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>Talhão B1</span>
                    <input
                      type="text"
                      className="config-text-input text-center"
                      value={offsetB1}
                      onChange={(e) => setOffsetB1(e.target.value)}
                    />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>Talhão B2</span>
                    <input
                      type="text"
                      className="config-text-input text-center"
                      value={offsetB2}
                      onChange={(e) => setOffsetB2(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: MATRIZ DE TELECOM & ESCALONAMENTO */}
          <div className="dash-white-card config-card-section">
            <div className="config-card-header">
              <div className="config-title-icon-row">
                <div className="config-icon-sq icon-teal">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </div>
                <div>
                  <h2 className="config-section-title">MATRIZ DE TELECOM & ROTAS DE DISPARO</h2>
                  <p className="config-section-subtitle">Canais de mensageria IoT e webhooks externos</p>
                </div>
              </div>
            </div>

            <div className="alert-rules-list">
              <div className="alert-rule-row">
                <div className="alert-rule-info">
                  <strong className="rule-bold-title">Canais de Mensageria</strong>
                  <span className="rule-trigger-sub">Disparos de alertas de gateway e desvios de bancada</span>
                </div>
                <div className="alert-rule-channels">
                  <label className="checkbox-item-label">
                    <input
                      type="checkbox"
                      checked={telecomPush}
                      onChange={(e) => setTelecomPush(e.target.checked)}
                    />
                    <span>Push App Raíz</span>
                  </label>
                  <label className="checkbox-item-label">
                    <input
                      type="checkbox"
                      checked={telecomWhatsapp}
                      onChange={(e) => setTelecomWhatsapp(e.target.checked)}
                    />
                    <span>WhatsApp Cloud</span>
                  </label>
                  <label className="checkbox-item-label">
                    <input
                      type="checkbox"
                      checked={telecomSms}
                      onChange={(e) => setTelecomSms(e.target.checked)}
                    />
                    <span>SMS Failover</span>
                  </label>
                  <label className="checkbox-item-label">
                    <input
                      type="checkbox"
                      checked={telecomPorto}
                      onChange={(e) => setTelecomPorto(e.target.checked)}
                    />
                    <span>Porto Pecém</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Action Bar (Analista) ── */}
      <div className="config-bottom-action-bar">
        <div className="config-buttons-group">
          <button
            type="button"
            className="btn-config-secondary"
            onClick={() => {
              setGatewayId('GATEWAY-PETROLINA-04');
              setFreqBanda('US915');
              setSf('SF7');
              setBandwidth('125');
              setSleepInterval('300');
              setCorteCritico('0.80');
              setCorteModerado('0.50');
              setCorteBaixo('0.30');
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            <span>Restaurar padrões de fábrica</span>
          </button>

          <button
            type="button"
            className="btn-config-primary"
            onClick={handleSave}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Salvar parâmetros técnicos</span>
          </button>
        </div>

        <p className="config-sync-notice">
          ℹ Sincronização LoRaWAN OTA entrará em vigor no próximo ciclo de envio (300s).
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   VISÃO GESTORA (Maria Clara) - PROPRIEDADE & CADEIA FRIA
   ═══════════════════════════════════════════════════════════════════ */
function ConfiguracaoGestoraView() {
  const [nomeFazenda, setNomeFazenda] = useState('Fazenda RaizTech - Polo Sul');
  const [coords, setCoords] = useState('-21.177502, -47.810331');
  const [area, setArea] = useState('1.250');
  const [talhoes, setTalhoes] = useState('8 talhões ativos (Monitoramento total)');
  const [solo, setSolo] = useState('Latossolo Vermelho Eutrófico (Textura Média a Argilosa)');
  const [umidadeRelativa, setUmidadeRelativa] = useState('90% a 95%');
  const [portoSelecionado, setPortoSelecionado] = useState('pecem');
  const [alarmeFinanceiro, setAlarmeFinanceiro] = useState(true);
  const [horarioRelatorio, setHorarioRelatorio] = useState('06:30 AM');
  const [emailsCopia, setEmailsCopia] = useState('gerencia@raizagro.agr.br, agronomo@rai...');

  const [p1Push, setP1Push] = useState(true);
  const [p1Whatsapp, setP1Whatsapp] = useState(true);
  const [p1Sms, setP1Sms] = useState(true);

  const [p2Push, setP2Push] = useState(true);
  const [p2Whatsapp, setP2Whatsapp] = useState(false);
  const [p2Email, setP2Email] = useState(true);

  const [culturas, setCulturas] = useState(['Uva de Mesa', 'Morango', 'Manga']);
  const [isSaved, setIsSaved] = useState(false);

  const removeCultura = (culturaToRemove) => {
    setCulturas(culturas.filter((c) => c !== culturaToRemove));
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3500);
  };

  return (
    <div className="config-fields-wrap" style={{ marginTop: 14 }}>
      {isSaved && (
        <div className="save-toast-banner" role="status" style={{ marginBottom: 16 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Configurações agronômicas salvas com sucesso! Sincronização enviada para os nós de campo.</span>
        </div>
      )}

      <div className="config-two-columns-grid">
        {/* ═════════ LEFT COLUMN ═════════ */}
        <div className="config-column">
          {/* Card 1: INFORMAÇÕES & CADASTRO DA PROPRIEDADE */}
          <div className="dash-white-card config-card-section">
            <div className="config-card-header">
              <div className="config-title-icon-row">
                <div className="config-icon-sq icon-green">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <path d="M12 2a10 10 0 0 0-7.07 17.07l.07.07A10 10 0 0 0 12 22a10 10 0 0 0 7.07-2.93l-.07-.07A10 10 0 0 0 12 2z" />
                    <path d="M12 6v12" />
                    <path d="M8 10l4-4 4 4" />
                  </svg>
                </div>
                <div>
                  <h2 className="config-section-title">INFORMAÇÕES & CADASTRO DA PROPRIEDADE</h2>
                  <p className="config-section-subtitle">Dados cadastrais de infraestrutura física e territorial</p>
                </div>
              </div>
              <span className="badge-pill badge-green-light-pill">ID: POLO-SUL-04</span>
            </div>

            <div className="config-fields-form">
              {/* Nome da Fazenda */}
              <div className="config-field-item">
                <label className="config-field-label">Nome da Fazenda</label>
                <input
                  type="text"
                  className="config-text-input"
                  value={nomeFazenda}
                  onChange={(e) => setNomeFazenda(e.target.value)}
                />
              </div>

              {/* Localização & Coordenadas */}
              <div className="config-field-item">
                <div className="config-label-row-with-chip">
                  <label className="config-field-label">Localização & Coordenadas Geográficas</label>
                  <span className="badge-pill badge-green-soft-chip">Petrolina - Setor 04 (Submédio São Francisco)</span>
                </div>
                <div className="config-input-with-button">
                  <input
                    type="text"
                    className="config-text-input"
                    value={coords}
                    onChange={(e) => setCoords(e.target.value)}
                  />
                  <button type="button" className="btn-gps-action" title="Obter localização atual via GPS">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="3 11 22 2 13 21 11 13 3 11" />
                    </svg>
                    <span>GPS</span>
                  </button>
                </div>
              </div>

              {/* Área Monitorada & Talhões Ativos */}
              <div className="config-two-inputs-row">
                <div className="config-field-item flex-1">
                  <label className="config-field-label">Área Monitorada</label>
                  <div className="input-with-unit-badge">
                    <input
                      type="text"
                      className="config-text-input"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                    />
                    <span className="input-unit-tag">ha</span>
                  </div>
                </div>

                <div className="config-field-item flex-1">
                  <label className="config-field-label">Talhões Ativos</label>
                  <input
                    type="text"
                    className="config-text-input"
                    value={talhoes}
                    onChange={(e) => setTalhoes(e.target.value)}
                  />
                </div>
              </div>

              {/* Culturas Ativas */}
              <div className="config-field-item">
                <label className="config-field-label">Culturas Ativas em Produção</label>
                <div className="culturas-tags-container">
                  {culturas.map((c) => (
                    <span key={c} className="cultura-badge-dark">
                      {c}{' '}
                      <button
                        type="button"
                        className="cultura-remove-btn"
                        onClick={() => removeCultura(c)}
                        aria-label={`Remover ${c}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <button
                    type="button"
                    className="btn-add-cultura-ghost"
                    onClick={() => {
                      const nova = prompt('Nome da nova cultura:');
                      if (nova && nova.trim()) setCulturas([...culturas, nova.trim()]);
                    }}
                  >
                    + Adicionar cultura
                  </button>
                </div>
              </div>

              {/* Tipo de Solo */}
              <div className="config-field-item">
                <label className="config-field-label">Tipo de Solo / Caracterização Terroir</label>
                <select
                  className="config-select-input"
                  value={solo}
                  onChange={(e) => setSolo(e.target.value)}
                >
                  <option value="Latossolo Vermelho Eutrófico (Textura Média a Argilosa)">
                    Latossolo Vermelho Eutrófico (Textura Média a Argilosa)
                  </option>
                  <option value="Neossolo Flúvico">Neossolo Flúvico</option>
                  <option value="Argissolo Amarelo">Argissolo Amarelo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card 2: CADEIA FRIA & TRÂNSITO LOGÍSTICO (REEFER) */}
          <div className="dash-white-card config-card-section">
            <div className="config-card-header">
              <div className="config-title-icon-row">
                <div className="config-icon-sq icon-teal">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div>
                  <h2 className="config-section-title">CADEIA FRIA & TRÂNSITO LOGÍSTICO (REEFER)</h2>
                  <p className="config-section-subtitle">Controle térmico de baú, umidade do engaço e monitoramento até o porto</p>
                </div>
              </div>
            </div>

            <div className="config-fields-form">
              {/* Temperatura Alvo de Baú */}
              <div className="config-field-item">
                <div className="config-label-row-with-chip">
                  <label className="config-field-label">Temperatura Alvo de Baú Frigorífico</label>
                  <span className="badge-pill badge-green">0.5°C a 2.0°C (Pico máx: 3.0°C)</span>
                </div>

                <div className="temperature-slider-scale-wrap">
                  <div className="temp-scale-track">
                    <div className="temp-scale-segment seg-freeze" style={{ width: '22%' }} />
                    <div className="temp-scale-segment seg-ideal" style={{ width: '38%' }} />
                    <div className="temp-scale-segment seg-warning" style={{ width: '22%' }} />
                    <div className="temp-scale-segment seg-critical" style={{ width: '18%' }} />
                    <div className="temp-scale-pointer-pin" style={{ left: '38%' }} />
                  </div>
                  <div className="temp-scale-labels-row">
                    <span className="temp-tick-text">-1.0°C<br /><small>(Congelamento)</small></span>
                    <span className="temp-tick-text">0.5°C<br /><small>Setpoint</small></span>
                    <span className="temp-tick-text">2.0°C<br /><small>Limite</small></span>
                    <span className="temp-tick-text">+5.0°C<br /><small>(Dano Crítico)</small></span>
                  </div>
                </div>
              </div>

              {/* Umidade Relativa */}
              <div className="config-field-item">
                <label className="config-field-label">
                  Umidade Relativa (UR) <span className="label-sub-detail">Preservação do engaço verde</span>
                </label>
                <input
                  type="text"
                  className="config-text-input"
                  value={umidadeRelativa}
                  onChange={(e) => setUmidadeRelativa(e.target.value)}
                />
              </div>

              {/* Portos e Destinos Padrão de Exportação */}
              <div className="config-field-item">
                <label className="config-field-label">Portos e Destinos Padrão de Exportação</label>
                <div className="ports-options-list">
                  <label className={`port-radio-card ${portoSelecionado === 'pecem' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="porto"
                      value="pecem"
                      checked={portoSelecionado === 'pecem'}
                      onChange={() => setPortoSelecionado('pecem')}
                      className="port-radio-input"
                    />
                    <div className="port-info-col">
                      <strong className="port-name-title">Porto de Pecém / CE</strong>
                      <span className="port-transit-sub">Trânsito rodoviário estimado: 14h 20m</span>
                    </div>
                    <span className="badge-pill badge-green">Rota Padrão</span>
                  </label>

                  <label className={`port-radio-card ${portoSelecionado === 'suape' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="porto"
                      value="suape"
                      checked={portoSelecionado === 'suape'}
                      onChange={() => setPortoSelecionado('suape')}
                      className="port-radio-input"
                    />
                    <div className="port-info-col">
                      <strong className="port-name-title">Porto de Suape / PE</strong>
                      <span className="port-transit-sub">Trânsito rodoviário estimado: 13h 45m</span>
                    </div>
                    <span className="badge-pill badge-gray-soft">Alternativo</span>
                  </label>

                  <label className={`port-radio-card ${portoSelecionado === 'salvador' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="porto"
                      value="salvador"
                      checked={portoSelecionado === 'salvador'}
                      onChange={() => setPortoSelecionado('salvador')}
                      className="port-radio-input"
                    />
                    <div className="port-info-col">
                      <strong className="port-name-title">Porto de Salvador / BA</strong>
                      <span className="port-transit-sub">Trânsito rodoviário estimado: 9h 10m</span>
                    </div>
                    <span className="badge-pill badge-gray-soft">Alternativo</span>
                  </label>
                </div>
              </div>

              {/* Alarme Financeiro Switch Box */}
              <div className="cargo-sla-switch-card">
                <div className="cargo-sla-left">
                  <div className="sla-icon-box">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <div className="sla-text-col">
                    <strong className="sla-title">Alarme Financeiro de Valor em Risco (CARGO-SLA)</strong>
                    <p className="sla-sub">Disparar alarme para lotes &gt; R$ 30.000 com temperatura fora da faixa por &gt; 20 min</p>
                  </div>
                </div>
                <label className="switch-toggle-label">
                  <input
                    type="checkbox"
                    checked={alarmeFinanceiro}
                    onChange={(e) => setAlarmeFinanceiro(e.target.checked)}
                  />
                  <span className="switch-toggle-slider" />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* ═════════ RIGHT COLUMN ═════════ */}
        <div className="config-column">
          {/* Card 3: PADRÕES DE QUALIDADE & BRIX DE EMBARQUE */}
          <div className="dash-white-card config-card-section">
            <div className="config-card-header">
              <div className="config-title-icon-row">
                <div className="config-icon-sq icon-teal">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <h2 className="config-section-title">PADRÕES DE QUALIDADE & BRIX DE EMBARQUE</h2>
                  <p className="config-section-subtitle">Controle estrito de maturação para liberação de colheita e packing</p>
                </div>
              </div>
              <button
                type="button"
                className="btn-nova-variedade"
                onClick={() => alert('Modal para adicionar variedade')}
              >
                + Nova variedade
              </button>
            </div>

            <div className="varieties-table-list">
              <div className="variety-row-item">
                <div className="variety-name-market">
                  <div className="variety-bullet-name">
                    <span className="variety-dot dot-purple" />
                    <strong className="variety-title">Uva Vitória (Seedless)</strong>
                  </div>
                  <span className="variety-market-sub">Mercado alvo: União Europeia / UK</span>
                </div>
                <div className="variety-specs-actions">
                  <span className="badge-pill badge-green">≥ 18.0° Brix</span>
                  <span className="variety-calibre-txt">Calibre: ≥ 22mm</span>
                  <button type="button" className="btn-edit-icon" title="Editar parâmetros">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="variety-row-item">
                <div className="variety-name-market">
                  <div className="variety-bullet-name">
                    <span className="variety-dot dot-crimson" />
                    <strong className="variety-title">Uva Crimson</strong>
                  </div>
                  <span className="variety-market-sub">Mercado alvo: América do Norte (USDA)</span>
                </div>
                <div className="variety-specs-actions">
                  <span className="badge-pill badge-green">≥ 17.5° Brix</span>
                  <span className="variety-calibre-txt">Calibre: ≥ 19mm</span>
                  <button type="button" className="btn-edit-icon" title="Editar parâmetros">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="variety-row-item">
                <div className="variety-name-market">
                  <div className="variety-bullet-name">
                    <span className="variety-dot dot-green" />
                    <strong className="variety-title">Uva Thompson</strong>
                  </div>
                  <span className="variety-market-sub">Mercado alvo: Ásia (China / Coreia do Sul)</span>
                </div>
                <div className="variety-specs-actions">
                  <span className="badge-pill badge-green">≥ 17.0° Brix</span>
                  <span className="variety-calibre-txt">Calibre: ≥ 18mm</span>
                  <button type="button" className="btn-edit-icon" title="Editar parâmetros">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="variety-row-item">
                <div className="variety-name-market">
                  <div className="variety-bullet-name">
                    <span className="variety-dot dot-amber" />
                    <strong className="variety-title">Manga Palmer</strong>
                  </div>
                  <span className="variety-market-sub">Mercado alvo: Spot Europa (Roterdã)</span>
                </div>
                <div className="variety-specs-actions">
                  <span className="badge-pill badge-green">≥ 13.0° Brix</span>
                  <span className="variety-calibre-txt">Calibre: ≥ 350g</span>
                  <button type="button" className="btn-edit-icon" title="Editar parâmetros">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: REGRAS DE DISPARO & CANAIS DE NOTIFICAÇÃO */}
          <div className="dash-white-card config-card-section">
            <div className="config-card-header">
              <div className="config-title-icon-row">
                <div className="config-icon-sq icon-teal">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                  </svg>
                </div>
                <div>
                  <h2 className="config-section-title">REGRAS DE DISPARO & CANAIS DE NOTIFICAÇÃO</h2>
                  <p className="config-section-subtitle">Matriz de escalonamento para eventos críticos e operacionais</p>
                </div>
              </div>
            </div>

            <div className="alert-rules-list">
              <div className="alert-rule-row">
                <div className="alert-rule-info">
                  <div className="alert-rule-name">
                    <span className="variety-dot dot-crimson" />
                    <strong className="rule-bold-title">Alerta Crítico (P1)</strong>
                  </div>
                  <span className="rule-trigger-sub">Murcha &lt; 40% | Baú &gt; 3.0°C</span>
                </div>
                <div className="alert-rule-channels">
                  <label className="checkbox-item-label">
                    <input
                      type="checkbox"
                      checked={p1Push}
                      onChange={(e) => setP1Push(e.target.checked)}
                    />
                    <span>Push App</span>
                  </label>
                  <label className="checkbox-item-label">
                    <input
                      type="checkbox"
                      checked={p1Whatsapp}
                      onChange={(e) => setP1Whatsapp(e.target.checked)}
                    />
                    <span>WhatsApp</span>
                  </label>
                  <label className="checkbox-item-label">
                    <input
                      type="checkbox"
                      checked={p1Sms}
                      onChange={(e) => setP1Sms(e.target.checked)}
                    />
                    <span>SMS Urgent</span>
                  </label>
                </div>
              </div>

              <div className="alert-rule-row">
                <div className="alert-rule-info">
                  <div className="alert-rule-name">
                    <span className="variety-dot dot-amber" />
                    <strong className="rule-bold-title">Alerta Moderado (P2)</strong>
                  </div>
                  <span className="rule-trigger-sub">Umidade ar &lt; 30% | Vento &gt; 35km/h</span>
                </div>
                <div className="alert-rule-channels">
                  <label className="checkbox-item-label">
                    <input
                      type="checkbox"
                      checked={p2Push}
                      onChange={(e) => setP2Push(e.target.checked)}
                    />
                    <span>Push App</span>
                  </label>
                  <label className="checkbox-item-label">
                    <input
                      type="checkbox"
                      checked={p2Whatsapp}
                      onChange={(e) => setP2Whatsapp(e.target.checked)}
                    />
                    <span>WhatsApp</span>
                  </label>
                  <label className="checkbox-item-label">
                    <input
                      type="checkbox"
                      checked={p2Email}
                      onChange={(e) => setP2Email(e.target.checked)}
                    />
                    <span>E-mail Diário</span>
                  </label>
                </div>
              </div>

              {/* Relatório Matinal */}
              <div className="morning-report-section">
                <div className="report-header-row">
                  <strong className="report-title">Relatório Matinal Executivo</strong>
                  <button type="button" className="btn-export-badge">
                    PDF + CSV
                  </button>
                </div>

                <div className="report-inputs-grid">
                  <div className="config-field-item">
                    <label className="config-field-label">Horário de Envio</label>
                    <input
                      type="text"
                      className="config-text-input text-center"
                      value={horarioRelatorio}
                      onChange={(e) => setHorarioRelatorio(e.target.value)}
                    />
                  </div>
                  <div className="config-field-item flex-2">
                    <label className="config-field-label">E-mails em Cópia</label>
                    <input
                      type="text"
                      className="config-text-input"
                      value={emailsCopia}
                      onChange={(e) => setEmailsCopia(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: PREFERÊNCIAS DE MOEDA */}
          <div className="dash-white-card config-card-section">
            <div className="config-card-header">
              <div className="config-title-icon-row">
                <div className="config-icon-sq icon-teal">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div>
                  <h2 className="config-section-title">PREFERÊNCIAS DE MOEDA</h2>
                  <p className="config-section-subtitle">Moeda utilizada nos valores financeiros do sistema.</p>
                </div>
              </div>
            </div>

            <div className="currency-selector-row">
              <span className="currency-label-txt">Moeda fixa</span>
              <button type="button" className="btn-currency-pill selected">
                Real brasileiro (R$)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Action Bar (Gestora) ── */}
      <div className="config-bottom-action-bar">
        <div className="config-buttons-group">
          <button
            type="button"
            className="btn-config-secondary"
            onClick={() => {
              setNomeFazenda('Fazenda RaizTech - Polo Sul');
              setCoords('-21.177502, -47.810331');
              setArea('1.250');
              setTalhoes('8 talhões ativos (Monitoramento total)');
              setSolo('Latossolo Vermelho Eutrófico (Textura Média a Argilosa)');
              setUmidadeRelativa('90% a 95%');
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            <span>Restaurar padrões</span>
          </button>

          <button
            type="button"
            className="btn-config-primary"
            onClick={handleSave}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Salvar alterações</span>
          </button>
        </div>

        <p className="config-sync-notice">
          ℹ As alterações aplicadas a nós de campo entrarão em vigor no próximo ciclo de sincronização (em até 5 minutos).
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   EXPORT DEFAULT: COMPONENTE PRINCIPAL COM SELETOR DE PERFIL
   ═══════════════════════════════════════════════════════════════════ */
export default function ConfiguracaoPage() {
  const { user } = useAuth();
  const isAnalistaUser = user?.role === 'Analista';
  const [manualTab, setManualTab] = useState(null);
  const activeTab = manualTab !== null ? manualTab : (isAnalistaUser ? 'analista' : 'gestora');

  return (
    <div className="dashboard-container config-page-wrap">
      {/* ── Top Header ── */}
      <TopHeader
        title={activeTab === 'analista' ? 'Configurações do Sistema & IoT' : 'Configurações do Sistema'}
        subtitle={
          activeTab === 'analista'
            ? 'Gerencie parâmetros de hardware ESP32, gateway LoRaWAN, ingestão ThingSpeak e modelos preditivos.'
            : 'Gerencie dados da propriedade, padrões de qualidade, cadeia fria e notificações.'
        }
        showResumidoToggle={false}
        dateText="22 de setembro de 2026"
      />

      {/* ── Subheader Profile Tab Switcher ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 10,
          background: '#FFFFFF',
          padding: '10px 16px',
          borderRadius: 'var(--ios-radius-md)',
          border: '1.5px solid #E2E8F0',
          marginTop: -4,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="dot-mini-green" />
          <strong style={{ fontSize: '0.84rem', color: '#0F172A' }}>
            Painel de Configuração por Perfil:
          </strong>
          <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
            {activeTab === 'analista' ? 'Modo Técnico (Luiz Felipe - Analista IoT)' : 'Modo Agronômico (Maria Clara - Gestora)'}
          </span>
        </div>

        <div className="view-toggle-group">
          <button
            type="button"
            className={`view-toggle-btn ${activeTab === 'analista' ? 'active' : ''}`}
            onClick={() => setManualTab('analista')}
          >
            📡 Parâmetros IoT & Hardware (Analista)
          </button>
          <button
            type="button"
            className={`view-toggle-btn ${activeTab === 'gestora' ? 'active' : ''}`}
            onClick={() => setManualTab('gestora')}
          >
            👩‍🌾 Propriedade & Fruta (Gestora)
          </button>
        </div>
      </div>

      {/* Render View */}
      {activeTab === 'analista' ? <ConfiguracaoAnalistaView /> : <ConfiguracaoGestoraView />}
    </div>
  );
}
