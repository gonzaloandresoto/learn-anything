import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosConfig';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axiosInstance.post('/authentication/check_session');
        setUser(res?.data?.user);
        console.log('Setting user success', res?.data?.user);
      } catch (error) {
        console.log('Error checking session:', error);
        setUser(null);
      } finally {
        setIsAuthenticating(false);
      }
    };
    checkSession();
  }, []);

  const signIn = async (email, password) => {
    try {
      const res = await axiosInstance.post('/authentication/sign_in', {
        email,
        password,
      });
      setUser(res?.data?.user);
      navigate('/home');
    } catch (error) {
      console.log('Error signing in:', error);
    }
  };

  const signUp = async (email, password) => {
    try {
      const res = await axiosInstance.post('/authentication/sign_up', {
        email,
        password,
      });
      setUser(res?.data?.user);
      navigate('/home');
    } catch (error) {
      console.log('Error signing in:', error);
    }
  };

  const signOut = async () => {
    try {
      await axiosInstance.post('/authentication/sign_out');
      setUser(null);
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, signIn, signUp, signOut, isAuthenticating }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
