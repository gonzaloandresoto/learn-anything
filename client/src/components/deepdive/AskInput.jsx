import React from 'react';

function AskInput() {
  return (
    <div className='relative w-full h-max flex grow'>
      <input
        placeholder='Ask a follow up'
        className='w-full h-[48px] px-4 bg-secondary-tan border border-primary-tan rounded-full text-primary-tan placeholder:text-primary-tan outline-none'
      />
      <div className='absolute top-1 right-1 w-[40px] h-[40px] bg-primary-tan rounded-full overflow-hidden'>
        <button className='w-full h-full flex items-center justify-center text-medium text-tertiary-tan font-semibold'>
          →
        </button>
      </div>
    </div>
  );
}

export default AskInput;
