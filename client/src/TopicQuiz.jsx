import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTopicContext from './useTopicContext';

function TopicQuiz() {
  const navigate = useNavigate();
  const { quizData } = useTopicContext();
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [quizScore, setQuizScore] = useState(0);
  return (
    <div className='w-screen h-screen flex justify-center bg-white'>
      <div className='relative w-2/3 flex flex-col items-center gap-8 py-16'>
        <div
          onClick={() => navigate('/')}
          className='absolute left-0 top-8 flex items-center justify-center px-3 py-2 bg-tertiary-grey rounded-md text-primary-grey cursor-pointer'
        >
          <p className='text-sm'>←</p>
        </div>
        <p className='text-3xl text-primary-black font-medium'>
          {quizData?.quiz_title}
        </p>

        <div className='w-[600px]'>
          {quizData?.questions?.map((item) => {
            if (activeQuestion === parseInt(item.id))
              return (
                <div
                  key={item.id}
                  class='flex flex-col gap-2'
                >
                  <p className='text-lg text-primary-black font-medium'>
                    {item?.question}
                  </p>
                  <div className='flex flex-col gap-2'>
                    {item?.options?.map((option) => {
                      return (
                        <div
                          key={option.id}
                          className='px-2 py-2 bg-tertiary-grey rounded-md cursor-pointer'
                        >
                          <p>🔘 {option.text}</p>
                        </div>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setActiveQuestion(activeQuestion + 1)}
                    className='py-2 bg-secondary-indigo text-white text-base font-semibold rounded-md'
                  >
                    Continue
                  </button>
                  <div></div>
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}

export default TopicQuiz;
