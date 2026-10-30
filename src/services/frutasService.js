/**
 * Serviço para chamadas ao router /frutas do backend.
 */
import httpClient from './httpClient';

export const getFrutas = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return httpClient.get(`/frutas${query ? `?${query}` : ''}`);
};

export const getFruta = (id) => httpClient.get(`/frutas/${id}`);
export const criarFruta = (data) => httpClient.post('/frutas', data);
export const atualizarFruta = (id, data) => httpClient.put(`/frutas/${id}`, data);
export const deletarFruta = (id) => httpClient.delete(`/frutas/${id}`);

