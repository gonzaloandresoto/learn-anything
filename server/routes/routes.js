const express = require('express');
const router = express.Router();

const searchConcept = require('./searchConcept');
const quizTopic = require('./quizTopic');
const deepdiveTopic = require('./deepdiveTopic');
const recentTopics = require('./recentTopics');
const createCourse = require('./createCourse');
const relevantQuestions = require('./relevantQuestions');
const addSlide = require('./addSlide');
const updateCourseData = require('./updateCourseData');
const authentication = require('./authentication');
const userCourses = require('./userCourses');
const chatCourse = require('./chatCourse');

router.use('/search_concept', searchConcept);
router.use('/quiz_topic', quizTopic);
router.use('/deepdive_topic', deepdiveTopic);
router.use('/recent_topics', recentTopics);
router.use('/create_course', createCourse);
router.use('/relevant_questions', relevantQuestions);
router.use('/add_slide', addSlide);
router.use('/update_course_data', updateCourseData);
router.use('/authentication', authentication);
router.use('/user_courses', userCourses);
router.use('/chat_course', chatCourse);

module.exports = router;
