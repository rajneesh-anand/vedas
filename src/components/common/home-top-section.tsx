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
  const { appButtons, title, description, appImage } = data;
  const { t } = useTranslation('common');
  return (
    <div
      className={cn('overflow-hidden', className)}
      // style={{
      //   backgroundImage: `url(${
      //     process.env.PUBLIC_URL + '/img/enrollment-banner.png'
      //   })`,
      // }}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-5 md:px-6 lg:px-16 xl:px-28 2xl:px-32 3xl:px-40 md:flex justify-between items-center">
        <div className=" py-4 md:flex items-end ps-4 2xl:ps-0 md:max-w-[480px] lg:max-w-[540px] xl:max-w-auto  lg:-me-8 3xl:me-24">
          <Image
            src="/images/enrollment.png"
            alt="enrollment"
            width={597}
            height={500}
          />
        </div>

        <div className="flex-shrink-0 mx-auto md:ms-0 lg:flex lg:items-center pb-5 pt-1.5 md:pt-4 max-w-[350px] md:max-w-[340px] lg:max-w-[485px] xl:max-w-[540px] 2xl:max-w-[690px] 3xl:ps-10">
          <div className="py-2 xl:py-2 2xl:py-14 text-center md:text-start">
            <h2 className="text-[18px] md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-[42px] leading-9 lg:leading-[1.4em] xl:leading-[1.45em] text-skin-base font-bold font-manrope -tracking-[0.2px] mb-12 lg:mb-8 text-center">
              " Learning is so exciting &amp; fun with{' '}
              <span className=" text-[24px] lg:text-5xl xl:text-5xl">
                VedasOne Academy
              </span>{' '}
              "
            </h2>

            <ul className="flex justify-center mb-4">
              <li className="inline-block">
                <div
                  className={'flex flex-row p-1 items-center justify-between'}
                >
                  <BsFillPatchCheckFill
                    className="w-9 h-9 xs:w-12 xs:h-12 text-skin-base text-green-700 px-2"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-semibold"> Quality Teachers</p>
                </div>
              </li>
              <li className="inline-block">
                <div
                  className={'flex flex-row p-1 items-center justify-between'}
                >
                  <BsShieldFillCheck
                    className="w-9 h-9 text-skin-base text-pink-700 px-2"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-semibold">Get Certificate</p>
                </div>
              </li>
              <li className="inline-block">
                <div
                  className={'flex flex-row p-1 items-center justify-between'}
                >
                  <BsCheckCircleFill
                    className="w-9 h-9 text-skin-base text-blue-700 px-2"
                    aria-hidden="true"
                  />
                  <p className="text-sm font-semibold">Best Curriculum</p>
                </div>
              </li>
            </ul>
            <div className="flex justify-center  space-s-2 md:space-s-2.5 pt-0.5 px-7 sm:px-0">
              <Link href="/enrollment">
                <a className="bg-blue-500 transition duration-200 ease-in hover:box-shadow hover:bg-blue-700 text-white py-2 px-8 rounded-full inline-flex items-center">
                  Enroll Now
                  <span>
                    <BsArrowRight
                      className="w-9 h-9 xs:w-12 xs:h-12 text-skin-base text-white px-2"
                      aria-hidden="true"
                    />
                  </span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTopSection;
