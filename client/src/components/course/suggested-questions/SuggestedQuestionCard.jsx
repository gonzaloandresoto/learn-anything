import React from 'react';

// Context
import useTopicContext from '../../../hooks/useTopicContext';

// Assets
import Search from '../../../assets/search.svg';

function SuggestedQuestionCard({ question }) {
  const { setShowSidesheet, sendConversationMessage } = useTopicContext();

  const askQuestion = (question) => {
    sendConversationMessage(question);
    setShowSidesheet(true);
  };
  return (
    <div className='max-w-[1080px] w-max h-[56px] bg-white rounded-full shadow-sm overflow-hidden'>
      <button
        onClick={() => askQuestion(question)}
        className='w-max h-full flex items-center gap-3 px-8'
      >
        <img
          src={Search}
          className='w-[16px] h-[16px]'
        />
        <p className='text-lg text-black font-medium truncate'>{question}</p>
      </button>
    </div>
  );
}

export default SuggestedQuestionCard;
