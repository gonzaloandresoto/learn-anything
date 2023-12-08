import React from 'react';
import useTopicContext from '../../hooks/useTopicContext';

function CourseCard({ course }) {
  const { makeActiveCourse } = useTopicContext();

  const handleClick = () => {
    makeActiveCourse(course);
  };

  const firstSentence = course?.main?.summary?.split('.')[0];

  return (
    <button
      onClick={handleClick}
      className='group w-full h-max bg-white rounded-2xl cursor-pointer overflow-hidden text-left border
      border-secondary-tan'
    >
      {course.thumbnail ? (
        <div className='w-full hh-[168px]  overflow-hidden'>
          <img src={''} />
        </div>
      ) : (
        <div className='w-full h-[188px] p-4 overflow-hidden bg-white'>
          <p className='text-lg text-black font-medium'>"{firstSentence}."</p>
        </div>
      )}

      <div className='border-t border-secondary-tan p-4'>
        <p className='text-xl text-black font-semibold font-secondary group-hover:text-primary-tan'>
          {course?.main?.title}
        </p>
      </div>
    </button>
  );
}

export default CourseCard;
