import React, { useState, useEffect } from 'react';
import useTopicContext from '../useTopicContext';

function TopicSearch() {
  const { searchTopic, topic, setTopic } = useTopicContext();

  const handleChange = (e) => {
    setTopic(e.target.value);
  };
  return (
    <div className='flex flex-col gap-4'>
      <p className='text-lg text-primary-black font-semibold'>
        I want to learn about...
      </p>
      <div className='flex items-center'>
        <input
          value={topic}
          onChange={handleChange}
          placeholder='Topic'
          className='w-full text-3xl text-primary-black font-medium py-2 outline-none placeholder:text-primary-grey'
        />
        <button
          onClick={() => searchTopic()}
          className='w-[48px] h-[48px] rounded-md bg-primary-indigo text-white text-xl font-bold'
        >
          →
        </button>
      </div>
    </div>
  );
}

export default TopicSearch;
