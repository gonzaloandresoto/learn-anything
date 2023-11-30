import React from 'react';
import { useNavigate } from 'react-router-dom';

import useTopicContext from './useTopicContext';

function TopicDeepdive() {
  const navigate = useNavigate();

  const { deepdiveData } = useTopicContext();
  return (
    <div className='w-screen h-screen flex justify-center bg-white'>
      <div className='relative w-2/3 flex flex-col items-center gap-8 py-16 overflow-y-auto'>
        <div
          onClick={() => navigate('/')}
          className='absolute left-0 top-8 flex items-center justify-center px-3 py-2 bg-tertiary-grey rounded-md text-primary-grey cursor-pointer'
        >
          <p className='text-sm'>←</p>
        </div>
        <p className='text-2xl text-primary-black font-medium'>
          {deepdiveData.topic}
        </p>
        <p>{deepdiveData.overview}</p>
        <div className='flex flex-col gap-8'>
          {deepdiveData?.sections?.map((section) => {
            return (
              <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                  <p className='text-xl text-primary-indigo font-medium'>
                    {section.title}
                  </p>
                  <p>{section.description}</p>
                </div>
                <div className='flex flex-col gap-1'>
                  {section.subsections.map((subsection) => {
                    return (
                      <div>
                        <p className='text-lg text-primary-black font-medium'>
                          {subsection.subTitle}
                        </p>
                        <p>{subsection.content}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <p>{deepdiveData.conclusion}</p>
      </div>
    </div>
  );
}

export default TopicDeepdive;
