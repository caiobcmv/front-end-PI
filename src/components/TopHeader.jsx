import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function TopHeader({
  title = 'Visão Geral do Sistema',
  subtitle = 'Gerencie preferências da fazenda, parâmetros de sensores, notificações e acessos.',
  showResumidoToggle = true,
  isResumido = false,
  onToggleResumido,
  dateText = '22 de setembro de 2026',
}) {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isAdmin =
    user?.role === 'Admin IoT' ||
    user?.role === 'Admin' ||
    user?.role === 'Administrador' ||
    user?.email?.toLowerCase()?.includes('admin');
  const isAnalista = user?.role === 'Analista';

  const userName =
    user?.name || (isAdmin ? 'Administrador IoT' : isAnalista ? 'Luiz Felipe' : 'Maria Clara');
  const userRole =
    user?.role || (isAdmin ? 'Admin IoT' : isAnalista ? 'Analista' : 'Gestora');

  const initials = userName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'RA';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSwitchProfile = (targetRole) => {
    if (targetRole === 'Admin') {
      login('Admin IoT', 'Administrador IoT', 'admin@raizagro.agr.br');
    } else if (targetRole === 'Analista') {
      login('Analista', 'Luiz Felipe', 'luiz.felipe@raizagro.agr.br');
    } else {
      login('Gestora', 'Maria Clara', 'maria.clara@raizagro.agr.br');
    }
    setShowUserMenu(false);
  };

  return (
    <header className="dash-top-header">
      <div className="dash-top-title-col">
        <h1 className="dash-main-heading">{title}</h1>
        <p className="dash-main-subtext">{subtitle}</p>
      </div>

      <div className="dash-top-actions">
        {/* Resumido / Detalhado Toggle (FE-D10) */}
        {showResumidoToggle && (
          <label
            htmlFor="resumido-toggle-input"
            className={`resumido-toggle-label ${isResumido ? 'active' : ''}`}
            title={isResumido ? 'Visão Resumida ativa (clique para visão Detalhada)' : 'Visão Detalhada ativa (clique para visão Resumida)'}
            aria-label="Alternar entre visão resumida e detalhada"
          >
            <input
              id="resumido-toggle-input"
              type="checkbox"
              className="resumido-checkbox"
              checked={isResumido}
              onChange={(e) => onToggleResumido && onToggleResumido(e.target.checked)}
            />
            <span className="resumido-slider" />
            <span className={`resumido-text ${isResumido ? 'resumido-text-active' : ''}`}>
              Resumido
            </span>
          </label>
        )}

        {/* Date Selector Pill */}
        <div className="dash-date-pill">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>{dateText}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        {/* Notification Button */}
        <button
          type="button"
          className="dash-bell-btn"
          onClick={() => navigate('/alertas')}
          title="Ver 3 alertas ativos"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4b5563" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="bell-badge-orange">2</span>
        </button>

        {/* User Profile Pill with Dropdown */}
        <div className="user-profile-wrapper" style={{ position: 'relative' }}>
          <button
            type="button"
            className="dash-profile-pill"
            onClick={() => setShowUserMenu((prev) => !prev)}
            aria-expanded={showUserMenu}
          >
            <div className="dash-profile-avatar">{initials}</div>
            <div className="dash-profile-text">
              <span className="dash-profile-name">{userName}</span>
              <span className="dash-profile-role">
                {userRole}{' '}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '2px' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </div>
          </button>

          {showUserMenu && (
            <div className="user-dropdown-menu">
              <div className="user-dropdown-header">
                <strong>{userName}</strong>
                <span>{user?.email || (isAdmin ? 'admin@raizagro.agr.br' : isAnalista ? 'luiz.felipe@raizagro.agr.br' : 'gestora@raizagro.agr.br')}</span>
              </div>
              <div className="user-dropdown-divider" />
              
              {/* Profile Quick Switcher */}
              <div style={{ padding: '6px 12px', fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>
                Alternar Perfil
              </div>

              <button
                type="button"
                className="user-dropdown-item"
                style={{ color: isAdmin ? '#0071E3' : '#0F172A', fontWeight: isAdmin ? 700 : 500 }}
                onClick={() => handleSwitchProfile('Admin')}
              >
                <span style={{ marginRight: 6 }}>⚡</span> Administrador IoT
              </button>

              <button
                type="button"
                className="user-dropdown-item"
                style={{ color: isAnalista ? '#0071E3' : '#0F172A', fontWeight: isAnalista ? 700 : 500 }}
                onClick={() => handleSwitchProfile('Analista')}
              >
                <span style={{ marginRight: 6 }}>📡</span> Luiz Felipe (Analista)
              </button>

              <button
                type="button"
                className="user-dropdown-item"
                style={{ color: (!isAdmin && !isAnalista) ? '#0071E3' : '#0F172A', fontWeight: (!isAdmin && !isAnalista) ? 700 : 500 }}
                onClick={() => handleSwitchProfile('Gestora')}
              >
                <span style={{ marginRight: 6 }}>👩‍🌾</span> Maria Clara (Gestora)
              </button>

              <div className="user-dropdown-divider" />
              <button
                type="button"
                className="user-dropdown-item"
                onClick={() => {
                  setShowUserMenu(false);
                  navigate('/configuracao');
                }}
              >
                Configurações da conta
              </button>
              <button
                type="button"
                className="user-dropdown-item text-danger"
                onClick={handleLogout}
              >
                Sair do sistema
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
