const express = require('express');
const router = express.Router();
const OpenAIClient = require('../utils/openaiClient');
const { relevantQuestionsSchema } = require('../models/responseSchemas');

router.post('/', async (req, res) => {
  try {
    const { paragraph } = req.body;
    const relevantQuestionsSchemaString = JSON.stringify(
      relevantQuestionsSchema
    );
    const responses = [
      {
        role: 'system',
        content:
          'Your response should be in JSON format. Return two thought-provoking questions directly related to the topic of the provided paragraph, allowing for a deeper exploration.',
      },
      {
        role: 'user',
        content: `The topic is ${paragraph}. Use the following schema for your response: ${relevantQuestionsSchemaString}`,
      },
    ];
    let openAIResponse = await OpenAIClient.generateResponse(responses);
    const finalResponse = JSON.parse(
      openAIResponse.choices[0].message.content
    ).questions;
    console.log('FINAL RESPONSE', finalResponse);

    res.json(finalResponse);
  } catch (error) {
    console.log('ERROR GENERATING QUESTIONS', error);
  }
});

module.exports = router;
