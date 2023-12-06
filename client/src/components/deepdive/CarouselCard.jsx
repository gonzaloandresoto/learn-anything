import React from 'react';
import AddSlide from './AddSlide';

function CarouselCard({ index, unit, introduction, content1, content2 }) {
  return (
    <div className='relative flex-none max-w-[1080px] w-[1080px] h-full flex grow flex-col gap-8 items-center px-12 pt-12 bg-tertiary-tan rounded-xl overflow-hidden'>
      <p className='text-4xl text-primary-tan font-bold text-center'>{unit}</p>
      <div className='w-1/3 h-[1px] flex bg-primary-tan'></div>
      <p className='text-xl text-primary-tan font-medium text-center'>
        {introduction && introduction}
      </p>
      <p className='text-xl text-primary-tan font-medium text-center'>
        {content1 && content1}
      </p>
      <p className='text-xl text-primary-tan font-medium text-center'>
        {content2 && content2}
      </p>
      <AddSlide
        index={index}
        content1={content1}
        content2={content2}
      />
    </div>
  );
}

export default CarouselCard;
