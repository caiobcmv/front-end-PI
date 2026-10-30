import httpClient from './httpClient';

/**
 * Serviço de Mercado e Cotações Internacionais (FE-D12)
 * Conecta com os endpoints /dados-mercado do backend FastAPI
 */

export async function getDadosMercado(params = {}) {
  const query = new URLSearchParams();
  if (params.id_fruta != null) query.append('id_fruta', params.id_fruta);
  if (params.inicio) query.append('inicio', params.inicio);
  if (params.fim) query.append('fim', params.fim);
  if (params.limit != null) query.append('limit', params.limit);
  if (params.offset != null) query.append('offset', params.offset);

  const qs = query.toString();
  return httpClient.get(`/dados-mercado${qs ? `?${qs}` : ''}`);
}

export async function getDadoMercado(idMercado) {
  return httpClient.get(`/dados-mercado/${idMercado}`);
}

export async function criarDadoMercado(dados) {
  return httpClient.post('/dados-mercado', dados);
}

export async function atualizarDadoMercado(idMercado, dados) {
  return httpClient.patch(`/dados-mercado/${idMercado}`, dados);
}
