import React from 'react';

export default function PrevisaoPage() {
  return (
    <div>
      <div className="content-header">
        <h2 className="content-title">Previsão de Safra e Exportação</h2>
        <p className="content-subtitle">
          Análise preditiva gerada a partir dos dados de sensores e tendências de mercado
        </p>
      </div>

      <div className="structural-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="structural-card" style={{ borderRadius: '8px' }}>
          <h3>Previsão de Maturação Ideal</h3>
          <p style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#1b4332' }}>14 de Outubro de 2026</p>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>Precisão estimada do modelo: 94,2%</p>
        </div>

        <div className="structural-card" style={{ borderRadius: '8px' }}>
          <h3>Janela Logística de Exportação</h3>
          <p style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#1b4332' }}>15 a 22 de Outubro</p>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>Condições climáticas favoráveis e alta demanda na Europa</p>
        </div>
      </div>

      <div className="structural-card" style={{ borderRadius: '8px' }}>
        <h3>Variáveis de Análise</h3>
        <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', lineHeight: '1.6', fontSize: '0.9rem' }}>
          <li><strong>Tratamento de Dados Climáticos:</strong> Filtragem de variações bruscas nos sensores de temperatura e umidade.</li>
          <li><strong>Cruzamento com Mercado:</strong> Acompanhamento de cotações internacionais nos principais portos.</li>
          <li><strong>Emissão de Alertas:</strong> Alerta preventivo contra variações climáticas que afetam a qualidade do fruto.</li>
        </ul>
      </div>
    </div>
  );
}
