import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginApi,getProfileApi } from '../apis/api';
import Loader from '../components/Loader';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Initialize user from localStorage if exists
    const saved = localStorage.getItem('vibeSyncUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    // Fetch latest user info but don't logout immediately
    const fetchUser = async () => {
      try {
        const res = await fetch(`${getProfileApi}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
          localStorage.setItem('vibeSyncUser', JSON.stringify(data));
        } else if (res.status === 401) {
          logout(); // token invalid
        }
      } catch (err) {
        console.error('Failed to fetch user info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    const response = await fetch(`${loginApi}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Invalid credentials');
    }

    if (data.token) localStorage.setItem('token', data.token);
    localStorage.setItem('vibeSyncUser', JSON.stringify(data.user || data));
    setUser(data.user || data);

    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('vibeSyncUser');
    setUser(null);
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
       
      }}>
       <Loader/>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
