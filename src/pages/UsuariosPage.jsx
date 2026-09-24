import React from 'react';
import { ROLES } from '../context/AuthContext';

export default function UsuariosPage() {
  const usuarios = [
    { id: 1, nome: 'Carlos Mendes', email: 'carlos@exportadoragrifruit.com.br', papel: ROLES.PRODUTOR, status: 'Ativo' },
    { id: 2, nome: 'Dra. Aline Santos', email: 'aline@datascience.com.br', papel: ROLES.ANALISTA, status: 'Ativo' },
    { id: 3, nome: 'Admin Sistema', email: 'admin@agrocloud.com.br', papel: ROLES.ADMIN, status: 'Ativo' },
  ];

  return (
    <div>
      <div className="content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="content-title">Gerenciamento de Usuários (RBAC - RF12)</h2>
          <p className="content-subtitle">
            Cadastro e atribuição de papéis e privilégios de acesso [Exclusivo Administrador]
          </p>
        </div>
        <button type="button" className="btn-structural" style={{ fontWeight: 'bold' }}>
          + Cadastrar Usuário
        </button>
      </div>

      <div className="structural-card">
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>
              <th style={{ padding: '0.6rem' }}>ID</th>
              <th style={{ padding: '0.6rem' }}>Nome</th>
              <th style={{ padding: '0.6rem' }}>E-mail</th>
              <th style={{ padding: '0.6rem' }}>Papel (RBAC)</th>
              <th style={{ padding: '0.6rem' }}>Status</th>
              <th style={{ padding: '0.6rem' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '0.6rem' }}>#{u.id}</td>
                <td style={{ padding: '0.6rem', fontWeight: 'bold' }}>{u.nome}</td>
                <td style={{ padding: '0.6rem' }}>{u.email}</td>
                <td style={{ padding: '0.6rem' }}>
                  <span style={{ border: '1px solid #ccc', padding: '0.2rem 0.4rem', fontSize: '0.8rem' }}>
                    {u.papel}
                  </span>
                </td>
                <td style={{ padding: '0.6rem', color: '#28a745' }}>{u.status}</td>
                <td style={{ padding: '0.6rem' }}>
                  <button type="button" className="btn-structural" style={{ fontSize: '0.8rem', marginRight: '0.4rem' }}>
                    Editar
                  </button>
                  <button type="button" className="btn-structural" style={{ fontSize: '0.8rem', color: '#d9534f' }}>
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
