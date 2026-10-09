import React from 'react';
import LineChartCard from '../components/LineChartCard';
import { temperaturaAr, umidadeSolo, temperaturaSolo } from '../mocks/sensorSeries';

export default function SensoresPage() {
  return (
    <div>
      <div className="content-header">
        <h2 className="content-title">Status dos Sensores IoT</h2>
        <p className="content-subtitle">
          Leitura contínua de dados de temperatura e umidade em campo
        </p>
      </div>

      <div className="structural-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="structural-card" style={{ borderRadius: '8px' }}>
          <h3>Sensor de Temperatura</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1b4332' }}>28.5 °C</p>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>Faixa ideal para safra: 24°C a 30°C</p>
        </div>

        <div className="structural-card" style={{ borderRadius: '8px' }}>
          <h3>Sensor de Umidade Relativa</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1b4332' }}>62 %</p>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>Umidade relativa do ar no campo</p>
        </div>

        <div className="structural-card" style={{ borderRadius: '8px' }}>
          <h3>Status da Conexão</h3>
          <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#2d6a4f' }}>Online</p>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>Última leitura realizada há 15 segundos</p>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <LineChartCard
          title="Temperatura do ar"
          unit="°C"
          series={temperaturaAr}
          range={{ min: 24, max: 30 }}
          source="sensor"
        />
        <LineChartCard
          title="Umidade do solo"
          unit="%"
          series={umidadeSolo}
          range={{ min: 40, max: 70 }}
          source="sensor"
          color="#0d9488"
        />
        <LineChartCard
          title="Temperatura do solo"
          unit="°C"
          series={temperaturaSolo}
          source="estimado"
          color="#f59e0b"
        />
      </div>

      <div className="structural-card" style={{ borderRadius: '8px' }}>
        <h3>Histórico Recente de Leituras</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '0.75rem', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>
              <th style={{ padding: '0.5rem' }}>Horário</th>
              <th style={{ padding: '0.5rem' }}>Registro</th>
              <th style={{ padding: '0.5rem' }}>Temperatura</th>
              <th style={{ padding: '0.5rem' }}>Umidade</th>
              <th style={{ padding: '0.5rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.5rem' }}>22:14:00</td>
              <td style={{ padding: '0.5rem' }}>#1042</td>
              <td style={{ padding: '0.5rem' }}>28.5 °C</td>
              <td style={{ padding: '0.5rem' }}>62%</td>
              <td style={{ padding: '0.5rem', color: '#28a745', fontWeight: '500' }}>Processado</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.5rem' }}>22:13:45</td>
              <td style={{ padding: '0.5rem' }}>#1041</td>
              <td style={{ padding: '0.5rem' }}>28.7 °C</td>
              <td style={{ padding: '0.5rem' }}>61%</td>
              <td style={{ padding: '0.5rem', color: '#28a745', fontWeight: '500' }}>Processado</td>
            </tr>
            <tr>
              <td style={{ padding: '0.5rem' }}>22:13:30</td>
              <td style={{ padding: '0.5rem' }}>#1040</td>
              <td style={{ padding: '0.5rem' }}>28.9 °C</td>
              <td style={{ padding: '0.5rem' }}>60%</td>
              <td style={{ padding: '0.5rem', color: '#28a745', fontWeight: '500' }}>Processado</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
