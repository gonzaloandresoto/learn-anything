import React from 'react';
import useTopicContext from '../useTopicContext';

function RelevantLinks() {
  const { funLinks } = useTopicContext();
  if (funLinks)
    return (
      <div className='flex flex-col gap-4'>
        <p className='text-xl text-primary-black font-medium'>Fun Links</p>
        <div className='flex flex-col gap-1'>
          {funLinks?.map((item, index) => (
            <div
              key={index}
              className='flex items-center justify-between text-base text-primary-black font-regular hover:text-primary-indigo hover:underline'
            >
              <a
                href={item.url}
                target='_blank'
                className='w-[600px]'
              >
                {item.title}
              </a>
              <a
                href={item.url}
                target='_blank'
              >
                {item.author}
              </a>
            </div>
          ))}
        </div>
      </div>
    );
}

export default RelevantLinks;
