import React from 'react';
import useTopicContext from '../../useTopicContext';

function TableofContentsDropdown() {
  const { courseData } = useTopicContext();

  return (
    <div className='absolute mt-[56px] flex flex-col px-1 py-2 bg-white w-[max] rounded-lg shadow-md z-10 cursor-pointer'>
      <div className='px-5 py-2'>
        <p className='text-lg text-primary-tan font-bold'>Table of Contents</p>
      </div>

      {courseData &&
        courseData.topics.map((topic, index) => (
          <button
            key={index}
            className=' w-full px-6 py-2 bg-white hover:bg-tertiary-tan text-left text-primary-black font-medium whitespace-nowrap'
          >
            <p>{topic.unit}</p>
          </button>
        ))}
    </div>
  );
}

export default TableofContentsDropdown;
