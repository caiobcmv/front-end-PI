import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

import LoginPage from '../pages/LoginPage';
import CadastroPage from '../pages/CadastroPage';
import DashboardPage from '../pages/DashboardPage';
import LogisticaFriaPage from '../pages/LogisticaFriaPage';
import HistoricoPage from '../pages/HistoricoPage';
import AlertasPage from '../pages/AlertasPage';
import ConfiguracaoPage from '../pages/ConfiguracaoPage';
import SensoresPage from '../pages/SensoresPage';

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

      {/* 2. Logística Fria */}
      <Route
        path="/logistica"
        element={
          <ProtectedRoute>
            <Layout>
              <LogisticaFriaPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/lotes"
        element={<Navigate to="/logistica" replace />}
      />

      {/* 3. Histórico Safra */}
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

      {/* 4. Alertas */}
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
      <Route
        path="/mercado"
        element={<Navigate to="/alertas" replace />}
      />

      {/* 5. Configurações */}
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
