import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-brand">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className="brand-logo">[ IoT AGRO ]</span>
          <h1 className="brand-title">Dashboard Climático & Logístico</h1>
        </Link>
      </div>

      <div className="header-actions">
        {isAuthenticated && user ? (
          <>
            <div className="user-profile-placeholder" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', border: 'none' }}>
              <span style={{ fontWeight: 'bold', fontSize: '0.85rem' }}>{user.name}</span>
              <span style={{ fontSize: '0.75rem', color: '#666' }}>{user.role}</span>
            </div>
            <button type="button" className="btn-structural" onClick={handleLogout} style={{ color: '#d9534f' }}>
              Sair
            </button>
          </>
        ) : (
          <Link to="/login" className="btn-structural" style={{ textDecoration: 'none' }}>
            Entrar
          </Link>
        )}
      </div>
    </header>
  );
}
