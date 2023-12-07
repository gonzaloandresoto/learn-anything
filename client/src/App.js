import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Contexts
import { AuthProvider } from './context/AuthContext';
import { TopicProvider } from './context/TopicContext';

// Components
import Home from './components/Home';
import SignIn from './components/authentication/SignIn';
import SignUp from './components/authentication/SignUp';
import Course from './components/course/Course';

function App() {
  return (
    <div className='flex w-screen h-screen'>
      <Router>
        <AuthProvider>
          <TopicProvider>
            <Routes>
              <Route
                path='/'
                element={<Home />}
              />
              <Route
                path='/signin'
                element={<SignIn />}
              />
              <Route
                path='/signup'
                element={<SignUp />}
              />
              <Route
                path='/home'
                element={<Home />}
              />
              <Route
                path='/course'
                element={<Course />}
              />
            </Routes>
          </TopicProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
