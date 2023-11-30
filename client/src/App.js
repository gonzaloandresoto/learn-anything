import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import TopicDeepdive from './TopicDeepdive';

function App() {
  const [deepdiveData, setDeepdiveData] = useState([]);
  const [quizData, setQuizData] = useState([]);
  console.log('TOPIC FOR DEEPDIVE', quizData);
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <Home
                deepdiveData={deepdiveData}
                setDeepdiveData={setDeepdiveData}
                quizData={quizData}
                setQuizData={setQuizData}
              />
            }
          />
          <Route
            path='/home'
            element={
              <Home
                deepdiveData={deepdiveData}
                setDeepdiveData={setDeepdiveData}
                quizData={quizData}
                setQuizData={setQuizData}
              />
            }
          />
          <Route
            path='/topic-deepdive'
            element={<TopicDeepdive />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
