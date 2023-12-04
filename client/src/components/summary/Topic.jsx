import React from 'react';
import { json } from 'react-router-dom';

function Topic({ item, handleClick }) {
  const topicItem = item?.topic_contents;
  return (
    <button
      onClick={() => handleClick(topicItem, item?.fun_links)}
      className='flex flex-col gap-3 px-4 py-6 border border-secondary-grey rounded-lg'
    >
      <div className='w-full h-[160px] bg-secondary-grey rounded-lg'></div>
      <p className='text-lg text-priamry-grey font-medium'>
        {topicItem?.title}
      </p>
    </button>
  );
}

export default Topic;
