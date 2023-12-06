import React from 'react';
import useTopicContext from '../../useTopicContext';
import CourseCard from './CourseCard';
function CourseGrid() {
  const { userCourses } = useTopicContext();
  console.log(userCourses);

  return (
    <div className='w-full h-full grid grid-cols-3 gap-4 py-6'>
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
