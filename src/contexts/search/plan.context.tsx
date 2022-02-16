import { useState, createContext, useContext } from 'react';

export interface Student {
  class: string;
  subject: string[];
  board: string;
  medium: string;
}

interface SearchContext {
  studentInfo: Student;
  setSubject: (text: string[]) => void;
  setBoard: (text: string) => void;
  setMedium: (text: string) => void;
  setClass: (text: string) => void;
}

const defaultState = {
  studentInfo: {
    class: '',
    subject: [],
    board: '',
    medium: '',
  },
  setSubject: (text: string[]) => {},
  setBoard: (text: string) => {},
  setMedium: (text: string) => {},
  setClass: (text: string) => {},
};

export const FormContext = createContext<SearchContext>(defaultState);

export const FormProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [studentInfo, setStudentInfo] = useState<Student>({
    class: '',
    subject: [],
    board: '',
    medium: '',
  });

  const setSubject = (value: string[]) => {
    console.log(value);
    setStudentInfo({ ...studentInfo, subject: value });
  };
  const setMedium = (value: string) => {
    setStudentInfo({ ...studentInfo, medium: value });
  };
  const setBoard = (value: string) => {
    setStudentInfo({ ...studentInfo, board: value });
  };
  const setClass = (value: string) => {
    setStudentInfo({ ...studentInfo, class: value });
  };

  return (
    <FormContext.Provider
      value={{ studentInfo, setSubject, setMedium, setBoard, setClass }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormData = () => useContext(FormContext);
