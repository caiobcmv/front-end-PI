import React from 'react';
import { ROLES } from '../context/AuthContext';

export default function RoleSelector({ value, onChange }) {
  const roles = [
    {
      key: ROLES.PRODUTOR,
      label: 'Produtor',
      color: '#15803d',
      activeBorder: '#16a34a',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 17a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z"/>
          <path d="M17 17a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z"/>
          <path d="M9 17h5"/>
          <path d="M14 17V8a1 1 0 0 0-1-1H6l-2 5v5"/>
          <path d="M14 10h4l3 4"/>
          <path d="M8 8V4"/>
        </svg>
      ),
    },
    {
      key: ROLES.LOGISTICA,
      label: 'Logística Fria',
      color: '#0284c7',
      activeBorder: '#0284c7',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="2" x2="12" y2="22"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
          <line x1="19.07" y1="4.93" x2="4.93" y2="19.07"/>
          <polyline points="10 4 12 2 14 4"/>
          <polyline points="10 20 12 22 14 20"/>
          <polyline points="4 10 2 12 4 14"/>
          <polyline points="20 10 22 12 20 14"/>
        </svg>
      ),
    },
    {
      key: ROLES.ADMIN,
      label: 'Admin IoT',
      color: '#d97706',
      activeBorder: '#d97706',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="21" x2="4" y2="14"/>
          <line x1="4" y1="10" x2="4" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12" y2="3"/>
          <line x1="20" y1="21" x2="20" y2="16"/>
          <line x1="20" y1="12" x2="20" y2="3"/>
          <line x1="1" y1="14" x2="7" y2="14"/>
          <line x1="9" y1="8" x2="15" y2="8"/>
          <line x1="17" y1="16" x2="23" y2="16"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="role-quick-access-card">
      <div className="role-quick-access-header">
        <span className="role-quick-access-title">ACESSO RÁPIDO POR PERFIL</span>
        <span className="role-quick-access-magic" title="Perfis pré-configurados">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
            <path d="M5 3v4"/>
            <path d="M19 17v4"/>
            <path d="M3 5h4"/>
            <path d="M17 19h4"/>
          </svg>
        </span>
      </div>

      <div className="role-quick-access-grid">
        {roles.map((role) => {
          const isSelected = value === role.key || (role.key === ROLES.LOGISTICA && value === ROLES.ANALISTA);
          return (
            <button
              key={role.key}
              type="button"
              className={`role-profile-btn ${isSelected ? 'active' : ''}`}
              onClick={() => onChange(role.key)}
              style={
                isSelected
                  ? {
                      borderColor: role.activeBorder,
                      backgroundColor: '#ffffff',
                    }
                  : {}
              }
            >
              <div className="role-profile-icon">{role.icon}</div>
              <span className="role-profile-label">{role.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
