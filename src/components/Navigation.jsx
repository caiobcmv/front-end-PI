import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
  const { user } = useAuth();
  const isAnalista = user?.role === 'Analista';

  return (
    <aside className="app-navigation">
      {/* Brand / Logo */}
      <div className="nav-brand">
        <Link to="/" className="nav-brand-link">
          <div className="nav-logo-badge">
            <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="20" fill="none" />
              <circle cx="20" cy="20" r="17" stroke="#86efac" strokeWidth="1.2" strokeDasharray="3 2" />
              <path
                d="M20 7C16 12 12 17 12 22C12 26.4183 15.5817 30 20 30C24.4183 30 28 26.4183 28 22C28 17 24 12 20 7Z"
                fill="#22c55e"
              />
              <path d="M20 13V26" stroke="#ffffff" strokeWidth="1.75" strokeLinecap="round" />
              <path d="M16 18C18 19.5 20 19.5 20 19.5" stroke="#ffffff" strokeWidth="1.75" strokeLinecap="round" />
              <path d="M24 22C22 23.5 20 23.5 20 23.5" stroke="#ffffff" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </div>
          <div className="nav-brand-text-col">
            <span className="nav-brand-name">RAÍZ</span>
            <span className="nav-brand-tagline">SEMEANDO O FUTURO DO AGRO</span>
          </div>
        </Link>
      </div>

      {/* Navigation List - adaptive by role */}
      <nav className="nav-menu">
        <ul className="nav-list">
          {/* 1. Visão geral — ambos os roles */}
          <li className="nav-item">
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-icon-wrap">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7" rx="2" />
                  <rect x="14" y="3" width="7" height="7" rx="2" />
                  <rect x="3" y="14" width="7" height="7" rx="2" />
                  <rect x="14" y="14" width="7" height="7" rx="2" />
                </svg>
              </span>
              <span className="nav-text">Visão geral</span>
            </NavLink>
          </li>

          {/* Analista: Sensores & Rede ESP32 */}
          {isAnalista && (
            <>
              <li className="nav-item">
                <NavLink to="/sensores" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <span className="nav-icon-wrap">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                      <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                      <circle cx="12" cy="12" r="2" />
                      <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                      <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
                    </svg>
                  </span>
                  <span className="nav-text">Sensores</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/rede-esp32" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <span className="nav-icon-wrap">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="8" height="8" rx="2" />
                      <rect x="14" y="2" width="8" height="8" rx="2" />
                      <rect x="8" y="14" width="8" height="8" rx="2" />
                      <line x1="6" y1="10" x2="6" y2="14" />
                      <line x1="18" y1="10" x2="18" y2="14" />
                      <line x1="6" y1="14" x2="12" y2="14" />
                      <line x1="18" y1="14" x2="12" y2="14" />
                    </svg>
                  </span>
                  <span className="nav-text">Rede ESP32</span>
                </NavLink>
              </li>
            </>
          )}

          {/* Histórico Safra — ambos os roles */}
          <li className="nav-item">
            <NavLink to="/historico" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-icon-wrap">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </span>
              <span className="nav-text">Histórico Safra</span>
            </NavLink>
          </li>

          {/* Alertas — ambos os roles */}
          <li className="nav-item">
            <NavLink to="/alertas" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-icon-wrap">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </span>
              <span className="nav-text">Alertas</span>
            </NavLink>
          </li>

          {/* Configurações — ambos os roles */}
          <li className="nav-item">
            <NavLink to="/configuracao" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-icon-wrap">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </span>
              <span className="nav-text">Configurações</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Bottom Area: Farm badge + Hardware Connection Status Pill */}
      <div className="nav-bottom-section">
        <div className="nav-farm-card">
          <div className="nav-farm-avatar">VU</div>
          <div className="nav-farm-details">
            <span className="nav-farm-name">Vale das Uvas</span>
            <span className="nav-farm-sub">Petrolina - Setor 04</span>
          </div>
        </div>

        <div className="nav-gateway-pill">
          <div className="gateway-left">
            <span className="gateway-dot-green" />
            <span className="gateway-title">{isAnalista ? 'LoRa Gateway' : 'ESP32'}</span>
          </div>
          <span className="gateway-status-text">Conectado</span>
        </div>
      </div>
    </aside>
  );
}
