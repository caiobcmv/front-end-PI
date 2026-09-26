import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const ROLES = {
  PRODUTOR: 'Produtor/Exportador',
  ANALISTA: 'Analista de Dados',
  ADMIN: 'Administrador do Sistema',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : { name: 'Carlos Mendes', role: ROLES.PRODUTOR, email: 'carlos@agro.com' };
    } catch {
      return { name: 'Carlos Mendes', role: ROLES.PRODUTOR, email: 'carlos@agro.com' };
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const auth = localStorage.getItem('isAuthenticated');
      return auth !== null ? JSON.parse(auth) : true;
    } catch {
      return true;
    }
  });

  const login = (role = ROLES.PRODUTOR, name = 'Carlos Mendes', email = '') => {
    const userName = name && name.trim() ? name.trim() : 'Usuário';
    const newUser = { name: userName, role, email };
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

