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
  href: LinkProps['href'];
  collection: {
    image: string;
    title: string;
    description?: string;
  };
}

const CollectionCard: React.FC<Props> = ({
  collection,
  imgWidth = 440,
  imgHeight = 280,
  href,
}) => {
  const { image, title, description } = collection;
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

    <div className="flex">
      <div className="mt-14 md:flex">
        <div className="relative lg:w-1/2 sm:w-96 xl:h-96 h-80">
          <Image
            src={image ?? collectionPlaceholder}
            alt={t(title) || t('text-card-thumbnail')}
            // width={imgWidth}
            // height={imgHeight}
            layout="fill"
            className="w-full h-full flex-shrink-0 object-fit object-cover shadow-lg rounded"
            // className="bg-skin-thumbnail object-cover transform transition duration-300 ease-in-out group-hover:opacity-90 group-hover:scale-105"
          />
          {/* <img
            src="https://i.ibb.co/4g1D9cv/imgslider1.png"
            alt="image of profile"
            className="w-full h-full flex-shrink-0 object-fit object-cover shadow-lg rounded"
          /> */}
          <div className="w-32 md:flex hidden items-center justify-center absolute top-0 -mr-16 -mt-14 right-0 h-32 bg-indigo-100 rounded-full">
            <img
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonial-svg1.svg"
              alt="commas"
            />
          </div>
        </div>
        <div className="md:w-1/3 lg:w-1/3 xl:ml-32 md:ml-20 md:mt-0 mt-4 flex flex-col justify-between">
          <div>
            {/* <h1 className="text-2xl font-semibold xl:leading-loose text-gray-800">
              Some of the best work that was done!
            </h1> */}
            <p className="text-base font-medium leading-6 mt-4 text-gray-600">
              Our core values are at the heart of all that we do. They are
              integrated into our daily work lives and help us to remember our
              customers always comes first, the last thank you should always
              comes from us.
            </p>
          </div>
          <div className="md:mt-0 mt-8">
            <p className="text-base font-medium leading-4 text-gray-800">
              Anna Smith
            </p>
            <p className="text-base leading-4 mt-2 mb-4 text-gray-600">
              Senior Web Designer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
