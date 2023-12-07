import React, { useRef } from 'react';
import Header from './Header';
import Carousel from './Carousel';
import QuizButton from './QuizButton';
import AskInput from './AskInput';
import KeyTerms from './KeyTerms';
import SuggestedQuestions from './SuggestedQuestions';
import Sidesheet from './Sidesheet';
import useTopicContext from '../../useTopicContext';

function Deepdive() {
  const { focusedSlide, setFocusedSlide, courseData } = useTopicContext();
  const deepdiveRef = useRef(null);
  const slideCount = courseData?.topics?.length;

  const increaseSlide = () => {
    if (focusedSlide >= slideCount) return;
    setFocusedSlide((prev) => prev + 1);
  };

  const decreaseSlide = () => {
    if (focusedSlide === 0) return;
    setFocusedSlide((prev) => prev - 1);
  };

  return (
    <div className='w-screen h-screen flex flex-col gap-8 grow items-center bg-tertiary-tan py-8 overflow-y-auto'>
      <Header />
      <Carousel parentRef={deepdiveRef} />
      <div
        ref={deepdiveRef}
        className='max-w-[1080px] w-full h-max flex flex-col justify-center gap-8 grow'
      >
        <div className='w-full flex items-center gap-4'>
          <QuizButton />
          <AskInput />

          <div className='flex items-center gap-2'>
            <div className='flex-none w-[48px] h-[48px] bg-primary-tan rounded-full overflow-hidden'>
              <button
                onClick={decreaseSlide}
                className='w-full h-full flex items-center justify-center text-medium text-tertiary-tan font-semibold'
              >
                ←
              </button>
            </div>
            <div className='flex-none w-[48px] h-[48px] bg-primary-tan rounded-full overflow-hidden'>
              <button
                onClick={increaseSlide}
                className='w-full h-full flex items-center justify-center text-medium text-tertiary-tan font-semibold'
              >
                →
              </button>
            </div>
          </div>
        </div>
        <KeyTerms />
        <SuggestedQuestions />
        <Sidesheet />
      </div>
    </div>
  );
}

export default Deepdive;
