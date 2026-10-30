import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

import LoginPage from '../pages/LoginPage';
import CadastroPage from '../pages/CadastroPage';
import DashboardPage from '../pages/DashboardPage';
import HistoricoPage from '../pages/HistoricoPage';
import AlertasPage from '../pages/AlertasPage';
import ConfiguracaoPage from '../pages/ConfiguracaoPage';
import SensoresPage from '../pages/SensoresPage';
import RedeEsp32Page from '../pages/RedeEsp32Page';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<CadastroPage />} />

      {/* 1. Visão Geral (Dashboard) */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <DashboardPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Redirecionamentos de Legado */}
      <Route path="/logistica" element={<Navigate to="/historico" replace />} />
      <Route path="/lotes" element={<Navigate to="/historico" replace />} />

      {/* 2. Histórico Safra */}
      <Route
        path="/historico"
        element={
          <ProtectedRoute>
            <Layout>
              <HistoricoPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* 3. Alertas */}
      <Route
        path="/alertas"
        element={
          <ProtectedRoute>
            <Layout>
              <AlertasPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="/alerta" element={<Navigate to="/alertas" replace />} />
      <Route path="/mercado" element={<Navigate to="/alertas" replace />} />

      {/* 4. Configurações */}
      <Route
        path="/configuracao"
        element={
          <ProtectedRoute>
            <Layout>
              <ConfiguracaoPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route path="/configuracoes" element={<Navigate to="/configuracao" replace />} />
      <Route path="/config" element={<Navigate to="/configuracao" replace />} />

      {/* 5. Sensores IoT (Analista) */}
      <Route
        path="/sensores"
        element={
          <ProtectedRoute>
            <Layout>
              <SensoresPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* 6. Rede ESP32 (Analista) */}
      <Route
        path="/rede-esp32"
        element={
          <ProtectedRoute>
            <Layout>
              <RedeEsp32Page />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Fallback de Rota */}
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <Layout>
              <DashboardPage />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
