const express = require('express');
const router = express.Router();
const OpenAIClient = require('../utils/openaiClient');

router.post('/', async (req, res) => {
  try {
    console.log('GETTING CHAT RESPONSE');
    const { conversation } = req.body;
    const openAIResponse = await OpenAIClient.generateTextResponse(
      conversation
    );
    console.log(openAIResponse?.choices[0]?.message?.content);
    res.send(openAIResponse?.choices[0]?.message?.content);
  } catch (error) {
    console.log('ERROR GETTING CHAT RESPONSE', error);
  } finally {
    console.log('✅ GOT CHAT RESPONSE ✅');
  }
});

module.exports = router;
