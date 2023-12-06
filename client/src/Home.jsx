import React, { useState, useRef, useEffect } from 'react';
import RelevantLinks from './components/RelevantLinks';
import RecentTopics from './components/RecentTopics';
import BriefSummary from './components/summary/BriefSummary';
import TopicSearch from './components/TopicSearch';
import useTopicContext from './useTopicContext';

import Loader from './components/Loader';
import SearchBar from './components/nav/SearchBar';
import LearningPLan from './components/plan/LearningPLan';

function Home() {
  const { isLoading } = useTopicContext();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const briefSummaryRef = useRef(null);
  const topicSearchRef = useRef(null);

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

  return (
    <div className='w-screen h-screen flex flex-col grow items-center bg-white'>
      <div className='w-full px-24 flex flex-col items-center gap-12'>
        {showSearchBar && <SearchBar />}
        <TopicSearch
          topicSearchRef={topicSearchRef}
          // scrollToBriefSummary={scrollToBriefSummary}
        />
        {/* <div className='w-full flex flex-col gap-20 pb-16'>
          <BriefSummary briefSummaryRef={briefSummaryRef} />
          <RelevantLinks />
          <RecentTopics scrollToBriefSummary={scrollToBriefSummary} />
        </div> */}
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

{
  /* <div className='flex justify-center'>
          <div className='flex items-center border border-secondary-grey rounded-md'>
            <button
              className={`w-[104px] py-1 text-sm text-white font-medium bg-primary-indigo rounded-md`}
            >
              Home
            </button>
            <button
              className={`w-[104px] py-1 text-sm text-primary-black font-medium bg-white rounded-md`}
            >
              Me
            </button>
          </div>
        </div> */
}
