import Link from '@components/ui/link';

const ClassList: React.FC = () => {
  return (
    <>
      <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
        <div className="relative">
          <h1 className="text-md md:text-3xl text-gray-800 font-bold mb-2">
            Welcome ! Pick Your Class To
            <span className="text-white text-transparent bg-clip-text bg-blue-500 transition duration-200 ease-in hover:box-shadow hover:bg-blue-700 text-white  px-2 rounded-full ">
              Free Enrollment
            </span>
          </h1>

          <p>
            Choose our study plan according to your board and medium of
            education
          </p>
        </div>

        <div className="grid grid-cols-2 justify-center md:grid-cols-4 lg:grid-cols-7 gap-2 py-[56px]">
          <div className="flex justify-center cursor-pointer ">
            <Link href="/academic?class=six">
              <a className="bg-blue-500 transition duration-200 ease-in hover:box-shadow hover:bg-blue-700 text-white py-2 px-8 rounded-full inline-flex items-center">
                CLASS VI
              </a>
            </Link>
          </div>
          <div className="flex justify-center cursor-pointer ">
            <Link href="/academic?class=seven">
              <a className="bg-blue-500 transition duration-200 ease-in hover:box-shadow hover:bg-blue-700 text-white py-2 px-8 rounded-full inline-flex items-center">
                CLASS VII
              </a>
            </Link>
          </div>
          <div className="flex justify-center cursor-pointer">
            <Link href="/academic?class=eight">
              <a className="bg-blue-500 transition duration-200 ease-in hover:box-shadow hover:bg-blue-700 text-white py-2 px-8 rounded-full inline-flex items-center">
                CLASS VIII
              </a>
            </Link>
          </div>
          <div className="flex justify-center cursor-pointer">
            <Link href="/academic?class=nine">
              <a className="bg-blue-500 transition duration-200 ease-in hover:box-shadow hover:bg-blue-700 text-white py-2 px-8 rounded-full inline-flex items-center">
                CLASS IX
              </a>
            </Link>
          </div>
          <div className="flex justify-center cursor-pointer ">
            <Link href="/academic?class=ten">
              <a className="bg-blue-500 transition duration-200 ease-in hover:box-shadow hover:bg-blue-700 text-white py-2 px-8 rounded-full inline-flex items-center">
                CLASS X
              </a>
            </Link>
          </div>
          <div className="flex justify-center cursor-pointer">
            <Link href="/academic?class=eleven">
              <a className="bg-blue-500 transition duration-200 ease-in hover:box-shadow hover:bg-blue-700 text-white py-2 px-8 rounded-full inline-flex items-center">
                CLASS XI
              </a>
            </Link>
          </div>
          <div className="flex justify-center cursor-pointer">
            <Link href="/twelve">
              <a className="bg-blue-500 transition duration-200 ease-in hover:box-shadow hover:bg-blue-700 text-white py-2 px-8 rounded-full inline-flex items-center">
                CLASS XII
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassList;
