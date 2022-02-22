import React, { useEffect, useState } from 'react';
import { useFormData } from '@contexts/search/plan.context';
import { BsCheck2Square } from 'react-icons/bs';
import { useSession } from 'next-auth/react';
import Link from '@components/ui/link';
import { useRouter } from 'next/router';
import { slugify } from '@utils/helper';

interface paytmObject {
  mid: string;
  orderId: string;
  txnToken: string;
}

const Hiddenfrom = ({ mid, orderId, txnToken }: paytmObject) => {
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

const PlanInfo = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [plansData, setPlansData] = useState(Object);
  const [basicData, setBasicData] = useState(Object);
  const [proData, setProData] = useState(Object);
  const [offlineData, setOfflineData] = useState(Object);
  const [paytmData, setPaytmData] = useState<paytmObject>({
    mid: '',
    orderId: '',
    txnToken: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${process.env.API_URL}/plans`);
      const result = await res.json();

      const freePlan = result.find((obj: any) => {
        return obj.plan_type === 'free';
      });
      const basicPlan = result.find((obj: any) => {
        return obj.plan_type === 'basic';
      });

      const proPlan = result.find((obj: any) => {
        return obj.plan_type === 'pro';
      });

      const offlinePlan = result.find((obj: any) => {
        return obj.plan_type === 'offline';
      });

      setPlansData(freePlan);
      setBasicData(basicPlan);
      setProData(proPlan);
      setOfflineData(offlinePlan);
    };
    fetchData();
  }, []);

  // const handlePayment = async (amount: string, plan: string) => {
  //   // event.preventDefault();
  //   try {
  //     const orderData = {
  //       name: session?.user?.name,
  //       email: session?.user?.email,
  //       type: plan,
  //       amount: amount,
  //       class: router.query.class,
  //       board: studentInfo.board,
  //       medium: studentInfo.medium,
  //       subjects: studentInfo.subject,
  //     };
  //     console.log(orderData);

  //     const response = await fetch('/api/paytm', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(orderData),
  //     });
  //     const result = await response.json();

  //     setPaytmData({
  //       mid: 'zWEMTK89662017572077',
  //       orderId: result.orderId,
  //       txnToken: result.txnToken,
  //     });

  //     (document.getElementById('redFrom') as HTMLFormElement).submit();
  //     // document.getElementById('redFrom')!.submit();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="pricing-table-2 py-6 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-medium text-indigo mb-4 md:mb-6">
            VedusOne Study Plans
          </h1>
          <p className="text-gray-500 xl:mx-12">
            You have 4 plans to choose. Basic blocks are FREE forever. Other
            premium blocks are also free. You can use it for your personal or
            commercial projects. Just don't forget to share our website or give
            attribution.
          </p>
        </div>

        <div className="pricing-plans lg:flex lg:-mx-4 mt-6 md:mt-12">
          <div className="pricing-plan-wrap lg:w-1/4 my-4 ">
            <div className="text-center h-[32px] "></div>
            <div className="pricing-plan border border-solid border-indigo-300 bg-white text-center max-w-sm mx-auto hover:border-2 hover:border-indigo-600 transition-colors duration-300 lg:mr-3">
              <div className="pricing-amount text-2xl font-semibold bg-indigo-200 px-2 py-6 transition-colors duration-300">
                {plansData.plan_name}
              </div>
              <div className="p-4 lg:p-4 min-h-[300px]">
                <ul>
                  {plansData?.features?.map((item: any, index: any) => {
                    return (
                      <li key={index} className="flex mb-3">
                        <div>
                          <BsCheck2Square
                            className="w-9  text-skin-base text-blue-700 px-2"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="text-left">
                          <p className="text-[11.5px] ">{item}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="mt-6 mb-6 py-4">
                <Link
                  href="/"
                  className="bg-gradient-to-r from-green-400  to-blue-500 hover:from-yellow-500  hover:via-pink-500 hover:to-red-500 rounded-full px-6 py-2 text-white"
                >
                  Explore Free
                </Link>
              </div>
            </div>
          </div>

          <div className="pricing-plan-wrap lg:w-1/4 my-4 ">
            <div className="text-center h-[32px] ">
              <p className=" rounded-full py-1 w-[100px] text-white text-[10px] font-semibold bg-red-700 ">
                Most Popular
              </p>
            </div>
            <div className="pricing-plan border border-solid border-indigo-300 bg-white text-center max-w-sm mx-auto hover:border-2 hover:border-indigo-700 transition-colors duration-300 lg:mr-3">
              <div className="pricing-amount text-2xl font-semibold  bg-indigo-200 px-2 py-6 transition-colors duration-300">
                {basicData.plan_name}
              </div>
              <div className="p-4 lg:p-4 min-h-[300px]">
                <ul>
                  {basicData?.features?.map((item: any, index: any) => {
                    return (
                      <li key={index} className="flex mb-3">
                        <div>
                          <BsCheck2Square
                            className="w-9  text-skin-base text-blue-700 px-2"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="text-initial">
                          <p className="text-[11.5px] ">{item}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="mt-6 mb-6 py-4">
                {!session ? (
                  <Link
                    href="/auth/signin"
                    className="bg-gradient-to-r hover:from-green-400  hover:to-blue-500 from-yellow-500  via-pink-500 to-red-500 rounded-full px-6 py-2 text-white"
                  >
                    Select Plan
                  </Link>
                ) : (
                  <Link
                    href={`/pricing?type=${basicData?.plan_name}`}
                    className="bg-gradient-to-r hover:from-green-400  hover:to-blue-500 from-yellow-500  via-pink-500 to-red-500 rounded-full px-6 py-2 text-white"
                  >
                    Select Plan
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="pricing-plan-wrap lg:w-1/4 my-4 ">
            <div className="text-center h-[32px] ">
              <p className=" rounded-full py-1 w-[100px] text-white text-[10px] font-semibold bg-red-700 ">
                Most Popular
              </p>
            </div>
            <div className="pricing-plan border border-solid border-indigo-300 bg-white text-center max-w-sm mx-auto hover:border-2 hover:border-indigo-600 transition-colors duration-300 lg:mr-3">
              <div className="pricing-amount text-2xl font-semibold bg-indigo-200 px-2 py-6 transition-colors duration-300">
                {proData.plan_name}
              </div>
              <div className="p-4 lg:p-4 min-h-[300px]">
                <ul>
                  {proData?.features?.map((item: any, index: any) => {
                    return (
                      <li key={index} className="flex mb-3">
                        <div>
                          <BsCheck2Square
                            className="w-9  text-skin-base text-blue-700 px-2"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="text-initial">
                          <p className="text-[11.5px] ">{item}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="mt-6 mb-6 py-4">
                {!session ? (
                  <Link
                    href="/auth/signin"
                    className="bg-gradient-to-r hover:from-green-400  hover:to-blue-500 from-yellow-500  via-pink-500 to-red-500 rounded-full px-6 py-2 text-white"
                  >
                    Select Plan
                  </Link>
                ) : (
                  <Link
                    href={`/pricing?type=${proData?.plan_name}`}
                    className="bg-gradient-to-r hover:from-green-400  hover:to-blue-500 from-yellow-500  via-pink-500 to-red-500 rounded-full px-6 py-2 text-white"
                  >
                    Select Plan
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className="pricing-plan-wrap lg:w-1/4 my-4 ">
            <div className="text-center h-[32px] "></div>
            <div className="pricing-plan border border-solid border-indigo-300 bg-white text-center max-w-sm mx-auto hover:border-2 hover:border-indigo-600 transition-colors duration-300 lg:mr-3">
              <div className="pricing-amount text-2xl font-semibold bg-indigo-200 px-2 py-6 transition-colors duration-300">
                {offlineData.plan_name}
              </div>

              <div className="p-4 lg:p-4 min-h-[300px]">
                <ul>
                  {offlineData?.features?.map((item: any, index: any) => {
                    return (
                      <li key={index} className="flex mb-3">
                        <div>
                          <BsCheck2Square
                            className="w-9  text-skin-base text-blue-700 px-2"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="text-initial">
                          <p className="text-[11.5px] ">{item}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="mt-6 mb-6 py-4">
                <Link
                  href="/contact"
                  className="bg-gradient-to-r from-green-400  to-blue-500 hover:from-yellow-500  hover:via-pink-500 hover:to-red-500 rounded-full px-6 py-2 text-white"
                >
                  Visit Academy
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Hiddenfrom
          mid={paytmData.mid}
          orderId={paytmData.orderId}
          txnToken={paytmData.txnToken}
        />
      </div>
    </div>
  );
};

export default PlanInfo;
