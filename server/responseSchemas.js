const briefSummarySchema = {
  title: '',
  summary: '',
  topics: [
    { name: '', summary: '' },
    { name: '', summary: '' },
    { name: '', summary: '' },
    { name: '', summary: '' },
  ],
  search_query: '',
};

const quizSchema = {
  quiz_title: '',
  questions: [
    {
      question: '',
      id: '',
      options: [
        { id: '', text: '' },
        { id: '', text: '' },
        { id: '', text: '' },
      ],
      correctAnswer: '',
    },
    {
      question: '',
      id: '',
      options: [
        { id: '', text: '' },
        { id: '', text: '' },
        { id: '', text: '' },
      ],
      correctAnswer: '',
    },
    {
      question: '',
      id: '',
      options: [
        { id: '', text: '' },
        { id: '', text: '' },
        { id: '', text: '' },
      ],
      correctAnswer: '',
    },
    {
      question: '',
      id: '',
      options: [
        { id: '', text: '' },
        { id: '', text: '' },
        { id: '', text: '' },
      ],
      correctAnswer: '',
    },
    {
      question: '',
      id: '',
      options: [
        { id: '', text: '' },
        { id: '', text: '' },
        { id: '', text: '' },
      ],
      correctAnswer: '',
    },
  ],
};

const deepdiveSchema = {
  topic: '',
  overview: '',
  sections: [
    {
      title: '',
      description: '',
      subsections: [
        {
          subTitle: '',
          content: '',
        },
        {
          subTitle: '',
          content: '',
        },
        {
          subTitle: '',
          content: '',
        },
      ],
    },
    {
      title: '',
      description: '',
      subsections: [
        {
          subTitle: '',
          content: '',
        },
        {
          subTitle: '',
          content: '',
        },
        {
          subTitle: '',
          content: '',
        },
      ],
    },
  ],
  conclusion: '',
};

module.exports = { briefSummarySchema, quizSchema, deepdiveSchema };
