import httpClient from './httpClient';

/**
 * Serviço de Lotes e Frutas (FE-D12)
 * Conecta com os endpoints /lotes e /frutas do backend FastAPI
 */

export async function getLotes(params = {}) {
  const query = new URLSearchParams();
  if (params.status) query.append('status', params.status);
  if (params.id_fruta != null) query.append('id_fruta', params.id_fruta);
  if (params.limit != null) query.append('limit', params.limit);
  if (params.offset != null) query.append('offset', params.offset);

  const qs = query.toString();
  return httpClient.get(`/lotes${qs ? `?${qs}` : ''}`);
}

export async function getLote(idLote) {
  return httpClient.get(`/lotes/${idLote}`);
}

export async function criarLote(dados) {
  return httpClient.post('/lotes', dados);
}

export async function atualizarLote(idLote, dados) {
  return httpClient.patch(`/lotes/${idLote}`, dados);
}

export async function getFrutas() {
  return httpClient.get('/frutas');
}

export async function getFruta(idFruta) {
  return httpClient.get(`/frutas/${idFruta}`);
}
