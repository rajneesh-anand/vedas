import React, { useState } from 'react';
import PropTypes from 'prop-types';

import he from 'he';

import Countdown from '@components/quiz/helper/countdown';
import { getLetter } from '@components/quiz/helper/utils';

const Quiz = ({ data, countdownTime, endQuiz }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [userSlectedAns, setUserSlectedAns] = useState(null);
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
  const [timeTaken, setTimeTaken] = useState(null);
  const [active, setActive] = useState(false);

  const handleItemClick = (value) => {
    setUserSlectedAns(value);
    setActive(!active);
  };

  const handleNext = () => {
    let point = 0;
    if (userSlectedAns === he.decode(data[questionIndex].correct_answer)) {
      point = 1;
    }

    const qna = questionsAndAnswers;
    qna.push({
      question: he.decode(data[questionIndex].question),
      user_answer: userSlectedAns,
      correct_answer: he.decode(data[questionIndex].correct_answer),
      point,
    });

    if (questionIndex === data.length - 1) {
      return endQuiz({
        totalQuestions: data.length,
        correctAnswers: correctAnswers + point,
        timeTaken,
        questionsAndAnswers: qna,
      });
    }

    setCorrectAnswers(correctAnswers + point);
    setQuestionIndex(questionIndex + 1);
    setUserSlectedAns(null);
    setQuestionsAndAnswers(qna);
  };

  const timeOver = (timeTaken) => {
    return endQuiz({
      totalQuestions: data.length,
      correctAnswers,
      timeTaken,
      questionsAndAnswers,
    });
  };

  return (
    <div className="my-[60px]">
      <div className="flex justify-between items-center">
        <h1>{`Question No.${questionIndex + 1} of ${data.length}`}</h1>

        <Countdown
          countdownTime={countdownTime}
          timeOver={timeOver}
          setTimeTaken={setTimeTaken}
        />
      </div>

      <div className="question-list mt-8">
        <h1 className="text-[14px] lg:text-[18px] ">
          <b>{`Q. ${he.decode(data[questionIndex].question)}`}</b>
        </h1>
        <p>Please choose one of the following answers:</p>
      </div>

      <ul className="question-list my-8">
        {data[questionIndex].options.map((option, i) => {
          const letter = getLetter(i);
          const decodedOption = he.decode(option);

          return (
            <li
              key={decodedOption}
              name={decodedOption}
              onClick={() => handleItemClick(decodedOption)}
              className={
                userSlectedAns === decodedOption ? 'active py-4' : 'py-4'
              }
            >
              <b style={{ marginRight: '8px' }}>{letter}</b>
              {decodedOption}
            </li>
          );
        })}
      </ul>
      <div className="text-end mb-8">
        <button
          onClick={handleNext}
          disabled={!userSlectedAns}
          className={
            userSlectedAns
              ? 'px-6 py-2 text-base font-semibold text-white no-underline bg-blue-600 border border-transparent border-solid rounded cursor-pointer select-none  hover:bg-blue-700 hover:border-blue-700 hover:text-white focus-within:bg-blue-700 focus-within:border-blue-700 '
              : 'px-6 py-2 font-semibold text-white no-underline border border-transparent border-solid rounded  disabled:transform-none disabled:transition-none disabled:bg-blue-200 disabled:cursor-not-allowed disabled:text-white transition duration-500 ease-in-out transform hover:translate-x-1 hover:scale-110 hover:blue-300 hover:shadow-md disabled:shadow-none'
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

Quiz.propTypes = {
  data: PropTypes.array.isRequired,
  countdownTime: PropTypes.number.isRequired,
  endQuiz: PropTypes.func.isRequired,
};

export default Quiz;
