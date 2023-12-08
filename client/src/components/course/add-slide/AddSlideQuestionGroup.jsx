import React, { useEffect, useRef } from 'react';
import AddSlideQuestion from './AddSlideQuestion';
import useTopicContext from '../../../hooks/useTopicContext';

function AddSlideQuestionGroup({ setShowQuestions }) {
  const { relevantQuestions, setRelevantQuestions } = useTopicContext();
  const groupRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (groupRef.current && !groupRef.current.contains(e.target)) {
        setShowQuestions(false);
        setRelevantQuestions(null);
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
            setShowQuestions={setShowQuestions}
          />
        ))}
    </div>
  );
}

export default AddSlideQuestionGroup;
