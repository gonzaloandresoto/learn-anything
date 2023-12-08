import React from 'react';

// Context
import useTopicContext from '../../../hooks/useTopicContext';

// Components
import SuggestedQuestionCard from './SuggestedQuestionCard';

function SuggestedQuestions() {
  const { suggestedQuestions } = useTopicContext();
  return (
    <div className='w-full h-max flex flex-col gap-4 bg-tertiary-tan'>
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
