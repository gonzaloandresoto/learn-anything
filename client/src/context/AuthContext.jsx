import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

// axios.defaults.baseURL = 'https://learn-anything-b61f2394c70a.herokuapp.com/';
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        setIsAuthenticating(true);
        const res = await axios.post('/authentication/check_session');
        console.log(res?.data);
        setUser(res?.data);
      } catch (error) {
        console.log('Error checking session:', error);
        setUser(null);
      } finally {
        setIsAuthenticating(false);
      }
    };
  }, []);

  const signIn = async (email, password) => {
    try {
      const res = await axios.post('/authentication/sign_in', {
        email,
        password,
      });
      console.log(res?.data);
      setUser(res?.data);
      navigate('/home');
    } catch (error) {
      console.log('Error signing in:', error);
    }
  };

  const signUp = async (email, password) => {
    try {
      const res = await axios.post('/authentication/sign_up', {
        email,
        password,
      });
      console.log(res?.data);
      setUser(res?.data);
      navigate('/home');
    } catch (error) {
      console.log('Error signing in:', error);
    }
  };

  const signOut = async () => {
    try {
      await axios.post('/authentication/sign_out');
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };

  if (isAuthenticating)
    return (
      <div className='flex grow justify-center items-center'>
        <Loader />
      </div>
    );

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;