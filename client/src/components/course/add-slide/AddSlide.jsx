import React, { useContext, useState } from 'react';

// Context
import useTopicContext from '../../../hooks/useTopicContext';

// Components
import AddSlideQuestionGroup from './AddSlideQuestionGroup';

// Assets
import Sparkles from '../../../assets/sparkes.svg';

function AddSlide({ index, content1, content2 }) {
  const { getRelevantQuestions, setIndexBeforeAdd } = useTopicContext();
  const [showQuestions, setShowQuestions] = useState(false);

  const mergedParagraph = `${content1} ${content2}`;

  const handleClick = () => {
    getRelevantQuestions(mergedParagraph);
    console.log('MERGED PARAGRAPH', mergedParagraph);
    setIndexBeforeAdd(index);
    setShowQuestions(true);
  };

  return (
    <div className='absolute bottom-4 right-4 flex flex-col gap-2 items-end'>
      {showQuestions && (
        <AddSlideQuestionGroup setShowQuestions={setShowQuestions} />
      )}
      <div className='w-[48px] h-[48px] bg-primary-tan rounded-full overflow-hidden'>
        <button
          onClick={handleClick}
          className='w-full h-full flex items-center justify-center'
        >
          <img
            src={Sparkles}
            className='w-[16px] h-[16px]'
          />
        </button>
      </div>
    </div>
  );
}

export default AddSlide;
