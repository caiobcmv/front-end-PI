import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    return (
      <div className="structural-card" style={{ margin: '2rem', padding: '2rem' }}>
        <h3 style={{ color: '#d9534f' }}>Acesso Restrito (RBAC - RF08)</h3>
        <p>Seu perfil <strong>({user?.role})</strong> não possui permissão para acessar este módulo.</p>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
          Este módulo é restrito para os perfis: {allowedRoles.join(', ')}.
        </p>
      </div>
    );
  }

  return children;
}
