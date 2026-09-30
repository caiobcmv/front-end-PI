import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, ROLES } from '../context/AuthContext';
import RoleSelector from '../components/RoleSelector';
import farmImage from '../assets/auth-farm.jpg';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState(ROLES.PRODUTOR);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [showForgotHint, setShowForgotHint] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    const targetEmail = email.trim() || 'gestao@frutas.agro.br';

    if (!targetEmail || !password) {
      setError('Preencha e-mail e senha para continuar.');
      return;
    }

    let displayName = targetEmail.split('@')[0].replace(/[._]/g, ' ').trim();
    if (displayName) {
      displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
    } else {
      displayName = 'Usuário';
    }

    login(selectedRole, displayName, targetEmail);
    navigate('/');
  };

  return (
    <div className="auth-split-layout">
      {/* Lado Esquerdo: Imagem Agrícola com Curva */}
      <div className="auth-visual-column">
        <div className="auth-visual-wrapper">
          <img
            src={farmImage}
            alt="Agricultura Inteligente Petrolina e Juazeiro"
            className="auth-hero-image"
          />
        </div>
      </div>

      {/* Lado Direito: Formulário de Login */}
      <div className="auth-form-column">
        <div className="auth-form-container">
          <div className="auth-header-block">
            <span className="auth-pretitle">Bem-vindo de volta!</span>
            <h1 className="auth-heading">Acesse sua conta</h1>
          </div>

          <form onSubmit={handleLogin} className="auth-modern-form" noValidate>
            {/* Seletor de Perfil Estilizado */}
            <RoleSelector value={selectedRole} onChange={setSelectedRole} />

            {/* Campo E-mail */}
            <div className="auth-field-group">
              <label htmlFor="login-email" className="auth-field-label">
                E-MAIL
              </label>
              <div className="auth-input-container">
                <span className="auth-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </span>
                <input
                  id="login-email"
                  type="email"
                  className="auth-text-input"
                  placeholder="gestao@frutas.agro.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div className="auth-field-group">
              <label htmlFor="login-password" className="auth-field-label">
                SENHA
              </label>
              <div className="auth-input-container">
                <span className="auth-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </span>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  className="auth-text-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                      <line x1="2" y1="2" x2="22" y2="22"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Lembrar e Esqueceu */}
            <div className="auth-row-options">
              <label className="auth-checkbox-row">
                <input
                  type="checkbox"
                  className="auth-checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className="auth-checkbox-text">Lembrar desta conta</span>
              </label>
              <button
                type="button"
                className="auth-inline-forgot"
                onClick={() => setShowForgotHint((prev) => !prev)}
              >
                Esqueceu?
              </button>
            </div>

            {showForgotHint && (
              <div className="auth-hint-box">
                Recuperação de senha: entre em contato com o administrador do sistema.
              </div>
            )}

            {/* Mensagem de Erro */}
            {error && <div className="auth-error-message">{error}</div>}

            {/* Botão Entrar */}
            <button type="submit" className="auth-primary-btn">
              ENTRAR
            </button>
          </form>

          {/* MFA Informação */}
          <div className="auth-mfa-badge">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
            <span>Acesso via MFA (Multi-Factor Authentication)</span>
          </div>

          {/* Alternar para Cadastro */}
          <p className="auth-bottom-switch">
            Ainda não tem conta? <Link to="/cadastro" className="auth-link-highlight">Cadastre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
