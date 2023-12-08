import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosConfig';

// Contexts
import useAuthContext from '../hooks/useAuthContext';

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
      const res = await axiosInstance.post('/create_course', {
        topic,
        userId: user?.id,
      });
      setCourseData(res?.data?.main);
      setKeyTerms(res?.data?.keyTerms);
      setSuggestedQuestions(res?.data?.suggestedQuestions);
      setCourseTopicId(res?.data?.Id);
      setIsLoading(false);
      navigate('/course');
    } catch (error) {
      console.log('Error creating course:', error);
    }
  };

  const getRelevantQuestions = async (paragraph) => {
    try {
      const res = await axiosInstance.post('/relevant_questions', {
        paragraph,
      });
      setRelevantQuestions(res?.data);
    } catch (error) {
      console.log('Error getting relevant questions:', error);
    }
  };

  const addSlide = async (question) => {
    try {
      const res = await axiosInstance.post('/add_slide', { question });
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

  const updateCourseData = async (courseId, courseData) => {
    try {
      const res = await axiosInstance.post('/update_course_data', {
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
        const res = await axiosInstance.post('/user_courses', {
          userId: user?.id,
        });
        setUserCourses(res?.data);
      } catch (error) {
        console.log('Error getting user courses:', error);
      }
    };

    getUserCourses();
  }, [user?.id]);

  const makeActiveCourse = (course) => {
    setCourseData(course.main);
    setKeyTerms(course?.keyTerms);
    setSuggestedQuestions(course?.suggestedQuestions);
    setCourseTopicId(course?.Id);
    navigate('/course');
  };

  const sendConversationMessage = async (message) => {
    try {
      const userMessage = { role: 'user', content: message };
      const newConversation = [...courseConversation, userMessage];

      setCourseConversation(newConversation);
      const res = await axiosInstance.post('/chat_course', {
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
