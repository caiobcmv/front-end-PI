import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import MainContent from './MainContent';

export default function Layout({ children }) {
  return (
    <div className="app-layout">
      <Header />
      <div className="layout-body">
        <Navigation />
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
}
