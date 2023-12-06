import React from 'react';
import useTopicContext from '../../useTopicContext';

function AddSlideQuestion({ question, setShowQuestions }) {
  const { addSlide } = useTopicContext();

  const handleClick = () => {
    addSlide(question.question);
    setShowQuestions(false);
  };

  return (
    <button
      onClick={handleClick}
      className='w-max px-4 py-2 bg-primary-tan rounded-lg'
    >
      <p className='max-w-[720px] text-secondary-tan text-sm font-medium text-right'>
        {question.question}
      </p>
    </button>
  );
}

export default AddSlideQuestion;
