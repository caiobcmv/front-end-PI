import React from 'react';
import { Link } from 'react-router-dom';

export default function LotesPage() {
  const lotes = [
    { id: 'lote-101', nome: 'Lote 101 - Manga Tommy', regiao: 'Petrolina - Gleba A', cultura: 'Manga Tommy', status: 'Colheita Próxima', alerta: true },
    { id: 'lote-102', nome: 'Lote 102 - Uva Vitória', regiao: 'Juazeiro - Setor 3', cultura: 'Uva sem semente', status: 'Maturação', alerta: false },
    { id: 'lote-103', nome: 'Lote 103 - Manga Palmer', regiao: 'Petrolina - Gleba C', cultura: 'Manga Palmer', status: 'Desenvolvimento', alerta: false },
  ];

  return (
    <div>
      <div className="content-header">
        <h2 className="content-title">Lista de Lotes e Safras</h2>
        <p className="content-subtitle">
          Gerenciamento e monitoramento por lote de produção agrícola (Petrolina e Juazeiro)
        </p>
      </div>

      <div className="structural-grid">
        {lotes.map((lote) => (
          <div key={lote.id} className="structural-card" style={{ borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>{lote.nome}</h3>
              {lote.alerta && (
                <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: '4px', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', fontWeight: 'bold' }}>
                  Alerta de Janela
                </span>
              )}
            </div>
            <p><strong>Cultura:</strong> {lote.cultura}</p>
            <p><strong>Localização:</strong> {lote.regiao}</p>
            <p><strong>Status da Safra:</strong> {lote.status}</p>

            <Link 
              to={`/lotes/${lote.id}`} 
              className="btn-structural" 
              style={{ marginTop: '0.75rem', textDecoration: 'none', textAlign: 'center', borderRadius: '4px' }}
            >
              Ver Detalhes do Lote
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
