import React from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import SignOut from '../../assets/signout.svg';

function Sidebar() {
  const { signOut } = useAuthContext();

  return (
    <div className='w-[88px] h-screen flex flex-col items-center justify-between py-8 bg-secondary-tan'>
      <div className='h-max mt-40'>
        <p className='text-2xl text-primary-tan font-bold rotate-90 whitespace-nowrap'>
          learn anything
        </p>
      </div>
      <button
        onClick={signOut}
        className='flex-none flex w-[56px] h-[56px] items-center justify-center bg-tertiary-tan hover:border border-primary-tan rounded-lg'
      >
        <img src={SignOut} />
      </button>
    </div>
  );
}

export default Sidebar;
