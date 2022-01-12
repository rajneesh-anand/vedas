import { useTranslation } from 'react-i18next';
import { Attachment } from '@framework/types';

interface HeaderProps {
  heroTitle?: string;
  heroDescription?: string;
  backgroundThumbnail?: Attachment;
}

const PageEnrollmentHeroSection: React.FC<HeaderProps> = ({
  heroTitle = 'text-contact-page-header',
  heroDescription = 'text-contact-page-explore',
  backgroundThumbnail = '/images/contact-page-banner.png',
}) => {
  const { t } = useTranslation('common');
  return (
    <div
      className="lg:min-h-[200px] 2xl:min-h-[455px] bg-indigo-500 lg:py-0 h-auto pt-10 md:pt-14 pb-20 md:pb-24 flex lg:items-center bg-cover lg:bg-cover bg-left sm:bg-top lg:bg-center bg-no-repeat border-t border-skin-base"
      //   style={{
      //     backgroundImage: `url(${backgroundThumbnail})`,
      //   }}
    >
      <div className="w-full max-w-[1484px] mx-auto px-4 md:px-6 lg:px-8">
        <div className=" text-center lg:pb-5">
          <h2 className="font-semibold  text-xl leading-7 md:leading-snug lg:leading-snug sm:text-2xl md:text-3xl lg:text-3xl 3xl:text-5xl 3xl:leading-snug  tracking-tight mb-2.5 uppercase text-white">
            Enrollment Form
          </h2>
          <p className="text-15px lg:text-base xl:text-[17px] leading-7 lg:leading-8 xl:leading-9 text-skin-base text-opacity-60 ">
            Fill Up the Enrollment Form before new academic session !
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageEnrollmentHeroSection;
