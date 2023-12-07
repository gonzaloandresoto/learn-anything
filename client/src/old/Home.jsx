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
