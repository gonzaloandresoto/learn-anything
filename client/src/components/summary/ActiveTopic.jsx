import React from 'react';
import useTopicContext from '../../useTopicContext';

function ActiveTopic() {
  const {
    deepdiveIntoTopic,
    quizAboutTopic,
    topic,
    briefSummary,
    activeTopic,
  } = useTopicContext();
  return (
    <div className='relative flex w-1/2 h-[800px] bg-tertiary-grey rounded-xl'>
      <img />
      <div className='flex flex-col gap-6 px-6 py-8'>
        <div className='w-full h-[400px] bg-secondary-grey rounded-lg overflow-hidden'>
          <img
            src={
              activeTopic &&
              briefSummary?.topics?.find((item) => item.name === activeTopic)
                ?.thumbnail
            }
            className='w-full h-full object-cover'
          />
        </div>
        <div className='flex flex-col gap-4'>
          <p className='text-3xl text-primary-black font-medium'>
            {activeTopic && activeTopic}
          </p>
          <p className='text-xl text-primary-black font-regular'>
            {activeTopic &&
              briefSummary?.topics?.find((item) => item.name === activeTopic)
                ?.summary}
          </p>
        </div>
      </div>

      <div className=' absolute bottom-8 right-6 flex gap-2'>
        <div>
          <button
            onClick={() => deepdiveIntoTopic(activeTopic, topic)}
            className='flex items-center gap-4 px-3 py-2 bg-primary-indigo rounded-md text-base text-white font-semibold'
          >
            <p>Learn more</p>
            <p>→</p>
          </button>
        </div>
        <div>
          <button
            onClick={() => quizAboutTopic(activeTopic, topic)}
            className='flex items-center gap-4 px-3 py-2 bg-primary-indigo rounded-md text-base text-white font-semibold'
          >
            <p>Quiz me</p>
            <p>→</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ActiveTopic;
