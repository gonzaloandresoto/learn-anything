import React, { useState, useEffect } from 'react';
import CarouselTitleCard from './CarouselTitleCard';
import CarouselCard from './CarouselCard';
import useTopicContext from '../../useTopicContext';

function Carousel({ parentRef }) {
  const { courseData } = useTopicContext();
  const [carouselPadding, setCarouselPadding] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (parentRef.current) {
        const containerWidth = parentRef.current.offsetWidth;
        const windowWidth = window.innerWidth;
        const padding = (windowWidth - containerWidth) / 2;
        setCarouselPadding(padding > 0 ? padding : 0);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [parentRef]);

  return (
    <div
      className='flex flex-row gap-8 w-full min-h-[640px] overflow-x-auto hide-scrollbar'
      style={{
        paddingLeft: `${carouselPadding}px`,
        paddingRight: `${carouselPadding}px`,
      }}
    >
      <CarouselTitleCard />
      <div className='w-max h-full flex flex-row gap-8 '>
        {courseData?.topics?.map((subtopic, index) => (
          <CarouselCard
            key={index}
            index={index}
            unit={subtopic.unit}
            introduction={subtopic.introduction}
            content1={subtopic.inDepthContent1}
            content2={subtopic.inDepthContent2}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
