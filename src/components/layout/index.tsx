import { useSessionStorage } from 'react-use';
import Image from '@components/ui/image';
import HighlightedBar from '@components/common/highlighted-bar';
import Countdown from '@components/common/countdown';
import Header from '@components/layout/header';
import Footer from '@components/layout/footer';
import MobileNavigation from '@components/layout/mobile-navigation/mobile-navigation';
import { useTranslation } from 'next-i18next';
import WhatsAppWidget from 'react-whatsapp-widget';

const Layout: React.FC = ({ children }) => {
  let promotionEndDate = new Date('04/01/2022'); // mm/dd/yyyy
  let timeDiff = Math.abs(promotionEndDate.getTime() - new Date().getTime()); // In Milli Seconds

  const { t } = useTranslation('common');
  const [highlightedBar, setHighlightedBar] = useSessionStorage(
    'borobazar-highlightedBar',
    'false'
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* {highlightedBar !== 'true' && (
        <HighlightedBar onClose={() => setHighlightedBar('true')}>
          <div className="flex items-center">
            <div className="hidden sm:flex flex-shrink-0 items-center justify-center bg-skin-fill w-9 h-9 rounded-full me-2.5">
              <Image
                width={32}
                height={32}
                src="/images/delivery-box.svg"
                alt="Delivery Box"
              />
            </div>
            <p
              dangerouslySetInnerHTML={{
                __html: t('text-highlighted-bar'),
              }}
            />
          </div>
          <Countdown date={Date.now() + timeDiff} />
        </HighlightedBar>
      )} */}

      <Header />
      <main
        className="relative flex-grow"
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </main>
      <Footer />
      <WhatsAppWidget
        phoneNumber="918810436602"
        companyName="VedusOne Academy"
        message="What can we do for you ?"
      />
      {/* <MobileNavigation /> */}
    </div>
  );
};

export default Layout;
