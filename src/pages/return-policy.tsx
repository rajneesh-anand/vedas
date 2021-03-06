import Layout from '@components/layout';
import Container from '@components/ui/container';
import PageHeroSection from '@components/ui/page-hero-section';
import { returnAndRefund } from '@settings/return-policy';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';

import Heading from '@components/ui/heading';
import Seo from '@components/seo/seo';

export default function ReturnPolicyPage() {
  const { t } = useTranslation('return');
  return (
    <>
      <Seo
        title="Return &amp; Refund"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="terms"
      />
      <PageHeroSection heroTitle="text-page-return-policy" />
      <div className="py-12 lg:py-16 2xl:py-20">
        <Container>
          <div className="w-full xl:max-w-[1200px] mx-auto">
            {returnAndRefund?.map((item) => (
              // @ts-ignore
              <div
                key={item.title}
                className="mb-8 lg:mb-12 last:mb-0 order-list-enable"
              >
                <Heading className="mb-4 lg:mb-6 font-body" variant="title">
                  {t(item.title)}
                </Heading>
                <div
                  className="text-skin-muted text-sm lg:text-15px leading-7 space-y-5"
                  dangerouslySetInnerHTML={{
                    __html: t(item.description),
                  }}
                />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}

ReturnPolicyPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'return',
        'footer',
      ])),
    },
  };
};
