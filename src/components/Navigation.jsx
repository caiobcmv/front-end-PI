import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <aside className="app-navigation">
      {/* Brand / Logo */}
      <div className="nav-brand">
        <Link to="/" className="nav-brand-link">
          <div className="nav-logo-badge">
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14.5" stroke="#facc15" strokeWidth="1.2" strokeDasharray="3 2" />
              <path d="M16 6C13 10 10 14 10 18C10 21.3137 12.6863 24 16 24C19.3137 24 22 21.3137 22 18C22 14 19 10 16 6Z" fill="#22c55e" />
              <path d="M16 11V21" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M13 15C14.5 16 16 16 16 16" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M19 18C17.5 19 16 19 16 19" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="nav-brand-text-col">
            <span className="nav-brand-name">RAÍZ</span>
            <span className="nav-brand-tagline">SEMEANDO O FUTURO DO AGRO</span>
          </div>
        </Link>
      </div>

      {/* Navigation List */}
      <nav className="nav-menu">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7" rx="2" />
                  <rect x="14" y="3" width="7" height="7" rx="2" />
                  <rect x="3" y="14" width="7" height="7" rx="2" />
                  <rect x="14" y="14" width="7" height="7" rx="2" />
                </svg>
              </span>
              <span className="nav-text">Visão geral</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/lotes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" rx="1" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </span>
              <span className="nav-text">Logística Fria</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/previsao" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </span>
              <span className="nav-text">Rede ESP32</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/sensores" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                  <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                  <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                  <path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1" />
                </svg>
              </span>
              <span className="nav-text">Sensores</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/historico" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          <li className="nav-item">
            <NavLink to="/mercado" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </span>
              <span className="nav-text">Alertas</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/configuracao" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <span className="nav-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </span>
              <span className="nav-text">Configurações</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Bottom Area: Farm badge + LoRa Gateway */}
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
            <span className="gateway-dot-black" />
            <span className="gateway-title">LoRa Gateway</span>
          </div>
          <span className="gateway-status-text">Conectado</span>
        </div>
      </div>
    </aside>
  );
}
