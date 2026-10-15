import React, { useState } from 'react';
import TopHeader from '../components/TopHeader';

export default function ConfiguracaoPage() {
  // Form states matching Image 5
  const [nomeFazenda, setNomeFazenda] = useState('Fazenda RaizTech - Polo Sul');
  const [coords, setCoords] = useState('-21.177502, -47.810331');
  const [area, setArea] = useState('1.250');
  const [talhoes, setTalhoes] = useState('8 talhões ativos (Monitoramento total)');
  const [solo, setSolo] = useState('Latossolo Vermelho Eutrófico (Textura Média a Argilosa)');
  const [umidadeRelativa, setUmidadeRelativa] = useState('90% a 95%');
  const [portoSelecionado, setPortoSelecionado] = useState('pecem');
  const [alarmeFinanceiro, setAlarmeFinanceiro] = useState(true);
  const [horarioRelatorio, setHorarioRelatorio] = useState('06: 30 AM');
  const [emailsCopia, setEmailsCopia] = useState('gerencia@raizagro.agr.br, agronomo@raizagro.agr.br');

  // Notification checkboxes
  const [p1Push, setP1Push] = useState(true);
  const [p1Whatsapp, setP1Whatsapp] = useState(true);
  const [p1Sms, setP1Sms] = useState(true);

  const [p2Push, setP2Push] = useState(true);
  const [p2Whatsapp, setP2Whatsapp] = useState(false);
  const [p2Email, setP2Email] = useState(true);

  // Cultures chips
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
    <div className="dashboard-container config-page-wrap">
      {/* ── Top Header ── */}
      <TopHeader
        title="Configurações do Sistema"
        subtitle="Gerencie dados da propriedade, padrões de qualidade, cadeia fria e notificações."
        showResumidoToggle={false}
        dateText="22 de setembro de 2026"
      />

      {isSaved && (
        <div className="save-toast-banner" role="status">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>Configurações salvas com sucesso! Sincronização enviada para os nós de campo.</span>
        </div>
      )}

      {/* ── 2 Main Columns Layout (matching Image 5) ── */}
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
                  <select
                    className="config-select-input"
                    value={talhoes}
                    onChange={(e) => setTalhoes(e.target.value)}
                  >
                    <option value="8 talhões ativos (Monitoramento total)">8 talhões ativos (Monitoramento total)</option>
                    <option value="6 talhões ativos">6 talhões ativos</option>
                    <option value="4 talhões ativos">4 talhões ativos</option>
                  </select>
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
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
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

                {/* Range Scale Bar */}
                <div className="temperature-slider-scale-wrap">
                  <div className="temp-scale-track">
                    <div className="temp-scale-segment seg-freeze" style={{ width: '22%' }} />
                    <div className="temp-scale-segment seg-ideal" style={{ width: '38%' }} />
                    <div className="temp-scale-segment seg-critical" style={{ width: '40%' }} />
                    <div className="temp-scale-pointer-pin" style={{ left: '42%' }} />
                  </div>
                  <div className="temp-scale-labels-row">
                    <span className="temp-tick-text">-1.0°C<br /><small>(Congelamento)</small></span>
                    <span className="temp-tick-text">0.5°C<br /><small>Setpoint</small></span>
                    <span className="temp-tick-text">2.0°C<br /><small>Limite</small></span>
                    <span className="temp-tick-text">+6.0°C<br /><small>(Dano crítico)</small></span>
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
                  {/* Porto Pecém */}
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

                  {/* Porto Suape */}
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

                  {/* Porto Salvador */}
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
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
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
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
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
              {/* Uva Vitória */}
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

              {/* Uva Crimson */}
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

              {/* Uva Thompson */}
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

              {/* Manga Palmer */}
              <div className="variety-row-item">
                <div className="variety-name-market">
                  <div className="variety-bullet-name">
                    <span className="variety-dot dot-amber" />
                    <strong className="variety-title">Manga Palmer</strong>
                  </div>
                  <span className="variety-market-sub">Mercado alvo: Spot Europe (Roterdã)</span>
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
              {/* Alerta Crítico (P1) */}
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

              {/* Alerta Moderado (P2) */}
              <div className="alert-rule-row">
                <div className="alert-rule-info">
                  <div className="alert-rule-name">
                    <span className="variety-dot dot-amber" />
                    <strong className="rule-bold-title">Alerta Moderado (P2)</strong>
                  </div>
                  <span className="rule-trigger-sub">Umidade ar &lt; 30% | Vento &gt; 35 km/h</span>
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

              {/* Relatório Matinal Executivo */}
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
                    <label className="config-field-label">E-mails em Cópia (Separados por vírgula)</label>
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

      {/* ── Bottom Action Bar ── */}
      <div className="config-bottom-action-bar">
        <div className="config-buttons-group">
          <button
            type="button"
            className="btn-config-secondary"
            onClick={() => {
              setNomeFazenda('Fazenda RaizTech - Polo Sul');
              setArea('1.250');
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
