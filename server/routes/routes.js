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

router.use('/search_concept', searchConcept);
router.use('/quiz_topic', quizTopic);
router.use('/deepdive_topic', deepdiveTopic);
router.use('/recent_topics', recentTopics);
router.use('/create_course', createCourse);
router.use('/relevant_questions', relevantQuestions);
router.use('/add_slide', addSlide);
router.use('/update_course_data', updateCourseData);

module.exports = router;
