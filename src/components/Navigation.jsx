import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth, ROLES } from '../context/AuthContext';

export default function Navigation() {
  const { user } = useAuth();
  const isAdmin = user?.role === ROLES.ADMIN;

  return (
    <aside className="app-navigation">
      <nav className="nav-menu">
        <div className="nav-section">
          <div className="nav-section-label">OPERACIONAL & IOT</div>
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <span className="nav-text">Dashboard Geral</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/sensores" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <span className="nav-text">Status de Sensores</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/lotes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <span className="nav-text">Lista de Lotes</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="nav-section" style={{ marginTop: '1.25rem' }}>
          <div className="nav-section-label">INTELIGÊNCIA & MERCADO</div>
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/previsao" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <span className="nav-text">Previsão e Safra</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/historico" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <span className="nav-text">Histórico Climático</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/mercado" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <span className="nav-text">Mercado e Exportação</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {isAdmin && (
          <div className="nav-section" style={{ marginTop: '1.25rem' }}>
            <div className="nav-section-label">GESTÃO & SEGURANÇA</div>
            <ul className="nav-list">
              <li className="nav-item">
                <NavLink to="/usuarios" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <span className="nav-text">Gestão de Usuários</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/auditoria" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <span className="nav-text">Auditoria e Logs</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/configuracao" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  <span className="nav-text">Configurações</span>
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </aside>
  );
}
