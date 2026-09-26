import React from 'react';

export default function ConfiguracaoPage() {
  return (
    <div>
      <div className="content-header">
        <h2 className="content-title">Configurações do Sistema</h2>
        <p className="content-subtitle">
          Parâmetros de integração com sensores e definição de alertas
        </p>
      </div>

      <div className="structural-grid">
        <div className="structural-card" style={{ borderRadius: '8px' }}>
          <h3>Integração com Sensores IoT</h3>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.2rem', fontWeight: '600' }}>ID do Canal de Sensores:</label>
              <input type="text" defaultValue="2849102" className="form-input" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.2rem', fontWeight: '600' }}>Chave de Leitura (API Key):</label>
              <input type="password" defaultValue="XXXXXXXXXXXXXXXX" className="form-input" />
            </div>
            <button type="submit" className="btn-structural" style={{ marginTop: '0.5rem', fontWeight: 'bold', borderRadius: '4px' }}>
              Salvar Chaves de Integração
            </button>
          </form>
        </div>

        <div className="structural-card" style={{ borderRadius: '8px' }}>
          <h3>Limites de Alerta Climático</h3>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.2rem', fontWeight: '600' }}>Temperatura Máxima de Alerta (°C):</label>
              <input type="number" defaultValue="32" className="form-input" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.2rem', fontWeight: '600' }}>Umidade Mínima de Alerta (%):</label>
              <input type="number" defaultValue="45" className="form-input" />
            </div>
            <button type="submit" className="btn-structural" style={{ marginTop: '0.5rem', fontWeight: 'bold', borderRadius: '4px' }}>
              Atualizar Limites
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
