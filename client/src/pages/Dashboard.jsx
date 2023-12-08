import React from 'react';
import Search from '../components/dashboard/Search';
import CourseGrid from '../components/dashboard/CourseGrid';

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
