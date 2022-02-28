import { Student } from '@framework/types';
import { IoCloseCircle } from 'react-icons/io5';
import { FC } from 'react';
import { useState, useEffect } from 'react';
import { useStudentsQuery } from '@framework/student/get-all-students';
import StudentsGridBlock from './students-grid-block';

interface StudentFeedProps {
  className?: string;
}

const StudentSearchPage: FC<StudentFeedProps> = ({ className }) => {
  const [searchText, setSearchText] = useState<string>('');
  const [showList, setShowList] = useState(true);
  const [usersData, setUsersData] = useState<Student[]>([]);
  const [totalStudents, setTotalStudents] = useState<Student[]>([]);

  const { data, isLoading, error } = useStudentsQuery({
    limit: 100,
    page: 1,
    orderBy: 'createdAt',
    sortedBy: 'desc',
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.API_URL}/user/list`);
      const result = await res.json();
      setTotalStudents(result.data);
    };
    fetchData();
  }, []);

  const searchedList = (list: any) => {
    const newList = list.filter(
      (item: any) =>
        item.name.toLowerCase().indexOf(searchText.toLowerCase()) >= 0
    );

    setUsersData(newList);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const search = e.target.value;
    console.log(search);

    if (search !== '') {
      setSearchText(search);
      setShowList(false);
      searchedList(totalStudents);
    } else {
      setShowList(true);
    }
  };

  return (
    <div>
      <div
        className="flex justify-center  xl:min-h-[320px] py-16 md:py-20 w-full bg-cover bg-no-repeat bg-center mb-8"
        style={{
          backgroundImage: `url('/images/bundle/attachment/fruits-juice.png')`,
        }}
      >
        <form className="relative flex max-w-[480px] lg:w-[496px] rounded-md">
          <label
            htmlFor="hero-search"
            className="flex flex-1 items-center py-0.5"
          >
            <input
              id="hero-search"
              className="w-full text-sm transition-all duration-200 rounded-md outline-none placeholder:text-brand-dark/50 text-brand-dark/80 h-14 md:h-16 ltr:pl-5 rtl:pr-5 md:ltr:pl-6 md:rtl:pr-6 ltr:pr-14 rtl:pl-14 md:ltr:pr-16 md:rtl:pl-16 text-brand-light lg:text-base shadow-heroSearch ring-2 ring-brand"
              placeholder="Search Your Name..."
              aria-label="Search"
              autoComplete="off"
              onChange={handleInputChange}
            />
          </label>
          <button
            type="submit"
            title="Search"
            className="absolute top-0 flex items-center justify-center h-full transition duration-200 ease-in-out outline-none ltr:right-0 rtl:left-0 w-14 md:w-16 hover:text-heading focus:outline-none"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="w-5 h-5 text-brand-dark text-opacity-40"
            >
              <path
                d="M19.0144 17.9256L13.759 12.6703C14.777 11.4129 15.3899 9.81507 15.3899 8.07486C15.3899 4.04156 12.1081 0.759766 8.07483 0.759766C4.04152 0.759766 0.759766 4.04152 0.759766 8.07483C0.759766 12.1081 4.04156 15.3899 8.07486 15.3899C9.81507 15.3899 11.4129 14.777 12.6703 13.759L17.9256 19.0144C18.0757 19.1645 18.2728 19.24 18.47 19.24C18.6671 19.24 18.8642 19.1645 19.0144 19.0144C19.3155 18.7133 19.3155 18.2266 19.0144 17.9256ZM8.07486 13.8499C4.89009 13.8499 2.2998 11.2596 2.2998 8.07483C2.2998 4.89006 4.89009 2.29976 8.07486 2.29976C11.2596 2.29976 13.8499 4.89006 13.8499 8.07483C13.8499 11.2596 11.2596 13.8499 8.07486 13.8499Z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </form>
      </div>

      {showList ? (
        <StudentsGridBlock
          // sectionHeading=" Enrolled Students in VedusOne Academy "
          className={className}
          students={data?.students.data}
          loading={isLoading}
          error={error?.message}
          uniqueKey="users-list"
        />
      ) : usersData?.length > 0 ? (
        <StudentsGridBlock
          // sectionHeading=" Enrolled Students in VedusOne Academy "
          className={className}
          students={usersData}
          loading={isLoading}
          error={error?.message}
          uniqueKey="users-list"
        />
      ) : (
        <div className="flex items-center justify-center text-red-700 text-sm mt-16  mb-[48px] lg:mb-[64px]">
          <span className="w-10 h-10 me-3 lg:me-4 rounded-full bg-skin-red bg-opacity-20 flex items-center justify-center flex-shrink-0">
            <IoCloseCircle className="w-5 h-5 text-skin-red" />
          </span>
          No Student Found !
        </div>
      )}
    </div>
  );
};

export default StudentSearchPage;
