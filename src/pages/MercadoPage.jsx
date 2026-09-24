import React from 'react';

export default function MercadoPage() {
  return (
    <div>
      <div className="content-header">
        <h2 className="content-title">Mercado & Cotações Internacionais</h2>
        <p className="content-subtitle">
          Ingestão e exibição de dados de mercado, preços e demanda de exportação (RF03)
        </p>
      </div>

      <div className="structural-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="structural-card">
          <h3>União Europeia (Porto de Roterdã)</h3>
          <p>Cotação Manga Tommy: <strong>€ 1.85 / kg</strong></p>
          <p style={{ fontSize: '0.85rem', color: '#28a745' }}>Demanda: Alta (+14%)</p>
        </div>

        <div className="structural-card">
          <h3>Estados Unidos (Porto da Filadélfia)</h3>
          <p>Cotação Manga Tommy: <strong>$ 2.10 / kg</strong></p>
          <p style={{ fontSize: '0.85rem', color: '#28a745' }}>Demanda: Estável (+3%)</p>
        </div>

        <div className="structural-card">
          <h3>Custo do Frete Logístico</h3>
          <p>Container Refrigerado: <strong>$ 4.200</strong></p>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>Rota: Petrolina → Suape → Europa</p>
        </div>
      </div>
    </div>
  );
}
