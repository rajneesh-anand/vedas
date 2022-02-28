import Image from '@components/ui/image';
import cn from 'classnames';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import {
  BsFillPatchCheckFill,
  BsShieldFillCheck,
  BsCheckCircleFill,
  BsArrowRight,
} from 'react-icons/bs';
import Countdown from '@components/common/countdown';

const data = {
  title: 'app-heading',
  description: 'app-description',
  appImage: '/images/app-thumbnail.png',
  appButtons: [
    {
      id: 1,
      slug: '/#',
      altText: 'button-app-store',
      appButton: '/images/app-store.png',
      buttonWidth: 170,
      buttonHeight: 56,
    },
    {
      id: 2,
      slug: '/#',
      altText: 'button-play-store',
      appButton: '/images/play-store.png',
      buttonWidth: 170,
      buttonHeight: 56,
    },
  ],
};

interface Props {
  className?: string;
}

const HomeTopSection: React.FC<Props> = ({ className = 'pt-1.5 md:pt-0' }) => {
  let promotionEndDate = new Date('04/01/2022'); // mm/dd/yyyy
  let timeDiff = Math.abs(promotionEndDate.getTime() - new Date().getTime()); // In Milli Seconds

  const { appButtons, title, description, appImage } = data;
  const { t } = useTranslation('common');
  return (
    <div className="relative lg:h-[480px] h-[240px] ">
      <Image
        src="/images/homebanner.jpeg"
        alt="banner"
        layout="fill"
        objectFit="fill"
      />
    </div>
    //     <div>
    //  <div className="flex-shrink-0 mx-auto md:ms-0 lg:flex lg:items-center pb-5 pt-1.5 md:pt-4 max-w-[350px] md:max-w-[340px] lg:max-w-[485px] xl:max-w-[540px] 2xl:max-w-[690px] 3xl:ps-10">
    //         <div className="py-2 xl:py-2 2xl:py-14 text-center md:text-start">
    //           <h2 className="text-[18px] md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-[42px] leading-9 lg:leading-[1.4em] xl:leading-[1.45em] text-skin-base font-bold font-manrope -tracking-[0.2px] mb-12 lg:mb-8 text-center">
    //             " Learning is so exciting &amp; fun with{' '}
    //             <span className=" text-[24px] lg:text-5xl xl:text-5xl">
    //               VedusOne Academy
    //             </span>{' '}
    //             "
    //           </h2>

    //           <ul className="flex justify-center mb-4">
    //             <li className="inline-block">
    //               <div
    //                 className={'flex flex-row p-1 items-center justify-between'}
    //               >
    //                 <BsFillPatchCheckFill
    //                   className="w-9 h-9 xs:w-12 xs:h-12 text-skin-base text-green-700 px-2"
    //                   aria-hidden="true"
    //                 />
    //                 <p className="text-sm font-semibold"> Quality Teachers</p>
    //               </div>
    //             </li>
    //             <li className="inline-block">
    //               <div
    //                 className={'flex flex-row p-1 items-center justify-between'}
    //               >
    //                 <BsShieldFillCheck
    //                   className="w-9 h-9 text-skin-base text-pink-700 px-2"
    //                   aria-hidden="true"
    //                 />
    //                 <p className="text-sm font-semibold">Get Certificate</p>
    //               </div>
    //             </li>
    //             <li className="inline-block">
    //               <div
    //                 className={'flex flex-row p-1 items-center justify-between'}
    //               >
    //                 <BsCheckCircleFill
    //                   className="w-9 h-9 text-skin-base text-blue-700 px-2"
    //                   aria-hidden="true"
    //                 />
    //                 <p className="text-sm font-semibold">Best Curriculum</p>
    //               </div>
    //             </li>
    //           </ul>
    //           <div className="text-center mb-4 p-6">
    //             <p className="mr-4 text-indigo-700 text-[16px]">
    //               Join VedusOne Academy before new academic session starts &amp;
    //               Get 50% discount on tuition fee
    //             </p>
    //           </div>
    //           <div className="flex flex-col lg:flex-row justify-center items-center ">
    //             <p className="lg:mr-4 text-red-700 text-[14px] pb-2 lg:mb-0">
    //               New Academic Session Starts In{' '}
    //             </p>
    //             <div className="bg-green-600 rounded">
    //               <Countdown date={Date.now() + timeDiff} />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
  );
};

export default HomeTopSection;
