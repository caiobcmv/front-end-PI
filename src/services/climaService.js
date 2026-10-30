/**
 * Serviço para chamadas ao router /clima do backend.
 * Disponibiliza funções genéricas de CRUD que podem ser adequadas ao seu caso de uso.
 */
import httpClient from './httpClient';

export const getClima = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return httpClient.get(`/clima${query ? `?${query}` : ''}`);
};

export const createClima = (data) => httpClient.post('/clima', data);
export const updateClima = (id, data) => httpClient.put(`/clima/${id}`, data);
export const deleteClima = (id) => httpClient.delete(`/clima/${id}`);

