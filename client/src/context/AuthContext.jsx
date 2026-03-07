import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user in localStorage
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        // Set axios default authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
      }
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
      localStorage.removeItem('user'); // Clear corrupted data
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password, role) => {
    try {
      const response = await axios.post('http://localhost:8800/auth/login', { email, password, role });
      
      if (response.data.needsRoleSelection) {
        return { 
          success: true, 
          needsRoleSelection: true, 
          roles: response.data.roles 
        };
      }

      const userData = response.data.user;
      const token = response.data.token;
      
      const fullUser = { ...userData, token };
      localStorage.setItem('user', JSON.stringify(fullUser));
      setUser(fullUser);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const register = async (formData) => {
    try {
      await axios.post('http://localhost:8800/auth/register', formData);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
