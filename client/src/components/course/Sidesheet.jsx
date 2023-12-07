import React, { useState, useEffect, useRef } from 'react';
import useTopicContext from '../../hooks/useTopicContext';
import Search from '../../assets/search.svg';

function Sidesheet() {
  const {
    showSidesheet,
    setShowSidesheet,
    courseConversation,
    sendConversationMessage,
  } = useTopicContext();
  const [message, setMessage] = useState('');
  const sidesheetRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidesheetRef.current && !sidesheetRef.current.contains(e.target)) {
        setShowSidesheet(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const sendMessage = (message) => {
    sendConversationMessage(message);
    setMessage('');
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div
      ref={sidesheetRef}
      className={`fixed top-0 right-0 w-[560px] h-screen flex flex-col bg-white z-2 shadow-md transform ${
        showSidesheet ? 'translate-x-0' : 'translate-x-full'
      } transition-transform ease-in-out duration-300`}
    >
      <div className='w-full h-[88px] flex px-6 items-center bg-white'>
        <p className='text-2xl font-bold'>Expert</p>
      </div>
      <div className='flex flex-col gap-2 grow justify-end px-6 py-4 bg-white overflow-y-auto'>
        {courseConversation &&
          courseConversation.length > 1 &&
          courseConversation
            .filter((msg) => msg.role !== 'system')
            .map((message, index) => (
              <div
                key={index}
                className='flex gap-4 py-2'
              >
                <div
                  className={`w-[40px] h-[40px] flex-none flex items-center justify-center rounded-md ${
                    message.role === 'assistant'
                      ? 'bg-primary-teal'
                      : 'bg-secondary-teal'
                  }`}
                >
                  <p
                    className={`font-bold ${
                      message.role === 'assistant'
                        ? 'text-secondary-teal'
                        : 'text-primary-teal'
                    }`}
                  >
                    {message.role === 'assistant' ? 'ai' : 'me'}
                  </p>
                </div>
                <p className='text-base text-primary-tan font-medium'>
                  {message.content}
                </p>
              </div>
            ))}
      </div>
      <div className='w-full h-[120px] px-6 pt-4 bg-white'>
        <div className='relative w-full h-max flex grow'>
          <input
            placeholder='Ask anything'
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
      </div>
    </div>
  );
}

export default Sidesheet;
