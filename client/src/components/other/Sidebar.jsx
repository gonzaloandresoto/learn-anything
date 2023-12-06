import React from 'react';
import useAuthContext from '../../hooks/useAuthContext';

function Sidebar() {
  const { signOut } = useAuthContext();

  return (
    <div className='w-[88px] h-screen flex flex-col bg-secondary-tan'>
      <button onClick={signOut}>Out</button>
    </div>
  );
}

export default Sidebar;
