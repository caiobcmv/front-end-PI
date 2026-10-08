/**
 * Serviço de Autenticação integrado ao Cliente HTTP (FE-D02)
 * Suporta integração com API REST real e fallback gracioso para protótipo acadêmico
 */

import { httpClient, HttpError } from './httpClient';
import { ROLES } from '../context/AuthContext';

export const authService = {
  /**
   * Realiza login no sistema com tratamento de erros base e simulação de latência
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{ user: object, token: string }>}
   */
  async login(email, password) {
    const cleanEmail = (email || '').trim();
    const cleanPassword = (password || '').trim();

    // Validação básica local antes do envio
    if (!cleanEmail) {
      throw new HttpError({
        status: 400,
        message: 'Por favor, informe seu e-mail cadastrado.',
      });
    }

    if (!cleanPassword) {
      throw new HttpError({
        status: 400,
        message: 'Por favor, informe sua senha de acesso.',
      });
    }

    try {
      // Tenta chamar o endpoint real de login
      const response = await httpClient.post('/auth/login', {
        email: cleanEmail,
        password: cleanPassword,
      });

      if (response?.token) {
        localStorage.setItem('token', response.token);
      }

      return response;
    } catch (error) {
      // Se o erro for uma resposta explícita do backend (400, 401, 403), repassa imediatamente
      if (error instanceof HttpError && !error.isNetworkError && error.status > 0) {
        throw error;
      }

      // Caso o backend não esteja ativo (modo acadêmico/offline):
      // Simula latência de rede realista (800ms) para exibição da animação de carregamento (FE07)
      await new Promise((resolve) => setTimeout(resolve, 850));

      // Gatilho especial para demonstração acadêmica de tratamento de erro 401
      if (cleanEmail === 'erro@agro.com' || cleanPassword === 'invalida') {
        throw new HttpError({
          status: 401,
          message: 'E-mail ou senha incorretos. Verifique suas credenciais.',
          endpoint: '/auth/login',
        });
      }

      // Gatilho especial para demonstração de erro de bloqueio/permissão 403
      if (cleanEmail === 'bloqueado@agro.com') {
        throw new HttpError({
          status: 403,
          message: 'Conta temporariamente bloqueada por excesso de tentativas.',
          endpoint: '/auth/login',
        });
      }

      // Determina perfil padrão de acordo com o e-mail ou Produtor como default
      let role = ROLES.PRODUTOR;
      if (cleanEmail.toLowerCase().includes('analista')) {
        role = ROLES.LOGISTICA;
      } else if (cleanEmail.toLowerCase().includes('admin')) {
        role = ROLES.ADMIN;
      }

      let displayName = cleanEmail.split('@')[0].replace(/[._]/g, ' ').trim();
      if (displayName) {
        displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
      } else {
        displayName = 'Produtor Rural';
      }

      const mockUser = {
        id: 'usr_' + Date.now(),
        name: displayName,
        email: cleanEmail,
        role,
      };

      const mockToken = 'mock-jwt-token-' + btoa(cleanEmail) + '.' + Date.now();
      localStorage.setItem('token', mockToken);

      return {
        user: mockUser,
        token: mockToken,
      };
    }
  },

  /**
   * Realiza cadastro de novo usuário
   */
  async register(userData) {
    try {
      const response = await httpClient.post('/auth/register', userData);
      if (response?.token) {
        localStorage.setItem('token', response.token);
      }
      return response;
    } catch (error) {
      if (error instanceof HttpError && !error.isNetworkError && error.status > 0) {
        throw error;
      }

      // Simulação para protótipo acadêmico
      await new Promise((resolve) => setTimeout(resolve, 850));

      const mockUser = {
        id: 'usr_' + Date.now(),
        name: userData.name || 'Novo Usuário',
        email: userData.email,
        role: userData.role || ROLES.PRODUTOR,
      };

      const mockToken = 'mock-jwt-token-' + btoa(userData.email) + '.' + Date.now();
      localStorage.setItem('token', mockToken);

      return {
        user: mockUser,
        token: mockToken,
      };
    }
  },

  /**
   * Encerra sessão do usuário
   */
  logout() {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('auth_token');
    } catch (e) {
      console.warn('Erro ao limpar storage:', e);
    }
  },
};

export default authService;
