import cn from 'classnames';
import Image from '@components/ui/image';
import usePrice from '@framework/product/use-price';
import { Student } from '@framework/types';
import { useModalAction } from '@components/common/modal/modal.context';
import useWindowSize from '@utils/use-window-size';
import PlusIcon from '@components/icons/plus-icon';
import { useCart } from '@contexts/cart/cart.context';
import { AddToCart } from '@components/product/add-to-cart';
import { useTranslation } from 'next-i18next';
import { productPlaceholder } from '@assets/placeholders';
import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';
import {
  EmailIcon,
  FacebookIcon,
  InstapaperIcon,
  PinterestIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

interface StudentProps {
  student: Student;
  className?: string;
}

const StudentCard: React.FC<StudentProps> = ({ student, className }) => {
  const { name, lastName, image } = student ?? {};

  return (
    <article
      className={cn(
        'flex flex-col group overflow-hidden rounded-md cursor-pointer transition-all duration-300 shadow-card hover:shadow-cardHover relative h-full',
        className
      )}
      title={name}
    >
      <div className="relative flex-shrink-0">
        <div className="flex overflow-hidden h-48 max-w-[230px] mx-auto transition duration-200 ease-in-out transform group-hover:scale-105 relative">
          <Image
            src={image ?? productPlaceholder}
            alt={name}
            layout="fill"
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-6 lg:pt-1.5 h-full">
        <h2 className="text-skin-base text-13px sm:text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5 text-center uppercase">
          {name}
        </h2>
        <div className="text-14px sm:text-sm mt-auto text-center mb-2">
          {student.class}
        </div>
        <div className="inline-flex items-center justify-center">
          <FacebookShareButton url={`${process.env.PUBLIC_URL}`}>
            <FacebookIcon size={32} round className="mx-2" />
          </FacebookShareButton>
          <WhatsappShareButton url={`${process.env.PUBLIC_URL}`}>
            <WhatsappIcon size={32} round className="mx-2" />
          </WhatsappShareButton>
          <TelegramShareButton url={`${process.env.PUBLIC_URL}`}>
            <TelegramIcon size={32} round className="mx-2" />
          </TelegramShareButton>
          <TwitterShareButton url={`${process.env.PUBLIC_URL}`}>
            <TwitterIcon size={32} round className="mx-2" />
          </TwitterShareButton>
        </div>
      </div>
    </article>
  );
};

export default StudentCard;
