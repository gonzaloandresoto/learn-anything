import React from 'react';
import Search from './Search';
import CourseGrid from './CourseGrid';

function Dashboard() {
  return (
    <div className='w-full h-screen flex flex-col grow items-center px-8 bg-tertiary-tan'>
      <div className='w-full h-[48px] bg-tertiary-tan'></div>
      <Search />
      <CourseGrid />
    </div>
  );
}

export default Dashboard;
