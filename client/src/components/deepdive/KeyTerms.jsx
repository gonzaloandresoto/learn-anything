import React from 'react';
import KeyTermsCard from './KeyTermsCard';

function KeyTerms() {
  return (
    <div className='w-full h-max flex flex-col gap-4 bg-secondary-tan'>
      <p className='text-2xl text-primary-tan font-bold'>Key Terms</p>
      <div className='w-full h-max grid grid-cols-3 gap-4'>
        <KeyTermsCard term={'Science Fiction'} />
        <KeyTermsCard term={'Paradox'} />
        <KeyTermsCard term={'Time Travel'} />
      </div>
    </div>
  );
}

export default KeyTerms;
