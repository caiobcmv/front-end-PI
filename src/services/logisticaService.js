import httpClient from './httpClient';

/**
 * Serviço de Logística Fria e Viagens (FE-D12)
 * Conecta com os endpoints /viagens do backend FastAPI
 */

export async function getViagens(status) {
  const query = new URLSearchParams();
  if (status) query.append('status', status);

  const qs = query.toString();
  return httpClient.get(`/viagens${qs ? `?${qs}` : ''}`);
}

export async function getViagem(idViagem) {
  return httpClient.get(`/viagens/${idViagem}`);
}
