import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Contexts
import { AuthProvider } from './context/AuthContext';
import { TopicProvider } from './context/TopicContext';

// Components
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Course from './pages/Course';
import ProtectedRoutes from './ProtectedRoutes';

function App() {
  return (
    <div className='flex w-screen h-screen'>
      <Router>
        <AuthProvider>
          <TopicProvider>
            <Routes>
              <Route
                path='/signin'
                element={<SignIn />}
              />
              <Route
                path='/signup'
                element={<SignUp />}
              />
              <Route element={<ProtectedRoutes />}>
                <Route
                  path='/'
                  element={<Home />}
                />
                <Route
                  path='/home'
                  element={<Home />}
                />
                <Route
                  path='/course'
                  element={<Course />}
                />
              </Route>
            </Routes>
          </TopicProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
