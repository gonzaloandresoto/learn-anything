import React from 'react';
import Search from './Search';
import CourseGrid from './CourseGrid';

function Dashboard() {
  return (
    <div className='max-w-[1080px] w-full h-screen flex flex-col items-center bg-tertiary-tan'>
      <div className='w-full h-[48px] bg-tertiary-tan'></div>
      <Search />
      <CourseGrid />
    </div>
  );
}

export default Dashboard;
