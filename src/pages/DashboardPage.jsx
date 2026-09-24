import React from 'react';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  return (
    <div>
      <div className="content-header">
        <h2 className="content-title">Dashboard Geral (BI)</h2>
        <p className="content-subtitle">
          Monitoramento Climático e Logístico em Nuvem para Exportação de Frutas (Petrolina/Juazeiro)
        </p>
      </div>

      <div className="structural-grid">
        <div className="structural-card">
          <h3>[ IoT ] Sensores em Tempo Real</h3>
          <p>Temperatura: 28.5 °C | Umidade: 62%</p>
          <p style={{ fontSize: '0.8rem', color: '#666' }}>Última atualização via ThingSpeak (ESP32): há 12s</p>
          <Link to="/sensores" className="btn-structural" style={{ marginTop: '0.75rem', textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
            Ver Telemetria Completa →
          </Link>
        </div>

        <div className="structural-card">
          <h3>[ Safra ] Previsão de Colheita</h3>
          <p>Janela Ideal Estimada: <strong>12 a 18 de Outubro</strong></p>
          <p style={{ fontSize: '0.8rem', color: '#666' }}>Lote Principal: Manga Tommy (Petrolina)</p>
          <Link to="/previsao" className="btn-structural" style={{ marginTop: '0.75rem', textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
            Análise Preditiva →
          </Link>
        </div>

        <div className="structural-card">
          <h3>[ Logística ] Mercado & Exportação</h3>
          <p>Cotação Europa (EUR): € 1.85 / kg</p>
          <p style={{ fontSize: '0.8rem', color: '#666' }}>Demanda de Exportação: Alta (+14%)</p>
          <Link to="/mercado" className="btn-structural" style={{ marginTop: '0.75rem', textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
            Ver Cotações →
          </Link>
        </div>
      </div>
    </div>
  );
}
