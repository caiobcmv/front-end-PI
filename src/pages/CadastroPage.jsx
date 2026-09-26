import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, ROLES } from '../context/AuthContext';
import RoleSelector from '../components/RoleSelector';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CadastroPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState(ROLES.PRODUTOR);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Preencha todos os campos para criar sua conta.');
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setError('Informe um e-mail válido.');
      return;
    }
    if (password.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    // Sem backend real ainda: cria a conta e já autentica o usuário.
    login(selectedRole, name.trim(), email.trim());
    navigate('/');
  };

  return (
    <div className="app-layout auth-page">
      <div className="structural-card auth-card">
        <div className="auth-header">
          <span className="brand-logo" style={{ borderRadius: '4px', background: '#2d6a4f', color: '#ffffff', padding: '0.25rem 0.75rem', border: 'none' }}>IoT Agro</span>
          <h2>Crie uma conta</h2>
          <p className="auth-subtitle">
            Dashboard Climático e Logístico em Nuvem (Petrolina/Juazeiro)
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <RoleSelector value={selectedRole} onChange={setSelectedRole} />

          <div className="form-group">
            <label htmlFor="reg-name">Nome</label>
            <input
              id="reg-name"
              type="text"
              className="form-input"
              placeholder="Seu nome completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-email">E-mail</label>
            <input
              id="reg-email"
              type="email"
              className="form-input"
              placeholder="seuemail@dominio.com.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="reg-password">Senha</label>
            <div className="form-input-wrapper">
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                placeholder="Mínimo 8 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="reg-confirm-password">Repetir Senha</label>
            <input
              id="reg-confirm-password"
              type={showPassword ? 'text' : 'password'}
              className="form-input"
              placeholder="Repita a senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Lembrar desta conta
          </label>

          {error && <p className="form-error">{error}</p>}

          <button
            type="submit"
            className="btn-structural"
            style={{ width: '100%', padding: '0.75rem', fontWeight: 'bold' }}
          >
            Cadastrar
          </button>
        </form>

        <p className="auth-footer-note">Acesso via MFA (Multi-Factor Authentication)</p>

        <p className="auth-switch">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
