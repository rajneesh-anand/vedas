import Image from '@components/ui/image';
import Logo from '@components/ui/whitelogo';
import { MdCall } from 'react-icons/md';

const UnderMaintainance: React.FC = () => {
  return (
    <div
      className="relative h-screen w-full flex items-center justify-center bg-cover bg-center text-center"
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/260689/pexels-photo-260689.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500)`,
      }}
    >
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-900 opacity-75"></div>

      <div className="z-50 flex flex-col justify-center items-center text-white w-full h-screen">
        <Logo />

        <h1 className="text-5xl my-4">
          The website is <b>under Maintainance</b>
        </h1>
        <p className="my-4">Call us if you have any query !!</p>
        <span>
          <MdCall className="inline-block text-[20px] mr-2 my-4" />( +91 )
          8810436602
        </span>
      </div>
    </div>
  );
};

export default UnderMaintainance;
