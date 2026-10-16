import httpClient from './httpClient';

const SETE_DIAS_MS = 7 * 24 * 60 * 60 * 1000;

// 7d vem por hora; 30d vem por dia. Junto: dias antigos + horas da última semana.
async function buscarPontos(idSensor) {
  const [horaria, diaria] = await Promise.all([
    httpClient.get(`/sensores/${idSensor}/leituras?periodo=7d`),
    httpClient.get(`/sensores/${idSensor}/leituras?periodo=30d`),
  ]);
  const corte = Date.now() - SETE_DIAS_MS;
  const antigos = diaria.pontos.filter((p) => new Date(p.instante).getTime() < corte);
  return [...antigos, ...horaria.pontos];
}

// Formato que o LineChartCard espera: { timestamp, value }
function toSerie(pontos, campo) {
  return pontos
    .filter((p) => p[campo] != null)
    .map((p) => ({ timestamp: p.instante, value: p[campo] }));
}

// 'real' -> rótulo "sensor"; qualquer outra origem -> "simulado"
function origemDe(pontos) {
  const ultimo = pontos[pontos.length - 1];
  return ultimo?.origem === 'real' ? 'sensor' : 'simulado';
}

export async function getSeriesSensores() {
  const sensores = await httpClient.get('/sensores');
  const ar = sensores.find((s) => s.ambiente === 'ar');
  const solo = sensores.find((s) => s.ambiente === 'solo');

  const [pontosAr, pontosSolo] = await Promise.all([
    ar ? buscarPontos(ar.id_sensor) : [],
    solo ? buscarPontos(solo.id_sensor) : [],
  ]);

  return {
    temperaturaAr: { series: toSerie(pontosAr, 'temperatura'), source: origemDe(pontosAr) },
    umidadeAr: { series: toSerie(pontosAr, 'umidade'), source: origemDe(pontosAr) },
    umidadeSolo: { series: toSerie(pontosSolo, 'umidade'), source: origemDe(pontosSolo) },
    temperaturaSolo: { series: toSerie(pontosSolo, 'temperatura'), source: origemDe(pontosSolo) },
  };
}

export async function getResumoSensores() {
  const sensores = await httpClient.get('/sensores');
  const ar = sensores.find((s) => s.ambiente === 'ar');
  if (!ar) return { ultima: null, leituras: [] };

  // A API devolve da mais recente para a mais antiga
  const leituras = await httpClient.get(`/leituras?id_sensor=${ar.id_sensor}&limit=10`);
  return { ultima: leituras[0] ?? null, leituras };
}