import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import type { User } from '../types';
import * as api from '../services/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('haaflah_token');
    const storedUser = localStorage.getItem('haaflah_user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.login({ email, password });
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem('haaflah_token', response.token);
    localStorage.setItem('haaflah_user', JSON.stringify(response.user));
  };

  const register = async (data: api.RegisterData) => {
    const response = await api.register(data);
    setToken(response.token);
    setUser(response.user);
    localStorage.setItem('haaflah_token', response.token);
    localStorage.setItem('haaflah_user', JSON.stringify(response.user));
  };

  const logout = async () => {
    await api.logout();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
