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
    <div className="relative h-[480px]">
      <Image src="/images/homebanner.jpeg" alt="banner" layout="fill" />
    </div>
  );
};

export default HomeTopSection;
