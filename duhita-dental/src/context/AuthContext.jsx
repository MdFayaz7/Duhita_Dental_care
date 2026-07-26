import { createContext, useContext, useState, useEffect } from 'react';
import client from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('duhita_admin_token');
      if (token) {
        try {
          const res = await client.get('/auth/me');
          if (res.data.success) {
            setAdmin(res.data.admin);
          } else {
            localStorage.removeItem('duhita_admin_token');
          }
        } catch (err) {
          localStorage.removeItem('duhita_admin_token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await client.post('/auth/login', { email, password });
      if (res.data.success) {
        localStorage.setItem('duhita_admin_token', res.data.token);
        setAdmin(res.data.admin);
        return { success: true };
      }
      return { success: false, message: res.data.message || 'Login failed' };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Server connection failed',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('duhita_admin_token');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
