import React from 'react';

function CourseCard({ course }) {
  return (
    <div className='w-full h-max bg-white rounded-2xl shadow-md cursor-pointer'>
      {course.thumbnail ? (
        <div className='w-full hh-[168px]  overflow-hidden'>
          <img src={''} />
        </div>
      ) : (
        <div className='w-full h-[168px] p-4 overflow-hidden'>
          <p className='text-lg text-primary-tan font-tertiary'>
            {course.summary}
          </p>
        </div>
      )}

      <div className='border-t border-secondary-tan px-4 py-4'>
        <p className='text-lg font-bold '>{course?.title}</p>
      </div>
    </div>
  );
}

export default CourseCard;
