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
require('dotenv').config();
const {
  briefSummarySchema,
  quizSchema,
  deepdiveSchema,
} = require('./responseSchemas');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const METAPHOR_API_KEY = process.env.METAPHOR_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const COHERE_KEY = process.env.COHERE_KEY;
const PORT = process.env.PORT || 8000;

// Allowing repsonse from localhost:3000 and Vercel deployment
const whitelist = [
  'http://localhost:3000',
  'https://learn-anything-five.vercel.app/',
];

// Currently blocking server-to-server requests and REST tools
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get('/favicon.ico', (req, res) => res.status(204).end());

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// const cohere = new CohereClient({
//   token: COHERE_KEY,
// });

const metaphorSearch = async (searchQuery) => {
  try {
    console.log('USING METAPHOR SEARCH');
    sdk.auth(METAPHOR_API_KEY);
    const relevantArticles = await sdk.search({
      query: searchQuery,
      numResults: 5,
      useAutoprompt: true,
    });
    return relevantArticles.data.results;
  } catch (error) {
    console.log('METAPHOR ERROR', error);
  } finally {
    console.log('✅ DONE WITH METAPHOR SEARCH ✅');
  }
};

const saveSummarySupabase = async (topic, summary) => {
  try {
    console.log('ADDING SUMMARY TO SUPABASE');
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
  } finally {
    console.log('✅ ULOADED SUMMARY TO SUPABASE ✅');
  }
};

app.post('/search_concept', async (req, res) => {
  try {
    console.log('GETTING SUMMARY');
    const { topic } = req.body;
    const briefSummarySchemaString = JSON.stringify(briefSummarySchema);
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
          `. Use the following schema for your response: ${briefSummarySchemaString}`,
      },
    ];
    let openAIResponse = await openai.chat.completions.create({
      messages: responses,
      model: 'gpt-3.5-turbo-1106',
      response_format: { type: 'json_object' },
    });
    // console.log(openAIResponse.choices[0].message.content);
    const searchQuery = JSON.parse(
      openAIResponse.choices[0].message.content
    ).search_query;

    let metaphorResults = null;
    if (searchQuery) {
      metaphorResults = metaphorSearch(searchQuery);
    }

    openAIResponse.metaphorResults = metaphorResults;

    if (openAIResponse) {
      saveSummarySupabase(openAIResponse);
    }

    res.json(openAIResponse);
  } catch (error) {
    console.log('OPENAI ERROR', error);
  } finally {
    console.log('✅ DONE WITH SUMMARY ✅');
  }
});

app.post('/quiz_topic', async (req, res) => {
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

    let openAIResponse = await openai.chat.completions.create({
      messages: responses,
      model: 'gpt-3.5-turbo-1106',
      response_format: { type: 'json_object' },
    });
    res.json(openAIResponse);
  } catch (error) {
    console.log('OPENAI ERROR', error);
  } finally {
    console.log('✅ DONE WITH OPEN AI QUIZ ✅');
  }
});

app.post('/deepdive_topic', async (req, res) => {
  try {
    console.log('GETTING DEEPDIVE');
    const { topic, activeTopic } = req.body;
    const deepdiveSchemaString = JSON.stringify(deepdiveSchema);
    const responses = [
      {
        role: 'system',
        content:
          'Your response should be in JSON format. You are a successful textbook author and blogger. Create a document that covers the sibtoopic with respect to the actove topic given to you. Write a detailed overview, outline TWO sections within it, and write a conclusion. Within each section, write a title, description, and subsections. Within each subsection, write a title and content.',
      },
      {
        role: 'user',
        content: `I want to do a deepdive about this subtopic: ${activeTopic} with respect to this topic: ${topic}. Use the following schema for your response: ${deepdiveSchemaString}`,
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
    console.log('GETTING RECENT TOPICS');
    const { data, error } = await supabase
      .from('topics')
      .select('topic_contents, fun_links')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.log('SUPABASE ERROR', error);
  } finally {
    console.log('✅ DONE GETTING TOPICS FROM SUPABASE ✅');
  }
});

// app.post('/extract_keywords', async (req, res) => {
//   try {
//     console.log('Getting keywords from Cohere');
//     const { paragraph } = req.body;
//     const cohereResponse = await cohere.generate({
//       prompt: `Extract the keywords from the following paragraph and return them in an array format: ${paragraph}`,
//     });
//     console.log('COHERE RESPONSE', cohereResponse);
//     res.json(cohereResponse);
//   } catch (error) {
//     console.log('COHERE ERROR', error);
//   }
//   console.log('✅ DONE WITH COHERE ✅');
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
