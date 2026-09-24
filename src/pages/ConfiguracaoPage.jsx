import React from 'react';

export default function ConfiguracaoPage() {
  return (
    <div>
      <div className="content-header">
        <h2 className="content-title">Configurações do Sistema</h2>
        <p className="content-subtitle">
          Parâmetros de integração IoT, chaves de API (ThingSpeak) e limites de alertas (RNF02)
        </p>
      </div>

      <div className="structural-grid">
        <div className="structural-card">
          <h3>Integração ThingSpeak (IoT Channel API Keys)</h3>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.2rem' }}>ThingSpeak Channel ID:</label>
              <input type="text" defaultValue="2849102" className="btn-structural" style={{ width: '100%', padding: '0.4rem' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Read API Key (Protegida - RNF02):</label>
              <input type="password" defaultValue="XXXXXXXXXXXXXXXX" className="btn-structural" style={{ width: '100%', padding: '0.4rem' }} />
            </div>
            <button type="submit" className="btn-structural" style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>
              Salvar Chaves de Integração
            </button>
          </form>
        </div>

        <div className="structural-card">
          <h3>Limiares de Alerta Climático (RF09)</h3>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Temp. Máxima Alerta (°C):</label>
              <input type="number" defaultValue="32" className="btn-structural" style={{ width: '100%', padding: '0.4rem' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.2rem' }}>Umidade Mínima Alerta (%):</label>
              <input type="number" defaultValue="45" className="btn-structural" style={{ width: '100%', padding: '0.4rem' }} />
            </div>
            <button type="submit" className="btn-structural" style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>
              Atualizar Limiares
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
