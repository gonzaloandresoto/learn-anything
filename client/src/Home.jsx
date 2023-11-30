import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import useTopicContext from './useTopicContext';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function Home() {
  const {
    searchTopic,
    deepdiveIntoTopic,
    quizAboutTopic,
    topic,
    setTopic,
    briefSummary,
    activeTopic,
    setActiveTopic,
    funLinks,
  } = useTopicContext();

  const handleChange = (e) => {
    setTopic(e.target.value);
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
              {briefSummary?.topics?.map((item, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => setActiveTopic(item.name)}
                    className={`flex justify-between px-3 py-2 rounded-md cursor-pointer ${
                      activeTopic === item?.name
                        ? 'bg-primary-indigo'
                        : 'bg-secondary-indigo'
                    }`}
                  >
                    <p
                      className={`text-sm font-medium ${
                        activeTopic === item?.name
                          ? 'text-white'
                          : 'text-primary-indigo'
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
              })}
            </div>
          </div>

          <div className='flex flex-col gap-4 w-[480px] items-end'>
            <p className='text-xl text-primary-black font-medium'>
              {activeTopic && activeTopic}
            </p>
            <p className='text-base text-primary-black font-regular'>
              {activeTopic &&
                briefSummary?.topics?.find((item) => item.name === activeTopic)
                  ?.summary}
            </p>
            <div className='flex gap-2'>
              <div>
                <button
                  onClick={() => deepdiveIntoTopic(activeTopic, topic)}
                  className='flex items-center gap-4 px-3 py-2 bg-primary-indigo rounded-md text-sm text-white font-semibold'
                >
                  <p>Learn more</p>
                  <p>→</p>
                </button>
              </div>
              <div>
                <button
                  onClick={() => quizAboutTopic(activeTopic, topic)}
                  className='flex items-center gap-4 px-3 py-2 bg-primary-indigo rounded-md text-sm text-white font-semibold'
                >
                  <p>Quiz me</p>
                  <p>→</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <p className='text-xl text-primary-black font-medium'>Fun Links</p>
          <p className='text-base text-primary-black font-regular'>
            {funLinks?.map((item, index) => (
              <div
                key={index}
                className='flex items-center justify-between hover:text-primary-indigo hover:underline'
              >
                <a
                  href={item.url}
                  target='_blank'
                  className='w-[600px]'
                >
                  {item.title}
                </a>
                <a
                  href={item.url}
                  target='_blank'
                >
                  {item.author}
                </a>
              </div>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
