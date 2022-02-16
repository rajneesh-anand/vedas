import { Fragment, useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { getSession } from 'next-auth/react';
import { IoCheckmarkCircle } from 'react-icons/io5';
import Seo from '@components/seo/seo';
import Container from '@components/ui/container';
import Link from '@components/ui/link';
import Layout from '@components/layout';
import parse from 'urlencoded-body-parser';
import prisma from '@lib/prisma';

export default function PaymentStatusPage({ status }) {
  return (
    <>
      <Seo
        title="About Us"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="about"
      />
      <Container>
        <div className="flex items-center justify-center text-green-700 text-sm mt-16 lg:mb-8">
          <span className="w-10 h-10 me-3 lg:me-4 rounded-full bg-skin-primary bg-opacity-20 flex items-center justify-center flex-shrink-0">
            <IoCheckmarkCircle className="w-5 h-5 text-skin-primary" />
          </span>
          Thank you for enrolling with VedusOne Academy
        </div>
      </Container>
    </>
  );
}

PaymentStatusPage.Layout = Layout;

export const getServerSideProps = async (context) => {
  const { req, locale } = context;
  const queryClient = new QueryClient();

  const session = await getSession(context);

  const data = await parse(req);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  if (data.STATUS === 'TXN_SUCCESS') {
    await prisma.order.updateMany({
      where: { orderNumber: data.ORDERID },
      data: {
        amount: data.TXNAMOUNT,
        paymentStatus: data.STATUS,
        paymentId: data.TXNID,
      },
    });
  }

  return {
    props: {
      status: data,
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(locale, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};
