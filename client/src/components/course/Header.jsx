import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Settings from '../../assets/settings.svg';
import Table from '../../assets/table.svg';
import TableofContentsDropdown from './TableofContentsDropdown';

function Header() {
  const [showTableContents, setShowTableContents] = useState(false);
  const navigate = useNavigate();

  const handleTableContents = (e) => {
    e.stopPropagation();
    setShowTableContents(!showTableContents);
  };

  const handleBack = () => {
    navigate('/home');
  };

  return (
    <div className='max-w-[1080px] w-full h-max flex flex-row items-center justify-between py-4'>
      <div className='flex w-[200px] h-max justify-start'>
        <div className='flex w-[48px] h-[48px] bg-primary-tan rounded-md overflow-hidden'>
          <button
            onClick={handleBack}
            className='w-full h-full flex items-center justify-center text-white'
          >
            ←
          </button>
        </div>
      </div>

      <div className='flex flex-col items-center'>
        <p className='text-xl text-primary-tan font-bold'>Time Travel</p>
        <p className='text-2xl text-primary-black font-bold'>
          Scientific Background
        </p>
      </div>
      <div className='w-[200px] h-max flex gap-2 justify-end'>
        <div className='relative flex justify-end'>
          <div className='flex w-[48px] h-[48px] bg-tertiary-tan border border-primary-tan text-primary-tan rounded-md overflow-hidden'>
            <button
              onClick={(e) => handleTableContents(e)}
              className='w-full h-full flex items-center justify-center'
            >
              <img src={Table} />
            </button>
          </div>
          {showTableContents && (
            <TableofContentsDropdown
              setShowTableContents={setShowTableContents}
            />
          )}
        </div>

        <div className='flex w-[48px] h-[48px] bg-tertiary-tan border border-primary-tan text-primary-tan rounded-md overflow-hidden'>
          <button className='w-full h-full flex items-center justify-center'>
            <img src={Settings} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
