const express = require('express');
const router = express.Router();
const OpenAIClient = require('../utils/openaiClient');
const { deepdiveSchema } = require('../models/responseSchemas');

router.post('/', async (req, res) => {
  try {
    console.log('GETTING DEEPDIVE');
    const { topic, activeTopic } = req.body;
    const deepdiveSchemaString = JSON.stringify(deepdiveSchema);
    const responses = [
      {
        role: 'system',
        content:
          'Your response should be in JSON format. You are a successful textbook author and blogger. Create a document that covers the topic. Write a detailed overview, outline TWO sections within it, and write a conclusion. Within each section, write a title, description, and outline subsections about the given topic. Within each subsection, write a title and body explaining the subsection topic.',
      },
      {
        role: 'user',
        content: `I want to do a deepdive about this subtopic: ${activeTopic} with respect to this topic: ${topic}. Use the following schema for your response: ${deepdiveSchemaString}`,
      },
    ];

    let openAIResponse = await OpenAIClient.generateResponse(responses);

    res.json(openAIResponse);
  } catch (error) {
    console.log('OPENAI ERROR', error);
  }
  console.log('✅ DONE WITH OPEN AI DEEPDIVE ✅');
});

module.exports = router;
