import React, { useState } from 'react';

// Context
import useTopicContext from '../../../hooks/useTopicContext';

// Assets
import Search from '../../../assets/search.svg';

function Input() {
  const { setShowSidesheet, sendConversationMessage } = useTopicContext();
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = (message) => {
    if (message === '') {
      setShowSidesheet(true);
      return;
    }
    sendConversationMessage(message);
    setMessage('');
    setShowSidesheet(true);
  };

  return (
    <div className='relative w-full h-max flex grow'>
      <input
        placeholder='Ask a follow up'
        value={message}
        onChange={handleChange}
        className='w-full h-[48px] px-4 bg-tertiary-tan border border-primary-tan rounded-full text-primary-tan placeholder:text-primary-tan outline-none'
      />
      <div className='absolute top-1 right-2 w-[40px] h-[40px] bg-tertiary-tan rounded-full overflow-hidden'>
        <button
          onClick={() => sendMessage(message)}
          className='w-full h-full flex items-center justify-center text-medium text-tertiary-tan font-semibold'
        >
          <img src={Search} />
        </button>
      </div>
    </div>
  );
}

export default Input;
