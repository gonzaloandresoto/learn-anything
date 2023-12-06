import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import TopicDeepdive from './TopicDeepdive';
import TopicQuiz from './TopicQuiz';
import { TopicProvider } from './TopicContext';
import { AuthProvider } from './context/AuthContext';
import Deepdive from './components/deepdive/Deepdive';
import SignIn from './components/authentication/SignIn';
import SignUp from './components/authentication/SignUp';

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
                path='/topic-deepdive'
                element={<TopicDeepdive />}
              />
              <Route
                path='/topic-quiz'
                element={<TopicQuiz />}
              />
              <Route
                path='/deep-dive'
                element={<Deepdive />}
              />
            </Routes>
          </TopicProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
