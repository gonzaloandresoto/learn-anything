import React from 'react';

function SuggestedQuestionCard({ question }) {
  return (
    <div className='w-max h-[56px] bg-white rounded-full shadow-sm'>
      <button className='w-max h-full flex items-center gap-4 px-8'>
        <p className='text-lg text-primary-black font-medium'>{question}</p>
      </button>
    </div>
  );
}

export default SuggestedQuestionCard;
