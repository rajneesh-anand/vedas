import { useState, createContext, useContext, useEffect } from 'react';

export interface Student {
  class: string;
  subject: string[];
  board: string;
  medium: string;
}

export interface Plan {
  subject: string;
  plan: string;
  amount: string;
}

interface SearchContext {
  studentInfo: Student;
  planInfo: Plan[];
  totalAmount: number;
  setSubject: (text: string[]) => void;
  setBoard: (text: string) => void;
  setMedium: (text: string) => void;
  setClass: (text: string) => void;
  setPlan: (text: Plan) => void;
  removePlan: (text: Plan) => void;
}

const defaultState = {
  studentInfo: {
    class: '',
    subject: [],
    board: '',
    medium: '',
  },
  planInfo: [],
  totalAmount: 0,
  setSubject: (text: string[]) => {},
  setBoard: (text: string) => {},
  setMedium: (text: string) => {},
  setClass: (text: string) => {},
  setPlan: (text: Plan) => {},
  removePlan: (text: Plan) => {},
};

export const FormContext = createContext<SearchContext>(defaultState);

export const FormProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [planInfo, setPlanInfo] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [studentInfo, setStudentInfo] = useState<Student>({
    class: '',
    subject: [],
    board: '',
    medium: '',
  });

  useEffect(() => {
    const sum = planInfo.reduce((accumulator, currentValue) => {
      console.log(currentValue.amount);
      return accumulator + Number(currentValue.amount);
    }, 0);

    setTotalAmount(sum);
    console.log(sum);
  }, [planInfo]);
  const setSubject = (value: string[]) => {
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

  const setPlan = (value: Plan) => {
    const FilteredArray = planInfo.filter(
      (obj) => obj.subject !== value.subject
    );

    setPlanInfo([...FilteredArray, value]);
  };

  const removePlan = (value: Plan) => {
    const FilteredArray = planInfo.filter(
      (obj) => obj.subject !== value.subject
    );
    setPlanInfo(FilteredArray);
  };

  return (
    <FormContext.Provider
      value={{
        studentInfo,
        planInfo,
        totalAmount,
        setSubject,
        setMedium,
        setBoard,
        setClass,
        setPlan,
        removePlan,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormData = () => useContext(FormContext);
