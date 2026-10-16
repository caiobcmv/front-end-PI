import React, { useEffect, useState } from 'react';
import LineChartCard from '../components/LineChartCard';
import { getSeriesSensores, getResumoSensores } from '../services/sensorService';

export default function SensoresPage() {
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [resumo, setResumo] = useState({ ultima: null, leituras: [] });

  useEffect(() => {
    let ativo = true;

    getSeriesSensores()
      .then((d) => ativo && setDados(d))
      .catch((e) => ativo && setErro(e.friendlyMessage || e.message))
      .finally(() => ativo && setCarregando(false));

    getResumoSensores()
      .then((r) => ativo && setResumo(r))
      .catch(() => {});

    return () => {
      ativo = false;
    };
  }, []);

  const { ultima, leituras } = resumo;

  const fmt = (n, casas = 1) =>
    typeof n === 'number' ? n.toLocaleString('pt-BR', { maximumFractionDigits: casas }) : '--';

  const fmtHora = (iso) =>
    iso ? new Date(iso).toLocaleString('pt-BR', { timeZone: 'America/Recife' }) : '--';

  const minutos = ultima
    ? Math.round((Date.now() - new Date(ultima.data_hora).getTime()) / 60000)
    : null;
  const online = minutos !== null && minutos <= 360; // sem leitura há mais de 6 h = sem sinal

  return (
    <div>
      <div className="content-header">
        <h2 className="content-title">Status dos Sensores IoT</h2>
        <p className="content-subtitle">
          Leitura contínua de dados de temperatura e umidade em campo
        </p>
      </div>

      <div className="structural-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="structural-card" style={{ borderRadius: '8px' }}>
          <h3>Sensor de Temperatura</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1b4332' }}>
            {fmt(ultima?.temperatura)} °C
          </p>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>Faixa ideal para safra: 24°C a 30°C</p>
        </div>

        <div className="structural-card" style={{ borderRadius: '8px' }}>
          <h3>Sensor de Umidade Relativa</h3>
          <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#1b4332' }}>
            {fmt(ultima?.umidade, 0)} %
          </p>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>Umidade relativa do ar no campo</p>
        </div>

        <div className="structural-card" style={{ borderRadius: '8px' }}>
          <h3>Status da Conexão</h3>
          <p
            style={{
              fontSize: '1.1rem',
              fontWeight: 'bold',
              color: online ? '#2d6a4f' : '#b91c1c',
            }}
          >
            {online ? 'Online' : 'Sem sinal'}
          </p>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>
            {ultima ? `Última leitura em ${fmtHora(ultima.data_hora)}` : 'Sem leituras'}
          </p>
        </div>
      </div>

      {carregando && <p>Carregando leituras...</p>}
      {erro && <p style={{ color: '#b91c1c' }}>{erro}</p>}

      {dados && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <LineChartCard
            title="Temperatura do ar"
            unit="°C"
            series={dados.temperaturaAr.series}
            range={{ min: 24, max: 30 }}
            source={dados.temperaturaAr.source}
          />
          <LineChartCard
            title="Umidade do solo"
            unit="%"
            series={dados.umidadeSolo.series}
            range={{ min: 40, max: 70 }}
            source={dados.umidadeSolo.source}
            color="#0d9488"
          />
          <LineChartCard
            title="Temperatura do solo"
            unit="°C"
            series={dados.temperaturaSolo.series}
            source={dados.temperaturaSolo.source}
            color="#f59e0b"
          />
        </div>
      )}

      <div className="structural-card" style={{ borderRadius: '8px' }}>
        <h3>Histórico Recente de Leituras</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '0.75rem', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>
              <th style={{ padding: '0.5rem' }}>Horário</th>
              <th style={{ padding: '0.5rem' }}>Registro</th>
              <th style={{ padding: '0.5rem' }}>Temperatura</th>
              <th style={{ padding: '0.5rem' }}>Umidade</th>
              <th style={{ padding: '0.5rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {leituras.map((l) => (
              <tr key={l.id_leitura} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '0.5rem' }}>{fmtHora(l.data_hora)}</td>
                <td style={{ padding: '0.5rem' }}>#{l.entry_id_thingspeak ?? l.id_leitura}</td>
                <td style={{ padding: '0.5rem' }}>{fmt(l.temperatura)} °C</td>
                <td style={{ padding: '0.5rem' }}>{fmt(l.umidade, 0)}%</td>
                <td style={{ padding: '0.5rem', color: '#28a745', fontWeight: '500' }}>
                  {l.origem === 'real' ? 'Sensor' : 'Simulado'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}