import Link from '@components/ui/link';

const ClassList: React.FC = () => {
  return (
    <>
      <div className="relative p-4 sm:p-6 rounded-sm overflow-hidden mb-8">
        <div className="relative ">
          <div className="inline-flex items-center underlineAnchor mb-4 ">
            <h1 className="text-[14px] md:text-3xl text-gray-800 font-bold mb-2 ">
              Welcome ! Select your class to
            </h1>
            <Link
              href="/plans?class=six"
              className="relative text-[14px] md:text-3xl font-bold text-white text-transparent bg-clip-text bg-blue-500  px-2 mb-2"
            >
              Watch free videos
            </Link>
          </div>

          <p className="text-center lg:text-start">
            Choose our study plans according to your academic board and medium
            of education
          </p>
        </div>

        <div className="grid grid-cols-2 justify-center md:grid-cols-4 lg:grid-cols-7 gap-2 py-[56px]">
          <div className="flex justify-center cursor-pointer ">
            <Link href="/plans?class=six">
              <a className="bg-blue-500 transition duration-200 ease-in hover:box-shadow hover:bg-blue-700 text-white py-2 px-8 rounded-full inline-flex items-center">
                CLASS VI
              </a>
            </Link>
          </div>
          <div className="flex justify-center cursor-pointer ">
            <Link href="/plans?class=seven">
              <a className="bg-blue-500 transition duration-200 ease-in hover:box-shadow hover:bg-blue-700 text-white py-2 px-8 rounded-full inline-flex items-center">
                CLASS VII
              </a>
            </Link>
          </div>
          <div className="flex justify-center cursor-pointer">
            <Link href="/plans?class=eight">
              <a className="bg-blue-500 transition duration-200 ease-in hover:box-shadow hover:bg-blue-700 text-white py-2 px-8 rounded-full inline-flex items-center">
                CLASS VIII
              </a>
            </Link>
          </div>
          <div className="flex justify-center cursor-pointer">
            <Link href="/plans?class=nine">
              <a className="bg-blue-500 transition duration-200 ease-in hover:box-shadow hover:bg-blue-700 text-white py-2 px-8 rounded-full inline-flex items-center">
                CLASS IX
              </a>
            </Link>
          </div>
          <div className="flex justify-center cursor-pointer ">
            <Link href="/plans?class=ten">
              <a className="bg-blue-500 transition duration-200 ease-in hover:box-shadow hover:bg-blue-700 text-white py-2 px-8 rounded-full inline-flex items-center">
                CLASS X
              </a>
            </Link>
          </div>
          <div className="flex justify-center cursor-pointer">
            <Link href="/plans?class=eleven">
              <a className="bg-blue-500 transition duration-200 ease-in hover:box-shadow hover:bg-blue-700 text-white py-2 px-8 rounded-full inline-flex items-center">
                CLASS XI
              </a>
            </Link>
          </div>
          <div className="flex justify-center cursor-pointer">
            <Link href="/plans?class=twelve">
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
