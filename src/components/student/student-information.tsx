import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import LocationIcon from '@components/icons/contact/location-icon';
import PhoneIcon from '@components/icons/contact/phone-icon';
import MailIcon from '@components/icons/contact/mail-icon';
import Text from '@components/ui/text';
import Heading from '@components/ui/heading';
import { useStudentsQuery } from '@framework/student/get-all-students';
import StudentsGridBlock from './students-grid-block';
import { LIMITS } from '@framework/utils/limits';
import Link from '@components/ui/link';

interface StudentFeedProps {
  className?: string;
  limit: number;
  page: number;
  orderBy: string;
  sortedBy: string;
}

const StudentInformation: FC<StudentFeedProps> = ({
  className,
  limit,
  orderBy,
  sortedBy,
  page,
}) => {
  const { data, isLoading, error } = useStudentsQuery({
    limit: limit,
    page,
    orderBy,
    sortedBy,
  });

  return (
    <>
      <StudentsGridBlock
        sectionHeading=" Enrolled Students in VedusOne Academy "
        sectionSubHeading="Hurry up ! Enroll Now &amp; Get Discounted Tuition Fee"
        className={className}
        students={data?.students.data}
        loading={isLoading}
        error={error?.message}
        limit={limit}
        uniqueKey="best-sellers"
      />
      <div className="text-center">
        <Link
          href="/students"
          className="inline-flex items-center justify-center w-full px-6 py-1.5 mb-2 text-md text-white bg-green-500 rounded-md hover:bg-green-400 sm:w-auto sm:mb-0"
        >
          EXPLORE MORE STUDENTS
          <svg
            className="w-4 h-4 ml-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </>
  );
};

export default StudentInformation;
