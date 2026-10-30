import React, { useEffect, useState } from 'react';
import TopHeader from '../components/TopHeader';
import { getClima } from '../services/climaService';

export default function ClimaPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getClima()
      .then(setData)
      .catch(setError);
  }, []);

  return (
    <div className="page-container">
      <TopHeader title="Clima" subtitle="Dados climáticos atuais" />
      {error && <div className="error">Erro: {error.message}</div>}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <div>Carregando...</div>
      )}
    </div>
  );
}

