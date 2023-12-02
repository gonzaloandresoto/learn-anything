import React from 'react';
import useTopicContext from '../useTopicContext';
import Topic from './summary/Topic';

function RecentTopics({ scrollToBriefSummary }) {
  const {
    recentTopics,
    setBriefSummary,
    setActiveTopic,
    setFunLinks,
    setTopic,
  } = useTopicContext();

  const handleClick = (topic, links) => {
    setTopic(topic?.title);
    setBriefSummary(topic);
    setActiveTopic(topic?.topics?.[0]?.name);
    setFunLinks(links);
    scrollToBriefSummary();
    console.log(links);
  };

  return (
    <div className='w-full flex flex-col gap-8'>
      <p className='text-4xl text-primary-black font-medium'>
        Curated by Our Community
      </p>
      <div className='w-full grid grid-cols-3 gap-6'>
        {recentTopics.map((item, index) => {
          return (
            <Topic
              key={index}
              item={item}
              handleClick={handleClick}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RecentTopics;
