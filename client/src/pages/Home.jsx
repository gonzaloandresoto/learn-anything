import React, { useState, useRef, useEffect } from 'react';
import useTopicContext from '../hooks/useTopicContext';

import Loader from '../components/other/Loader';
import Dashboard from './Dashboard';
import Sidebar from '../components/other/Sidebar';

function Home() {
  console.log('Home.jsx');
  const { isLoading } = useTopicContext();

  return (
    <div className='w-screen h-screen flex flex-col grow items-center bg-tertiary-tan'>
      <div className='w-full h-screen flex grow items-center'>
        <Sidebar />
        <Dashboard />
      </div>

      {isLoading && (
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] flex items-center justify-center bg-tertiary-tan rounded-full border-2 border-secondary-tan'>
          <Loader />
        </div>
      )}
    </div>
  );
}

export default Home;
