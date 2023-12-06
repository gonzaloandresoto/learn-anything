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
  const title = openAIResponse.main.title;
  const summary = openAIResponse.main.summary;
  const body = openAIResponse.main.topics;
  const keyTerms = openAIResponse.keyTerms;
  const suggestedQuestions = openAIResponse.suggestedQuestions;
  try {
    console.log('ADDING SUMMARY TO SUPABASE');
    const { data, error } = await supabase
      .from('courses')
      .insert({
        title: title,
        summary: summary,
        topics: body,
        key_terms: keyTerms,
        suggested_questions: suggestedQuestions,
      })
      .select('*');

    if (error) throw error;

    console.log('SUPABASE ID', data[0].id);
    const supabaseId = data[0].id;
    return supabaseId;
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
          'Your response should be in JSON format. Design a summary document consisting of multiple units on a chosen topic. Each unit should include a unit name and a detailed explanation written in the style of Duolingo and using simple language. The explanation should be comprehensive, divided into two paragraphs. Assign the type parent to each unit.',
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
          'Your response should be in JSON format. You are to take the given topic, and generate six key terms along with their definitions. I will not accept less than six.',
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

    console.log(
      'SUGGESTED QUESTIONS RESPONSE',
      suggestedQuestionsResponse.choices[0].message.content
    );

    openAIResponse.suggestedQuestions = JSON.parse(
      suggestedQuestionsResponse.choices[0].message.content
    ).questions;

    let courseId = null;
    if (openAIResponse) {
      courseId = await saveSummarySupabase(openAIResponse);
    }

    openAIResponse.Id = courseId;
    res.json(openAIResponse);
  } catch (error) {
    console.log('Error with /create_course', error);
  } finally {
    console.log('✅ ULOADED COURSE TO SUPABASE ✅');
  }
});

module.exports = router;
