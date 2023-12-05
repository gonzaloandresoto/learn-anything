import React from 'react';

function CarouselTitleCard() {
  return (
    <div className='w-full h-[640px] flex flex-col gap-8 items-center grow px-12 pt-12 bg-primary-teal rounded-xl'>
      <p className='text-4xl text-tertiary-tan font-bold'>
        Paradoxes and Consequences
      </p>
      <div className='w-1/3 h-[2px] flex bg-secondary-grey'></div>
      <p className='text-xl text-tertiary-tan font-medium text-center'>
        Time travel has been a popular theme in science fiction, but it also
        raises intriguing questions about paradoxes and their consequences. This
        document explores the potential paradoxes and consequences of time
        travel, delving into the fascinating and mind-bending aspects of this
        concept.
      </p>
    </div>
  );
}

export default CarouselTitleCard;
