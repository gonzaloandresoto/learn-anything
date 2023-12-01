const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const querystring = require('querystring');
const OpenAI = require('openai');
const axios = require('axios');
const sdk = require('api')('@metaphorapi/v1.0#a4v1t517lp7k31vq');
const { CohereClient } = require('cohere-ai');
const { log } = require('console');
console.log('LIVE');
require('dotenv').config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const METAPHOR_API_KEY = process.env.METAPHOR_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const COHERE_KEY = process.env.COHERE_KEY;
const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const cohere = new CohereClient({
  token: COHERE_KEY,
});

app.post('/search_concept', async (req, res) => {
  console.log('Getting concept from OpenAI');
  try {
    const { topic } = req.body;
    console.log('TOPIC', topic);
    const responses = [
      {
        role: 'system',
        content:
          'Your response should be in JSON format. Write a concise 6 sentence summary on the topic given to you. After, list the 4 main concepts/aspects to learn about the given topic and summarize the details relevant to them in 8 sentences. Finally, write a google search query to help find the most relevant information this topic for further reading.',
      },
      {
        role: 'user',
        content:
          'I want to learn about ' +
          topic +
          '. Use the following schema for your response: { "title": "", "summary": "", "topics": [name: "", summary: ""], [name: "", summary: ""], [name: "", summary: ""], [name: "", summary: ""], "search_query": ""  }',
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

    if (openAIResponse) {
      try {
        console.log('Adding topic to Supabase');
        const { data, error } = await supabase
          .from('topics')
          .insert({
            topic_contents: openAIResponse.choices[0].message.content,
            fun_links: openAIResponse.metaphorResults,
          })
          .select('*');

        if (error) throw error;
      } catch (error) {
        console.log('SUPABASE ERROR', error);
      }
    }
    res.json(openAIResponse);
  } catch (error) {
    console.log('OPENAI ERROR', error);
  }
  console.log('✅ DONE WITH OPEN AI #1 ✅');
});

app.post('/quiz_topic', async (req, res) => {
  try {
    console.log('Getting quiz from OpenAI');
    const { topic, activeTopic } = req.body;
    const responses = [
      {
        role: 'system',
        content:
          'Your response should be in JSON format. Create a quiz with 5 questions and answers relevant to the topic given to you. The questions should be multiple choice and the answers should have a correct choice.',
      },
      {
        role: 'user',
        content: `I want to learn about ${activeTopic} with respect to ${topic}. Don't be general, focus on the subject of the topic. Use the following schema for your response: {
              "quiz_title": "",
              "questions": [
                {
                  "question": "",
                  id: "",
                  "options": [
                    { "id": "", "text": "" },
                    { "id": "", "text": "" },
                    { "id": "", "text": "" }
                  ],
                  "correctAnswer": ""
                },
                {
                  "question": "",
                  id: "",
                  "options": [
                    { "id": "", "text": "" },
                    { "id": "", "text": "" },
                    { "id": "", "text": "" }
                  ],
                  "correctAnswer": ""
                },
                {
                  "question": "",
                  id: "",
                  "options": [
                    { "id": "", "text": "" },
                    { "id": "", "text": "" },
                    { "id": "", "text": "" }
                  ],
                  "correctAnswer": ""
                },
                {
                  "question": "",
                  id: "",
                  "options": [
                    { "id": "", "text": "" },
                    { "id": "", "text": "" },
                    { "id": "", "text": "" }
                  ],
                  "correctAnswer": ""
                },
                {
                  "question": "",
                  id: "",
                  "options": [
                    { "id": "", "text": "" },
                    { "id": "", "text": "" },
                    { "id": "", "text": "" }
                  ],
                  "correctAnswer": ""
                }
              ]
            }`,
      },
    ];
    let openAIResponse = await openai.chat.completions.create({
      messages: responses,
      model: 'gpt-3.5-turbo-1106',
      response_format: { type: 'json_object' },
    });
    console.log(openAIResponse.choices[0].message.content);
    res.json(openAIResponse);
  } catch (error) {
    console.log('OPENAI ERROR', error);
  }
  console.log('✅ DONE WITH OPEN AI QUIZ ✅');
});

app.post('/deepdive_topic', async (req, res) => {
  try {
    console.log('Getting quiz from OpenAI');
    const { topic, activeTopic } = req.body;
    const responses = [
      {
        role: 'system',
        content:
          'Your response should be in JSON format. You are a successful textbook author and blogger. Create a document that covers the topic given to you. Write a detailed overview, outline sections within it, and write a conclusion. Within each section, write a title, description, and subsections. Within each subsection, write a title and content.',
      },
      {
        role: 'user',
        content: `I want to do a deepdive about ${activeTopic} , ${topic}. Use the following schema for your response: {
          "topic": "",
          "overview": "",
          "sections": [
            {
              "title": "",
              "description": "",
              "subsections": [
                {
                  "subTitle": "",
                  "content": ""
                },
                {
                  "subTitle": "",
                  "content": ""
                },
                {
                  "subTitle": "",
                  "content": ""
                }
              ]
            },
            {
              "title": "",
              "description": "",
              "subsections": [
                {
                  "subTitle": "",
                  "content": ""
                },
                {
                  "subTitle": "",
                  "content": ""
                },
                {
                  "subTitle": "",
                  "content": ""
                }
              ]
            }
          ],
          "conclusion": ""
        }`,
      },
    ];
    let openAIResponse = await openai.chat.completions.create({
      messages: responses,
      model: 'gpt-3.5-turbo-1106',
      response_format: { type: 'json_object' },
    });
    console.log(openAIResponse.choices[0].message.content);
    res.json(openAIResponse);
  } catch (error) {
    console.log('OPENAI ERROR', error);
  }
  console.log('✅ DONE WITH OPEN AI DEEPDIVE ✅');
});

app.post('/recent_topics', async (req, res) => {
  try {
    console.log('Getting recent topics from Supabase');
    const { data, error } = await supabase
      .from('topics')
      .select('topic_contents, fun_links')
      .order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.log('SUPABASE ERROR', error);
  }
  console.log('✅ DONE GETTING TOPICS FROM SUPABASE ✅');
});

app.post('/extract_keywords', async (req, res) => {
  try {
    console.log('Getting keywords from Cohere');
    const { paragraph } = req.body;
    const cohereResponse = await cohere.generate({
      prompt: `Extract the keywords from the following paragraph and return them in an array format: ${paragraph}`,
    });
    console.log('COHERE RESPONSE', cohereResponse);
    res.json(cohereResponse);
  } catch (error) {
    console.log('COHERE ERROR', error);
  }
  console.log('✅ DONE WITH COHERE ✅');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
