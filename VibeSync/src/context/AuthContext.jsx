import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginApi, getProfileApi } from '../apis/api';
import Loader from '../components/Loader';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  // Initialize user from localStorage if exists
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('vibeSyncUser');
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(true);

  // Fetch fresh user info if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(getProfileApi, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          const userData = data.user || data; // normalize user object
          setUser(userData);
          localStorage.setItem('vibeSyncUser', JSON.stringify(userData));
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

  // Login function
  const login = async (email, password) => {
    const response = await fetch(loginApi, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Invalid credentials');

    const userData = data.user || data; // normalize user object
    localStorage.setItem('token', data.token);
    localStorage.setItem('vibeSyncUser', JSON.stringify(userData));
    setUser(userData);

    return data;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('vibeSyncUser');
    setUser(null);
  };

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '18px',
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
