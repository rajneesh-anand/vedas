import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { shuffle } from '@components/quiz/helper/utils';
import Heading from '@components/ui/heading';
import Link from '@components/ui/link';
import Image from '@components/ui/image';
const placeholderImage = `/assets/placeholder/products/product-grid.svg`;
import Text from '@components/ui/text';

const Main = ({ startQuiz }) => {
  const [category, setCategory] = useState('');
  const [numOfQuestions, setNumOfQuestions] = useState(30);
  const [difficulty, setDifficulty] = useState('0');
  const [questionsType, setQuestionsType] = useState('0');
  const [countdownTime, setCountdownTime] = useState({
    hours: 0,
    minutes: 900,
    seconds: 0,
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setProcessing(true);

    if (error) setError(null);

    const API = 'https://opentdb.com/api.php?amount=30&difficulty=medium';

    fetch(API)
      .then((respone) => respone.json())
      .then((data) =>
        setTimeout(() => {
          const { response_code, results } = data;
          console.log(results);

          if (response_code === 1) {
            const message = (
              <p>
                The API doesn't have enough questions for your query. (Ex.
                Asking for 50 Questions in a Category that only has 20.)
                <br />
                <br />
                Please change the <strong>No. of Questions</strong>,{' '}
                <strong>Difficulty Level</strong>, or{' '}
                <strong>Type of Questions</strong>.
              </p>
            );

            setProcessing(false);
            setError({ message });

            return;
          }

          results.forEach((element) => {
            element.options = shuffle([
              element.correct_answer,
              ...element.incorrect_answers,
            ]);
          });

          setProcessing(false);
          startQuiz(
            results,
            countdownTime.hours + countdownTime.minutes + countdownTime.seconds
          );
        }, 1000)
      )
      .catch((error) =>
        setTimeout(() => {
          if (!navigator.onLine) {
            setOffline(true);
          } else {
            setProcessing(false);
            setError(error);
          }
        }, 1000)
      );
  };

  return (
    <div className="pt-10 lg:pt-12 xl:pt-14 pb-14 lg:pb-16 xl:pb-20 px-4 md:px-8">
      <div className="w-full xl:max-w-[1490px] mx-auto">
        <Heading variant="titleLarge" className="mb-4 lg:mb-6">
          Select Quiz Test
        </Heading>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5 xl:gap-6">
          <div className="flex items-center px-5 xl:px-7 py-5 xl:py-7 border border-skin-base rounded-lg shadow-vendorCard cursor-pointer relative bg-white transition-all hover:shadow-vendorCardHover">
            <div className="relative flex flex-shrink-0 items-center justify-center bg-skin-thumbnail rounded-full overflow-hidden w-16 xl:w-20 h-16 xl:h-20">
              {/* <Image
                alt="bgLogo"
                src={placeholderImage}
                layout="fill"
                objectFit="cover"
              /> */}
            </div>

            <div className="flex flex-col ms-4 xl:ms-5">
              <Heading variant="mediumHeading" className="pb-1.5">
                Trivia Quiz Test
              </Heading>
              <Text className="xl:leading-6 mb-0">Time : 15 Minutes</Text>
              <Text className="xl:leading-6 mb-0">Total Questions : 30</Text>

              <button
                onClick={fetchData}
                class="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm"
              >
                {processing ? 'Processing...' : 'Play Now'}{' '}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Main.propTypes = {
  startQuiz: PropTypes.func.isRequired,
};

export default Main;
