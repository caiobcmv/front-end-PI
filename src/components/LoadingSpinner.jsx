import React from 'react';
import './LoadingSpinner.css'; // optional styling file

/**
 * Simple spinner component used while data is being fetched.
 * The CSS file should define an animation for `.spinner`.
 */
export default function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner" />
    </div>
  );
}

