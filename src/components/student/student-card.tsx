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

interface StudentProps {
  student: Student;
  className?: string;
}

const StudentCard: React.FC<StudentProps> = ({ student, className }) => {
  const { firstName, lastName, photo } = student ?? {};

  return (
    <article
      className={cn(
        'flex flex-col group overflow-hidden rounded-md cursor-pointer transition-all duration-300 shadow-card hover:shadow-cardHover relative h-full',
        className
      )}
      title={firstName}
    >
      <div className="relative flex-shrink-0">
        <div className="flex overflow-hidden h-40 max-w-[230px] mx-auto transition duration-200 ease-in-out transform group-hover:scale-105 relative">
          <Image
            src={photo ?? productPlaceholder}
            alt={firstName}
            layout="fill"
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-6 lg:pt-1.5 h-full">
        <h2 className="text-skin-base text-13px sm:text-sm lg:text-15px leading-5 sm:leading-6 mb-1.5 text-center uppercase">
          {firstName} {lastName}
        </h2>
        <div className="text-13px sm:text-sm mt-auto text-center">
          {student.class}
        </div>
      </div>
    </article>
  );
};

export default StudentCard;
