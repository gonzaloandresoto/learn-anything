import React from 'react';
import useTopicContext from '../../hooks/useTopicContext';

function CourseCard({ course }) {
  const { makeActiveCourse } = useTopicContext();

  const handleClick = () => {
    makeActiveCourse(course);
  };
  return (
    <button
      onClick={handleClick}
      className='w-full h-max bg-white rounded-2xl shadow-md cursor-pointer overflow-hidden text-left'
    >
      {course.thumbnail ? (
        <div className='w-full hh-[168px]  overflow-hidden'>
          <img src={''} />
        </div>
      ) : (
        <div className='w-full h-[196px] p-4 overflow-hidden bg-white'>
          <p className='text-lg text-primary-tan font-tertiary'>
            {course?.main?.summary}
          </p>
        </div>
      )}

      <div className='border-t border-secondary-tan px-4 py-4'>
        <p className='text-xl font-bold '>{course?.main?.title}</p>
      </div>
    </button>
  );
}

export default CourseCard;
