import React, { useRef } from 'react';
import { useFormData } from '@contexts/search/plan.context';

type Props = {
  formStep: number;
  nextFormStep: () => void;
};

const BoardInfo: React.FC<Props> = ({ formStep, nextFormStep }) => {
  const { studentInfo, setBoard } = useFormData();

  console.log(studentInfo);

  function handleClick(data: string) {
    setBoard(data);
    nextFormStep();
  }

  return (
    <div className={formStep === 0 ? 'block text-center' : 'hidden'}>
      <div className="mb-8">
        <p className="text-yellow-900 text-[22px]">
          What is the Board Affiliation of your school ?{' '}
        </p>
      </div>

      <div>
        <button
          type="button"
          className="text-white w-64 bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium  text-sm px-10 py-5 text-center mb-4 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          onClick={() => handleClick('cbse-ncert')}
        >
          NCERT / CBSE BOARD
        </button>
      </div>

      <div>
        <button
          type="button"
          className="text-white w-64 bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium text-sm px-10 py-5 text-center mb-4 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          onClick={() => handleClick('icse')}
        >
          ICSE BOARD
        </button>
      </div>

      <div>
        <button
          type="button"
          className="text-white w-64 bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium text-sm px-10 py-5 text-center mb-4 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          onClick={() => handleClick('others')}
        >
          OTHERS
        </button>
      </div>
    </div>
  );
};

export default BoardInfo;
