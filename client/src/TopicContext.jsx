import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// axios.defaults.baseURL = 'https://learn-anything-b61f2394c70a.herokuapp.com/';
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const TopicContext = createContext({});

export const TopicProvider = ({ children }) => {
  const [topic, setTopic] = useState('');
  const [briefSummary, setBriefSummary] = useState({});
  const [activeTopic, setActiveTopic] = useState('');
  const [funLinks, setFunLinks] = useState([]);
  const [learningPlan, setLearningPlan] = useState([]);
  const [deepdiveData, setDeepdiveData] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [recentTopics, setRecentTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const searchTopic = async (topic) => {
    try {
      console.log('Sent search to DB');
      setIsLoading(true);
      const res = await axios.post('/search_concept', { topic });
      console.log(res?.data);
      setBriefSummary(res?.data?.data);
      setActiveTopic(res?.data?.data?.topics?.[0]?.name);
      setFunLinks(res?.data?.metaphorResults);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deepdiveIntoTopic = async (topic, activeTopic) => {
    try {
      console.log('Sent deepdive to DB');
      setIsLoading(true);
      const res = await axios.post('/deepdive_topic', { topic, activeTopic });
      console.log(res?.data?.choices?.[0]?.message?.content);
      setDeepdiveData(JSON.parse(res?.data?.choices?.[0]?.message?.content));
      navigate('/topic-deepdive');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const quizAboutTopic = async (topic, activeTopic) => {
    try {
      console.log('Sent deepdive to DB');
      setIsLoading(true);
      const res = await axios.post('/quiz_topic', { topic, activeTopic });
      console.log(res?.data?.choices?.[0]?.message?.content);
      setQuizData(JSON.parse(res?.data?.choices?.[0]?.message?.content));
      navigate('/topic-quiz');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getRecentTopics = async () => {
      try {
        const res = await axios.get('/recent_topics');
        setRecentTopics(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRecentTopics();
  }, []);

  const getKeywords = async (paragraph) => {
    try {
      const res = await axios.post('/extract_keywords', { paragraph });
      console.log(res.data);
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
        recentTopics,
        getKeywords,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </TopicContext.Provider>
  );
};

export default TopicContext;
