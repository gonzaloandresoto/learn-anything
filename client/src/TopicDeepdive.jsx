import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useTopicContext from './useTopicContext';

function TopicDeepdive() {
  const navigate = useNavigate();
  const { deepdiveData, getKeywords } = useTopicContext();

  useEffect(() => {
    getKeywords(deepdiveData?.conclusion);
  }, []);

  return (
    <div className='relative w-screen h-screen flex flex-row justify-center px-24 py-16 bg-white'>
      <div className='w-max flex flex-row gap-16 overflow-x-auto'>
        <div
          onClick={() => navigate('/')}
          className='absolute left-8 top-8 flex items-center justify-center px-3 py-2 bg-tertiary-grey rounded-md text-primary-grey cursor-pointer'
        >
          <p className='text-sm'>←</p>
        </div>

        <div className='flex-none w-[1040px] flex flex-col gap-8 px-8 py-12 bg-tertiary-grey rounded-xl'>
          <p className='text-6xl text-primary-black font-medium'>
            {deepdiveData.topic}
          </p>
          <p className='text-xl text-primary-black font-regular'>
            {deepdiveData.overview}
          </p>
        </div>

        <div className='flex-none flex flex-row gap-8'>
          {deepdiveData?.sections?.map((section, index) => {
            return (
              <div
                key={index}
                className='flex-none w-[1040px] flex flex-col gap-8 px-8 py-12 bg-tertiary-grey rounded-xl'
              >
                <div className='flex flex-col gap-8'>
                  <p className='text-4xl text-primary-indigo font-semibold'>
                    {section.title}
                  </p>
                  <p className='text-xl text-primary-black font-regular'>
                    {section.description}
                  </p>
                </div>
                <div className='flex flex-col gap-8'>
                  {section.subsections.map((subsection, subIndex) => {
                    return (
                      <div
                        key={subIndex}
                        className='flex flex-col gap-4'
                      >
                        <p className='text-3xl text-primary-black font-medium'>
                          {subsection.subTitle}
                        </p>
                        <p className='text-xl text-primary-black font-regular'>
                          {subsection.content}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className='flex-none w-[1040px] flex flex-col px-8 py-12 bg-tertiary-grey rounded-xl'>
          <p className='text-xl text-primary-black font-regular'>
            {deepdiveData.conclusion}
          </p>
        </div>
      </div>
    </div>
  );
}

export default TopicDeepdive;
