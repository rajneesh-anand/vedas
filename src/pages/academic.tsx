import React, { useState } from 'react';
import Container from '@components/ui/container';
import Layout from '@components/layout';
import Seo from '@components/seo/seo';
import FormCard from '@components/class/formcard';
import BoardInfo from '@components/class/multistep/board';
import MediumInfo from '@components/class/multistep/medium';
import SubjectInfo from '@components/class/multistep/subject';
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

const AcademicPage = () => {
  const [formStep, setFormStep] = useState(0);

  const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

  const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

  return (
    <>
      <Seo
        title="Academic"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="enrollment"
      />

      <Container>
        <div className="max-w-[1420px] mx-auto mb-[100px] mt-[100px] ">
          <FormCard currentStep={formStep} prevFormStep={prevFormStep}>
            {formStep >= 0 && (
              <BoardInfo formStep={formStep} nextFormStep={nextFormStep} />
            )}
            {formStep >= 1 && (
              <MediumInfo formStep={formStep} nextFormStep={nextFormStep} />
            )}
            {formStep >= 2 && (
              <SubjectInfo formStep={formStep} nextFormStep={nextFormStep} />
            )}
            {/* {formStep > 2 && <PlanInfo />} */}
          </FormCard>
        </div>
      </Container>
    </>
  );
};

AcademicPage.Layout = Layout;

export default AcademicPage;
