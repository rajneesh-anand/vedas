import React, { useState } from 'react';
import Container from '@components/ui/container';
import Layout from '@components/layout';
import Seo from '@components/seo/seo';
import CourseVideoTwo from '@components/course/get-all-videos-two';
import ContactInformation from '@components/contact/contact-information';

import PlanInfo from '@components/class/multistep/plan';
import { FormProvider } from '@contexts/search/plan.context';
import { GetServerSideProps } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(context.locale!, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};

const PlansPage = () => {
  return (
    <>
      <Seo
        title="Plans"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="plans"
      />

      <Container>
        <div className="max-w-[1420px] mx-auto mb-12 mt-12 ">
          <PlanInfo />
        </div>
        <CourseVideoTwo />
        <ContactInformation />
      </Container>
    </>
  );
};

PlansPage.Layout = Layout;

export default PlansPage;
