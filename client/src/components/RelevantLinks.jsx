import React from 'react';
import useTopicContext from '../useTopicContext';

function RelevantLinks() {
  const { funLinks } = useTopicContext();

  const youtubeParser = (link) => {
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = link?.match(regExp);
    const videoId = match && match[2].length === 11 ? match[2] : null;

    if (videoId) {
      const thumbnailURL = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      return thumbnailURL;
    } else {
      return null;
    }
  };

  if (funLinks?.length > 0) {
    return (
      <div className='flex flex-col gap-8 overflow-none'>
        <p className='text-4xl text-primary-black font-medium'>
          Learn with Youtube
        </p>
        <div className='flex flex-row gap-4 overflow-x-auto'>
          {funLinks?.map((item, index) => (
            <div
              key={index}
              onClick={() => window.open(item.url, '_blank')}
              className='w-[400px] flex flex-col flex-none gap-2 rounded-lg border border-secondary-grey cursor-pointer overflow-hidden'
            >
              <div className='w-full max-h-[200px]'>
                <img
                  src={youtubeParser(item.url)}
                  className='w-full h-full object-cover'
                />
              </div>

              <div className='flex flex-col gap-1 px-4 py-2 items-start'>
                <p
                  href={item.url}
                  target='_blank'
                  className='text-base text-primary-black font-medium'
                >
                  {item.title}
                </p>
                <p
                  href={item.url}
                  target='_blank'
                  className='text-sm text-primary-black font-normal'
                >
                  {item.author}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default RelevantLinks;
