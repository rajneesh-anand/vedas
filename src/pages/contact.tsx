import React, { useState } from 'react';
import Container from '@components/ui/container';
import Layout from '@components/layout';
import Seo from '@components/seo/seo';
import { GetServerSideProps } from 'next';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import ContactInformation from '@components/contact/contact-information';
import ContactForm from '@components/contact/contact-form';

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

const ContactPage = () => {
  const [formStep, setFormStep] = useState(0);

  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

  return (
    <>
      <Seo
        title="Contact"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="contact"
      />

      <Container>
        <ContactForm />
        <ContactInformation />
      </Container>
    </>
  );
};

ContactPage.Layout = Layout;

export default ContactPage;
