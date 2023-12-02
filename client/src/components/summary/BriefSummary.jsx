import React from 'react';
import ActiveTopic from './ActiveTopic';
import MainSummary from './MainSummary';

function BriefSummary({ briefSummaryRef }) {
  return (
    <div
      ref={briefSummaryRef}
      className='flex justify-between gap-8'
    >
      <MainSummary />
      <ActiveTopic />
    </div>
  );
}

export default BriefSummary;
