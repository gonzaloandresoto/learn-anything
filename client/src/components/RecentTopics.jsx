import React from 'react';
import useTopicContext from '../useTopicContext';

function RecentTopics() {
  const { recentTopics, setBriefSummary, setActiveTopic } = useTopicContext();

  const handleClick = (topic) => {
    setBriefSummary(topic);
    setActiveTopic(topic?.topics?.[0]?.name);
  };

  return (
    <div className='flex flex-col gap-4'>
      <p className='text-xl text-primary-black font-medium'>
        {' '}
        Curated by Our Community
      </p>
      <div class='grid grid-cols-3 gap-6'>
        {recentTopics.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => handleClick(JSON.parse(item.topic_contents))}
              className='px-4 py-4 border border-secondary-grey rounded-lg'
            >
              <p className='text-sm text-priamry-grey font-medium'>
                {JSON.parse(item.topic_contents).title}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default RecentTopics;
