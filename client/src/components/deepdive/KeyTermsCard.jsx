import React from 'react';

function KeyTermsCard({ term }) {
  return (
    <div className='w-full h-max px-4 py-6 bg-white rounded-lg shadow-sm'>
      <button className='w-full h-max flex flex-col gap-1'>
        <p className='text-xl text-primary-black font-bold'>{term}</p>
        <p className='text-sm text-primary-tan font-medium'>Definition</p>
      </button>
    </div>
  );
}

export default KeyTermsCard;
