import React from 'react';
import useTopicContext from '../../useTopicContext';
import TopicButton from './TopicButton';

function MainSummary() {
  const { briefSummary } = useTopicContext();
  return (
    <div className='w-1/2 h-[800px]'>
      <div className='flex flex-col gap-8 px-6 py-8'>
        <div className='w-3/4 flex flex-col gap-4'>
          <p className='text-4xl text-black font-medium'>
            {briefSummary?.title}
          </p>
          <p className='text-xl text-black font-regular'>
            {briefSummary?.summary}
          </p>
        </div>

        <div className='w-2/3 flex flex-col gap-4'>
          {briefSummary?.topics?.slice(0, 4)?.map((item, index) => {
            return (
              <TopicButton
                key={index}
                item={item}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MainSummary;
