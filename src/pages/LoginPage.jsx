import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, ROLES } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(ROLES.PRODUTOR);

  const handleLogin = (e) => {
    e.preventDefault();
    login(selectedRole, selectedRole === ROLES.ADMIN ? 'Admin Sistema' : 'Carlos Mendes (Exportador)');
    navigate('/');
  };

  return (
    <div className="app-layout" style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f6f8' }}>
      <div className="structural-card" style={{ width: '100%', maxWidth: '420px', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span className="brand-logo" style={{ display: 'inline-block', marginBottom: '0.5rem' }}>[ IoT Agro ]</span>
          <h2>Acesso ao Sistema</h2>
          <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
            Dashboard Climático e Logístico em Nuvem (Petrolina/Juazeiro)
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.4rem' }}>
              Selecionar Perfil de Acesso (RBAC - RF08):
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="btn-structural"
              style={{ width: '100%', padding: '0.6rem' }}
            >
              <option value={ROLES.PRODUTOR}>{ROLES.PRODUTOR}</option>
              <option value={ROLES.ANALISTA}>{ROLES.ANALISTA}</option>
              <option value={ROLES.ADMIN}>{ROLES.ADMIN}</option>
            </select>
          </div>

          <button type="submit" className="btn-structural" style={{ width: '100%', padding: '0.75rem', fontWeight: 'bold' }}>
            Entrar no Sistema
          </button>
        </form>
      </div>
    </div>
  );
}
