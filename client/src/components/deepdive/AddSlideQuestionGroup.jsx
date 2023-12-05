import React, { useEffect, useRef } from 'react';
import AddSlideQuestion from './AddSlideQuestion';
import useTopicContext from '../../useTopicContext';

function AddSlideQuestionGroup({ setShowQuestions }) {
  const { relevantQuestions } = useTopicContext();
  const groupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (groupRef.current && !groupRef.current.contains(e.target)) {
        setShowQuestions(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={groupRef}
      className='flex flex-col gap-2 items-end'
    >
      {relevantQuestions &&
        relevantQuestions.map((question, index) => (
          <AddSlideQuestion
            key={index}
            question={question}
          />
        ))}
    </div>
  );
}

export default AddSlideQuestionGroup;
