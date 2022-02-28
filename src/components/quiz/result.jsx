import React, { useState } from 'react';

import {
  calculateScore,
  calculateGrade,
  timeConverter,
} from '@components/quiz/helper/utils';

const QNA = ({ questionsAndAnswers }) => {
  return (
    <table className="my-16">
      <thead>
        <tr>
          <th>No.</th>
          <th>Questions.</th>
          <th>Your Answer</th>
          <th>Correct Answer</th>
          <th>Point</th>
        </tr>
      </thead>
      <tbody>
        {questionsAndAnswers.map((item, i) => (
          <tr key={i + 1}>
            <td>{i + 1}</td>
            <td>{item.question}</td>
            <td>{item.user_answer}</td>
            <td>{item.correct_answer}</td>
            <td>{item.point}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Stats = ({
  totalQuestions,
  correctAnswers,
  timeTaken,
  replayQuiz,
  resetQuiz,
}) => {
  const score = calculateScore(totalQuestions, correctAnswers);
  const { grade, remarks } = calculateGrade(score);
  const { hours, minutes, seconds } = timeConverter(timeTaken);

  return (
    <div className="text-center my-16">
      <h1>{remarks}</h1>
      <h1>Grade: {grade}</h1>
      <h1>Total Questions: {totalQuestions}</h1>
      <h1>Correct Answers: {correctAnswers}</h1>
      <h1>Your Score: {score}%</h1>
      <h1>Passing Score: 60%</h1>

      <h3>
        Time Taken:{' '}
        {`${Number(hours)}h ${Number(minutes)}m ${Number(seconds)}s`}
      </h3>

      {/* <button onClick={replayQuiz} style={{ marginRight: 15, marginBottom: 8 }}>
        Play Again
      </button> */}
    </div>
  );
};

const Result = ({
  totalQuestions,
  correctAnswers,
  timeTaken,
  questionsAndAnswers,
  replayQuiz,
  resetQuiz,
}) => {
  const [activeTab, setActiveTab] = useState('Stats');

  const handleTabClick = (value) => {
    setActiveTab(value);
  };

  return (
    <>
      <ul className="flex justify-center items-center">
        <li
          onClick={() => handleTabClick('Stats')}
          className={
            activeTab === 'Stats'
              ? 'px-16 py-2 border cursor-pointer text-white bg-blue-700 '
              : 'px-16 py-2 border cursor-pointer text-white bg-blue-300 hover:bg-blue-700 '
          }
        >
          <div className="text-center">RESULT</div>
        </li>
        <li
          onClick={() => handleTabClick('QNA')}
          className={
            activeTab === 'QNA'
              ? 'px-16 py-2 border cursor-pointer text-white bg-blue-700 '
              : 'px-16 py-2 border cursor-pointer text-white bg-blue-300 hover:bg-blue-700 '
          }
        >
          <div className="text-center">QNA</div>
        </li>
      </ul>

      {activeTab === 'Stats' && (
        <Stats
          totalQuestions={totalQuestions}
          correctAnswers={correctAnswers}
          timeTaken={timeTaken}
          replayQuiz={replayQuiz}
          resetQuiz={resetQuiz}
        />
      )}
      {activeTab === 'QNA' && <QNA questionsAndAnswers={questionsAndAnswers} />}
    </>
  );
};

export default Result;
