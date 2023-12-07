import React, { useState, useEffect } from 'react';
import useTopicContext from '../../hooks/useTopicContext';

function Search({ topicSearchRef }) {
  const { topic, setTopic, createCourse } = useTopicContext();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        ((event.metaKey || event.ctrlKey) && event.key === 'Enter') ||
        event.key === 'Enter'
      ) {
        createCourse(topic);
        setTopic('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [topic]);

  const handleChange = (e) => {
    setTopic(e.target.value);
  };
  return (
    <div
      ref={topicSearchRef}
      className='w-full h-max bg-tertiary-tan border-b border-secondary-tan'
    >
      <input
        value={topic}
        onChange={handleChange}
        placeholder='What are you curious about?'
        className='w-full text-4xl text-primary-black font-regular py-6 bg-tertiary-tan outline-none placeholder:text-primary-tan '
      />
    </div>
  );
}

export default Search;
