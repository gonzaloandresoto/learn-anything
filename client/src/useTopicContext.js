import { useContext } from 'react';
import TopicContext from './TopicContext';

const useTopicContext = () => {
  const context = useContext(TopicContext);
  return context;
};

export default useTopicContext;
