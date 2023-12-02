import React, { useState, useEffect } from 'react';
import useTopicContext from '../useTopicContext';

function TopicSearch({ scrollToBriefSummary }) {
  const { searchTopic, topic, setTopic } = useTopicContext();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        console.log('TOPIC KEYDOWN', topic);
        searchTopic(topic);
        scrollToBriefSummary();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [topic]);

  const submitSearch = (topic) => {
    searchTopic(topic);
    scrollToBriefSummary();
  };

  const handleChange = (e) => {
    setTopic(e.target.value);
  };
  return (
    <div className='w-full h-screen flex flex-col justify-center gap-4'>
      <p className='text-2xl text-primary-grey font-semibold'>
        I want to learn about...
      </p>
      <div className='w-full flex items-center'>
        <input
          value={topic}
          onChange={handleChange}
          placeholder='What are you curious about?'
          className='w-full text-7xl text-primary-black font-bold py-2 outline-none placeholder:text-primary-grey bg-white'
        />
        <button
          onClick={() => submitSearch(topic)}
          className='w-[48px] h-[48px] rounded-md bg-primary-indigo text-white text-xl font-bold'
        >
          →
        </button>
      </div>
    </div>
  );
}

export default TopicSearch;
