import React, { useEffect, useRef } from 'react';
import useTopicContext from '../../useTopicContext';

function SearchBar() {
  const { topic, setTopic, searchTopic } = useTopicContext();
  const searchBarRef = useRef(null);

  const handleChange = (e) => {
    setTopic(e.target.value);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        searchTopic(topic);
      } else if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        searchBarRef.current.focus();
      } else if (event.key === 'Escape') {
        searchBarRef.current.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [topic]);

  return (
    <div className='fixed top-8 z-20 w-[600px] flex-none flex items-center justify-center px-2 py-2 bg-white rounded-full border border-secondary-grey shadow-md'>
      <div className='relative w-full h-full'>
        <input
          ref={searchBarRef}
          value={topic}
          onChange={handleChange}
          placeholder='⌘k to search'
          className='w-full h-[40px] border border-secondary-grey rounded-full outline-none px-4'
        />
        <div className='absolute top-0 right-0'>
          <button
            onClick={() => searchTopic(topic)}
            className='h-[40px] w-[40px] bg-primary-indigo rounded-full text-white'
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
