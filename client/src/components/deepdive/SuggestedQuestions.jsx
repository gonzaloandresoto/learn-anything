import React from 'react';
import SuggestedQuestionCard from './SuggestedQuestionCard';

function SuggestedQuestions() {
  return (
    <div className='w-full h-max flex flex-col gap-4 bg-secondary-tan'>
      <p className='text-2xl text-primary-tan font-bold'>Suggested Questions</p>
      <div className='flex flex-col gap-2'>
        <SuggestedQuestionCard
          question={
            'How do current physics theories, like general relativity, allow for the possibility of time travel?'
          }
        />
        <SuggestedQuestionCard
          question={
            'What are some common misconceptions about time travel depicted in popular media?'
          }
        />
        <SuggestedQuestionCard
          question={
            'What ethical dilemmas arise from the concept of time travel?'
          }
        />
      </div>
    </div>
  );
}

export default SuggestedQuestions;
