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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-3 md:gap-4 2xl:gap-5">
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
          students?.map((student: any) => (
            <StudentCard key={`${uniqueKey}-${student.id}`} student={student} />
          ))
        )}
      </div>
    </div>
  );
};

export default StudentsGridBlock;
