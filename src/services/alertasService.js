import httpClient from './httpClient';

// nivel do banco -> tipo/prioridade usados pela tela
const NIVEIS = {
  alto: { tipo: 'critico', prioridade: 'P1' },
  médio: { tipo: 'moderado', prioridade: 'P2' },
  baixo: { tipo: 'moderado', prioridade: 'P3' },
};

const fmtDataHora = (iso) =>
  iso
    ? new Date(iso).toLocaleString('pt-BR', {
        timeZone: 'America/Recife',
        dateStyle: 'short',
        timeStyle: 'short',
      })
    : '--';

function adaptar(a, sensoresPorId) {
  const aberto = (a.status || '').toLowerCase() === 'aberto';
  const nivel = NIVEIS[a.nivel] ?? NIVEIS.baixo;
  const sensor = sensoresPorId[a.id_sensor];

  return {
    id: a.id_alerta,
    prioridade: nivel.prioridade,
    tipo: aberto ? nivel.tipo : 'resolvido',
    status: aberto ? 'ativo' : 'resolvido',
    titulo: a.descricao || 'Alerta sem descrição',
    descricao: (a.tipo_alerta || 'alerta').replace(/_/g, ' '),
    localizacao: sensor ? sensor.nome : a.id_previsao ? 'Previsão climática' : 'Sem sensor',
    lote: a.id_lote ?? null,
    reativo: a.id_leitura != null,
    preditivo: a.id_leitura == null && a.id_previsao != null,
    data: fmtDataHora(a.data_hora),
  };
}

export async function getAlertas() {
  const [alertas, sensores] = await Promise.all([
    httpClient.get('/alertas?limit=200'),
    httpClient.get('/sensores'),
  ]);
  const sensoresPorId = Object.fromEntries(sensores.map((s) => [s.id_sensor, s]));
  return alertas.map((a) => adaptar(a, sensoresPorId));
}

export function resolverAlerta(id) {
  return httpClient.patch(`/alertas/${id}/status`, { status: 'resolvido' });
}