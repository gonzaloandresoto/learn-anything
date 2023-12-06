const express = require('express');
const router = express.Router();
const OpenAIClient = require('../utils/openaiClient');
const { newSlideSchema } = require('../models/responseSchemas');

router.post('/', async (req, res) => {
  try {
    const { question } = req.body;
    const newSlideSchemaString = JSON.stringify(newSlideSchema);
    const responses = [
      {
        role: 'system',
        content:
          'Your response should be in JSON format. Using the question as the topic, return an informative slide with a short unit title and indepth content split into two very short and concise paragraphs about the unit in the style of duolingo. Assign the type child to the unit.',
      },
      {
        role: 'user',
        content: `The question is ${question}. Use the following schema for your response: ${newSlideSchemaString}`,
      },
    ];
    let openAIResponse = await OpenAIClient.generateResponse(responses);

    const finalResponse = JSON.parse(openAIResponse.choices[0].message.content);

    console.log('FINAL RESPONSE', finalResponse);
    res.json(finalResponse);
  } catch (error) {
    console.log('ERROR GENERATING QUESTIONS', error);
  }
});

module.exports = router;
