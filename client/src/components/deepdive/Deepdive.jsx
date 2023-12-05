import React from 'react';
import Header from './Header';
import Carousel from './Carousel';
import QuizButton from './QuizButton';
import AskInput from './AskInput';

function Deepdive() {
  return (
    <div className='w-screen h-screen flex grow justify-center bg-secondary-tan'>
      <div className='max-w-[1080px] flex flex-col gap-8 grow items-center py-8'>
        <Header />
        <Carousel />
        <div className='w-full flex items-center gap-4'>
          <QuizButton />
          <AskInput />
        </div>
      </div>
    </div>
  );
}

export default Deepdive;
