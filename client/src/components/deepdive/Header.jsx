import React from 'react';
import Settings from '../../assets/settings.svg';

function Header() {
  return (
    <div className='w-full h-max flex flex-row items-center justify-between py-4'>
      <div className='flex w-[48px] h-[48px] bg-primary-tan rounded-md overflow-hidden'>
        <button className='w-full h-full flex items-center justify-center text-white'>
          ←
        </button>
      </div>
      <div className='flex flex-col items-center'>
        <p className='text-xl text-primary-tan font-bold'>Time Travel</p>
        <p className='text-2xl text-primary-black font-bold'>
          Scientific Background
        </p>
      </div>
      <div className='flex w-[48px] h-[48px] bg-secondary-tan border border-primary-tan text-primary-tan rounded-md overflow-hidden'>
        <button className='w-full h-full flex items-center justify-center'>
          <img src={Settings} />
        </button>
      </div>
    </div>
  );
}

export default Header;
