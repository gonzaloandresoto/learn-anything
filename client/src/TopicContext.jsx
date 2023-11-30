import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const TopicContext = createContext({});

export const TopicProvider = ({ children }) => {
  const [topic, setTopic] = useState('');
  const [briefSummary, setBriefSummary] = useState({});
  const [activeTopic, setActiveTopic] = useState('');
  const [funLinks, setFunLinks] = useState([]);
  const [deepdiveData, setDeepdiveData] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const navigate = useNavigate();

  const searchTopic = async () => {
    try {
      console.log('Sent search to DB');
      const res = await axios.post('/search_concept', { topic });
      console.log(res?.data?.choices?.[0]?.message?.content);
      setBriefSummary(JSON.parse(res?.data?.choices?.[0]?.message?.content));
      setActiveTopic(
        JSON.parse(res?.data?.choices?.[0]?.message?.content)?.topics?.[0]?.name
      );
      setFunLinks(res?.data?.metaphorResults);
    } catch (error) {
      console.log(error);
    }
  };

  const deepdiveIntoTopic = async (topic, activeTopic) => {
    try {
      console.log('Sent deepdive to DB');
      const res = await axios.post('/deepdive_topic', { topic, activeTopic });
      console.log(res?.data?.choices?.[0]?.message?.content);
    } catch (error) {
      console.log(error);
    }
  };

  const quizAboutTopic = async (topic, activeTopic) => {
    try {
      console.log('Sent deepdive to DB');
      const res = await axios.post('/quiz_topic', { topic, activeTopic });
      console.log(res?.data?.choices?.[0]?.message?.content);
      setQuizData(JSON.parse(res?.data?.choices?.[0]?.message?.content));
      navigate('/topic-quiz');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TopicContext.Provider
      value={{
        searchTopic,
        deepdiveIntoTopic,
        quizAboutTopic,
        topic,
        setTopic,
        briefSummary,
        setBriefSummary,
        activeTopic,
        setActiveTopic,
        funLinks,
        setFunLinks,
        deepdiveData,
        setDeepdiveData,
        quizData,
        setQuizData,
      }}
    >
      {children}
    </TopicContext.Provider>
  );
};

export default TopicContext;
