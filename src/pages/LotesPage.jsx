import React, { useState, useEffect, useTransition } from 'react';
import { Link } from 'react-router-dom';
import { getLotes, getFrutas, criarLote } from '../services/loteService';

const LOTES_FALLBACK = [
  { id_lote: 101, fruta: 'Manga Tommy', quantidade: 12000, unidade: 'kg', status: 'Pronto para colheita', etapa: 'campo', destino: 'Porto de Roterdã', data_colheita: '2026-10-28' },
  { id_lote: 102, fruta: 'Uva Vitória', quantidade: 8500, unidade: 'kg', status: 'Em produção', etapa: 'campo', destino: 'Mercado Interno (CEAGESP)', data_colheita: '2026-11-05' },
  { id_lote: 103, fruta: 'Manga Palmer', quantidade: 15000, unidade: 'kg', status: 'Em transporte', etapa: 'transporte', destino: 'Porto da Filadélfia', data_colheita: '2026-10-22' },
];

export default function LotesPage() {
  const [lotes, setLotes] = useState([]);
  const [frutas, setFrutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, startTransition] = useTransition();

  // Novo lote form
  const [novoLote, setNovoLote] = useState({
    id_fruta: '',
    quantidade: '',
    unidade: 'kg',
    status: 'Em produção',
    destino: '',
    data_colheita: '',
  });

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [lotesData, frutasData] = await Promise.all([
        getLotes(filtroStatus ? { status: filtroStatus } : {}),
        getFrutas().catch(() => []),
      ]);
      setLotes(Array.isArray(lotesData) && lotesData.length > 0 ? lotesData : lotesData || []);
      setFrutas(frutasData || []);
      setIsDemo(false);
    } catch (err) {
      console.warn('API /lotes indisponível, usando dados de demonstração:', err);
      setIsDemo(true);
      setLotes(LOTES_FALLBACK);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, [filtroStatus]);

  const handleSalvarNovoLote = async (e) => {
    e.preventDefault();
    if (!novoLote.id_fruta || !novoLote.quantidade) {
      alert('Por favor, informe a fruta e a quantidade.');
      return;
    }

    setIsSubmitting(true);
    try {
      await criarLote({
        id_fruta: Number(novoLote.id_fruta),
        quantidade: Number(novoLote.quantidade),
        unidade: novoLote.unidade,
        status: novoLote.status,
        destino: novoLote.destino || null,
        data_colheita: novoLote.data_colheita || null,
      });
      setShowModal(false);
      setNovoLote({
        id_fruta: '',
        quantidade: '',
        unidade: 'kg',
        status: 'Em produção',
        destino: '',
        data_colheita: '',
      });
      carregarDados();
    } catch (err) {
      alert(`Erro ao cadastrar lote: ${err.friendlyMessage || err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="content-title">Gestão e Rastreabilidade de Lotes</h2>
          <p className="content-subtitle">
            Sincronizado com a base de dados centralizada do Vale do São Francisco (Petrolina e Juazeiro)
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <select 
            value={filtroStatus} 
            onChange={(e) => startTransition(() => setFiltroStatus(e.target.value))}
            style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
          >
            <option value="">Todos os Status</option>
            <option value="Em produção">Em produção</option>
            <option value="Pronto para colheita">Pronto para colheita</option>
            <option value="Colhido">Colhido</option>
            <option value="Em transporte">Em transporte</option>
            <option value="Armazenado">Armazenado</option>
            <option value="Finalizado">Finalizado</option>
          </select>

          <button 
            type="button" 
            className="btn-structural" 
            onClick={() => setShowModal(true)}
            style={{ fontWeight: '600', borderRadius: '6px' }}
          >
            + Novo Lote
          </button>
        </div>
      </div>

      {isDemo && (
        <div style={{ background: '#fef3c7', border: '1px solid #fde68a', color: '#92400e', padding: '0.6rem 1rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem' }}>
          ℹ️ <strong>Conexão com a API:</strong> O backend FastAPI não respondeu na porta configurada. Exibindo dados locais seguros para demonstração.
        </div>
      )}

      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
          Carregando lotes da API...
        </div>
      ) : lotes.length === 0 ? (
        <div className="structural-card" style={{ textAlign: 'center', padding: '2.5rem' }}>
          <p style={{ color: '#64748b', fontSize: '1rem' }}>Nenhum lote encontrado com os filtros selecionados.</p>
        </div>
      ) : (
        <div className="structural-grid">
          {lotes.map((lote) => {
            const id = lote.id_lote || lote.id;
            const isAlerta = lote.status === 'Pronto para colheita';
            return (
              <div key={id} className="structural-card" style={{ borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>
                    Lote #{id} - {lote.fruta || 'Fruta'}
                  </h3>
                  {isAlerta && (
                    <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', fontWeight: 'bold' }}>
                      Janela Ativa
                    </span>
                  )}
                </div>
                
                <p><strong>Cultura:</strong> {lote.fruta || 'Não informada'}</p>
                <p><strong>Volume:</strong> {lote.quantidade ? `${lote.quantidade.toLocaleString('pt-BR')} ${lote.unidade || 'kg'}` : '--'}</p>
                <p><strong>Etapa Operacional:</strong> <span style={{ textTransform: 'capitalize' }}>{lote.etapa || 'Campo'}</span></p>
                <p><strong>Status:</strong> <span style={{ color: '#059669', fontWeight: '500' }}>{lote.status}</span></p>
                {lote.destino && <p><strong>Destino:</strong> {lote.destino}</p>}
                {lote.data_colheita && <p><strong>Data de Colheita:</strong> {new Date(lote.data_colheita).toLocaleDateString('pt-BR')}</p>}

                <Link 
                  to={`/lotes/${id}`} 
                  className="btn-structural" 
                  style={{ marginTop: '0.75rem', textDecoration: 'none', textAlign: 'center', borderRadius: '4px', display: 'block' }}
                >
                  Ver Detalhes do Lote
                </Link>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal de Criação de Lote */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '10px', width: '100%', maxWidth: '480px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#0f172a' }}>Cadastrar Novo Lote Agrícola</h3>
            <form onSubmit={handleSalvarNovoLote}>
              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>Fruta / Cultura *</label>
                <select 
                  required
                  value={novoLote.id_fruta} 
                  onChange={(e) => setNovoLote({ ...novoLote, id_fruta: e.target.value })}
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
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>Quantidade *</label>
                  <input 
                    type="number" 
                    required 
                    min="1"
                    placeholder="Ex: 5000"
                    value={novoLote.quantidade}
                    onChange={(e) => setNovoLote({ ...novoLote, quantidade: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>Unidade</label>
                  <select 
                    value={novoLote.unidade} 
                    onChange={(e) => setNovoLote({ ...novoLote, unidade: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  >
                    <option value="kg">kg</option>
                    <option value="caixa">caixa</option>
                    <option value="t">t (tonelada)</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>Status Inicial</label>
                <select 
                  value={novoLote.status} 
                  onChange={(e) => setNovoLote({ ...novoLote, status: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                >
                  <option value="Em produção">Em produção</option>
                  <option value="Pronto para colheita">Pronto para colheita</option>
                  <option value="Armazenado">Armazenado</option>
                  <option value="Em transporte">Em transporte</option>
                </select>
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>Destino Previsto</label>
                <input 
                  type="text" 
                  placeholder="Ex: Porto de Suape ou Roterdã"
                  value={novoLote.destino}
                  onChange={(e) => setNovoLote({ ...novoLote, destino: e.target.value })}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>Previsão de Colheita</label>
                <input 
                  type="date" 
                  value={novoLote.data_colheita}
                  onChange={(e) => setNovoLote({ ...novoLote, data_colheita: e.target.value })}
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
                  {isSubmitting ? 'Gravando...' : 'Salvar no Banco'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
