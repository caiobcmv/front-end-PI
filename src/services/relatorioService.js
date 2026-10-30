import httpClient from './httpClient';

/**
 * Serviço de Relatórios e Auditoria de Saídas de Faixa (FE-D12)
 * Conecta com os endpoints /relatorios do backend FastAPI
 */

export async function getRelatorios() {
  return httpClient.get('/relatorios');
}

export async function criarRelatorio(dados) {
  return httpClient.post('/relatorios', dados);
}

export async function getRelatorioCsvUrl(idRelatorio) {
  const baseUrl = httpClient.baseURL || 'http://127.0.0.1:8000';
  return `${baseUrl}/relatorios/${idRelatorio}/csv`;
}

export async function getSaidasFaixa(params = {}) {
  const query = new URLSearchParams();
  if (params.id_sensor != null) query.append('id_sensor', params.id_sensor);
  if (params.inicio) query.append('inicio', params.inicio);
  if (params.fim) query.append('fim', params.fim);
  if (params.limit != null) query.append('limit', params.limit);
  if (params.offset != null) query.append('offset', params.offset);

  const qs = query.toString();
  return httpClient.get(`/relatorios/saidas-faixa${qs ? `?${qs}` : ''}`);
}
