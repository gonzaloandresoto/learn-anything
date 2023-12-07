import React from 'react';
import useTopicContext from '../../hooks/useTopicContext';
import CourseCard from './CourseCard';
function CourseGrid() {
  const { userCourses } = useTopicContext();

  return (
    <>
      {userCourses && (
        <div className='w-full h-max grid xl:grid-cols-4 lg:grid-cols-3 gap-8 py-8 overflow-y-auto'>
          {userCourses.map((course, index) => (
            <CourseCard
              key={index}
              course={course}
            />
          ))}
        </div>
      )}
      {!userCourses.length > 0 && (
        <div className='w-full h-full flex flex-col gap-2 items-center pt-40'>
          <p className='text-2xl text-primary-tan font-bold'>No courses</p>
          <p className='text-lg text-primary-tan font-medium'>
            Create your first course by searching for a topic.
          </p>
        </div>
      )}
    </>
  );
}

export default CourseGrid;
