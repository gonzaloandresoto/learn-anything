import React from 'react';
import Header from './Header';
import Carousel from './Carousel';
import QuizButton from './QuizButton';
import AskInput from './AskInput';
import KeyTerms from './KeyTerms';
import SuggestedQuestions from './SuggestedQuestions';
import Sidesheet from './Sidesheet';

function Deepdive() {
  return (
    <div className='w-screen h-screen flex grow justify-center bg-secondary-tan py-8 overflow-y-auto'>
      <div className='max-w-[1080px] h-max flex flex-col gap-8 grow items-center'>
        <Header />
        <Carousel />
        <div className='w-full flex items-center gap-4'>
          <QuizButton />
          <AskInput />
        </div>
        <KeyTerms />
        <SuggestedQuestions />
        <Sidesheet />
      </div>
    </div>
  );
}

export default Deepdive;
