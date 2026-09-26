import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function LoteDetalhePage() {
  const { id } = useParams();

  return (
    <div>
      <div className="content-header">
        <Link to="/lotes" style={{ textDecoration: 'none', fontSize: '0.9rem', color: '#666', fontWeight: '500' }}>
          Voltar para Lista de Lotes
        </Link>
        <h2 className="content-title" style={{ marginTop: '0.5rem' }}>
          Detalhes do Lote: {id ? id.toUpperCase() : 'LOTE-101'}
        </h2>
        <p className="content-subtitle">
          Telemetria climática dedicada e indicadores preditivos do lote
        </p>
      </div>

      <div className="structural-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="structural-card" style={{ borderRadius: '8px' }}>
          <h3>Métricas Climáticas Acumuladas</h3>
          <p>Média de Temperatura Diária: 27,8 °C</p>
          <p>Umidade Média: 59%</p>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>Acúmulo Térmico: 1.420 Graus-Dia</p>
        </div>

        <div className="structural-card" style={{ borderRadius: '8px' }}>
          <h3>Recomendação Logística</h3>
          <p style={{ color: '#28a745', fontWeight: 'bold' }}>Janela Favorável de Colheita Identificada</p>
          <p style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
            Prazo ideal para início da colheita: <strong>5 a 8 dias</strong>.
          </p>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>Destino Recomendado: Porto de Suape (Exportação para Europa)</p>
        </div>
      </div>

      <div className="structural-card" style={{ borderRadius: '8px' }}>
        <h3>Histórico de Leituras do Lote</h3>
        <p style={{ fontSize: '0.9rem', color: '#555', marginTop: '0.5rem' }}>
          Registros climáticos em tempo real associados aos sensores instalados neste lote.
        </p>
      </div>
    </div>
  );
}
