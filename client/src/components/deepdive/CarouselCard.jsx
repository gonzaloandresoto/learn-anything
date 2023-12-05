import React from 'react';

function CarouselCard({ unit, introduction, content1, content2 }) {
  return (
    <div className='flex-none max-w-[1080px] w-[1080px] h-full flex grow flex-col gap-8 items-center px-12 pt-12 bg-secondary-tan rounded-xl'>
      <p className='text-4xl text-primary-tan font-bold'>{unit}</p>
      <div className='w-1/3 h-[1px] flex bg-primary-tan'></div>
      <p className='text-xl text-primary-tan font-medium text-center'>
        {introduction}
      </p>
      <p className='text-xl text-primary-tan font-medium text-center'>
        {content1}
      </p>
      <p className='text-xl text-primary-tan font-medium text-center'>
        {content2}
      </p>
    </div>
  );
}

export default CarouselCard;
