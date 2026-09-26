import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import { ROLES } from '../context/AuthContext';

import LoginPage from '../pages/LoginPage';
import CadastroPage from '../pages/CadastroPage';
import DashboardPage from '../pages/DashboardPage';
import SensoresPage from '../pages/SensoresPage';
import LotesPage from '../pages/LotesPage';
import LoteDetalhePage from '../pages/LoteDetalhePage';
import PrevisaoPage from '../pages/PrevisaoPage';
import HistoricoPage from '../pages/HistoricoPage';
import MercadoPage from '../pages/MercadoPage';
import UsuariosPage from '../pages/UsuariosPage';
import AuditoriaPage from '../pages/AuditoriaPage';
import ConfiguracaoPage from '../pages/ConfiguracaoPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<CadastroPage />} />

      {/* Rotas Privadas Operacionais & Inteligência */}
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
      <Route
        path="/lotes"
        element={
          <ProtectedRoute>
            <Layout>
              <LotesPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/lotes/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <LoteDetalhePage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/previsao"
        element={
          <ProtectedRoute>
            <Layout>
              <PrevisaoPage />
            </Layout>
          </ProtectedRoute>
        }
      />
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
      <Route
        path="/mercado"
        element={
          <ProtectedRoute>
            <Layout>
              <MercadoPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Rotas Restritas - Administrador (RBAC - RF08, RF11, RF12) */}
      <Route
        path="/usuarios"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <Layout>
              <UsuariosPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/auditoria"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <Layout>
              <AuditoriaPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/configuracao"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <Layout>
              <ConfiguracaoPage />
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
