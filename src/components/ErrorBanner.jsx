import React from 'react';
import './ErrorBanner.css';

/**
 * Simple banner to display error messages.
 * Recebe a mensagem via prop `message`.
 */
export default function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div className="error-banner" role="alert">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="error-icon"
      >
        <path d="M12 9v2" />
        <path d="M12 15h.01" />
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
      </svg>
      <span>{message}</span>
    </div>
  );
}

