import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { HttpError } from '../services/httpClient';
import farmImage from '../assets/auth-farm.jpg';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [showForgotHint, setShowForgotHint] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const targetEmail = email.trim() || 'gestao@frutas.agro.br';
    const targetPassword = password.trim() || '••••••••••••';

    setIsLoading(true);

    try {
      // FE-D02: Cliente HTTP com tratamento de erros base e simulação de latência
      const result = await authService.login(targetEmail, targetPassword);
      login(result.user.role, result.user.name, result.user.email);
      navigate('/');
    } catch (err) {
      if (err instanceof HttpError) {
        setError(err.friendlyMessage);
      } else {
        setError(err.message || 'Falha ao autenticar. Tente novamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-split-layout">
      {/* Definição SVG do ClipPath com Curva Orgânica Suave */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <clipPath id="authCurve" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 0.77,0 C 0.88,0.18 1,0.34 1,0.48 C 1,0.64 0.88,0.82 0.72,1 L 0,1 Z" />
          </clipPath>
        </defs>
      </svg>

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

      {/* Lado Direito: Painel Escuro e Formulário */}
      <div className="auth-form-column">
        <div className="auth-form-container">
          <div className="auth-header-block">
            <span className="auth-pretitle">Bem vindo (a)!</span>
            <h1 className="auth-heading">Acesse sua conta</h1>
          </div>

          {/* FE07: Linha animada de progresso durante carregamento */}
          {isLoading && (
            <div className="auth-loading-bar-track" aria-hidden="true">
              <div className="auth-loading-bar-fill" />
            </div>
          )}

          <form onSubmit={handleLogin} className="auth-modern-form" noValidate>
            {/* Campo E-mail */}
            <div className="auth-field-group">
              <label htmlFor="login-email" className="auth-field-label">
                E-MAIL
              </label>
              <div className={`auth-input-container ${isLoading ? 'is-disabled' : ''}`}>
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
                  disabled={isLoading}
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
              <div className={`auth-input-container ${isLoading ? 'is-disabled' : ''}`}>
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
                  placeholder="••••••••••••"
                  value={password}
                  disabled={isLoading}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={isLoading}
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
                  disabled={isLoading}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className="auth-checkbox-text">Lembrar desta conta</span>
              </label>
              <button
                type="button"
                className="auth-inline-forgot"
                disabled={isLoading}
                onClick={() => setShowForgotHint((prev) => !prev)}
              >
                Esqueceu?
              </button>
            </div>

            {showForgotHint && (
              <div className="auth-hint-box">
                Recuperação de senha: entre em contato com o suporte ou gestor da fazenda.
              </div>
            )}

            {/* Mensagem de Erro (FE-D02) */}
            {error && (
              <div className="auth-error-banner" role="alert">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Botão Entrar com Animação de Carregamento (FE07) */}
            <button
              type="submit"
              className={`auth-primary-btn ${isLoading ? 'is-loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="auth-btn-loading-wrapper">
                  <svg className="auth-btn-spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
                    <path d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                  <span>AUTENTICANDO...</span>
                </span>
              ) : (
                <span>ENTRAR</span>
              )}
            </button>
          </form>

          {/* MFA Informação */}
          <div className="auth-mfa-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
