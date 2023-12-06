import React, { useState, useRef, useEffect } from 'react';
import useTopicContext from './useTopicContext';

import Loader from './components/Loader';
import Dashboard from './components/dashboard/Dashboard';
import Sidebar from './components/other/Sidebar';

function Home() {
  const { isLoading } = useTopicContext();

  return (
    <div className='w-screen h-screen flex flex-col grow items-center bg-tertiary-tan'>
      <div className='w-full h-screen flex grow items-center'>
        <Sidebar />
        <Dashboard />
      </div>

      {isLoading && (
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] flex items-center justify-center bg-tertiary-grey rounded-full border-2 border-secondary-grey'>
          <Loader />
        </div>
      )}
    </div>
  );
}

export default Home;

// const topicSearchRef = useRef(null);
// topicSearchRef={topicSearchRef}
// {showSearchBar && <SearchBar />}
// scrollToBriefSummary={scrollToBriefSummary}

// const scrollToBriefSummary = () => {
//   if (briefSummaryRef.current) {
//     const elementRect = briefSummaryRef.current.getBoundingClientRect();
//     const absoluteElementTop = elementRect.top + window.scrollY;
//     const middle =
//       absoluteElementTop - window.innerHeight / 2 + elementRect.height / 2;
//     window.scrollTo({ top: middle, behavior: 'smooth' });
//   }
// };

// useEffect(() => {
//   const scrolledPastTopicSearch = () => {
//     if (topicSearchRef.current) {
//       const refBottom = topicSearchRef.current.getBoundingClientRect().bottom;
//       if (window.scrollY < refBottom) {
//         setShowSearchBar(false);
//       } else {
//         setShowSearchBar(true);
//       }
//     }
//   };

//   window.addEventListener('scroll', scrolledPastTopicSearch);

//   return () => {
//     window.removeEventListener('scroll', scrolledPastTopicSearch);
//   };
// }, []);

{
  /* <div className='w-full flex flex-col gap-20 pb-16'>
          <BriefSummary briefSummaryRef={briefSummaryRef} />
          <RelevantLinks />
          <RecentTopics scrollToBriefSummary={scrollToBriefSummary} />
        </div> */
}
