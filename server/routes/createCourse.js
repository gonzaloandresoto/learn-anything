const express = require('express');
const router = express.Router();
const supabase = require('../utils/supabaseClient');
const OpenAIClient = require('../utils/openaiClient');
const {
  courseSchema,
  keyTermsSchema,
  suggestedQuestionsSchema,
} = require('../models/responseSchemas');

const saveSummarySupabase = async (openAIResponse) => {
  try {
    console.log('ADDING SUMMARY TO SUPABASE');
    const { data, error } = await supabase
      .from('topics')
      .insert({
        topic_contents: openAIResponse,
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
    console.log('GETTING COURSE');
    const { topic } = req.body;
    const courseSchemaString = JSON.stringify(courseSchema);
    const responses = [
      {
        role: 'system',
        content:
          'Your response should be in JSON format. You are to create a course with multiple units on the given topic. Each unit will have a unit name, one sentence introduction, as well as a detailed explanantion on the unit with respect to the overall topic. This explanantion should be thorough and separated into two paragrpahs. The format and tone of the content is of the likes of Duolingo.',
      },
      {
        role: 'user',
        content:
          'I want to learn about ' +
          topic +
          `. Use the following schema for your response: ${courseSchemaString}`,
      },
    ];

    let courseResponse = await OpenAIClient.generateResponse(responses);

    const actualResponse = JSON.parse(
      courseResponse.choices[0].message.content
    );

    let openAIResponse = {};
    openAIResponse.main = actualResponse;

    const keyTermsSchemaString = JSON.stringify(keyTermsSchema);
    const keyTermsMessages = [
      {
        role: 'system',
        content:
          'Your response should be in JSON format. You are to take the given topic, and generate six key terms and definitions for it.',
      },
      {
        role: 'user',
        content:
          'The topic is ' +
          topic +
          `. Use the following schema for your response: ${keyTermsSchemaString}`,
      },
    ];

    let keyTermsResponse = await OpenAIClient.generateResponse(
      keyTermsMessages
    );

    console.log(
      'KEY TERMS RESPONSE',
      keyTermsResponse.choices[0].message.content
    );

    openAIResponse.keyTerms = JSON.parse(
      keyTermsResponse.choices[0].message.content
    ).terms;

    const suggestedQuestionsSchemaString = JSON.stringify(
      suggestedQuestionsSchema
    );

    const suggestedQuestionsMessages = [
      {
        role: 'system',
        content: `'Your response should be in JSON format. You are to take the given topic, and generate four questions a student could as a tutor of ${topic} to further understand it.`,
      },
      {
        role: 'user',
        content:
          'The topic is ' +
          topic +
          `. Use the following schema for your response: ${suggestedQuestionsSchemaString}`,
      },
    ];

    let suggestedQuestionsResponse = await OpenAIClient.generateResponse(
      suggestedQuestionsMessages
    );

    openAIResponse.suggestedQuestions = JSON.parse(
      suggestedQuestionsResponse.choices[0].message.content
    ).questions;

    if (openAIResponse) {
      await saveSummarySupabase(openAIResponse);
    }

    res.json(openAIResponse);
  } catch (error) {
    console.log('Error with /create_course', error);
  } finally {
    console.log('✅ ULOADED COURSE TO SUPABASE ✅');
  }
});

module.exports = router;
