import React, { useEffect, useRef } from 'react';
import useTopicContext from '../../useTopicContext';

function Sidesheet() {
  const { showSidesheet, setShowSidesheet } = useTopicContext();
  const sidesheetRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidesheetRef.current && !sidesheetRef.current.contains(e.target)) {
        setShowSidesheet(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={sidesheetRef}
      className={`fixed top-0 right-0 w-[560px] h-screen bg-white z-20 transform ${
        showSidesheet ? 'translate-x-0' : 'translate-x-full'
      } transition-transform ease-in-out duration-300`}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Sidesheet;
