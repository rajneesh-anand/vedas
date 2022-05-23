import Heading from '@components/ui/heading';
import Image from '@components/ui/image';
import Link from '@components/ui/link';
import { LinkProps } from 'next/link';
import Text from '@components/ui/text';
import { useTranslation } from 'next-i18next';
import { collectionPlaceholder } from '@assets/placeholders';

interface Props {
  imgWidth?: number | string;
  imgHeight?: number | string;
  href?: LinkProps['href'];
  collection: {
    image: string;
    name: string;
    class: string;
    location: string;
    description?: string;
  };
}

const CollectionCard: React.FC<Props> = ({
  collection,
  imgWidth = 440,
  imgHeight = 280,
  href,
}) => {
  const { image, name, location, description } = collection;
  const { t } = useTranslation('common');
  return (
    // <Link
    //   href={href}
    //   className="group flex flex-col overflow-hidden rounded-md shadow-card "
    // >
    //   <Image
    //     src={image ?? collectionPlaceholder}
    //     alt={t(title) || t('text-card-thumbnail')}
    //     width={imgWidth}
    //     height={imgHeight}
    //     className="bg-skin-thumbnail object-cover transform transition duration-300 ease-in-out group-hover:opacity-90 group-hover:scale-105"
    //   />
    //   <div className="px-4 lg:px-5 xl:px-6 pt-4 lg:pt-5 pb-4 md:pb-5 lg:pb-6 xl:pb-7 flex flex-col">
    //     <Heading
    //       variant="title"
    //       className="mb-1 lg:mb-1.5 truncate group-hover:color-skin-primary"
    //     >
    //       {t(title)}
    //     </Heading>
    //     <Text variant="medium" className="truncate">
    //       {t(`${description}`)}
    //     </Text>
    //   </div>
    // </Link>

    <div className="group flex flex-col overflow-hidden ">
      <div className="inline-flex justify-center">
        <q className="text-md font-medium leading-6 py-4 text-black lg:max-w-[464px] tracking-wide">
          {description}
        </q>
      </div>
      <div className="inline-flex justify-center">
        <div className="relative w-28 h-28">
          <Image
            src={image ?? collectionPlaceholder}
            alt={name}
            // width={imgWidth}
            // height={imgHeight}
            layout="fill"
            className="rounded-full overflow-hidden border"
          />
        </div>
      </div>
      <div className="inline-flex justify-center mt-2">
        <p className="text-[14px] uppercase font-semibold text-indigo-700">
          {name}
        </p>
      </div>
      <div className="inline-flex justify-center">
        <p className="text-[10px] font-semibold text-indigo-700">
          {collection.class}
        </p>
      </div>
      <div className="inline-flex justify-center text-blue-700">
        <p className="text-[11px] font-semibold">{location}</p>
      </div>
    </div>
  );
};

export default CollectionCard;
