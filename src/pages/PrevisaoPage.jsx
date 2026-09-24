import React from 'react';

export default function PrevisaoPage() {
  return (
    <div>
      <div className="content-header">
        <h2 className="content-title">Modelos Preditivos de Safra & Exportação</h2>
        <p className="content-subtitle">
          Análise preditiva gerada a partir dos dados limpos do ThingSpeak e dados de mercado (RF05, RF06)
        </p>
      </div>

      <div className="structural-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="structural-card">
          <h3>Previsão de Maturação Ideal</h3>
          <p style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>14 de Outubro de 2026</p>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>Precisão do Modelo Preditivo: 94.2%</p>
        </div>

        <div className="structural-card">
          <h3>Janela Logística de Exportação</h3>
          <p style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>15 a 22 de Outubro</p>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>Combinação: Temperatura ideal + Demanda alta na Europa</p>
        </div>
      </div>

      <div className="structural-card">
        <h3>Variáveis do Modelo (Data Science - RF06)</h3>
        <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', lineHeight: '1.6', fontSize: '0.9rem' }}>
          <li><strong>Tratamento de Dados Climáticos (RF05):</strong> Scripts em Python/R aplicados no tratamento de ruídos nos sensores ThingSpeak.</li>
          <li><strong>Cruzamento com Mercado (RF03):</strong> Monitoramento de cotações em Roterdã e Filadélfia.</li>
          <li><strong>Emissão de Alertas (RF09):</strong> Alerta de alteração climática súbita (ex: aumento de umidade relativa prejudicial à uva).</li>
        </ul>
      </div>
    </div>
  );
}
