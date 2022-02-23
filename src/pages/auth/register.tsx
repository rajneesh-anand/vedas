import { Fragment, useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useForm, Controller } from 'react-hook-form';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { getSession } from 'next-auth/react';
import { Listbox, Transition } from '@headlessui/react';
import { HiOutlineSelector, HiCheck } from 'react-icons/hi';
import { IoCheckmarkCircle } from 'react-icons/io5';
import Input from '@components/ui/input';
import PasswordInput from '@components/ui/password-input';
import Seo from '@components/seo/seo';
import Container from '@components/ui/container';
import Link from '@components/ui/link';
import Layout from '@components/layout';
import { StatesOptions, ClassOptions, MediumOptions } from '@data/state';
import useWindowSize from '@utils/use-window-size';
import Alert from '@components/ui/alert';
import HeroIcon from '@components/icons/hero';

interface FormValues {
  name: string;
  email: string;
  password: string;
  class: string;
  medium: string;
  address: string;
  city: string;
  state: string;
  mobile: string;
  whatsapp: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

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

export default function RegisterPage() {
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState('');
  const [selectedState, setSelectedState] = useState(StatesOptions[0]);
  const [selectedClass, setSelectedClass] = useState(ClassOptions[0]);
  const [selectedMedium, setSelectedMedium] = useState(MediumOptions[0]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [errorMsg, setErrorMsg] = useState<string | undefined>('');

  const { width } = useWindowSize();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onDrop = (acceptedFiles: any) => {
    setProfilePhoto(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  useEffect(() => {
    if (status === 'failed') {
      toast.error(' Oops something went wrong !', {
        progressClassName: 'fancy-progress-bar',
        position: width! > 768 ? 'bottom-right' : 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [status]);

  async function onSubmit(data: FormValues) {
    setProcessing(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('state', data.state ? data.state : StatesOptions[0]);
    formData.append('class', data.class ? data.class : ClassOptions[0]);
    formData.append('medium', data.medium ? data.medium : MediumOptions[0]);
    formData.append('mobile', data.mobile);
    formData.append('whatsapp', data.whatsapp);
    formData.append('photo', profilePhoto!);
    formData.append('userType', 'Student');
    try {
      const res = await fetch(`${process.env.API_URL}/auth/register`, {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        setStatus('success');
        setProcessing(false);
        reset();
      }
    } catch (error: any) {
      console.log(error.message);
      setStatus('failed');
      setErrorMsg(error?.message);
      setProcessing(false);
    }
  }

  return (
    <>
      <Seo
        title="Register"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="/auth/register"
      />
      {status === 'success' ? (
        <Container>
          <div className="flex items-center justify-center text-green-700 text-sm mt-16 lg:mb-8">
            <span className="w-10 h-10 me-3 lg:me-4 rounded-full bg-skin-primary bg-opacity-20 flex items-center justify-center flex-shrink-0">
              <IoCheckmarkCircle className="w-5 h-5 text-skin-primary" />
            </span>
            Thank you for enrolling with VedusOne Acacdemy
          </div>
          <div className="text-center mb-16">
            <Link
              href="/auth/signin"
              className="text-white px-8 py-[4px] text-[16px]  bg-gradient-to-r from-yellow-500 via-pink-500 to-red-500 hover:from-green-400 hover:to-blue-500 "
            >
              Sign In
            </Link>
          </div>
        </Container>
      ) : (
        <div className="max-w-screen-xl px-8 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto bg-gray-100 text-gray-900 rounded-lg shadow-lg">
          <div className="text-center pt-1 lg:pt-[96px]">
            <div>
              <h2 className="text-xl lg:text-3xl font-bold leading-tight">
                VedasOne Registration Form
              </h2>
              <div className="text-gray-700 mt-4">
                Refer 5 friends &amp; Get 50% Discount on Tuitionn Fee
              </div>
            </div>
            <div className=" mt-1 lg:mt-[56px]">
              <HeroIcon />
            </div>
          </div>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="w-full"
            >
              <div className="text-center mb-3">
                <img
                  className="inline object-cover w-28 h-28  rounded-full overflow-hidden border"
                  src={
                    profilePhoto
                      ? URL.createObjectURL(profilePhoto)
                      : '/images/default-profile.svg'
                  }
                  alt="Profile Photo"
                />
              </div>

              <div {...getRootProps()}>
                <input
                  className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  {...getInputProps()}
                />
                <div className="flex justify-center">
                  <div className="w-[184px] px-6 py-2 border cursor-pointer border-dashed border-gray-900 bg-gray-100 ">
                    <p className=" text-[12px] uppercase ">
                      Choose Your Photo{' '}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full mb-3">
                <Input
                  variant="outline"
                  type="text"
                  label="Full Name"
                  placeholder="Enter your full name"
                  {...register('name', {
                    required: 'You must provide your full name !',
                  })}
                  error={errors.name?.message}
                />
              </div>
              <div className="w-full mb-3 ">
                <Input
                  type="email"
                  variant="outline"
                  label="Email Address "
                  placeholder="Enter your email address"
                  {...register('email', {
                    required: 'You must provide your email address !',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Invalid email address !',
                    },
                  })}
                  error={errors.email?.message}
                />
              </div>
              <div className="w-full mb-3 ">
                <PasswordInput
                  label="Password"
                  variant="outline"
                  placeholder="Set Password"
                  helperText="[ minimum 8 characters ] "
                  {...register('password', {
                    required: 'You must set password !',
                    pattern: {
                      value: /^(?=.*).{8,}$/,
                      message: 'Invalid Password  !',
                    },
                  })}
                  error={errors?.password?.message!}
                />
              </div>

              <div className="flex flex-col lg:flex-row">
                <div className="w-full md:w-1/2  mb-3 ">
                  <Controller
                    name="class"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Listbox
                        value={selectedClass}
                        onChange={(e) => {
                          onChange(e);
                          setSelectedClass(e);
                        }}
                      >
                        {({ open }) => (
                          <div className="relative lg:ms-0 z-10 min-w-[180px]">
                            <Listbox.Label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
                              Class
                            </Listbox.Label>

                            <Listbox.Button className="border border-gray-300  text-heading text-[13px] md:text-sm font-semibold  relative w-full py-2 ps-3 pe-10 text-start bg-white  shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm cursor-pointer ">
                              <span className="block truncate">
                                {selectedClass}
                              </span>
                              <span className="absolute inset-y-0 end-0 flex items-center pe-2 pointer-events-none">
                                <HiOutlineSelector
                                  className="w-5 h-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>
                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options
                                static
                                className="absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none text-sm"
                              >
                                {ClassOptions?.map((option, idx) => (
                                  <Listbox.Option
                                    key={idx}
                                    className={({ active }) =>
                                      `${
                                        active
                                          ? 'text-amber-900 bg-gray-100'
                                          : 'text-gray-900'
                                      }
                          cursor-default select-none relative py-2 ps-10 pe-4`
                                    }
                                    value={option}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <span
                                          className={`${
                                            selected
                                              ? 'font-medium'
                                              : 'font-normal'
                                          } block truncate`}
                                        >
                                          {option}
                                        </span>
                                        {selected ? (
                                          <span
                                            className={`${
                                              active ? 'text-amber-600' : ''
                                            }
                                check-icon absolute inset-y-0 start-0 flex items-center ps-3`}
                                          >
                                            <HiCheck
                                              className="w-5 h-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        )}
                      </Listbox>
                    )}
                  />
                </div>
                <div className="w-full md:w-1/2  mb-3 lg:ml-[4px]">
                  <Controller
                    name="medium"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Listbox
                        value={selectedMedium}
                        onChange={(e) => {
                          onChange(e);
                          setSelectedMedium(e);
                        }}
                      >
                        {({ open }) => (
                          <div className="relative lg:ms-0 z-10 min-w-[180px]">
                            <Listbox.Label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
                              Medium
                            </Listbox.Label>

                            <Listbox.Button className="border border-gray-300  text-heading text-[13px] md:text-sm font-semibold  relative w-full py-2 ps-3 pe-10 text-start bg-white  shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm cursor-pointer ">
                              <span className="block truncate">
                                {selectedMedium}
                              </span>
                              <span className="absolute inset-y-0 end-0 flex items-center pe-2 pointer-events-none">
                                <HiOutlineSelector
                                  className="w-5 h-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>
                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options
                                static
                                className="absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none text-sm"
                              >
                                {MediumOptions?.map((option, idx) => (
                                  <Listbox.Option
                                    key={idx}
                                    className={({ active }) =>
                                      `${
                                        active
                                          ? 'text-amber-900 bg-gray-100'
                                          : 'text-gray-900'
                                      }
                          cursor-default select-none relative py-2 ps-10 pe-4`
                                    }
                                    value={option}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <span
                                          className={`${
                                            selected
                                              ? 'font-medium'
                                              : 'font-normal'
                                          } block truncate`}
                                        >
                                          {option}
                                        </span>
                                        {selected ? (
                                          <span
                                            className={`${
                                              active ? 'text-amber-600' : ''
                                            }
                                check-icon absolute inset-y-0 start-0 flex items-center ps-3`}
                                          >
                                            <HiCheck
                                              className="w-5 h-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        )}
                      </Listbox>
                    )}
                  />
                </div>
              </div>

              <div className="w-full mb-3 ">
                <Input
                  type="text"
                  variant="outline"
                  label="Address"
                  placeholder="Enter Your Address"
                  {...register('address', {
                    required: 'You must provide your address !',
                  })}
                  error={errors.address?.message}
                />
              </div>

              <div className="flex flex-col lg:flex-row">
                <div className="w-full md:w-1/2  mb-3 ">
                  <Input
                    type="text"
                    variant="outline"
                    label="City"
                    placeholder="Your City/Town Name"
                    {...register('city')}
                    error={errors.city?.message}
                  />
                </div>
                <div className="w-full md:w-1/2  mb-3 lg:ml-[4px]">
                  <Controller
                    name="state"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Listbox
                        value={selectedState}
                        onChange={(e) => {
                          onChange(e);
                          setSelectedState(e);
                        }}
                      >
                        {({ open }) => (
                          <div className="relative lg:ms-0 z-10 min-w-[180px]">
                            <Listbox.Label className="block text-gray-600 font-semibold text-sm leading-none mb-3 cursor-pointer">
                              State
                            </Listbox.Label>

                            <Listbox.Button className="border border-gray-300  text-heading text-[13px] md:text-sm font-semibold  relative w-full py-2 ps-3 pe-10 text-start bg-white  shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm cursor-pointer ">
                              <span className="block truncate">
                                {selectedState}
                              </span>
                              <span className="absolute inset-y-0 end-0 flex items-center pe-2 pointer-events-none">
                                <HiOutlineSelector
                                  className="w-5 h-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>
                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options
                                static
                                className="absolute w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none text-sm"
                              >
                                {StatesOptions?.map((option, idx) => (
                                  <Listbox.Option
                                    key={idx}
                                    className={({ active }) =>
                                      `${
                                        active
                                          ? 'text-amber-900 bg-gray-100'
                                          : 'text-gray-900'
                                      }
                          cursor-default select-none relative py-2 ps-10 pe-4`
                                    }
                                    value={option}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <span
                                          className={`${
                                            selected
                                              ? 'font-medium'
                                              : 'font-normal'
                                          } block truncate`}
                                        >
                                          {option}
                                        </span>
                                        {selected ? (
                                          <span
                                            className={`${
                                              active ? 'text-amber-600' : ''
                                            }
                                check-icon absolute inset-y-0 start-0 flex items-center ps-3`}
                                          >
                                            <HiCheck
                                              className="w-5 h-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        )}
                      </Listbox>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2  mb-3 ">
                  <Input
                    type="text"
                    variant="outline"
                    label="Contact Number "
                    placeholder="Mobile Number"
                    {...register('mobile', {
                      required: 'You must provide your mobile number !',
                      pattern: {
                        value: /^((\+91?)|\+)?[7-9][0-9]{9}$/,
                        message: 'Invalid Mobile Number !',
                      },
                    })}
                    error={errors.mobile?.message}
                  />
                </div>
                <div className="w-full lg:w-1/2  mb-3 lg:ml-[4px]">
                  <Input
                    type="text"
                    variant="outline"
                    label="Whatsapp Number (Optional) "
                    placeholder="Whatsapp Number"
                    {...register('whatsapp', {
                      pattern: {
                        value: /^((\+91?)|\+)?[7-9][0-9]{9}$/,
                        message: 'Invalid Mobile Number !',
                      },
                    })}
                    error={errors.whatsapp?.message}
                  />
                </div>
              </div>

              <div className="text-center mt-8 mb-8">
                <button className="bg-green-500 hover:bg-green-700 text-white text-center py-2 px-5 rounded-full">
                  {processing ? 'Submitting Form ... ' : 'Register'}
                </button>
              </div>
              {errorMsg ? (
                <Alert
                  message={errorMsg}
                  variant="error"
                  closeable={true}
                  className="mt-5"
                  onClose={() => setErrorMsg('')}
                />
              ) : null}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

RegisterPage.Layout = Layout;
