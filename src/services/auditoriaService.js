import httpClient from './httpClient';

/**
 * Serviço de Auditoria e Logs de Acesso (FE-D12)
 * Conecta com os endpoints /auditoria do backend FastAPI
 */

export async function getLogsAuditoria(params = {}) {
  const query = new URLSearchParams();
  if (params.id_usuario != null) query.append('id_usuario', params.id_usuario);
  if (params.acao) query.append('acao', params.acao);
  if (params.resultado) query.append('resultado', params.resultado);
  if (params.inicio) query.append('inicio', params.inicio);
  if (params.fim) query.append('fim', params.fim);
  if (params.limit != null) query.append('limit', params.limit);
  if (params.offset != null) query.append('offset', params.offset);

  const qs = query.toString();
  return httpClient.get(`/auditoria${qs ? `?${qs}` : ''}`);
}

export async function getLogAuditoria(idLog) {
  return httpClient.get(`/auditoria/${idLog}`);
}
