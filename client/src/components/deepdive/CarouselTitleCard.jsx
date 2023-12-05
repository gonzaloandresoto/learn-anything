import React from 'react';
import useTopicContext from '../../useTopicContext';

function CarouselTitleCard() {
  const { courseData } = useTopicContext();
  return (
    <div className='flex-none max-w-[1080px] w-full h-full flex grow flex-col gap-8 items-center px-12 pt-12 bg-primary-teal rounded-xl'>
      <p className='text-4xl text-tertiary-tan font-bold'>
        {courseData?.title}
      </p>
      <div className='w-1/3 h-[2px] flex bg-secondary-grey'></div>
      <p className='text-xl text-tertiary-tan font-medium text-center'>
        {courseData?.summary}
      </p>
    </div>
  );
}

export default CarouselTitleCard;
