import React, { useRef } from 'react';
import RelevantLinks from './components/RelevantLinks';
import RecentTopics from './components/RecentTopics';
import BriefSummary from './components/summary/BriefSummary';
import TopicSearch from './components/TopicSearch';

function Home() {
  const briefSummaryRef = useRef(null);

  const scrollToBriefSummary = () => {
    if (briefSummaryRef.current) {
      const elementRect = briefSummaryRef.current.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.scrollY;
      const middle =
        absoluteElementTop - window.innerHeight / 2 + elementRect.height / 2;
      window.scrollTo({ top: middle, behavior: 'smooth' });
    }
  };

  return (
    <div className='w-screen h-screen flex flex-col grow items-center bg-white'>
      <div className='w-full px-24 flex flex-col gap-12 pb-16'>
        <TopicSearch scrollToBriefSummary={scrollToBriefSummary} />
        <BriefSummary briefSummaryRef={briefSummaryRef} />

        <RelevantLinks />
        <RecentTopics />
      </div>
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
