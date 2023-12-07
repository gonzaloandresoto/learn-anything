import React from 'react';
import KeyTermsCard from './KeyTermsCard';
import useTopicContext from '../../hooks/useTopicContext';

function KeyTerms() {
  const { keyTerms } = useTopicContext();
  return (
    <div className='w-full h-max flex flex-col gap-4 bg-tertiary-tan'>
      <p className='text-2xl text-primary-tan font-bold'>Key Terms</p>
      <div className='w-full h-max grid grid-cols-3 gap-4'>
        {keyTerms &&
          keyTerms.map((term, index) => (
            <KeyTermsCard
              key={index}
              term={term.term}
              definition={term.definition}
            />
          ))}
      </div>
    </div>
  );
}

export default KeyTerms;
