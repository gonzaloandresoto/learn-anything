import axios from 'axios';
import RelevantLinks from './components/RelevantLinks';
import RecentTopics from './components/RecentTopics';
import BriefSummary from './components/BriefSummary';
import TopicSearch from './components/TopicSearch';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function Home() {
  return (
    <div className='w-screen h-screen flex flex-col grow items-center bg-white'>
      <div className='w-2/3 flex flex-col gap-12 py-16'>
        <div className='flex justify-center'>
          <div className='flex items-center gap-4 border border-secondary-grey rounded-md'>
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
        </div>
        <TopicSearch />
        <BriefSummary />

        <RelevantLinks />
        <RecentTopics />
      </div>
    </div>
  );
}

export default Home;
