import React from 'react';

function QuizButton() {
  return (
    <div className='w-[172px] h-[48px] bg-primary-tan rounded-full overflow-hidden'>
      <button className='w-full h-full flex items-center justify-center text-base text-tertiary-tan font-semibold'>
        Quiz me
      </button>
    </div>
  );
}

export default QuizButton;
