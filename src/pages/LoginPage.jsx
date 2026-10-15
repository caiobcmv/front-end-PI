import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import farmImage from '../assets/auth-farm.jpg';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('gestao@frutas.agro.br');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      login('Gestora', 'Maria Clara', email || 'maria.clara@raizagro.agr.br');
      setIsLoading(false);
      navigate('/');
    }, 400);
  };


  return (
    <div className="auth-split-layout">
      {/* Curved Divider Mask */}
      <svg width="0" height="0" style={{ position: 'absolute', pointerEvents: 'none' }}>
        <defs>
          <clipPath id="authCurve" clipPathUnits="objectBoundingBox">
            <path d="M 0,0 L 0.82,0 C 0.92,0.2 1,0.38 1,0.5 C 1,0.62 0.92,0.8 0.78,1 L 0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Lado Esquerdo: Imagem Fotográfica com Máscara Suave */}
      <div className="auth-visual-column">
        <div className="auth-visual-wrapper">
          <img
            src={farmImage}
            alt="Agricultura Inteligente e Fruticultura - Vale do São Francisco"
            className="auth-hero-image"
          />
          <div className="auth-visual-overlay">
            <div className="auth-quote-badge">
              <span className="quote-tag">PRODUTIVIDADE & QUALIDADE</span>
              <p className="quote-text">
                "Monitoramento IoT e rastreamento em tempo real do campo até os portos marítimos."
              </p>
              <span className="quote-author">Fazenda RaizTech · Vale das Uvas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lado Direito: Formulário Clean */}
      <div className="auth-form-column">
        <div className="auth-form-container">
          {/* Brand Logo */}
          <div className="auth-brand-badge-row">
            <div className="auth-logo-circle">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" stroke="#86efac" strokeWidth="1.5" strokeDasharray="3 2" />
                <path
                  d="M20 7C16 12 12 17 12 22C12 26.4183 15.5817 30 20 30C24.4183 30 28 26.4183 28 22C28 17 24 12 20 7Z"
                  fill="#22c55e"
                />
                <path d="M20 13V26" stroke="#ffffff" strokeWidth="1.75" strokeLinecap="round" />
                <path d="M16 18C18 19.5 20 19.5 20 19.5" stroke="#ffffff" strokeWidth="1.75" strokeLinecap="round" />
                <path d="M24 22C22 23.5 20 23.5 20 23.5" stroke="#ffffff" strokeWidth="1.75" strokeLinecap="round" />
              </svg>
            </div>
            <div className="auth-brand-name-col">
              <span className="auth-brand-title">RAÍZ</span>
              <span className="auth-brand-sub">SISTEMA DE GESTÃO DO CAMPO</span>
            </div>
          </div>

          <div className="auth-header-block">
            <h1 className="auth-heading">Acesse sua conta</h1>
            <p className="auth-subheading">Painel de controle agroclimático e cadeia fria</p>
          </div>

          {isLoading && (
            <div className="auth-loading-bar-track" aria-hidden="true">
              <div className="auth-loading-bar-fill" />
            </div>
          )}

          <form onSubmit={handleLogin} className="auth-modern-form" noValidate>
            {/* Campo E-mail */}
            <div className="auth-field-group">
              <label htmlFor="login-email" className="auth-field-label">
                E-MAIL CORPORATIVO
              </label>
              <div className="auth-input-container">
                <span className="auth-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <input
                  id="login-email"
                  type="email"
                  className="auth-text-input"
                  placeholder="gestora@raizagro.agr.br"
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
                SENHA DE ACESSO
              </label>
              <div className="auth-input-container">
                <span className="auth-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
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
                  tabIndex={-1}
                  aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                      <line x1="2" y1="2" x2="22" y2="22" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Lembrar e Opções */}
            <div className="auth-row-options">
              <label className="auth-checkbox-row">
                <input
                  type="checkbox"
                  className="auth-checkbox"
                  checked={remember}
                  disabled={isLoading}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className="auth-checkbox-text">Manter conectado</span>
              </label>
              <button
                type="button"
                className="auth-inline-forgot"
                onClick={() => alert('Para recuperação de senha contate o suporte do TI Raíz.')}
              >
                Esqueceu a senha?
              </button>
            </div>

            {error && (
              <div className="auth-error-banner" role="alert">
                <span>{error}</span>
              </div>
            )}

            {/* Botão Entrar Principal */}
            <button
              type="submit"
              className={`auth-primary-btn ${isLoading ? 'is-loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'AUTENTICANDO...' : 'ENTRAR NO SISTEMA'}
            </button>
          </form>

          {/* MFA Informação */}
          <div className="auth-mfa-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span>Ambiente seguro criptografado com telemetria LoRaWAN</span>
          </div>

          <p className="auth-bottom-switch">
            Precisa cadastrar nova fazenda?{' '}
            <Link to="/cadastro" className="auth-link-highlight">
              Solicitar acesso
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
