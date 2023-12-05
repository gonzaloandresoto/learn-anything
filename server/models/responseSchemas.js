const briefSummarySchema = {
  title: '',
  summary: '',
  topics: [
    { name: '', summary: '' },
    { name: '', summary: '' },
    { name: '', summary: '' },
    { name: '', summary: '' },
  ],
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

const learningPlanSchema = [
  {
    step: '1',
    concept: '',
    summary: '',
  },
  {
    step: '2',
    concept: '',
    summary: '',
  },
  {
    step: '3',
    concept: '',
    summary: '',
  },
  {
    step: '4',
    concept: '',
    summary: '',
  },
  {
    step: '5',
    concept: '',
    summary: '',
  },
];

const courseSchema = {
  title: '',
  summary: '',
  topics: [
    {
      unit: '',
      summary: '',
      sections: [
        { title: '', content: '' },
        { title: '', content: '' },
        { title: '', content: '' },
      ],
    },
    {
      unit: '',
      summary: '',
      sections: [
        { title: '', content: '' },
        { title: '', content: '' },
        { title: '', content: '' },
      ],
    },
    {
      unit: '',
      summary: '',
      sections: [
        { title: '', content: '' },
        { title: '', content: '' },
        { title: '', content: '' },
      ],
    },
  ],
};

const keyTermsSchema = [
  { term: '', definition: '' },
  { term: '', definition: '' },
  { term: '', definition: '' },
  { term: '', definition: '' },
  { term: '', definition: '' },
  { term: '', definition: '' },
];

const suggestedQuestionsSchema = [
  { question: '' },
  { question: '' },
  { question: '' },
  { question: '' },
];

module.exports = {
  briefSummarySchema,
  quizSchema,
  deepdiveSchema,
  learningPlanSchema,
  courseSchema,
  keyTermsSchema,
  suggestedQuestionsSchema,
};
