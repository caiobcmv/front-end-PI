import React, { useState, useEffect } from 'react';
import { 
  getClimaPrevisao, 
  getJanelaColheita, 
  gerarJanelaColheita, 
  getRiscosClimatico, 
  gerarRiscoClimatico 
} from '../services/previsaoService';

const JANELAS_FALLBACK = [
  { id_previsao: 1, fruta: 'Manga Tommy', janela_inicio: '2026-10-25', janela_fim: '2026-10-31', probabilidade: 0.94, resultado: 'Janela térmica ideal para corte', modelo: 'Limiares Térmicos Agro' },
  { id_previsao: 2, fruta: 'Uva Vitória', janela_inicio: '2026-11-01', janela_fim: '2026-11-08', probabilidade: 0.89, resultado: 'Maturação e Brix ideais', modelo: 'Graus-Dia Acumulados' },
];

export default function PrevisaoPage() {
  const [janelas, setJanelas] = useState([]);
  const [clima, setClima] = useState(null);
  const [riscos, setRiscos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [gerandoJanela, setGerandoJanela] = useState(false);
  const [gerandoRisco, setGerandoRisco] = useState(false);

  const carregarDados = async () => {
    setLoading(true);
    try {
      const [climaRes, janelasRes, riscosRes] = await Promise.allSettled([
        getClimaPrevisao({ dias: 3 }),
        getJanelaColheita(),
        getRiscosClimatico(),
      ]);

      if (climaRes.status === 'fulfilled' && climaRes.value) {
        setClima(climaRes.value);
      }

      if (janelasRes.status === 'fulfilled' && Array.isArray(janelasRes.value) && janelasRes.value.length > 0) {
        setJanelas(janelasRes.value);
        setIsDemo(false);
      } else {
        setJanelas(JANELAS_FALLBACK);
        setIsDemo(true);
      }

      if (riscosRes.status === 'fulfilled' && Array.isArray(riscosRes.value)) {
        setRiscos(riscosRes.value);
      }
    } catch (err) {
      console.warn('Erro ao carregar previsões:', err);
      setJanelas(JANELAS_FALLBACK);
      setIsDemo(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleGerarJanela = async () => {
    setGerandoJanela(true);
    try {
      await gerarJanelaColheita({ dias: 7 });
      alert('Janela de colheita recalculada com sucesso com base nas previsões climáticas da Open-Meteo!');
      carregarDados();
    } catch (err) {
      alert(`Falha ao calcular janela: ${err.friendlyMessage || err.message}`);
    } finally {
      setGerandoJanela(false);
    }
  };

  const handleGerarRisco = async () => {
    setGerandoRisco(true);
    try {
      await gerarRiscoClimatico({ dias: 3 });
      alert('Matriz de risco climático atualizada para todos os lotes ativos em campo!');
      carregarDados();
    } catch (err) {
      alert(`Falha ao calcular risco: ${err.friendlyMessage || err.message}`);
    } finally {
      setGerandoRisco(false);
    }
  };

  return (
    <div>
      <div className="content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="content-title">Previsão Agroclimática e Janelas de Colheita</h2>
          <p className="content-subtitle">
            Cálculo preditivo baseado em Open-Meteo, limiares de temperatura e modelos de acúmulo térmico
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button 
            type="button" 
            className="btn-structural" 
            onClick={handleGerarJanela}
            disabled={gerandoJanela}
            style={{ fontWeight: '600', borderRadius: '6px' }}
          >
            {gerandoJanela ? 'Processando IA...' : '⚡ Recalcular Janelas de Colheita'}
          </button>
          <button 
            type="button" 
            className="btn-structural" 
            onClick={handleGerarRisco}
            disabled={gerandoRisco}
            style={{ fontWeight: '600', borderRadius: '6px', background: '#0284c7', borderColor: '#0284c7' }}
          >
            {gerandoRisco ? 'Avaliando...' : '🛡️ Avaliar Riscos Climáticos'}
          </button>
        </div>
      </div>

      {isDemo && (
        <div style={{ background: '#fef3c7', border: '1px solid #fde68a', color: '#92400e', padding: '0.6rem 1rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem' }}>
          ℹ️ <strong>Conexão com a API:</strong> O backend FastAPI não respondeu na porta configurada. Exibindo modelos demonstrativos.
        </div>
      )}

      {/* Previsão do Tempo Externa (Open-Meteo) */}
      {clima && clima.dias && (
        <div className="structural-card" style={{ borderRadius: '8px', marginBottom: '1.5rem', background: '#f8fafc' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', color: '#0f172a' }}>
              🌤️ Previsão Meteorológica Oficial (Petrolina/Juazeiro - Open-Meteo)
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Fuso: {clima.timezone || 'America/Recife'}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
            {clima.dias.map((d, idx) => (
              <div key={idx} style={{ background: '#fff', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.9rem', color: '#1e293b' }}>
                  {new Date(d.data).toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' })}
                </p>
                <p style={{ margin: '0.4rem 0', fontSize: '1.1rem', fontWeight: 'bold', color: '#0284c7' }}>
                  {d.temp_max ? `${Math.round(d.temp_max)}°C` : '--'} <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 'normal' }}>/ {d.temp_min ? `${Math.round(d.temp_min)}°C` : '--'}</span>
                </p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                  Chuva: {d.precipitacao_mm ?? 0} mm | UR: {d.umidade_media ? `${Math.round(d.umidade_media)}%` : '--'}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
          Carregando análises preditivas...
        </div>
      ) : (
        <div className="structural-grid" style={{ marginBottom: '1.5rem' }}>
          {janelas.map((j, idx) => {
            const id = j.id_previsao || idx;
            const prob = j.probabilidade ? `${Math.round(j.probabilidade * 100)}%` : '92%';
            return (
              <div key={id} className="structural-card" style={{ borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{j.fruta || `Lote #${j.id_lote || 101}`}</h3>
                  <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: '#ecfdf5', color: '#047857', fontWeight: 'bold' }}>
                    Confiança: {prob}
                  </span>
                </div>
                <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1b4332', margin: '0.5rem 0' }}>
                  {j.janela_inicio ? new Date(j.janela_inicio).toLocaleDateString('pt-BR') : '25/10'} até {j.janela_fim ? new Date(j.janela_fim).toLocaleDateString('pt-BR') : '31/10'}
                </p>
                <p style={{ fontSize: '0.85rem', color: '#334155' }}>
                  <strong>Diagnóstico:</strong> {j.resultado || 'Condição ótima de maturação e baixa probabilidade de chuva na colheita.'}
                </p>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: 0 }}>
                  Modelo: {j.modelo || 'Algoritmo de Limiares Térmicos'}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Tabela de Riscos Climáticos */}
      {riscos.length > 0 && (
        <div className="structural-card" style={{ borderRadius: '8px', overflowX: 'auto', marginTop: '1.5rem' }}>
          <h3 style={{ marginTop: 0, marginBottom: '0.75rem' }}>Classificação de Riscos por Lote (Tabela `risco_climatico`)</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #cbd5e1', textAlign: 'left' }}>
                <th style={{ padding: '0.6rem' }}>Lote</th>
                <th style={{ padding: '0.6rem' }}>Nível de Risco</th>
                <th style={{ padding: '0.6rem' }}>Probabilidade</th>
                <th style={{ padding: '0.6rem' }}>Justificativa Técnica</th>
                <th style={{ padding: '0.6rem' }}>Período</th>
              </tr>
            </thead>
            <tbody>
              {riscos.map((r, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '0.6rem', fontWeight: 'bold' }}>#{r.id_lote}</td>
                  <td style={{ padding: '0.6rem' }}>
                    <span style={{ 
                      padding: '0.2rem 0.5rem', 
                      borderRadius: '4px', 
                      fontSize: '0.75rem', 
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      background: r.nivel_risco === 'alto' ? '#fef2f2' : r.nivel_risco === 'médio' ? '#fffbeb' : '#f0fdf4',
                      color: r.nivel_risco === 'alto' ? '#dc2626' : r.nivel_risco === 'médio' ? '#b45309' : '#16a34a',
                    }}>
                      {r.nivel_risco || 'baixo'}
                    </span>
                  </td>
                  <td style={{ padding: '0.6rem' }}>{r.probabilidade ? `${Math.round(r.probabilidade * 100)}%` : '--'}</td>
                  <td style={{ padding: '0.6rem' }}>{r.justificativa || 'Dentro dos limites ideais de umidade e temperatura.'}</td>
                  <td style={{ padding: '0.6rem', color: '#64748b' }}>
                    {r.periodo_inicio ? new Date(r.periodo_inicio).toLocaleDateString('pt-BR') : '--'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
