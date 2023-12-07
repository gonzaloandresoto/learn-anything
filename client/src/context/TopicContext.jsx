import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthContext from '../hooks/useAuthContext';

// axios.defaults.baseURL = 'https://learn-anything-b61f2394c70a.herokuapp.com/';
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

const TopicContext = createContext({});

export const TopicProvider = ({ children }) => {
  const { user } = useAuthContext();

  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [keyTerms, setKeyTerms] = useState(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState(null);
  const [relevantQuestions, setRelevantQuestions] = useState(null);
  const [addedSlide, setAddedSlide] = useState(null);
  const [indexBeforeAdd, setIndexBeforeAdd] = useState(null);
  const [showSidesheet, setShowSidesheet] = useState(false);
  const [activeCourseId, setCourseTopicId] = useState(null);
  const [userCourses, setUserCourses] = useState(null);
  const [focusedSlide, setFocusedSlide] = useState(null);
  const [courseConversation, setCourseConversation] = useState(null);

  const navigate = useNavigate();

  const createCourse = async (topic) => {
    try {
      setIsLoading(true);
      console.log('Sent course to DB');
      const res = await axios.post('/create_course', {
        topic,
        userId: user?.id,
      });
      console.log(res?.data);
      setCourseData(res?.data?.main);
      setKeyTerms(res?.data?.keyTerms);
      setSuggestedQuestions(res?.data?.suggestedQuestions);
      setCourseTopicId(res?.data?.Id);
      setIsLoading(false);
      navigate('/deepdive');
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
        console.log('Updated course data:', {
          courseData,
          topics: updatedTopics,
        });
        console.log('recent course id:', activeCourseId);
        updateCourseData(activeCourseId, {
          ...courseData,
          topics: updatedTopics,
        });
      }
    } catch (error) {
      console.log('Error adding slide:', error);
    }
  };

  const updateCourseData = async (courseId, courseData) => {
    try {
      console.log('Sent updated course data to DB');
      const res = await axios.post('/update_course_data', {
        courseId,
        courseData,
      });
    } catch (error) {
      console.log('Error updating course data:', error);
    }
  };

  useEffect(() => {
    const getUserCourses = async () => {
      try {
        console.log('Sent request for user courses to DB');

        const res = await axios.post('/user_courses', { userId: user?.id });

        console.log(res?.data);
        setUserCourses(res?.data);
      } catch (error) {
        console.log('Error getting user courses:', error);
      }
    };

    getUserCourses();
  }, [user?.id]);

  const makeActiveCourse = (course) => {
    console.log('Making course active', course);
    console.log('course.main', course.main);
    console.log('course?.key_terms', course?.keyTerms);
    setCourseData(course.main);
    setKeyTerms(course?.keyTerms);
    setSuggestedQuestions(course?.suggestedQuestions);
    setCourseTopicId(course?.Id);
    navigate('/deep-dive');
  };

  const sendConversationMessage = async (message) => {
    try {
      const userMessage = { role: 'user', content: message };
      const newConversation = [...courseConversation, userMessage];

      setCourseConversation(newConversation);
      const res = await axios.post('/chat_course', {
        conversation: newConversation,
      });

      const assistantMessage = { role: 'assistant', content: res?.data };
      setCourseConversation((prevConversation) => [
        ...prevConversation,
        assistantMessage,
      ]);
    } catch (error) {
      console.log('Error sending message:', error);
    }
  };

  useEffect(() => {
    setCourseConversation([
      {
        role: 'system',
        content: `You are an expert in ${courseData?.title}. You are here to help the user learn about the topic they are interested in. Do not answer unrelated questions.`,
      },
    ]);
  }, [courseData]);

  return (
    <TopicContext.Provider
      value={{
        topic,
        setTopic,
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
        activeCourseId,
        setCourseTopicId,
        userCourses,
        makeActiveCourse,
        focusedSlide,
        setFocusedSlide,
        courseConversation,
        setCourseConversation,
        sendConversationMessage,
      }}
    >
      {children}
    </TopicContext.Provider>
  );
};

export default TopicContext;
