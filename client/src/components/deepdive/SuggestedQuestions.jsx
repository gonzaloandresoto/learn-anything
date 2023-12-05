import React from 'react';
import SuggestedQuestionCard from './SuggestedQuestionCard';
import useTopicContext from '../../useTopicContext';

function SuggestedQuestions() {
  const { suggestedQuestions } = useTopicContext();
  return (
    <div className='w-full h-max flex flex-col gap-4 bg-secondary-tan'>
      <p className='text-2xl text-primary-tan font-bold'>Suggested Questions</p>
      <div className='flex flex-col gap-2'>
        {suggestedQuestions &&
          suggestedQuestions?.map((question, index) => (
            <SuggestedQuestionCard
              key={index}
              question={question.question}
            />
          ))}
      </div>
    </div>
  );
}

export default SuggestedQuestions;
