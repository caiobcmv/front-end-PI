import React from 'react';

export default function MercadoPage() {
  return (
    <div>
      <div className="content-header">
        <h2 className="content-title">Mercado e Cotações Internacionais</h2>
        <p className="content-subtitle">
          Acompanhamento de preços, demandas de exportação e custos logísticos
        </p>
      </div>

      <div className="structural-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="structural-card" style={{ borderRadius: '8px' }}>
          <h3>União Europeia (Porto de Roterdã)</h3>
          <p>Cotação Manga Tommy: <strong>€ 1,85 / kg</strong></p>
          <p style={{ fontSize: '0.85rem', color: '#28a745', fontWeight: '500' }}>Demanda: Alta (+14%)</p>
        </div>

        <div className="structural-card" style={{ borderRadius: '8px' }}>
          <h3>Estados Unidos (Porto da Filadélfia)</h3>
          <p>Cotação Manga Tommy: <strong>$ 2,10 / kg</strong></p>
          <p style={{ fontSize: '0.85rem', color: '#28a745', fontWeight: '500' }}>Demanda: Estável (+3%)</p>
        </div>

        <div className="structural-card" style={{ borderRadius: '8px' }}>
          <h3>Custo do Frete Logístico</h3>
          <p>Contêiner Refrigerado: <strong>$ 4.200</strong></p>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>Rota: Petrolina → Suape → Europa</p>
        </div>
      </div>
    </div>
  );
}
