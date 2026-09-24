import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const ROLES = {
  PRODUTOR: 'Produtor/Exportador',
  ANALISTA: 'Analista de Dados',
  ADMIN: 'Administrador do Sistema',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    name: 'Carlos Mendes',
    role: ROLES.PRODUTOR,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = (role = ROLES.PRODUTOR, name = 'Carlos Mendes') => {
    setUser({ name, role });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
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
