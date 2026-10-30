import httpClient from './httpClient';

/**
 * Serviço de Parâmetros e Configuração Agroclimática (FE-D12)
 * Conecta com os endpoints /config-parametros do backend FastAPI
 */

export async function getConfigParametros(params = {}) {
  const query = new URLSearchParams();
  if (params.id_fruta != null) query.append('id_fruta', params.id_fruta);
  if (params.etapa) query.append('etapa', params.etapa);

  const qs = query.toString();
  return httpClient.get(`/config-parametros${qs ? `?${qs}` : ''}`);
}

export async function getConfigParametro(idConfig) {
  return httpClient.get(`/config-parametros/${idConfig}`);
}

export async function criarConfigParametro(dados) {
  return httpClient.post('/config-parametros', dados);
}

export async function atualizarConfigParametro(idConfig, dados) {
  return httpClient.put(`/config-parametros/${idConfig}`, dados);
}
