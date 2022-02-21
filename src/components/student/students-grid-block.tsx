import SectionHeader from '@components/common/section-header';
import StudentCard from './student-card';
import StudentCardLoader from '@components/ui/loaders/student-card-loader';
import { Student } from '@framework/types';
import Alert from '@components/ui/alert';

interface ProductsProps {
  sectionHeading: string;
  sectionSubHeading?: string;
  headingPosition?: 'left' | 'center';
  className?: string;
  students?: Student[];
  loading: boolean;
  error?: string;
  limit?: number;
  uniqueKey?: string;
}

const StudentsGridBlock: React.FC<ProductsProps> = ({
  sectionHeading,
  sectionSubHeading,
  headingPosition = 'center',
  className = 'mb-12 lg:mb-14 xl:mb-16',
  students,
  loading,
  error,
  limit,
  uniqueKey,
}) => {
  return (
    <div className={`${className}`}>
      <SectionHeader
        sectionHeading={sectionHeading}
        sectionSubHeading={sectionSubHeading}
        headingPosition={headingPosition}
      />
      <div className="flex flex-wrap justify-center mb-6">
        {error ? (
          <Alert message={error} className="col-span-full" />
        ) : loading && !students?.length ? (
          Array.from({ length: limit! }).map((_, idx) => (
            <StudentCardLoader
              key={`${uniqueKey}-${idx}`}
              uniqueKey={`${uniqueKey}-${idx}`}
            />
          ))
        ) : (
          students?.map((student: any, index) => (
            <div className="w-1/2 lg:w-1/5 " key={index}>
              <StudentCard student={student} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentsGridBlock;
