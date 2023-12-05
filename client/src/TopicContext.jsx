import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// axios.defaults.baseURL = 'https://learn-anything-b61f2394c70a.herokuapp.com/';
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const TopicContext = createContext({});

export const TopicProvider = ({ children }) => {
  // V2 Onwards
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [keyTerms, setKeyTerms] = useState(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState(null);
  const [relevantQuestions, setRelevantQuestions] = useState(null);
  const [addedSlide, setAddedSlide] = useState(null);
  const [indexBeforeAdd, setIndexBeforeAdd] = useState(null);
  const [showSidesheet, setShowSidesheet] = useState(false);

  const navigate = useNavigate();

  const createCourse = async (topic) => {
    try {
      setIsLoading(true);
      console.log('Sent course to DB');
      const res = await axios.post('/create_course', { topic });
      console.log(res?.data);
      setCourseData(res?.data?.main);
      setKeyTerms(res?.data?.keyTerms);
      setSuggestedQuestions(res?.data?.suggestedQuestions);
      setIsLoading(false);
      navigate('/deep-dive');
    } catch (error) {
      console.log('Error creating course:', error);
    }
  };

  const getRelevantQuestions = async (paragraph) => {
    try {
      console.log('Sent relevant questions to DB');
      const res = await axios.post('/relevant_questions', { paragraph });
      console.log(res?.data);
      setRelevantQuestions(res?.data);
    } catch (error) {
      console.log('Error getting relevant questions:', error);
    }
  };

  const addSlide = async (question) => {
    try {
      console.log('Sent question for slide to DB');
      const res = await axios.post('/add_slide', { question });
      console.log(res?.data);
      setAddedSlide(res?.data);

      if (courseData && courseData.topics) {
        const updatedTopics = [...courseData.topics];
        updatedTopics.splice(indexBeforeAdd + 1, 0, res.data);
        setCourseData({ ...courseData, topics: updatedTopics });
      }
    } catch (error) {
      console.log('Error adding slide:', error);
    }
  };

  return (
    <TopicContext.Provider
      value={{
        isLoading,
        setIsLoading,
        showSidesheet,
        setShowSidesheet,
        courseData,
        setCourseData,
        keyTerms,
        setKeyTerms,
        suggestedQuestions,
        setSuggestedQuestions,
        createCourse,
        relevantQuestions,
        setRelevantQuestions,
        getRelevantQuestions,
        addSlide,
        indexBeforeAdd,
        setIndexBeforeAdd,
      }}
    >
      {children}
    </TopicContext.Provider>
  );
};

export default TopicContext;

// const [topic, setTopic] = useState('');
// const [briefSummary, setBriefSummary] = useState({});
// const [activeTopic, setActiveTopic] = useState('');
// const [funLinks, setFunLinks] = useState([]);
// const [learningPlan, setLearningPlan] = useState([]);
// const [deepdiveData, setDeepdiveData] = useState([]);
// const [quizData, setQuizData] = useState([]);
// const [recentTopics, setRecentTopics] = useState([]);

// const searchTopic = async (paragraph) => {
//   try {
//     console.log('Sent search to DB');
//     setIsLoading(true);
//     const res = await axios.post('/search_concept', { paragraph });
//     console.log(res?.data);
//     setBriefSummary(res?.data?.data);
//     setActiveTopic(res?.data?.data?.topics?.[0]?.name);
//     setFunLinks(res?.data?.metaphorResults);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     setIsLoading(false);
//   }
// };

// const deepdiveIntoTopic = async (topic, activeTopic) => {
//   try {
//     console.log('Sent deepdive to DB');
//     setIsLoading(true);
//     const res = await axios.post('/deepdive_topic', { topic, activeTopic });
//     console.log(res?.data?.choices?.[0]?.message?.content);
//     setDeepdiveData(JSON.parse(res?.data?.choices?.[0]?.message?.content));
//     navigate('/topic-deepdive');
//   } catch (error) {
//     console.log(error);
//   } finally {
//     setIsLoading(false);
//   }
// };

// const quizAboutTopic = async (topic, activeTopic) => {
//   try {
//     console.log('Sent deepdive to DB');
//     setIsLoading(true);
//     const res = await axios.post('/quiz_topic', { topic, activeTopic });
//     console.log(res?.data?.choices?.[0]?.message?.content);
//     setQuizData(JSON.parse(res?.data?.choices?.[0]?.message?.content));
//     navigate('/topic-quiz');
//   } catch (error) {
//     console.log(error);
//   } finally {
//     setIsLoading(false);
//   }
// };

// useEffect(() => {
//   const getRecentTopics = async () => {
//     try {
//       const res = await axios.get('/recent_topics');
//       setRecentTopics(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   getRecentTopics();
// }, []);

// const getKeywords = async (paragraph) => {
//   try {
//     const res = await axios.post('/extract_keywords', { paragraph });
//     console.log(res.data);
//   } catch (error) {
//     console.log(error);
//   }
// };
