import React, { useState, useEffect, useRef } from 'react';
import CarouselTitleCard from './CarouselTitleCard';
import CarouselCard from './CarouselCard';
import useTopicContext from '../../useTopicContext';

function Carousel({ parentRef }) {
  const { courseData, focusedSlide } = useTopicContext();
  const [carouselPadding, setCarouselPadding] = useState(0);
  const carouselRef = useRef();
  const singleSlideRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      if (parentRef.current) {
        const cardWidth = parentRef.current.offsetWidth;
        const windowWidth = window.innerWidth;
        const padding = (windowWidth - cardWidth) / 2;
        setCarouselPadding(padding > 0 ? padding : 0);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [parentRef]);

  useEffect(() => {
    const gapSpacing = 8 * 4;
    if (singleSlideRef.current && carouselRef.current && focusedSlide != null) {
      const slideWidth = singleSlideRef.current.offsetWidth;

      const scrollPosition = (slideWidth + gapSpacing) * (focusedSlide + 1);

      carouselRef.current.scrollLeft = scrollPosition > 0 ? scrollPosition : 0;
    }
  }, [focusedSlide]);

  return (
    <div
      ref={carouselRef}
      className='flex flex-row gap-8 w-full min-h-[640px] overflow-x-auto hide-scrollbar'
      style={{
        paddingLeft: `${carouselPadding}px`,
        paddingRight: `${carouselPadding}px`,
      }}
    >
      <div ref={singleSlideRef}>
        <CarouselTitleCard />
      </div>

      <div className='w-max h-full flex flex-row gap-8 '>
        {courseData?.topics &&
          courseData?.topics?.map((subtopic, index) => (
            <div>
              <CarouselCard
                key={index}
                index={index}
                unit={subtopic.unit}
                introduction={subtopic.introduction}
                content1={subtopic.inDepthContent1}
                content2={subtopic.inDepthContent2}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Carousel;
