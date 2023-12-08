import React, { useRef } from 'react';

// Context
import useTopicContext from '../hooks/useTopicContext';

// Components
import Header from '../components/course/header/Header';
import Carousel from '../components/course/carousel/Carousel';
import AskInput from '../components/course/ask/AskInput';
import KeyTerms from '../components/course/key-terms/KeyTerms';
import SuggestedQuestions from '../components/course/suggested-questions/SuggestedQuestions';
import Sidesheet from '../components/course/sidesheet/Sidesheet';

function Course() {
  const { focusedSlide, setFocusedSlide, courseData } = useTopicContext();
  const deepdiveRef = useRef(null);
  const slideCount = courseData?.topics?.length;

  const increaseSlide = () => {
    if (focusedSlide >= slideCount) return;
    if (focusedSlide === null) return setFocusedSlide(0);
    setFocusedSlide((prev) => prev + 1);
  };

  const decreaseSlide = () => {
    if (focusedSlide === 0) return;
    setFocusedSlide((prev) => prev - 1);
  };

  return (
    <div className='w-screen h-screen flex flex-col gap-12 grow items-center bg-tertiary-tan pt-8 pb-16 overflow-y-auto'>
      <Header />
      <Carousel parentRef={deepdiveRef} />
      <div
        ref={deepdiveRef}
        className='max-w-[1080px] w-full h-max flex flex-col justify-center gap-8 grow'
      >
        <div className='w-full flex items-center gap-4'>
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

export default Course;
