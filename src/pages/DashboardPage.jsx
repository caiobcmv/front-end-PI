import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <div className="content-header">
        <h2 className="content-title">
          Painel de Controle — Olá, <span style={{ color: '#2d6a4f' }}>{user?.name || 'Usuário'}</span>
        </h2>
        <p className="content-subtitle">
          Monitoramento agroclimático e logístico da região de Petrolina e Juazeiro
        </p>
      </div>

      <div className="structural-grid">
        <div className="structural-card">
          <h3>Sensores em Tempo Real</h3>
          <p>Temperatura: 28.5 °C | Umidade: 62%</p>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>Última leitura via telemetria: há 12 segundos</p>
          <Link to="/sensores" className="btn-structural" style={{ marginTop: '0.75rem', textDecoration: 'none', display: 'inline-block', textAlign: 'center', borderRadius: '4px' }}>
            Ver Telemetria Completa
          </Link>
        </div>

        <div className="structural-card">
          <h3>Previsão de Colheita</h3>
          <p>Janela Ideal Estimada: <strong>12 a 18 de Outubro</strong></p>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>Lote Principal: Manga Tommy (Petrolina)</p>
          <Link to="/previsao" className="btn-structural" style={{ marginTop: '0.75rem', textDecoration: 'none', display: 'inline-block', textAlign: 'center', borderRadius: '4px' }}>
            Análise Preditiva
          </Link>
        </div>

        <div className="structural-card">
          <h3>Mercado e Exportação</h3>
          <p>Cotação Europa (EUR): € 1,85 / kg</p>
          <p style={{ fontSize: '0.85rem', color: '#666' }}>Demanda de Exportação: Alta (+14%)</p>
          <Link to="/mercado" className="btn-structural" style={{ marginTop: '0.75rem', textDecoration: 'none', display: 'inline-block', textAlign: 'center', borderRadius: '4px' }}>
            Ver Cotações
          </Link>
        </div>
      </div>
    </div>
  );
}
