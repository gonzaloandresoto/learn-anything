// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function QuizQuestion({
//   item,
//   activeQuestion,
//   setActiveQuestion,
//   quizScore,
//   setQuizScore,
//   maxScore,
// }) {
//   const navigate = useNavigate();
//   const [selectedOption, setSelectedOption] = useState('');

//   const selectCorrectAnswer = () => {
//     if (activeQuestion === maxScore) {
//       navigate('/home');
//     } else if (activeQuestion < maxScore) {
//       setActiveQuestion(activeQuestion + 1);
//       setQuizScore(quizScore + 1);
//     }
//   };

//   return (
//     <div
//       key={item.id}
//       className='flex flex-col gap-4'
//     >
//       <p className='text-xl text-primary-black font-medium'>{item?.question}</p>
//       <div className='flex flex-col gap-2'>
//         {item?.options?.map((option) => {
//           return (
//             <button
//               key={option.id}
//               onClick={() => setSelectedOption(option?.id)}
//               className={`flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer
//               ${
//                 selectedOption === option?.id
//                   ? 'bg-primary-indigo text-white'
//                   : 'bg-tertiary-grey text-primary-black'
//               }`}
//             >
//               <p>🔘</p>
//               <p>{option?.text}</p>
//             </button>
//           );
//         })}
//       </div>
//       <button
//         disabled={selectedOption !== item?.correctAnswer}
//         onClick={() => selectCorrectAnswer()}
//         className={`py-2 text-white text-base font-semibold rounded-md
//         ${
//           selectedOption === item?.correctAnswer
//             ? 'bg-primary-indigo text-white'
//             : 'bg-secondary-indigo text-primary-black'
//         }`}
//       >
//         Continue
//       </button>
//       <div></div>
//     </div>
//   );
// }

// export default QuizQuestion;
