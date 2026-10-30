import React, { useState, useEffect } from 'react';
import { ROLES } from '../context/AuthContext';
import { getUsuarios, getPerfis, cadastrarUsuario, removerUsuario } from '../services/usuarioService';

const USUARIOS_FALLBACK = [
  { id_usuario: 1, nome: 'Carlos Mendes', email: 'carlos@exportadoragrifruit.com.br', perfil: 'Produtor/Exportador', papel: ROLES.PRODUTOR, status: 'Ativo' },
  { id_usuario: 2, nome: 'Dra. Aline Santos', email: 'aline@datascience.com.br', perfil: 'Analista de Dados', papel: ROLES.LOGISTICA, status: 'Ativo' },
  { id_usuario: 3, nome: 'Admin Sistema', email: 'admin@agrocloud.com.br', perfil: 'Administrador', papel: ROLES.ADMIN, status: 'Ativo' },
];

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [perfis, setPerfis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDemo, setIsDemo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [novoNome, setNovoNome] = useState('');
  const [novoEmail, setNovoEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [novoPerfilRole, setNovoPerfilRole] = useState(ROLES.PRODUTOR);

  const carregarUsuarios = async () => {
    setLoading(true);
    try {
      const [usersData, perfisData] = await Promise.all([
        getUsuarios(),
        getPerfis().catch(() => []),
      ]);
      setUsuarios(Array.isArray(usersData) && usersData.length > 0 ? usersData : usersData || []);
      setPerfis(perfisData || []);
      setIsDemo(false);
    } catch (err) {
      console.warn('API /usuarios indisponível, usando dados de demonstração:', err);
      setIsDemo(true);
      setUsuarios(USUARIOS_FALLBACK);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const handleCadastrar = async (e) => {
    e.preventDefault();
    if (!novoNome || !novoEmail || !novaSenha) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }
    if (novaSenha.length < 8) {
      alert('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    setIsSubmitting(true);
    try {
      await cadastrarUsuario({
        name: novoNome,
        email: novoEmail,
        password: novaSenha,
        role: novoPerfilRole,
      });
      alert('Usuário cadastrado com sucesso!');
      setShowModal(false);
      setNovoNome('');
      setNovoEmail('');
      setNovaSenha('');
      carregarUsuarios();
    } catch (err) {
      alert(`Erro ao cadastrar usuário: ${err.friendlyMessage || err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemover = async (id, nome) => {
    if (!window.confirm(`Tem certeza que deseja remover o usuário "${nome}"?`)) {
      return;
    }
    try {
      await removerUsuario(id);
      alert('Usuário removido com sucesso!');
      carregarUsuarios();
    } catch (err) {
      alert(`Erro ao remover usuário: ${err.friendlyMessage || err.message}`);
    }
  };

  return (
    <div>
      <div className="content-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 className="content-title">Gerenciamento de Usuários (RBAC)</h2>
          <p className="content-subtitle">
            Controle de credenciais, perfis de acesso e integridade de usuários do sistema
          </p>
        </div>
        <button 
          type="button" 
          className="btn-structural" 
          onClick={() => setShowModal(true)}
          style={{ fontWeight: 'bold', borderRadius: '6px' }}
        >
          + Cadastrar Usuário
        </button>
      </div>

      {isDemo && (
        <div style={{ background: '#fef3c7', border: '1px solid #fde68a', color: '#92400e', padding: '0.6rem 1rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem' }}>
          ℹ️ <strong>Conexão com a API:</strong> O backend FastAPI não respondeu na porta configurada. Exibindo dados locais seguros para demonstração.
        </div>
      )}

      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
          Carregando usuários da base de dados...
        </div>
      ) : (
        <div className="structural-card" style={{ borderRadius: '8px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>
                <th style={{ padding: '0.6rem' }}>ID</th>
                <th style={{ padding: '0.6rem' }}>Nome</th>
                <th style={{ padding: '0.6rem' }}>E-mail</th>
                <th style={{ padding: '0.6rem' }}>Perfil / Papel</th>
                <th style={{ padding: '0.6rem' }}>Status</th>
                <th style={{ padding: '0.6rem' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => {
                const id = u.id_usuario || u.id;
                const perfilNome = u.perfil || (u.id_perfil === 1 ? 'Produtor/Exportador' : u.id_perfil === 2 ? 'Analista de Dados' : 'Administrador');
                return (
                  <tr key={id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '0.6rem' }}>#{id}</td>
                    <td style={{ padding: '0.6rem', fontWeight: 'bold' }}>{u.nome}</td>
                    <td style={{ padding: '0.6rem' }}>{u.email}</td>
                    <td style={{ padding: '0.6rem' }}>
                      <span style={{ border: '1px solid #cbd5e1', padding: '0.2rem 0.5rem', fontSize: '0.8rem', borderRadius: '4px', background: '#f8fafc' }}>
                        {perfilNome}
                      </span>
                    </td>
                    <td style={{ padding: '0.6rem', color: '#28a745', fontWeight: '500' }}>
                      Ativo
                    </td>
                    <td style={{ padding: '0.6rem' }}>
                      <button 
                        type="button" 
                        onClick={() => handleRemover(id, u.nome)}
                        className="btn-structural" 
                        style={{ fontSize: '0.8rem', color: '#d9534f', borderColor: '#fca5a5', borderRadius: '4px' }}
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de Criação de Usuário */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '10px', width: '100%', maxWidth: '440px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#0f172a' }}>Novo Usuário do Sistema</h3>
            <form onSubmit={handleCadastrar}>
              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>Nome Completo *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Dra. Juliana Barros"
                  value={novoNome}
                  onChange={(e) => setNovoNome(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>E-mail Corporativo *</label>
                <input 
                  type="email" 
                  required
                  placeholder="exemplo@agrocloud.com.br"
                  value={novoEmail}
                  onChange={(e) => setNovoEmail(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>Senha (mínimo 8 dígitos) *</label>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.25rem' }}>Perfil de Acesso (RBAC) *</label>
                <select 
                  value={novoPerfilRole}
                  onChange={(e) => setNovoPerfilRole(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                >
                  <option value={ROLES.PRODUTOR}>Produtor (Operações e Campo)</option>
                  <option value={ROLES.LOGISTICA}>Logística Fria (Cadeia de Frio & Monitoramento)</option>
                  <option value={ROLES.ADMIN}>Administrador IoT (Acesso Total)</option>
                </select>
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
                  {isSubmitting ? 'Salvando...' : 'Criar Usuário'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
