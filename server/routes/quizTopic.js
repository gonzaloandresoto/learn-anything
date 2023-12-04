const express = require('express');
const router = express.Router();
const OpenAIClient = require('../utils/openaiClient');
const { quizSchema } = require('../models/responseSchemas');

router.post('/', async (req, res) => {
  try {
    console.log('GETTING QUIZ');
    const { topic, activeTopic } = req.body;
    const quizSchemaString = JSON.stringify(quizSchema);
    const responses = [
      {
        role: 'system',
        content:
          'Your response should be in JSON format. Create a quiz with 5 questions and answers relevant to the topic given to you. The questions should be multiple choice and the answers should have a correct choice.',
      },
      {
        role: 'user',
        content: `I want to learn about ${activeTopic} with respect to ${topic}. Don't be general, focus on the subject of the topic. Use the following schema for your response: ${quizSchemaString}`,
      },
    ];

    let openAIResponse = await OpenAIClient.generateResponse(responses);

    res.json(openAIResponse);
  } catch (error) {
    console.log('OPENAI ERROR', error);
  } finally {
    console.log('✅ DONE WITH OPEN AI QUIZ ✅');
  }
});

module.exports = router;
