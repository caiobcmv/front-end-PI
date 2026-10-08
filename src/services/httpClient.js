/**
 * FE-D02 · Cliente HTTP e tratamento de erros base
 * 
 * Módulo centralizado para requisições HTTP com:
 * - Configuração de Base URL e Timeout
 * - Injeção automática de Token de Autenticação (Bearer Token)
 * - Interceptação e normalização de erros de rede e códigos de status HTTP
 * - Tradução de erros para mensagens amigáveis em português
 * - Classe customizada HttpError com tipagem rica
 */

export class HttpError extends Error {
  constructor({
    message = 'Erro ao processar requisição.',
    status = 500,
    statusText = 'Internal Server Error',
    data = null,
    isNetworkError = false,
    isTimeout = false,
    endpoint = '',
  } = {}) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.statusText = statusText;
    this.data = data;
    this.isNetworkError = isNetworkError;
    this.isTimeout = isTimeout;
    this.endpoint = endpoint;
    this.friendlyMessage = this.resolveFriendlyMessage();
  }

  /**
   * Converte o código de status e contexto em uma mensagem compreensível para o usuário final
   */
  resolveFriendlyMessage() {
    if (this.isTimeout) {
      return 'O tempo de resposta do servidor expirou. Por favor, tente novamente.';
    }

    if (this.isNetworkError) {
      return 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.';
    }

    // Se o backend retornou uma mensagem explícita no payload, prioriza
    if (this.data && typeof this.data === 'object') {
      if (this.data.message) return this.data.message;
      if (this.data.erro) return this.data.erro;
      if (this.data.error) return this.data.error;
    }

    switch (this.status) {
      case 400:
        return 'Requisição inválida. Verifique os dados informados e tente novamente.';
      case 401:
        return 'Credenciais inválidas ou sessão expirada. Faça login novamente.';
      case 403:
        return 'Acesso negado. Seu perfil não tem permissão para realizar esta operação.';
      case 404:
        return 'Recurso ou serviço não encontrado no servidor.';
      case 408:
        return 'O servidor demorou muito para responder. Tente novamente.';
      case 409:
        return 'Conflito de dados: este registro já existe ou foi alterado.';
      case 422:
        return 'Dados inconsistentes para processamento. Revise os campos obrigatórios.';
      case 429:
        return 'Muitas requisições em curto período. Aguarde alguns instantes.';
      case 500:
        return 'Ocorreu um erro interno no servidor. Nossa equipe já foi notificada.';
      case 502:
      case 503:
      case 504:
        return 'Servidor temporariamente indisponível para manutenção. Tente em instantes.';
      default:
        return this.message || 'Ocorreu um erro inesperado ao se comunicar com o sistema.';
    }
  }
}

class HttpClient {
  constructor(config = {}) {
    this.baseURL = config.baseURL || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || 'http://localhost:8080/api';
    this.timeout = config.timeout || 10000; // 10 segundos
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...config.headers,
    };
    this.unauthorizedListeners = new Set();
  }

  /**
   * Registra callback para quando ocorrer um erro 401 Unauthorized
   */
  onUnauthorized(callback) {
    this.unauthorizedListeners.add(callback);
    return () => this.unauthorizedListeners.delete(callback);
  }

  notifyUnauthorized(error) {
    this.unauthorizedListeners.forEach((callback) => {
      try {
        callback(error);
      } catch (err) {
        console.error('Erro no listener de unauthorized:', err);
      }
    });
  }

  /**
   * Obtém token de autenticação salvo
   */
  getAuthToken() {
    try {
      return localStorage.getItem('token') || localStorage.getItem('auth_token');
    } catch {
      return null;
    }
  }

  /**
   * Executa a requisição HTTP com interceptores, timeout e parsing automático
   */
  async request(endpoint, options = {}) {
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseURL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
    const method = (options.method || 'GET').toUpperCase();
    
    const headers = {
      ...this.defaultHeaders,
      ...options.headers,
    };

    // Injeta automaticamente o Bearer token se presente
    const token = this.getAuthToken();
    if (token && !headers['Authorization']) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeout || this.timeout);

    let body = options.body;
    if (body && typeof body === 'object' && !(body instanceof FormData)) {
      body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, {
        method,
        headers,
        body,
        signal: controller.signal,
        ...options.fetchOptions,
      });

      clearTimeout(timeoutId);

      // Leitura segura do body (JSON ou texto)
      let responseData = null;
      const contentType = response.headers.get('content-type') || '';
      
      if (contentType.includes('application/json')) {
        try {
          responseData = await response.json();
        } catch {
          responseData = null;
        }
      } else {
        try {
          responseData = await response.text();
        } catch {
          responseData = null;
        }
      }

      if (!response.ok) {
        const error = new HttpError({
          message: response.statusText || `HTTP Error ${response.status}`,
          status: response.status,
          statusText: response.statusText,
          data: responseData,
          endpoint,
        });

        if (response.status === 401) {
          this.notifyUnauthorized(error);
        }

        throw error;
      }

      return responseData;
    } catch (err) {
      clearTimeout(timeoutId);

      // Se já é uma instância de HttpError lançada acima
      if (err instanceof HttpError) {
        throw err;
      }

      // Erro de abort/timeout
      if (err.name === 'AbortError') {
        throw new HttpError({
          message: 'Tempo limite da requisição atingido (Timeout).',
          status: 408,
          isTimeout: true,
          endpoint,
        });
      }

      // Erro geral de rede (offline, DNS, CORS, conexão recusada)
      throw new HttpError({
        message: err.message || 'Falha de comunicação de rede.',
        status: 0,
        isNetworkError: true,
        endpoint,
      });
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }

  post(endpoint, body = {}, options = {}) {
    return this.request(endpoint, { ...options, method: 'POST', body });
  }

  put(endpoint, body = {}, options = {}) {
    return this.request(endpoint, { ...options, method: 'PUT', body });
  }

  patch(endpoint, body = {}, options = {}) {
    return this.request(endpoint, { ...options, method: 'PATCH', body });
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

// Instância padrão compartilhada na aplicação
export const httpClient = new HttpClient();

export default httpClient;
