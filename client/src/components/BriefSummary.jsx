import React from 'react';
import useTopicContext from '../useTopicContext';

function BriefSummary() {
  const {
    deepdiveIntoTopic,
    quizAboutTopic,
    topic,
    briefSummary,
    activeTopic,
    setActiveTopic,
  } = useTopicContext();
  return (
    <div className='flex justify-between'>
      <div className='flex flex-col gap-4 w-[400px]'>
        <p className='text-xl text-primary-black font-medium'>Brief Summary</p>
        <p>{briefSummary?.summary}</p>
        <div className='flex flex-col gap-2'>
          {briefSummary?.topics?.slice(0, 4)?.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => setActiveTopic(item.name)}
                className={`flex justify-between px-3 py-2 rounded-md cursor-pointer ${
                  activeTopic === item?.name
                    ? 'bg-primary-indigo'
                    : 'bg-secondary-indigo'
                }`}
              >
                <p
                  className={`text-sm font-medium ${
                    activeTopic === item?.name
                      ? 'text-white'
                      : 'text-primary-indigo'
                  }`}
                >
                  {item.name}
                </p>
                <p
                  className={`text-sm font-medium ${
                    activeTopic === item?.name
                      ? 'text-secondary-indigo'
                      : 'text-primary-indigo'
                  }`}
                >
                  →
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className='flex flex-col gap-4 w-[480px] items-end'>
        <p className='text-xl text-primary-black font-medium'>
          {activeTopic && activeTopic}
        </p>
        <p className='text-base text-primary-black font-regular text-right'>
          {activeTopic &&
            briefSummary?.topics?.find((item) => item.name === activeTopic)
              ?.summary}
        </p>
        <div className='flex gap-2'>
          <div>
            <button
              onClick={() => deepdiveIntoTopic(activeTopic, topic)}
              className='flex items-center gap-4 px-3 py-2 bg-primary-indigo rounded-md text-sm text-white font-semibold'
            >
              <p>Learn more</p>
              <p>→</p>
            </button>
          </div>
          <div>
            <button
              onClick={() => quizAboutTopic(activeTopic, topic)}
              className='flex items-center gap-4 px-3 py-2 bg-primary-indigo rounded-md text-sm text-white font-semibold'
            >
              <p>Quiz me</p>
              <p>→</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BriefSummary;
