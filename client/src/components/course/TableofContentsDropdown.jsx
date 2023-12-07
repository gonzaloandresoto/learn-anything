import React, { useEffect, useRef } from 'react';
import useTopicContext from '../../hooks/useTopicContext';

function TableofContentsDropdown({ setShowTableContents }) {
  const { courseData, setFocusedSlide } = useTopicContext();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowTableContents(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  if (courseData?.topics)
    return (
      <div
        ref={dropdownRef}
        className='absolute mt-[56px] flex flex-col px-1 py-2 bg-white w-[max] rounded-lg shadow-md z-10 cursor-pointer'
      >
        <div className='px-5 py-2'>
          <p className='text-lg text-primary-tan font-bold'>
            Table of Contents
          </p>
        </div>

        {courseData &&
          courseData?.topics.map((topic, index) => (
            <button
              key={index}
              onClick={() => {
                console.log('SET FOCUSED SLIDE TO:', index);
                setFocusedSlide(index);
              }}
              className=' w-full px-6 py-2 bg-white hover:bg-tertiary-tan text-left text-primary-black font-medium whitespace-nowrap'
            >
              <p>{topic.unit}</p>
            </button>
          ))}
      </div>
    );
}

export default TableofContentsDropdown;
