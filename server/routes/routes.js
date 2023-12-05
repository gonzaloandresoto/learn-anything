const express = require('express');
const router = express.Router();

const searchConcept = require('./searchConcept');
const quizTopic = require('./quizTopic');
const deepdiveTopic = require('./deepdiveTopic');
const recentTopics = require('./recentTopics');

router.use('/search_concept', searchConcept);
router.use('/quiz_topic', quizTopic);
router.use('/deepdive_topic', deepdiveTopic);
router.use('/recent_topics', recentTopics);
router.use('/create_course', require('./createCourse'));

module.exports = router;
