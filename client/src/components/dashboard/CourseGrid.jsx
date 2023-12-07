import React from 'react';
import useTopicContext from '../../hooks/useTopicContext';
import CourseCard from './CourseCard';
function CourseGrid() {
  const { userCourses } = useTopicContext();

  return (
    <div className='w-full h-max grid grid-cols-3 gap-4 py-6'>
      {userCourses &&
        userCourses.map((course, index) => (
          <CourseCard
            key={index}
            course={course}
          />
        ))}
    </div>
  );
}

export default CourseGrid;
