import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTopicContext from './useTopicContext';
import QuizQuestion from './QuizQuestion';

function TopicQuiz() {
  const navigate = useNavigate();
  const { quizData } = useTopicContext();
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [quizScore, setQuizScore] = useState(0);
  const maxScore = quizData?.questions?.length;

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

        <div className='w-[640px]'>
          {quizData?.questions?.map((item, index) => {
            if (activeQuestion === parseInt(item.id))
              return (
                <QuizQuestion
                  key={index}
                  item={item}
                  activeQuestion={activeQuestion}
                  setActiveQuestion={setActiveQuestion}
                  quizScore={quizScore}
                  setQuizScore={setQuizScore}
                  maxScore={maxScore}
                />
              );
          })}
        </div>
      </div>
    </div>
  );
}

export default TopicQuiz;
