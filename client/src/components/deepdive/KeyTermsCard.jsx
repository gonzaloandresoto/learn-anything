import React, { useState, useEffect, useRef } from 'react';

function KeyTermsCard({ term, definition }) {
  const cardRef = useRef(null);
  const [showDefinition, setShowDefinition] = useState(false);

  const handleClick = () => {
    setShowDefinition(true);
  };

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

  return (
    <>
      <div className='w-full h-max bg-white rounded-lg shadow-sm'>
        <button
          onClick={handleClick}
          className='w-full h-full flex flex-col gap-1 px-4 py-6'
        >
          <p className='text-xl text-primary-black font-bold'>{term}</p>
          <p className='text-sm text-primary-tan font-medium'>Definition</p>
        </button>
      </div>
      {showDefinition && (
        <div
          ref={cardRef}
          className='absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-[480px] h-max py-6 px-8 bg-white rounded-lg shadow-md z-10'
        >
          <p className='text-2xl text-primary-black font-bold'>{term}</p>
          <p className='text-lg text-primary-black font-medium'>{definition}</p>
        </div>
      )}
    </>
  );
}

export default KeyTermsCard;
