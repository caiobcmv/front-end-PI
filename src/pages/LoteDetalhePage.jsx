import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function LoteDetalhePage() {
  const { id } = useParams();

  return (
    <div>
      <div className="content-header">
        <Link to="/lotes" style={{ textDecoration: 'none', fontSize: '0.9rem', color: '#666' }}>
          ← Voltar para Lista de Lotes
        </Link>
        <h2 className="content-title" style={{ marginTop: '0.5rem' }}>
          Detalhes do Lote: {id ? id.toUpperCase() : 'LOTE-101'}
        </h2>
        <p className="content-subtitle">
          Telemetria climática dedicada e indicadores preditivos do lote
        </p>
      </div>

      <div className="structural-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="structural-card">
          <h3>Métricas Climáticas Acumuladas</h3>
          <p>Média Temp. Diária: 27.8 °C</p>
          <p>Umidade Média: 59%</p>
          <p>Acúmulo Térmico: 1.420 GDA (Graus-Dia)</p>
        </div>

        <div className="structural-card">
          <h3>Recomendação Logística (RF09)</h3>
          <p style={{ color: '#28a745', fontWeight: 'bold' }}>Janela Favorável de Colheita Identificada</p>
          <p style={{ fontSize: '0.85rem' }}>
            Prazo ideal para início do corte: <strong>5 a 8 dias</strong>.
          </p>
          <p style={{ fontSize: '0.8rem', color: '#666' }}>Destino Recomendado: Porto de Suape / Exportação Europa.</p>
        </div>
      </div>

      <div className="structural-card">
        <h3>Histórico de Leituras Dedicadas do Lote</h3>
        <p style={{ fontSize: '0.9rem', color: '#555' }}>
          Registros armazenados na nuvem (AWS/Azure - RF04) associados à chave do canal IoT deste lote.
        </p>
      </div>
    </div>
  );
}
