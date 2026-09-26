import React from 'react';

export default function HistoricoPage() {
  return (
    <div>
      <div className="content-header">
        <h2 className="content-title">Histórico Climático e de Safra</h2>
        <p className="content-subtitle">
          Análise de tendências históricas do clima e volume de produção agrícola
        </p>
      </div>

      <div className="structural-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="structural-card" style={{ borderRadius: '8px' }}>
          <h3>Resumo da Safra 2025</h3>
          <p>Manga Tommy: 420 toneladas exportadas</p>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>Temperatura Média Anual: 27,2 °C</p>
        </div>

        <div className="structural-card" style={{ borderRadius: '8px' }}>
          <h3>Resumo da Safra 2024</h3>
          <p>Manga Tommy: 390 toneladas exportadas</p>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>Temperatura Média Anual: 26,8 °C</p>
        </div>
      </div>

      <div className="structural-card" style={{ borderRadius: '8px' }}>
        <h3>Registros Históricos Armazenados</h3>
        <p style={{ fontSize: '0.9rem', color: '#555', marginTop: '0.5rem' }}>
          Visualização de dados consolidados por período com opção de exportação de relatórios.
        </p>
      </div>
    </div>
  );
}
