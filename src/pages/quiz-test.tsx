import React, { useState } from 'react';
import Container from '@components/ui/container';
import Layout from '@components/layout';
import Seo from '@components/seo/seo';
import CourseVideoTwo from '@components/course/get-all-videos-two';
import ContactInformation from '@components/contact/contact-information';
import StudentSearchedList from '@components/student/student-search-list';
import StudentsInformation from '@components/student/student-information';

import { GetServerSideProps } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import MockTestContent from '@components/quiz';

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

const MockTestPage = () => {
  return (
    <>
      <Seo
        title="Quiz Test"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="quiz-test"
      />

      <Container>
        <MockTestContent />
      </Container>
    </>
  );
};

MockTestPage.Layout = Layout;

export default MockTestPage;
