import Layout from '@components/layout';
import Container from '@components/ui/container';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import HomeTopSection from '@components/common/home-top-section';
import BundleGrid from '@components/bundle/bundle-grid';
import CollectionGrid from '@components/common/collection-grid';
import HeroBannerCard from '@components/hero/hero-banner-card';
import BestSellerGroceryProductFeed from '@components/product/feeds/best-seller-grocery-product-feed';
import PopularProductFeed from '@components/product/feeds/popular-product-feed';
import CategoryGridBlock from '@components/common/category-grid-block';
import { homeSixHeroBanner as heroBanner } from '@framework/static/banner';
import { homeSixBanner as banner } from '@framework/static/banner';
import BannerCard from '@components/cards/banner-card';
import { bundleDataTwo as bundle } from '@framework/static/bundle';
import ContactInformation from '@components/contact/contact-information';
import StudentsInformation from '@components/student/student-information';
import CourseVideo from '@components/course/get-all-videos';
import FeatureCarousel from '@components/common/featured-carousel';
import { GetStaticProps } from 'next';
import Seo from '@components/seo/seo';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { fetchCategories } from '@framework/category/get-all-categories';
import { fetchBestSellerGroceryProducts } from '@framework/product/get-all-best-seller-grocery-products';
import { fetchPopularProducts } from '@framework/product/get-all-popular-products';
import { fetchStudents } from '@framework/student/get-all-students';
import { LIMITS } from '@framework/utils/limits';
import ClassList from '@components/class/classlist';
import { ImFacebook } from 'react-icons/im';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: token, status } = useSession();
  console.log(token);
  return (
    <>
      <Seo title="Home" description="Online Education Institute" path="/" />

      <Container>
        <HomeTopSection />
        <ClassList />
        <FeatureCarousel />
        <StudentsInformation className="mb-12 lg:mb-14 xl:mb-16 2xl:mb-20" />
        <CourseVideo />
        <ContactInformation />
      </Container>
    </>
  );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [API_ENDPOINTS.STUDENT, { limit: LIMITS.STUDENT_LIMITS }],
    fetchStudents
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
    revalidate: 60,
  };
};
