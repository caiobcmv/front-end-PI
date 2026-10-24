import httpClient from './httpClient';

/**
 * Serviço de Previsão Climática, Janela de Colheita e Risco (FE-D12)
 * Conecta com os endpoints /clima, /previsoes, /riscos e /alertas-preditivos do FastAPI
 */

export async function getClimaPrevisao({ dias = 3, latitude, longitude } = {}) {
  const query = new URLSearchParams();
  if (dias != null) query.append('dias', dias);
  if (latitude != null) query.append('latitude', latitude);
  if (longitude != null) query.append('longitude', longitude);

  const qs = query.toString();
  return httpClient.get(`/clima/previsao${qs ? `?${qs}` : ''}`);
}

export async function getJanelaColheita({ id_lote, limite = 30 } = {}) {
  const query = new URLSearchParams();
  if (id_lote != null) query.append('id_lote', id_lote);
  if (limite != null) query.append('limite', limite);

  const qs = query.toString();
  return httpClient.get(`/previsoes/janela-colheita${qs ? `?${qs}` : ''}`);
}

export async function gerarJanelaColheita({ id_lote, dias = 7 } = {}) {
  const query = new URLSearchParams();
  if (id_lote != null) query.append('id_lote', id_lote);
  if (dias != null) query.append('dias', dias);

  const qs = query.toString();
  return httpClient.post(`/previsoes/janela-colheita/gerar${qs ? `?${qs}` : ''}`);
}

export async function gerarRiscoClimatico({ id_lote, dias = 3 } = {}) {
  const query = new URLSearchParams();
  if (id_lote != null) query.append('id_lote', id_lote);
  if (dias != null) query.append('dias', dias);

  const qs = query.toString();
  return httpClient.post(`/previsoes/risco-climatico/gerar${qs ? `?${qs}` : ''}`);
}

export async function getRiscosClimatico({ id_lote, nivel, limite = 30 } = {}) {
  const query = new URLSearchParams();
  if (id_lote != null) query.append('id_lote', id_lote);
  if (nivel) query.append('nivel', nivel);
  if (limite != null) query.append('limite', limite);

  const qs = query.toString();
  return httpClient.get(`/riscos/climatico${qs ? `?${qs}` : ''}`);
}

export async function getRiscosPrejuizo({ id_lote, limite = 30 } = {}) {
  const query = new URLSearchParams();
  if (id_lote != null) query.append('id_lote', id_lote);
  if (limite != null) query.append('limite', limite);

  const qs = query.toString();
  return httpClient.get(`/riscos/prejuizo${qs ? `?${qs}` : ''}`);
}

export async function getAlertasPreditivos() {
  return httpClient.get('/alertas-preditivos');
}

export async function getCortesAlertaPreditivo() {
  return httpClient.get('/alertas-preditivos/cortes');
}
