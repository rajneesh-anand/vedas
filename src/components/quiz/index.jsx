import React, { useState } from 'react';
import Main from '@components/quiz/main';
import Quiz from '@components/quiz/quiz';
import Result from '@components/quiz/result';

const MockTestContent = () => {
  const [data, setData] = useState(null);
  const [countdownTime, setCountdownTime] = useState(null);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [resultData, setResultData] = useState(null);

  const startQuiz = (data, countdownTime) => {
    setCountdownTime(countdownTime);

    setTimeout(() => {
      setData(data);
      setIsQuizStarted(true);
    }, 1000);
  };

  const endQuiz = (resultData) => {
    setTimeout(() => {
      setIsQuizStarted(false);
      setIsQuizCompleted(true);
      setResultData(resultData);
    }, 2000);
  };

  const resetQuiz = () => {
    setTimeout(() => {
      setData(null);
      setCountdownTime(null);
      setIsQuizStarted(false);
      setIsQuizCompleted(false);
      setResultData(null);
    }, 1000);
  };

  return (
    <>
      {!isQuizStarted && !isQuizCompleted && <Main startQuiz={startQuiz} />}
      {isQuizStarted && (
        <Quiz data={data} countdownTime={countdownTime} endQuiz={endQuiz} />
      )}
      {isQuizCompleted && <Result {...resultData} resetQuiz={resetQuiz} />}
    </>
  );
};

export default MockTestContent;
