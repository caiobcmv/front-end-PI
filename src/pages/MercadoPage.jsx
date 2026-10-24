import React, { useState, useEffect } from 'react';
import { getDadosMercado, criarDadoMercado } from '../services/mercadoService';
import { getFrutas } from '../services/loteService';

const MERCADO_FALLBACK = [
  { id_mercado: 1, fruta: 'Manga Tommy', preco: 1.85, unidade: 'kg', moeda: 'EUR', demanda_exportacao: 92.0, data_referencia: '2026-10-23', destino_exemplo: 'Porto de Roterdã (UE)' },
  { id_mercado: 2, fruta: 'Manga Palmer', preco: 2.10, unidade: 'kg', moeda: 'USD', demanda_exportacao: 78.0, data_referencia: '2026-10-22', destino_exemplo: 'Porto da Filadélfia (EUA)' },
  { id_mercado: 3, fruta: 'Uva Vitória', preco: 14.50, unidade: 'kg', moeda: 'BRL', demanda_exportacao: 85.0, data_referencia: '2026-10-23', destino_exemplo: 'Mercado Interno (SP/RJ)' },
];

export default function MercadoPage() {
  const [cotacoes, setCotacoes] = useState([]);
  const [frutas, setFrutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [novaCotacao, setNovaCotacao] = useState({
    id_fruta: '',
    preco: '',
    unidade: 'kg',
    moeda: 'USD',
    demanda_exportacao: '',
    data_referencia: new Date().toISOString().split('T')[0],
  });

  const carregarCotacoes = async () => {
    setLoading(true);
    try {
      const [dados, frutasData] = await Promise.all([
        getDadosMercado(),
        getFrutas().catch(() => []),
      ]);
      setCotacoes(Array.isArray(dados) && dados.length > 0 ? dados : dados || []);
      setFrutas(frutasData || []);
      setIsDemo(false);
    } catch (err) {
      console.warn('API /dados-mercado indisponível, usando fallback:', err);
      setIsDemo(true);
      setCotacoes(MERCADO_FALLBACK);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarCotacoes();
  }, []);

  const handleSalvarCotacao = async (e) => {
    e.preventDefault();
    if (!novaCotacao.id_fruta || !novaCotacao.preco) {
      alert('Informe a fruta e o preço.');
      return;
    }

    setIsSubmitting(true);
    try {
      await criarDadoMercado({
        id_fruta: Number(novaCotacao.id_fruta),
        preco: Number(novaCotacao.preco),
        unidade: novaCotacao.unidade,
        moeda: novaCotacao.moeda,
        demanda_exportacao: novaCotacao.demanda_exportacao ? Number(novaCotacao.demanda_exportacao) : null,
        data_referencia: novaCotacao.data_referencia || null,
      });
      alert('Cotação registrada com sucesso no banco!');
      setShowModal(false);
      setNovaCotacao({
        id_fruta: '',
        preco: '',
        unidade: 'kg',
        moeda: 'USD',
        demanda_exportacao: '',
        data_referencia: new Date().toISOString().split('T')[0],
      });
      carregarCotacoes();
    } catch (err) {
      alert(`Erro ao registrar cotação: ${err.friendlyMessage || err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatarMoeda = (valor, moeda = 'BRL') => {
    if (valor == null) return '--';
    const simbolos = { USD: '$', EUR: '€', BRL: 'R$' };
    const simbolo = simbolos[moeda] || moeda;
    return `${simbolo} ${Number(valor).toFixed(2)}`;
  };

  return (
    <div>
      <div className="content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="content-title">Mercado e Cotações Internacionais</h2>
          <p className="content-subtitle">
            Acompanhamento de preços de frutas exportadas, câmbio e índices de demanda no exterior
          </p>
        </div>
        <button 
          type="button" 
          className="btn-structural" 
          onClick={() => setShowModal(true)}
          style={{ fontWeight: '600', borderRadius: '6px' }}
        >
          + Adicionar Cotação
        </button>
      </div>

      {isDemo && (
        <div style={{ background: '#fef3c7', border: '1px solid #fde68a', color: '#92400e', padding: '0.6rem 1rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem' }}>
          ℹ️ <strong>Conexão com a API:</strong> O backend FastAPI não respondeu na porta configurada. Exibindo cotações de demonstração.
        </div>
      )}

      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
          Consultando cotações de mercado da API...
        </div>
      ) : (
        <>
          <div className="structural-grid" style={{ marginBottom: '1.5rem' }}>
            {cotacoes.slice(0, 3).map((item, idx) => {
              const id = item.id_mercado || idx;
              return (
                <div key={id} className="structural-card" style={{ borderRadius: '8px' }}>
                  <h3 style={{ marginTop: 0 }}>{item.fruta || 'Fruta Geral'}</h3>
                  <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0f172a', margin: '0.5rem 0' }}>
                    {formatarMoeda(item.preco, item.moeda)} <span style={{ fontSize: '0.9rem', color: '#64748b' }}>/ {item.unidade || 'kg'}</span>
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: '500' }}>
                    Índice de Demanda: {item.demanda_exportacao ? `${item.demanda_exportacao}%` : 'Alta'}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    Ref: {item.data_referencia ? new Date(item.data_referencia).toLocaleDateString('pt-BR') : 'Hoje'}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="structural-card" style={{ borderRadius: '8px', overflowX: 'auto' }}>
            <h3 style={{ marginTop: 0, marginBottom: '0.75rem' }}>Histórico Consolidado de Cotações</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #cbd5e1', textAlign: 'left' }}>
                  <th style={{ padding: '0.6rem' }}>Data Ref.</th>
                  <th style={{ padding: '0.6rem' }}>Cultura / Fruta</th>
                  <th style={{ padding: '0.6rem' }}>Preço Unitário</th>
                  <th style={{ padding: '0.6rem' }}>Moeda</th>
                  <th style={{ padding: '0.6rem' }}>Demanda Exportação</th>
                </tr>
              </thead>
              <tbody>
                {cotacoes.map((item, idx) => {
                  const id = item.id_mercado || idx;
                  return (
                    <tr key={id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.6rem' }}>{item.data_referencia ? new Date(item.data_referencia).toLocaleDateString('pt-BR') : '--'}</td>
                      <td style={{ padding: '0.6rem', fontWeight: '600' }}>{item.fruta || 'Fruta'}</td>
                      <td style={{ padding: '0.6rem' }}>{Number(item.preco).toFixed(2)} / {item.unidade || 'kg'}</td>
                      <td style={{ padding: '0.6rem' }}>
                        <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', background: '#f8fafc', border: '1px solid #e2e8f0', fontWeight: 'bold' }}>
                          {item.moeda}
                        </span>
                      </td>
                      <td style={{ padding: '0.6rem', color: '#059669', fontWeight: '500' }}>
                        {item.demanda_exportacao ? `${item.demanda_exportacao}%` : '--'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Modal Adicionar Cotação */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '10px', width: '100%', maxWidth: '440px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#0f172a' }}>Nova Cotação de Mercado</h3>
            <form onSubmit={handleSalvarCotacao}>
              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>Fruta *</label>
                <select 
                  required
                  value={novaCotacao.id_fruta} 
                  onChange={(e) => setNovaCotacao({ ...novaCotacao, id_fruta: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                >
                  <option value="">Selecione a fruta...</option>
                  {frutas.length > 0 ? (
                    frutas.map((f) => (
                      <option key={f.id_fruta} value={f.id_fruta}>{f.nome}</option>
                    ))
                  ) : (
                    <>
                      <option value="1">Manga Tommy</option>
                      <option value="2">Manga Palmer</option>
                      <option value="3">Uva Vitória</option>
                    </>
                  )}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>Preço *</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    required 
                    min="0"
                    placeholder="Ex: 2.10"
                    value={novaCotacao.preco}
                    onChange={(e) => setNovaCotacao({ ...novaCotacao, preco: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>Moeda</label>
                  <select 
                    value={novaCotacao.moeda} 
                    onChange={(e) => setNovaCotacao({ ...novaCotacao, moeda: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="BRL">BRL (R$)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>Unidade</label>
                  <select 
                    value={novaCotacao.unidade} 
                    onChange={(e) => setNovaCotacao({ ...novaCotacao, unidade: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  >
                    <option value="kg">kg</option>
                    <option value="caixa">caixa</option>
                    <option value="t">t</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>Demanda (%)</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="100" 
                    placeholder="Ex: 85"
                    value={novaCotacao.demanda_exportacao}
                    onChange={(e) => setNovaCotacao({ ...novaCotacao, demanda_exportacao: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>Data de Referência</label>
                <input 
                  type="date" 
                  value={novaCotacao.data_referencia}
                  onChange={(e) => setNovaCotacao({ ...novaCotacao, data_referencia: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  style={{ padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer' }}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-structural"
                  style={{ borderRadius: '6px' }}
                >
                  {isSubmitting ? 'Salvando...' : 'Salvar Cotação'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
