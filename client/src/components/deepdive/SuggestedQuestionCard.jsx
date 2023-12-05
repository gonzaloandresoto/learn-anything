import React from 'react';
import Search from '../../assets/search.svg';

function SuggestedQuestionCard({ question }) {
  return (
    <div className='w-max h-[56px] bg-white rounded-full shadow-sm'>
      <button className='w-max h-full flex items-center gap-3 px-8'>
        <img
          src={Search}
          className='w-[16px] h-[16px]'
        />
        <p className='text-lg text-primary-black font-medium'>{question}</p>
      </button>
    </div>
  );
}

export default SuggestedQuestionCard;
