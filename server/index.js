const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const querystring = require('querystring');
const OpenAI = require('openai');
const axios = require('axios');
const sdk = require('api')('@metaphorapi/v1.0#a4v1t517lp7k31vq');

const corsOptions = {
  origin: true,
  credentials: true,
};

const { OPENAI_API_KEY, METAPHOR_API_KEY } = require('./keys');
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
          'Your response should be in JSON format. Write a very short 3 sentence summary on the topic given to you. After, list the 4 main concepts/aspects to learn about the given topic and summarize the details relevant to them in 5 sentences. Finally, write a google search query to help find the most relevant information this topic for further reading.',
      },
      {
        role: 'user',
        content:
          'I want to learn about ' +
          topic +
          '. Use the following schema for your response: { "summary": "", "topics": [name: "", summary: ""], [name: "", summary: ""], [name: "", summary: ""], [name: "", summary: ""], "search_query": ""  }',
      },
    ];
    let openAIResponse = await openai.chat.completions.create({
      messages: responses,
      model: 'gpt-3.5-turbo-1106',
      response_format: { type: 'json_object' },
    });
    // console.log(openAIResponse.choices[0].message.content);
    let metaphorResults = null;
    const searchQuery = JSON.parse(
      openAIResponse.choices[0].message.content
    ).search_query;

    console.log('SEARCH QUERY', searchQuery);
    if (searchQuery) {
      console.log('Using Metaphor to search:', searchQuery);
      try {
        sdk.auth(METAPHOR_API_KEY);
        const relevantArticles = await sdk.search({
          query: searchQuery,
          numResults: 5,
          useAutoprompt: true,
        });
        console.log('Retrieved these articles from Metaphor', relevantArticles);
        metaphorResults = relevantArticles.data.results;
      } catch (error) {
        console.log('METAPHOR ERROR', error);
      }
    }
    openAIResponse.metaphorResults = metaphorResults;
    console.log('OPEN AI RESPONSE', openAIResponse);
    res.json(openAIResponse);
  } catch (error) {
    console.log('OPENAI ERROR', error);
  }
  console.log('✅ DONE WITH OPEN AI #1 ✅');
});

app.listen(8000, () => console.log('Server running on port 8000'));