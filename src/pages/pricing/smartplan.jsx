import React, { useEffect, useState } from 'react';
import Container from '@components/ui/container';
import Layout from '@components/layout';
import Seo from '@components/seo/seo';
import ContactInformation from '@components/contact/contact-information';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getSession } from 'next-auth/react';
import prisma from '@lib/prisma';
import { useFormData } from '@contexts/search/plan.context';
import { useRouter } from 'next/router';
import Link from '@components/ui/link';
import { FaCentercode } from 'react-icons/fa';

export const getServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const session = await getSession(context);

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  });

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: user.length != 0 ? JSON.stringify(user) : null,
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      ...(await serverSideTranslations(context.locale, [
        'common',
        'forms',
        'menu',
        'footer',
      ])),
    },
  };
};

const Hiddenfrom = ({ mid, orderId, txnToken }) => {
  return (
    <form
      id="redFrom"
      method="post"
      action={`https://securegw-stage.paytm.in/theia/api/v1/showPaymentPage?mid=${mid}&orderId=${orderId}`}
      name="paytm"
    >
      <input type="hidden" name="mid" value={mid} />
      <input type="hidden" name="orderId" value={orderId} />
      <input type="hidden" name="txnToken" value={txnToken} />
    </form>
  );
};

const PricingSmartPlanPage = ({ user }) => {
  const userInfo = user ? JSON.parse(user) : null;

  const { setPlan, removePlan, totalAmount, planInfo } = useFormData();
  const [pricingData, setPricingData] = useState();
  const [paytmData, setPaytmData] = useState({
    mid: '',
    orderId: '',
    txnToken: '',
  });
  const router = useRouter();
  const planType = router.query.type;

  useEffect(async () => {
    let res;
    let result;
    let searchText = `${userInfo.class}-${userInfo.medium}`;

    switch (searchText) {
      case 'CLASS VI-ENGLISH MEDIUM':
        res = await fetch(`${process.env.API_URL}/pricing/six/english`);
        result = await res.json();
        result.data.length > 0
          ? setPricingData(result.data[0].subject)
          : setPricingData();
        break;
      case 'CLASS VI-HINDI MEDIUM':
        res = await fetch(`${process.env.API_URL}/pricing/six/hindi`);
        result = await res.json();
        result.data.length > 0
          ? setPricingData(result.data[0].subject)
          : setPricingData();
        break;
      case 'CLASS VII-ENGLISH MEDIUM':
        res = await fetch(`${process.env.API_URL}/pricing/seven/english`);
        result = await res.json();
        result.data.length > 0
          ? setPricingData(result.data[0].subject)
          : setPricingData();
        break;
      case 'CLASS VII-HINDI MEDIUM':
        res = await fetch(`${process.env.API_URL}/pricing/seven/hindi`);
        result = await res.json();
        result.data.length > 0
          ? setPricingData(result.data[0].subject)
          : setPricingData();
        break;
      case 'CLASS VIII-ENGLISH MEDIUM':
        res = await fetch(`${process.env.API_URL}/pricing/eight/english`);
        result = await res.json();
        result.data.length > 0
          ? setPricingData(result.data[0].subject)
          : setPricingData();
        break;
      case 'CLASS VIII-HINDI MEDIUM':
        res = await fetch(`${process.env.API_URL}/pricing/eight/hindi`);
        result = await res.json();
        result.data.length > 0
          ? setPricingData(result.data[0].subject)
          : setPricingData();
        break;
      case 'CLASS IX-ENGLISH MEDIUM':
        res = await fetch(`${process.env.API_URL}/pricing/nine/english`);
        result = await res.json();
        result.data.length > 0
          ? setPricingData(result.data[0].subject)
          : setPricingData();
        break;
      case 'CLASS IX-HINDI MEDIUM':
        res = await fetch(`${process.env.API_URL}/pricing/nine/hindi`);
        result = await res.json();
        result.data.length > 0
          ? setPricingData(result.data[0].subject)
          : setPricingData();
        break;

      case 'CLASS X-ENGLISH MEDIUM':
        res = await fetch(`${process.env.API_URL}/pricing/ten/english`);
        result = await res.json();
        result.data.length > 0
          ? setPricingData(result.data[0].subject)
          : setPricingData();
        break;
      case 'CLASS X-HINDI MEDIUM':
        res = await fetch(`${process.env.API_URL}/pricing/ten/hindi`);
        result = await res.json();
        result.data.length > 0
          ? setPricingData(result.data[0].subject)
          : setPricingData();
        break;
      case 'CLASS XI-ENGLISH MEDIUM':
        res = await fetch(`${process.env.API_URL}/pricing/eleven/english`);
        result = await res.json();
        result.data.length > 0
          ? setPricingData(result.data[0].subject)
          : setPricingData();
        break;
      case 'CLASS XI-HINDI MEDIUM':
        res = await fetch(`${process.env.API_URL}/pricing/eleven/hindi`);
        result = await res.json();
        result.data.length > 0
          ? setPricingData(result.data[0].subject)
          : setPricingData();
        break;
      case 'CLASS XII-ENGLISH MEDIUM':
        res = await fetch(`${process.env.API_URL}/pricing/twelve/english`);
        result = await res.json();
        result.data.length > 0
          ? setPricingData(result.data[0].subject)
          : setPricingData();
        break;
      case 'CLASS XII-HINDI MEDIUM':
        res = await fetch(`${process.env.API_URL}/pricing/twelve/hindi`);
        result = await res.json();
        result.data.length > 0
          ? setPricingData(result.data[0].subject)
          : setPricingData();
        break;
      default:
        setPricingData();
    }
  }, []);

  const handleClick = (event, data) => {
    const btnClassName = event.target.className;
    const index = event.target.parentNode.parentNode.rowIndex;
    const table = document.getElementById('pricing');
    const columnLength = table.rows[index].cells.length;
    console.log(columnLength);

    for (var j = 1; j < columnLength; j++) {
      const cellValue = table.rows[index].cells[j].childNodes[0];
      console.log(cellValue);
      cellValue.classList.remove('isSelected');
    }

    if (btnClassName.includes('isSelected')) {
      event.target.classList.remove('isSelected');
      removePlan(data);
    } else {
      event.target.classList.add('isSelected');
      setPlan(data);
    }
  };

  const handlePayment = async () => {
    try {
      const orderData = {
        name: userInfo.name,
        email: userInfo.email,
        studentClass: userInfo.class,
        medium: userInfo.medium,
        amount: JSON.stringify(totalAmount),
        plan: planType,
        planDetails: planInfo,
      };

      console.log(orderData);

      const response = await fetch('/api/paytm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
      const result = await response.json();

      setPaytmData({
        mid: 'zWEMTK89662017572077',
        orderId: result.orderId,
        txnToken: result.txnToken,
      });

      document.getElementById('redFrom').submit();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Seo
        title="Plans"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="plans"
      />

      <Container>
        <div className="max-w-3xl mx-auto text-center mt-8 mb-8">
          <h1 className="text-3xl  font-medium text-indigo-700 mb-1 ">
            Select Your Subject Plan
          </h1>
          <p className="text-gray-500 xl:mx-12">
            We will notify you once the subject plan is available for disabled
            plan
          </p>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              {pricingData ? (
                <div className="overflow-hidden">
                  <table className="min-w-full" id="pricing">
                    <thead className="border-b border-black">
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left bg-gray-100"
                        >
                          SUBJECT
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-center bg-indigo-100"
                        >
                          MONTHLY FEE
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-center bg-yellow-100 "
                        >
                          HALF YEARLY FEE
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-center bg-green-100"
                        >
                          ANNUAL FEE
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pricingData.map((item, index) => (
                        <tr key={index} height="88px">
                          <td className="px-6 py-4  uppercase whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-100">
                            {item.name}
                          </td>
                          <td className="text-center bg-indigo-100">
                            {item.monthly_status === 'active' ? (
                              <>
                                <button
                                  onClick={(e) =>
                                    handleClick(e, {
                                      subject: item.name,
                                      plan: 'Monthly',
                                      amount: item.monthly_fee,
                                    })
                                  }
                                  className="px-5 py-1.5 mt-4 w-[116px] border text-[18px] bg-gray-100 font-semibold rounded"
                                >
                                  &#x20B9; {item.monthly_fee}
                                </button>

                                <p className="text-green-700 text-[9px] ">
                                  click to select
                                </p>
                              </>
                            ) : (
                              <>
                                <Link
                                  href="/contact"
                                  className="px-5 py-1 mt-4 w-[100px] border text-[18px] bg-gray-100 text-red-700 font-semibold rounded"
                                >
                                  Notify Me !
                                </Link>

                                <p className="text-red-700 text-[9px] ">
                                  Seat Full
                                </p>
                              </>
                            )}
                          </td>
                          <td className="text-center bg-yellow-100">
                            {item.halfyearly_status === 'active' ? (
                              <>
                                <button
                                  onClick={(e) =>
                                    handleClick(e, {
                                      subject: item.name,
                                      plan: 'Half Yearly',
                                      amount: item.halfyearly_fee,
                                    })
                                  }
                                  className="px-5 py-1.5 mt-4 w-[116px] border text-[18px] bg-gray-100 font-semibold rounded"
                                >
                                  &#x20B9; {item.halfyearly_fee}
                                </button>

                                <p className="text-green-700 text-[9px] ">
                                  click to select
                                </p>
                              </>
                            ) : (
                              <>
                                <Link
                                  href="/contact"
                                  className="px-5 py-1 mt-4 w-[100px] border text-[18px] bg-gray-100 text-red-700 font-semibold rounded"
                                >
                                  Notify Me !
                                </Link>

                                <p className="text-red-700 text-[9px] ">
                                  Seat Full
                                </p>
                              </>
                            )}
                          </td>
                          <td className="text-center bg-green-100">
                            {item.yearly_status === 'active' ? (
                              <>
                                <button
                                  onClick={(e) =>
                                    handleClick(e, {
                                      subject: item.name,
                                      plan: 'Yearly',
                                      amount: item.yearly_fee,
                                    })
                                  }
                                  className="px-5 py-1.5 mt-4 w-[116px] border text-[18px] bg-gray-100 font-semibold rounded"
                                >
                                  &#x20B9; {item.yearly_fee}
                                </button>

                                <p className="text-green-700 text-[9px] ">
                                  click to select
                                </p>
                              </>
                            ) : (
                              <>
                                <Link
                                  href="/contact"
                                  className="px-5 py-1 mt-4 w-[100px] border text-[18px] bg-gray-100 text-red-700 font-semibold rounded"
                                >
                                  Notify Me !
                                </Link>

                                <p className="text-red-700 text-[9px] ">
                                  Seat Full
                                </p>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="text-center pt-8 mt-3">
                    {totalAmount > 0 ? (
                      <button
                        onClick={handlePayment}
                        className="text-center w-48 px-5 py-2 mb-3 mr-1 text-base font-semibold text-white no-underline align-middle bg-blue-600 border border-transparent border-solid rounded-md cursor-pointer select-none sm:mb-0  hover:bg-blue-700 hover:border-blue-700 hover:text-white focus-within:bg-blue-700 focus-within:border-blue-700"
                      >
                        &#x20B9; {totalAmount}
                        <span className="pl-2">PAY NOW</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className=" w-48 px-5 py-2 mb-3 mr-1  font-semibold text-white no-underline align-middle border border-transparent border-solid rounded-md  disabled:transform-none disabled:transition-none disabled:bg-blue-200 disabled:cursor-not-allowed disabled:text-white  bg-blue-300 mx-1 transition duration-500 ease-in-out transform hover:translate-x-1 hover:scale-110 hover:blue-300 hover:shadow-md disabled:shadow-none"
                      >
                        No Plan Selected
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center my-16">
                  <h1>No Pricing Plan Available</h1>
                </div>
              )}
            </div>
          </div>
        </div>

        <ContactInformation />
      </Container>
      <Hiddenfrom
        mid={paytmData.mid}
        orderId={paytmData.orderId}
        txnToken={paytmData.txnToken}
      />
    </>
  );
};

PricingSmartPlanPage.Layout = Layout;

export default PricingSmartPlanPage;
