import { FC } from 'react';
import { useTranslation } from 'next-i18next';
import LocationIcon from '@components/icons/contact/location-icon';
import PhoneIcon from '@components/icons/contact/phone-icon';
import MailIcon from '@components/icons/contact/mail-icon';
import Text from '@components/ui/text';
import Heading from '@components/ui/heading';

const data = [
  {
    id: 1,
    slug: '/',
    icon: (
      <LocationIcon className="w-12 lg:w-13 xl:w-[60px] h-12 lg:h-13 xl:h-[60px]" />
    ),
    name: 'VedusOne Academy Location',
    description:
      'B-1829 , VedusOne Academy Building , Shastri Nagar , Delhi 110052',
  },
  {
    id: 2,
    slug: '/',
    icon: (
      <PhoneIcon className="w-12 lg:w-13 xl:w-[60px] h-12 lg:h-13 xl:h-[60px]" />
    ),
    name: 'Call Us Anytime',
    description: '( +91 ) 8810436602',
  },
  {
    id: 3,
    slug: '/',
    icon: (
      <MailIcon className="w-12 lg:w-13 xl:w-[60px] h-12 lg:h-13 xl:h-[60px]" />
    ),
    name: 'text-email',
    description: 'vedusone@gmail.com',
  },
];
const ContactInformation: FC = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center px-5 py-[64px] ">
      <div className="w-full md:w-1/3  mb-3 text-center">
        <div className="flex justify-center mb-1">
          <LocationIcon className="w-12 lg:w-13 xl:w-[60px] h-12 lg:h-13 xl:h-[60px] " />
        </div>

        <div className="lg:ps-3 2xl:ps-4 mt-4 lg:mt-0">
          <Heading variant="mediumHeading" className="mb-2 lg:mb-2.5 font-bold">
            VedusOne Academy Location
          </Heading>
          <p className="text-skin-muted text-sm leading-7 lg:leading-[27px] lg:text-15px mb-1">
            B-1829 , VedusOne Academy Building
          </p>
          <p className="text-skin-muted text-sm leading-7 lg:leading-[27px] lg:text-15px mb-1">
            Shastri Nagar , Delhi 110052
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/3  mb-3 text-center">
        <div className="flex justify-center mb-1">
          <PhoneIcon className="w-12 lg:w-13 xl:w-[60px] h-12 lg:h-13 xl:h-[60px] " />
        </div>

        <div className="lg:ps-3 2xl:ps-4 mt-4 lg:mt-0">
          <Heading variant="mediumHeading" className="mb-2 lg:mb-2.5 font-bold">
            Call Us Anytime
          </Heading>
          <Text>( +91 ) 8810436602</Text>
        </div>
      </div>

      <div className="w-full md:w-1/3  mb-3 text-center">
        <div className="flex justify-center mb-1">
          <MailIcon className="w-12 lg:w-13 xl:w-[60px] h-12 lg:h-13 xl:h-[60px] " />
        </div>

        <div className="lg:ps-3 2xl:ps-4 mt-4 lg:mt-0">
          <Heading variant="mediumHeading" className="mb-2 lg:mb-2.5 font-bold">
            Send Email @
          </Heading>
          <p className="mb-1">
            <a
              href="mailto: studentsupport@vedusone.com"
              className="text-skin-muted text-sm leading-7 lg:leading-[27px] lg:text-15px"
            >
              studentsupport@vedusone.com
            </a>
          </p>
          <p>
            <a
              href="mailto:vedusone@gmail.com"
              className="text-skin-muted text-sm leading-7 lg:leading-[27px] lg:text-15px"
            >
              vedusone@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
