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
          <span className="brand-logo" style={{ borderRadius: '4px', background: '#2d6a4f', color: '#ffffff', padding: '0.2rem 0.6rem', border: 'none' }}>IoT Agro</span>
          <h1 className="brand-title">Gestão Agroclimática</h1>
        </Link>
      </div>

      <div className="header-actions">
        {isAuthenticated && user ? (
          <>
            <div className="user-profile-badge" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', padding: '0.2rem 0.5rem' }}>
              <div
                className="user-avatar"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: '#2d6a4f',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
                }}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: '1.2' }}>
                <span className="user-name-display" style={{ fontWeight: '700', fontSize: '0.9rem', color: '#111827' }}>
                  {user.name}
                </span>
                <span style={{ fontSize: '0.73rem', color: '#4b5563' }}>{user.role}</span>
              </div>
            </div>
            <button
              type="button"
              className="btn-structural"
              onClick={handleLogout}
              style={{ color: '#dc2626', borderColor: '#fca5a5', borderRadius: '4px', padding: '0.35rem 0.75rem', fontWeight: '500' }}
            >
              Sair
            </button>
          </>
        ) : (
          <Link to="/login" className="btn-structural" style={{ textDecoration: 'none', borderRadius: '4px' }}>
            Entrar
          </Link>
        )}
      </div>
    </header>
  );
}
