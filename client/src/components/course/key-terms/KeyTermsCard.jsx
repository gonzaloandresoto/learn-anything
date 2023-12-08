import React, { useState, useEffect, useRef } from 'react';

function KeyTermsCard({ term, definition }) {
  const cardRef = useRef(null);
  const [showDefinition, setShowDefinition] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setShowDefinition(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setShowDefinition(true);
  };

  return (
    <>
      <div className='w-full h-max bg-white rounded-lg shadow-sm'>
        <button
          onClick={handleClick}
          className='w-full h-full flex flex-col gap-1 px-4 py-6'
        >
          <p className='text-xl text-black font-bold'>{term}</p>
          <p className='text-sm text-primary-tan font-medium'>Definition</p>
        </button>
      </div>
      {showDefinition && (
        <div
          ref={cardRef}
          className='absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-[640px] h-max flex flex-col gap-2 py-6 px-8 bg-white rounded-xl shadow-md z-10'
        >
          <p className='text-2xl text-black font-bold'>{term}</p>
          <p className='text-lg text-black font-medium'>{definition}</p>
        </div>
      )}
    </>
  );
}

export default KeyTermsCard;
