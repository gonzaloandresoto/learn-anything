import React from 'react';
import useTopicContext from '../../useTopicContext';

function TopicButton({ item }) {
  const { setActiveTopic, activeTopic } = useTopicContext();
  return (
    <div
      onClick={() => setActiveTopic(item.name)}
      className={`flex justify-between px-3 py-2 rounded-md cursor-pointer ${
        activeTopic === item?.name ? 'bg-primary-indigo' : 'bg-secondary-indigo'
      }`}
    >
      <p
        className={`text-lg font-medium ${
          activeTopic === item?.name ? 'text-white' : 'text-primary-indigo'
        }`}
      >
        {item.name}
      </p>
      <p
        className={`text-sm font-medium ${
          activeTopic === item?.name
            ? 'text-secondary-indigo'
            : 'text-primary-indigo'
        }`}
      >
        →
      </p>
    </div>
  );
}

export default TopicButton;
