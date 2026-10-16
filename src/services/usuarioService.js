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

async function resolverIdPerfil(role) {
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