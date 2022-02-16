import Layout from '@components/layout';
import Container from '@components/ui/container';
import Seo from '@components/seo/seo';
import Alert from '@components/ui/alert';
import Button from '@components/ui/button';
import Input from '@components/ui/input';
import Link from '@components/ui/link';
import PasswordInput from '@components/ui/password-input';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Logo from '@components/ui/logo';
import { GetServerSideProps } from 'next';
import { signIn, getCsrfToken, getSession } from 'next-auth/react';
import { QueryClient } from 'react-query';
import { dehydrate } from 'react-query/hydration';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const csrfToken = await getCsrfToken(context);
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
      csrfToken: csrfToken,
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

type FormValues = {
  email: string;
  password?: string;
};

export default function LoginPage({ csrfToken }: any) {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | undefined>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const result = await signIn<'credentials'>('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: 'http://localhost:3000',
    });
    console.log(result);
    if (result?.error) {
      setErrorMsg(result?.error);
    }
    if (result?.url) router.push(result.url);
  };

  return (
    <>
      <Seo
        title="Sign In"
        description="Online Education Institute"
        path="/auth/signin"
      />

      <div
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + '/images/page-hero-bg.png'
          })`,
        }}
      >
        <div className="flex items-center justify-center ">
          <div className="m-auto max-w-md w-full pt-[50px] pb-[100px] px-[32px] lg:px-[48px]">
            <h3 className="text-center text-indigo-900 font-semibold mb-4 mt-4">
              Sign In to VedusOne Academy
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <Input
                label="Email"
                type="email"
                variant="outline"
                className="mb-4"
                {...register('email', {
                  required: 'You must provide your email address !',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid email address !',
                  },
                })}
                error={errors.email?.message}
              />
              <PasswordInput
                label="Password"
                variant="outline"
                className="mb-4"
                forgotPassHelpText="Forgot Password"
                forgotPageLink="/forgot-password"
                {...register('password', {
                  required: 'You must provide your password !',
                })}
                error={errors?.password?.message!}
              />
              <div className="text-center mb-2">
                <button className="text-white px-8 py-[4px] text-[16px]  bg-gradient-to-r from-yellow-500 via-pink-500 to-red-500 hover:from-green-400 hover:to-blue-500 ">
                  Login
                </button>
              </div>

              {/* <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-3 sm:mt-4 mb-3 sm:mb-4">
                <hr className="w-full" />
              </div> */}

              <div className="text-sm sm:text-base text-body text-center">
                Don't have an account ?
                <Link
                  href="/auth/register"
                  className="ms-1 underline text-accent font-semibold transition-colors duration-200 focus:outline-none hover:text-accent-hover focus:text-accent-700 hover:no-underline focus:no-underline"
                >
                  Register
                </Link>
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
      </div>
    </>
  );
}

LoginPage.Layout = Layout;
