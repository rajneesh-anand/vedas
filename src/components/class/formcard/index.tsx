import { BiArrowBack } from 'react-icons/bi';
type Props = {
  children: any;
  currentStep: number;
  prevFormStep: () => void;
};

const FormCard: React.FC<Props> = ({ children, currentStep, prevFormStep }) => {
  return (
    <div>
      {currentStep < 3 && (
        <div className="flex justify-between">
          {currentStep > 0 && (
            <button onClick={prevFormStep} type="button">
              <BiArrowBack />
            </button>
          )}

          <p className="text-sm text-green-900">Step {currentStep + 1} of 3</p>
        </div>
      )}
      {children}
    </div>
  );
};

export default FormCard;
