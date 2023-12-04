const express = require('express');
const router = express.Router();
const OpenAIClient = require('../utils/openaiClient');
const MetaphorClient = require('../utils/metaphorClient');
const supabase = require('../utils/supabaseClient');
const { briefSummarySchema } = require('../models/responseSchemas');
const {
  uploadThumbnailSupabase,
  generateThumbnail,
  addThumbnailsToResponse,
} = require('../utils/thumbnailFunctions');

const saveSummarySupabase = async (openAIResponse) => {
  return null;
  try {
    console.log('ADDING SUMMARY TO SUPABASE');
    const { data, error } = await supabase
      .from('topics')
      .insert({
        topic_contents: openAIResponse.data,
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

router.post('/', async (req, res) => {
  try {
    console.log('GETTING SUMMARY');
    const { topic } = req.body;
    const briefSummarySchemaString = JSON.stringify(briefSummarySchema);
    const responses = [
      {
        role: 'system',
        content:
          'Your response should be in JSON format. Write a concise summary on the topic given to you. After, list the 4 main concepts/aspects to learn about the given topic and concisely summarize the details relevant to them.',
      },
      {
        role: 'user',
        content:
          'I want to learn about ' +
          topic +
          `. Use the following schema for your response: ${briefSummarySchemaString}`,
      },
    ];
    let briefSummaryResponse = await OpenAIClient.generateResponse(responses);

    const straightResponse = briefSummaryResponse.choices[0].message.content;

    let openAIResponse = {};
    openAIResponse.data = await addThumbnailsToResponse(straightResponse);

    const searchQuery = `Here is a great Youtube video explaining ${topic}`;

    let metaphorResults = null;
    if (searchQuery) {
      metaphorResults = await MetaphorClient.search(searchQuery);
    }
    openAIResponse.metaphorResults = metaphorResults;

    if (openAIResponse) {
      await saveSummarySupabase(openAIResponse);
    }

    res.json(openAIResponse);
  } catch (error) {
    console.log('OPENAI ERROR', error);
  } finally {
    console.log('✅ DONE WITH SUMMARY ✅');
  }
});

module.exports = router;
