// Dados fictícios para testar o LineChartCard (leituras horárias dos últimos 30 dias).
const HOUR = 60 * 60 * 1000;

function makeSeries({ base, amplitude, noise, drift = 0, hours = 24 * 30, seed = 1 }) {
  const end = Date.now();
  let s = seed;
  const rand = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647 - 0.5;
  };
  return Array.from({ length: hours + 1 }, (_, i) => {
    const t = end - (hours - i) * HOUR;
    const hourOfDay = new Date(t).getHours();
    const daily = Math.sin(((hourOfDay - 9) / 24) * 2 * Math.PI);
    const value = base + amplitude * daily + noise * rand() + drift * (i / hours);
    return { timestamp: t, value: Math.round(value * 10) / 10 };
  });
}

export const temperaturaAr = makeSeries({ base: 28, amplitude: 3, noise: 1.2, seed: 7 });
export const umidadeSolo = makeSeries({ base: 55, amplitude: 2, noise: 2, drift: -22, seed: 11 });
export const temperaturaSolo = makeSeries({ base: 26, amplitude: 1.5, noise: 0.6, seed: 23 });
