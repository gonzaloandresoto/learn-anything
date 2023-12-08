import React from 'react';

function Topic({ item, handleClick }) {
  const topicItem = item?.topic_contents;
  return (
    <button
      onClick={() => handleClick(topicItem, item?.fun_links)}
      className='flex flex-col gap-3 px-4 py-6 border border-secondary-tan rounded-lg'
    >
      <div className='w-full h-[160px] bg-secondary-tan rounded-lg'></div>
      <p className='text-lg text-priamry-tan font-medium'>{topicItem?.title}</p>
    </button>
  );
}

export default Topic;
