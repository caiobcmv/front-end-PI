import React from 'react';

export default function AuditoriaPage() {
  return (
    <div>
      <div className="content-header">
        <h2 className="content-title">Relatórios de Auditoria e Segurança</h2>
        <p className="content-subtitle">
          Registro de acessos, eventos de segurança e qualidade do sistema
        </p>
      </div>

      <div className="structural-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="structural-card" style={{ borderRadius: '8px' }}>
          <h3>Qualidade do Software</h3>
          <p>Status dos Testes: <strong>Passando (100%)</strong></p>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>Verificação de ingestão de dados, previsão e autenticação</p>
        </div>

        <div className="structural-card" style={{ borderRadius: '8px' }}>
          <h3>Conformidade e Proteção de Dados</h3>
          <p>Criptografia em Trânsito (TLS/HTTPS): <strong>Ativa</strong></p>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>Tratamento seguro de dados em conformidade com a LGPD</p>
        </div>
      </div>

      <div className="structural-card" style={{ borderRadius: '8px' }}>
        <h3>Logs Recentes de Acesso</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '0.75rem', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>
              <th style={{ padding: '0.5rem' }}>Data/Hora</th>
              <th style={{ padding: '0.5rem' }}>Usuário</th>
              <th style={{ padding: '0.5rem' }}>Origem</th>
              <th style={{ padding: '0.5rem' }}>Ação Executada</th>
              <th style={{ padding: '0.5rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.5rem' }}>2026-09-23 22:10:12</td>
              <td style={{ padding: '0.5rem' }}>admin@agrocloud.com.br</td>
              <td style={{ padding: '0.5rem' }}>189.40.12.5</td>
              <td style={{ padding: '0.5rem' }}>Login efetuado com sucesso</td>
              <td style={{ padding: '0.5rem', color: '#28a745', fontWeight: 'bold' }}>OK</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.5rem' }}>2026-09-23 21:45:00</td>
              <td style={{ padding: '0.5rem' }}>carlos@exportadora.com.br</td>
              <td style={{ padding: '0.5rem' }}>177.18.90.22</td>
              <td style={{ padding: '0.5rem' }}>Consulta ao Dashboard de Lotes</td>
              <td style={{ padding: '0.5rem', color: '#28a745', fontWeight: 'bold' }}>OK</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
