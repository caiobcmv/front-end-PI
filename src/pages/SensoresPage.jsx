import React from 'react';

export default function SensoresPage() {
  return (
    <div>
      <div className="content-header">
        <h2 className="content-title">Status dos Sensores IoT (ThingSpeak API)</h2>
        <p className="content-subtitle">
          Recepção de dados simulados de temperatura e umidade via ESP32 / ThingSpeak Channel Feeds (RF01, RF02, RNF11)
        </p>
      </div>

      <div className="structural-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="structural-card">
          <h3>Sensor DHT22 - Temperatura</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>28.5 °C</p>
          <p style={{ fontSize: '0.8rem', color: '#666' }}>Faixa ideal para safra: 24°C - 30°C</p>
        </div>

        <div className="structural-card">
          <h3>Sensor DHT22 - Umidade Relativa</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>62 %</p>
          <p style={{ fontSize: '0.8rem', color: '#666' }}>Umidade do ar no Vale do São Francisco</p>
        </div>

        <div className="structural-card">
          <h3>Status de Conexão ESP32</h3>
          <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#28a745' }}>● ONLINE (HTTP/MQTT)</p>
          <p style={{ fontSize: '0.8rem', color: '#666' }}>Intervalo de Atualização: ~15s (ThingSpeak Free Tier)</p>
        </div>
      </div>

      <div className="structural-card">
        <h3>Histórico Recente de Ingestão (Feed Feeds REST)</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '0.75rem', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>
              <th style={{ padding: '0.5rem' }}>Timestamp</th>
              <th style={{ padding: '0.5rem' }}>Entry ID</th>
              <th style={{ padding: '0.5rem' }}>Temp (°C)</th>
              <th style={{ padding: '0.5rem' }}>Umidade (%)</th>
              <th style={{ padding: '0.5rem' }}>Status Ingestão</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.5rem' }}>2026-09-23 22:14:00</td>
              <td style={{ padding: '0.5rem' }}>#1042</td>
              <td style={{ padding: '0.5rem' }}>28.5</td>
              <td style={{ padding: '0.5rem' }}>62%</td>
              <td style={{ padding: '0.5rem', color: '#28a745' }}>Processado (RF05)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.5rem' }}>2026-09-23 22:13:45</td>
              <td style={{ padding: '0.5rem' }}>#1041</td>
              <td style={{ padding: '0.5rem' }}>28.7</td>
              <td style={{ padding: '0.5rem' }}>61%</td>
              <td style={{ padding: '0.5rem', color: '#28a745' }}>Processado (RF05)</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem' }}>2026-09-23 22:13:30</td>
              <td style={{ padding: '0.5rem' }}>#1040</td>
              <td style={{ padding: '0.5rem' }}>28.9</td>
              <td style={{ padding: '0.5rem' }}>60%</td>
              <td style={{ padding: '0.5rem', color: '#28a745' }}>Processado (RF05)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
