import React from 'react';
import { GetStaticProps } from 'next';
import Container from '@components/ui/container';
import Layout from '@components/layout';

import PageEnrollmentHeroSection from '@components/ui/page-enrollment-hero-section';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ContactForm from '@components/common/form/contact-form';
import ContactInformation from '@components/contact/contact-information';

import Seo from '@components/seo/seo';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { API_ENDPOINTS } from '@framework/utils/api-endpoints';
import { fetchStudents } from '@framework/student/get-all-students';

import { LIMITS } from '@framework/utils/limits';

const ContactUsPage = () => {
  return (
    <>
      <Seo
        title="Enrollment"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="enrollment"
      />
      <PageEnrollmentHeroSection />
      <Container>
        <div className="max-w-[1420px] mx-auto mb-12 lg:mb-14 xl:mb-16">
          <div className="flex flex-wrap bg-skin-fill w-full p-5 md:p-7 lg:p-10 xl:p-16 3xl:px-[70px] xl:py-12 shadow-contact rounded-md -mt-8 relative z-10">
            <div className="w-full pb-0.5 lg:ps-12 pt-1.5">
              <ContactForm />
            </div>
          </div>
        </div>
        <ContactInformation />
      </Container>
    </>
  );
};

ContactUsPage.Layout = Layout;

export default ContactUsPage;

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
