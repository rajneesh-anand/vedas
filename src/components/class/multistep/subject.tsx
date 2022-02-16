import React, { useRef, useState } from 'react';
import { useFormData } from '@contexts/search/plan.context';
import { useRouter } from 'next/router';

type Props = {
  formStep: number;
  nextFormStep: () => void;
};

const SubjectInfo: React.FC<Props> = ({ formStep, nextFormStep }) => {
  const { studentInfo, setSubject } = useFormData();
  const [subject, setSubjects] = useState<string[]>([]);
  const router = useRouter();

  function arrayRemove(arr: string[], value: string) {
    return arr.filter(function (ele) {
      return ele != value;
    });
  }

  console.log(subject);
  console.log(studentInfo);
  function handleClick() {
    setSubject(subject);
    router.push('/plans');
    // nextFormStep();
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ifExist = subject.indexOf(event?.target.value);
    if (event.target.checked) {
      if (ifExist == -1) {
        setSubjects([...subject, event?.target.value]);
      }
    } else {
      if (ifExist > -1) {
        let filteredSubject = arrayRemove(subject, event?.target.value);
        setSubjects(filteredSubject);
      }
    }
  };

  return (
    <div className={formStep === 2 ? 'block pb-[100px]' : 'hidden'}>
      <div className="text-center mb-8 ">
        <p className="text-yellow-900 text-[22px]">Choose your Subjects ? </p>
      </div>

      <div className="grid grid-cols-2 justify-center md:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox"
            id="inlineCheckbox1"
            value="English"
            onChange={handleChange}
          />
          <label
            className="form-check-label inline-block text-gray-800"
            htmlFor="inlineCheckbox1"
          >
            English
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox"
            id="inlineCheckbox2"
            value="Hindi"
            onChange={handleChange}
          />
          <label
            className="form-check-label inline-block text-gray-800"
            htmlFor="inlineCheckbox2"
          >
            Hindi
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2"
            type="checkbox"
            id="inlineCheckbox3"
            value="Mathematics"
            onChange={handleChange}
          />
          <label
            className="form-check-label inline-block text-gray-800 "
            htmlFor="inlineCheckbox3"
          >
            Mathematics
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2"
            type="checkbox"
            id="inlineCheckbox3"
            value="Biology"
            onChange={handleChange}
          />
          <label
            className="form-check-label inline-block text-gray-800 "
            htmlFor="inlineCheckbox3"
          >
            Biology
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2"
            type="checkbox"
            id="inlineCheckbox3"
            value="Physics"
            onChange={handleChange}
          />
          <label
            className="form-check-label inline-block text-gray-800 "
            htmlFor="inlineCheckbox3"
          >
            Physics
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2"
            type="checkbox"
            id="inlineCheckbox3"
            value="Chemistry"
            onChange={handleChange}
          />
          <label
            className="form-check-label inline-block text-gray-800 "
            htmlFor="inlineCheckbox3"
          >
            Chemistry
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2"
            type="checkbox"
            id="inlineCheckbox3"
            value="History"
            onChange={handleChange}
          />
          <label
            className="form-check-label inline-block text-gray-800 "
            htmlFor="inlineCheckbox3"
          >
            History
          </label>
        </div>
      </div>

      <div className="text-center">
        {subject.length > 0 ? (
          <button
            onClick={handleClick}
            className="px-4 py-2 text-white text-xs rounded bg-indigo-500 mx-1 transition duration-500 ease-in-out transform hover:translate-x-1 hover:scale-110 hover:blue-300 hover:shadow-md "
          >
            View Plans
          </button>
        ) : (
          <button
            disabled
            className="px-4 py-2 text-white text-xs rounded disabled:transform-none disabled:transition-none disabled:bg-gray disabled:cursor-not-allowed disabled:text-white bg-gray-600 mx-1 transition duration-500 ease-in-out transform hover:translate-x-1 hover:scale-110 hover:blue-300 hover:shadow-md disabled:shadow-none"
          >
            View Plans
          </button>
        )}
      </div>
    </div>
  );
};

export default SubjectInfo;
