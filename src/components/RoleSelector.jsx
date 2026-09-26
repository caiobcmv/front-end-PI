import React from 'react';
import { ROLES } from '../context/AuthContext';

export default function RoleSelector({ value, onChange }) {
  const rolesList = [
    { key: ROLES.PRODUTOR, label: 'Produtor / Exportador' },
    { key: ROLES.ANALISTA, label: 'Analista de Dados' },
    { key: ROLES.ADMIN, label: 'Administrador do Sistema' },
  ];

  return (
    <div className="form-group role-selector-group">
      <label htmlFor="role-select">Perfil de Acesso</label>
      <select
        id="role-select"
        className="form-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '0.65rem 0.8rem',
          borderRadius: '6px',
          border: '1px solid var(--border-color)',
          backgroundColor: '#ffffff',
          fontSize: '0.9rem',
          outline: 'none',
          cursor: 'pointer'
        }}
      >
        {rolesList.map((role) => (
          <option key={role.key} value={role.key}>
            {role.label}
          </option>
        ))}
      </select>
    </div>
  );
}
