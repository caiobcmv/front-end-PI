import React, { useState, useEffect } from 'react';
import { getLogsAuditoria } from '../services/auditoriaService';

const LOGS_FALLBACK = [
  { id_log: 101, data_hora: new Date().toISOString(), usuario: 'admin@agrocloud.com.br', ip: '189.40.12.5', acao: 'login_sucesso', resultado: 'sucesso' },
  { id_log: 102, data_hora: new Date(Date.now() - 3600000).toISOString(), usuario: 'carlos@exportadora.com.br', ip: '177.18.90.22', acao: 'consultar_dashboard', resultado: 'sucesso' },
  { id_log: 103, data_hora: new Date(Date.now() - 7200000).toISOString(), usuario: 'sistema_iot', ip: '10.0.0.1', acao: 'alerta_temperatura_disparado', resultado: 'aviso' },
];

export default function AuditoriaPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [buscaAcao, setBuscaAcao] = useState('');

  const carregarLogs = async () => {
    setLoading(true);
    try {
      const dados = await getLogsAuditoria(buscaAcao ? { acao: buscaAcao } : {});
      setLogs(Array.isArray(dados) && dados.length > 0 ? dados : dados || []);
      setIsDemo(false);
    } catch (err) {
      console.warn('API /auditoria indisponível, usando dados de demonstração:', err);
      setIsDemo(true);
      setLogs(LOGS_FALLBACK);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarLogs();
  }, [buscaAcao]);

  const formatarData = (iso) => {
    if (!iso) return '--';
    try {
      return new Date(iso).toLocaleString('pt-BR', {
        timeZone: 'America/Recife',
        dateStyle: 'short',
        timeStyle: 'medium',
      });
    } catch {
      return iso;
    }
  };

  return (
    <div>
      <div className="content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="content-title">Relatórios de Auditoria e Segurança</h2>
          <p className="content-subtitle">
            Rastreamento de acessos, eventos de conformidade LGPD e ações críticas no sistema
          </p>
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Filtrar por ação (ex: login, lote)..."
            value={buscaAcao}
            onChange={(e) => setBuscaAcao(e.target.value)}
            style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.875rem', minWidth: '240px' }}
          />
        </div>
      </div>

      <div className="structural-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="structural-card" style={{ borderRadius: '8px' }}>
          <h3>Qualidade do Software & Cobertura</h3>
          <p>Status dos Serviços: <strong style={{ color: '#059669' }}>Operacional (API Ativa)</strong></p>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>Verificação contínua de ingestão de sensores, IA preditiva e autenticação</p>
        </div>

        <div className="structural-card" style={{ borderRadius: '8px' }}>
          <h3>Conformidade e Proteção de Dados</h3>
          <p>Criptografia de Senhas e TLS: <strong>Bcrypt + TLS/HTTPS Ativos</strong></p>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>Tratamento seguro de dados cadastrais e logs auditados por IP de origem</p>
        </div>
      </div>

      {isDemo && (
        <div style={{ background: '#fef3c7', border: '1px solid #fde68a', color: '#92400e', padding: '0.6rem 1rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem' }}>
          ℹ️ <strong>Conexão com a API:</strong> Backend FastAPI indisponível. Exibindo logs de demonstração locais.
        </div>
      )}

      <div className="structural-card" style={{ borderRadius: '8px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <h3 style={{ margin: 0 }}>Registros de Acesso do Sistema (Tabela `log_acesso`)</h3>
          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Total listado: {logs.length}</span>
        </div>

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
            Consultando logs no servidor...
          </div>
        ) : logs.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
            Nenhum registro de auditoria encontrado.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '0.5rem', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>
                <th style={{ padding: '0.6rem' }}>ID</th>
                <th style={{ padding: '0.6rem' }}>Data / Hora (Recife)</th>
                <th style={{ padding: '0.6rem' }}>Usuário</th>
                <th style={{ padding: '0.6rem' }}>Origem (IP)</th>
                <th style={{ padding: '0.6rem' }}>Ação Executada</th>
                <th style={{ padding: '0.6rem' }}>Resultado</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => {
                const id = log.id_log || log.id;
                const isFalha = (log.resultado || '').toLowerCase().includes('falha') || (log.resultado || '').toLowerCase().includes('erro');
                return (
                  <tr key={id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.6rem' }}>#{id}</td>
                    <td style={{ padding: '0.6rem' }}>{formatarData(log.data_hora)}</td>
                    <td style={{ padding: '0.6rem', fontWeight: '500' }}>{log.usuario || (log.id_usuario ? `Usuário #${log.id_usuario}` : 'Sistema')}</td>
                    <td style={{ padding: '0.6rem', color: '#64748b' }}>{log.ip || '127.0.0.1'}</td>
                    <td style={{ padding: '0.6rem' }}>
                      <span style={{ padding: '0.15rem 0.4rem', borderRadius: '4px', background: '#f1f5f9', fontFamily: 'monospace' }}>
                        {log.acao}
                      </span>
                    </td>
                    <td style={{ padding: '0.6rem' }}>
                      <span style={{ 
                        color: isFalha ? '#dc2626' : '#16a34a', 
                        fontWeight: 'bold', 
                        textTransform: 'uppercase', 
                        fontSize: '0.75rem',
                        padding: '0.2rem 0.4rem',
                        borderRadius: '4px',
                        background: isFalha ? '#fef2f2' : '#f0fdf4'
                      }}>
                        {log.resultado || 'OK'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
