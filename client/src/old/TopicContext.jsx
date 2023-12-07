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
