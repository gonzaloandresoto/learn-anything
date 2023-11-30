const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const querystring = require('querystring');
const OpenAI = require('openai');
const axios = require('axios');

const corsOptions = {
  origin: true,
  credentials: true,
};

const { OPENAI_API_KEY } = require('./keys');
const { log } = require('console');

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

app.post('/search_concept', async (req, res) => {
  console.log('Getting concept from OpenAI');
  try {
    const { topic } = req.body;
    const responses = [
      {
        role: 'system',
        content:
          'Your response should be in JSON format. Write a very short 3 sentence summary on the topic given to you. After, give the 4 main topics to learn about the topic given to you. After, give a short 3 sentence summary of each topic.',
      },
      {
        role: 'user',
        content:
          'I want to learn about ' +
          topic +
          '. Use the following schema for your response: { "summary": "This is a summary", {"topics": [name: "topic1", summary: "This is a summary of topic1"], [name: "topic2", summary: "This is a summary of topic2"], [name: "topic3", summary: "This is a summary of topic3"], [name: "topic4", summary: "This is a summary of topic4"] }',
      },
    ];
    const openAIResponse = await openai.chat.completions.create({
      messages: responses,
      model: 'gpt-3.5-turbo-1106',
      response_format: { type: 'json_object' },
    });
    console.log(openAIResponse.choices[0].message.content);

    res.json(openAIResponse);
  } catch (error) {
    console.log(error);
  }
  console.log('✅ DONE WITH OPEN AI #1 ✅');
});

app.listen(8000, () => console.log('Server running on port 8000'));
