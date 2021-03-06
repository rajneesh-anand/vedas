import { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { siteSettings } from '@settings/site-settings';
import { ROUTES } from '@utils/routes';
import { useUI } from '@contexts/ui.context';
import { addActiveScroll } from '@utils/add-active-scroll';
import Container from '@components/ui/container';
import Logo from '@components/ui/logo';
import Link from '@components/ui/link';
import UserIcon from '@components/icons/user-icon';
import MenuIcon from '@components/icons/menu-icon';
import HeaderMenu from '@components/layout/header/header-menu';
import LanguageSwitcher from '@components/ui/language-switcher';
import { useModalAction } from '@components/common/modal/modal.context';
import cn from 'classnames';
import Search from '@components/common/search';
import AuthMenu from '@components/layout/header/auth-menu';
const CartButton = dynamic(() => import('@components/cart/cart-button'), {
  ssr: false,
});

type DivElementRef = React.MutableRefObject<HTMLDivElement>;
const { site_header } = siteSettings;

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const { openSidebar, isAuthorized, displayMobileSearch } = useUI();
  const { openModal } = useModalAction();
  const { t } = useTranslation('common');
  const siteHeaderRef = useRef() as DivElementRef;
  addActiveScroll(siteHeaderRef);

  function handleLogin() {
    openModal('LOGIN_VIEW');
  }
  function handleMobileMenu() {
    return openSidebar();
  }

  return (
    <header
      id="siteHeader"
      ref={siteHeaderRef}
      className={cn(
        'header-one w-full z-30 sticky top-0',
        displayMobileSearch && 'active-mobile-search'
      )}
    >
      <div className="innerSticky bg-white w-full z-20 transition duration-200 ease-in-out">
        <Container className="flex items-center justify-between h-full w-full">
          <button
            aria-label="Menu"
            className="menuBtn me-5 hidden lg:flex xl:hidden flex-col items-center justify-center flex-shrink-0 outline-none focus:outline-none"
            onClick={handleMobileMenu}
          >
            <MenuIcon />
          </button>

          <Logo className="-mt-1" />

          <HeaderMenu
            data={site_header.menu}
            className="hidden uppercase xl:flex md:ps-6 xl:ps-10"
          />

          <div className="flex flex-shrink-0 ">
            {/* <div className="pr-2 border-r-2 border-indigo-500">
              <Link href="/auth/signin">
                <a className="text-white px-3 py-[6px] text-[14px] rounded text-transparent bg-clip-text bg-gradient-to-r from-yellow-700 via-pink-700 to-red-700 hover:from-green-400 hover:to-blue-500 ">
                  Independent Counselor
                </a>
              </Link>
            </div> */}
            {session ? (
              <AuthMenu />
            ) : (
              <div className="inline-flex items-center">
                <Link
                  href="/auth/register"
                  className="bg-gradient-to-r from-yellow-500 via-pink-500 to-red-500 text-sm  hover:bg-blue-700 text-white text-center py-2 px-4 rounded-full mr-1"
                >
                  Free Enroll Now
                </Link>
                <Link
                  href="/auth/signin"
                  className="bg-gradient-to-r from-yellow-500 via-pink-500 to-red-500 text-sm  hover:bg-blue-700 text-white text-center py-2 px-4 rounded-full"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
