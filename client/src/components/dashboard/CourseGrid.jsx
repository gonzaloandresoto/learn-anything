import React from 'react';
import useTopicContext from '../../hooks/useTopicContext';
import CourseCard from './CourseCard';
function CourseGrid() {
  const { userCourses } = useTopicContext();

  return (
    <div className='w-full h-max grid xl:grid-cols-4 lg:grid-cols-3 gap-8 py-8 overflow-y-auto'>
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
