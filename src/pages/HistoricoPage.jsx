import React from 'react';

export default function HistoricoPage() {
  return (
    <div>
      <div className="content-header">
        <h2 className="content-title">Histórico Climático e de Safra</h2>
        <p className="content-subtitle">
          Análise de tendências históricas de dados climáticos e produção agrícola (RF10)
        </p>
      </div>

      <div className="structural-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="structural-card">
          <h3>Safra 2025 - Resumo</h3>
          <p>Manga Tommy: 420 toneladas exportadas</p>
          <p>Temperatura Média Anual: 27.2 °C</p>
        </div>

        <div className="structural-card">
          <h3>Safra 2024 - Resumo</h3>
          <p>Manga Tommy: 390 toneladas exportadas</p>
          <p>Temperatura Média Anual: 26.8 °C</p>
        </div>
      </div>

      <div className="structural-card">
        <h3>Consulta de Registros Históricos em Nuvem (AWS/Azure)</h3>
        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
          Visualizador de dados agregados por mês/ano com filtros de exportação para relatórios.
        </p>
      </div>
    </div>
  );
}
