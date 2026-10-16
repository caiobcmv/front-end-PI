import httpClient from './httpClient';

// Resumo agregado da tela inicial (KPIs, condição geral, alertas, fluxo de lotes)
export function getResumoDashboard() {
  return httpClient.get('/dashboard/resumo');
}