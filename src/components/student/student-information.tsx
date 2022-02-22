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

interface StudentFeedProps {
  className?: string;
}

const StudentInformation: FC<StudentFeedProps> = ({ className }) => {
  const { data, isLoading, error } = useStudentsQuery({
    limit: LIMITS.STUDENT_LIMITS,
  });

  console.log(data);

  return (
    <StudentsGridBlock
      sectionHeading=" Enrolled Students in VedusOne Academy "
      sectionSubHeading="Hurry up ! Enroll Now &amp; Get Discounted Tuition Fee"
      className={className}
      students={data?.students.data}
      loading={isLoading}
      error={error?.message}
      limit={LIMITS.STUDENT_LIMITS}
      uniqueKey="best-sellers"
    />
  );
};

export default StudentInformation;
