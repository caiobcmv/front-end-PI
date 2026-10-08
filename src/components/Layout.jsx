import React from 'react';
import Navigation from './Navigation';
import MainContent from './MainContent';

export default function Layout({ children }) {
  return (
    <div className="app-layout">
      <Navigation />
      <MainContent>{children}</MainContent>
    </div>
  );
}
