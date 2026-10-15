import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const ROLES = {
  GESTORA: 'Gestora',
  PRODUTOR: 'Produtor',
  LOGISTICA: 'Logística Fria',
  ADMIN: 'Admin IoT',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : { name: 'Maria Clara', role: 'Gestora', email: 'maria.clara@raizagro.agr.br' };
    } catch {
      return { name: 'Maria Clara', role: 'Gestora', email: 'maria.clara@raizagro.agr.br' };
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const auth = localStorage.getItem('isAuthenticated');
      return auth !== null ? JSON.parse(auth) : false;
    } catch {
      return false;
    }
  });

  const login = (role = 'Gestora', name = 'Maria Clara', email = 'maria.clara@raizagro.agr.br') => {
    const userName = name && name.trim() ? name.trim() : 'Maria Clara';
    const userRole = role && role.trim() ? role.trim() : 'Gestora';
    const newUser = { name: userName, role: userRole, email: email || 'maria.clara@raizagro.agr.br' };
    setUser(newUser);
    setIsAuthenticated(true);
    try {
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('isAuthenticated', 'true');
    } catch (e) {
      console.error('Erro ao salvar usuário no localStorage:', e);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    try {
      localStorage.removeItem('user');
      localStorage.setItem('isAuthenticated', 'false');
    } catch (e) {
      console.error('Erro ao remover usuário do localStorage:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, ROLES }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

