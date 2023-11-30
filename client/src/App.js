import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
  const [topic, setTopic] = useState('');
  const [briefSummary, setBriefSummary] = useState({});
  const [activeTopic, setActiveTopic] = useState('');

  const handleChange = (e) => {
    setTopic(e.target.value);
  };

  const searchTopic = async () => {
    try {
      console.log('Sent search to DB');
      const res = await axios.post('/search_concept', { topic });
      console.log(res?.data?.choices?.[0]);
      console.log(res?.data?.choices?.[0]?.message?.content);
      setBriefSummary(JSON.parse(res?.data?.choices?.[0]?.message?.content));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-screen h-screen flex flex-col grow items-center bg-white'>
      <div className='w-2/3 flex flex-col gap-12 py-16'>
        <div className='flex flex-col gap-4'>
          <p className='text-lg text-primary-black font-semibold'>
            I want to learn about...
          </p>
          <div className='flex items-center'>
            <input
              value={topic}
              onChange={handleChange}
              placeholder='Topic'
              className='w-full text-3xl text-primary-black font-medium py-2 outline-none placeholder:text-primary-grey'
            />
            <button
              onClick={() => searchTopic()}
              className='w-[48px] h-[48px] rounded-md bg-primary-indigo text-white text-xl font-bold'
            >
              →
            </button>
          </div>
        </div>

        <div className='flex justify-between'>
          <div className='flex flex-col gap-4 w-[400px]'>
            <p className='text-xl text-primary-black font-medium'>
              Brief Summary
            </p>
            <p>{briefSummary?.summary}</p>
            <div className='flex flex-col gap-2'>
              {briefSummary?.topics?.map((item) => {
                return (
                  <div
                    onClick={() => setActiveTopic(item.name)}
                    className='px-3 py-1 bg-primary-indigo rounded-md cursor-pointer'
                  >
                    <p className='text-base text-white font-regular'>
                      {item.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className='flex flex-col gap-4 w-[400px] bg-primary-blue text-white'>
            <p>
              {activeTopic &&
                briefSummary?.topics?.find((item) => item.name === activeTopic)
                  ?.summary}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
