import httpClient from './httpClient';
import { ROLES } from '../context/AuthContext';

// Perfil da tela -> trecho do nome do perfil no banco (tabela perfil)
//   Produtor       -> "Produtor/Exportador"
//   Logística Fria -> "Analista de Dados"
//   Admin IoT      -> "Administrador"
const TRECHO_PERFIL = {
  [ROLES.PRODUTOR]: 'produtor',
  [ROLES.LOGISTICA]: 'analista',
  [ROLES.ADMIN]: 'admin',
};

export function getPerfis() {
  return httpClient.get('/perfis');
}

export async function resolverIdPerfil(role) {
  const trecho = TRECHO_PERFIL[role];
  const perfis = await getPerfis();
  const perfil = trecho && perfis.find((p) => (p.nome || '').toLowerCase().includes(trecho));
  if (!perfil) {
    throw new Error('Perfil de acesso não encontrado no sistema. Escolha outro perfil.');
  }
  return perfil.id_perfil;
}

// Cadastra um usuário real no banco (POST /usuarios)
export async function cadastrarUsuario({ name, email, password, role }) {
  const id_perfil = await resolverIdPerfil(role);
  const criado = await httpClient.post('/usuarios', {
    nome: name,
    email,
    senha: password,
    id_perfil,
  });

  return {
    user: {
      id: criado.id_usuario,
      name: criado.nome,
      email: criado.email,
      role,
    },
  };
}

// ── Funções de Gestão de Usuários (Admin - FE-D12) ──

export async function getUsuarios(params = {}) {
  const query = new URLSearchParams();
  if (params.id_perfil != null) query.append('id_perfil', params.id_perfil);
  if (params.limit != null) query.append('limit', params.limit);
  if (params.offset != null) query.append('offset', params.offset);

  const qs = query.toString();
  return httpClient.get(`/usuarios${qs ? `?${qs}` : ''}`);
}

export async function getUsuario(idUsuario) {
  return httpClient.get(`/usuarios/${idUsuario}`);
}

export async function atualizarUsuario(idUsuario, dados) {
  return httpClient.put(`/usuarios/${idUsuario}`, dados);
}

export async function removerUsuario(idUsuario) {
  return httpClient.delete(`/usuarios/${idUsuario}`);
}

export async function alterarSenhaUsuario(idUsuario, novaSenha) {
  return httpClient.put(`/usuarios/${idUsuario}/senha`, { senha: novaSenha });
}