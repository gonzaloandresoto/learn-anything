import React from 'react';
import useTopicContext from '../../useTopicContext';

function AddSlideQuestion({ question }) {
  const { addSlide } = useTopicContext();

  const handleClick = () => {
    addSlide(question.question);
  };

  return (
    <button
      onClick={handleClick}
      className='w-max px-6 py-2 bg-primary-tan text-secondary-tan text-sm font-medium rounded-full'
    >
      {question.question}
    </button>
  );
}

export default AddSlideQuestion;
