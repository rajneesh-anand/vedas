import { Fragment, useState, useEffect } from 'react';
import Input from '@components/ui/form/input';
import { useForm, Controller } from 'react-hook-form';
import Alert from '@components/ui/alert';
import { IoCheckmarkCircle } from 'react-icons/io5';

interface FormValues {
  email: string;
}

export default function ForgotPassword() {
  const [status, setStatus] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | undefined>('');
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  async function onSubmit(data: FormValues) {
    try {
      const res = await fetch(`${process.env.API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await res.json();
      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        setStatus('success');
      }
    } catch (error: any) {
      console.log(error);
      console.log(error.message);
      setStatus('failed');
      setErrorMsg(error.message);
    }
  }

  return (
    <>
      {status === 'success' ? (
        <div className="flex items-center justify-center h-[400px] text-green-700 ">
          <span className="w-10 h-10 me-3 lg:me-4 rounded-full bg-skin-primary bg-opacity-20 flex items-center justify-center flex-shrink-0">
            <IoCheckmarkCircle className="w-5 h-5 text-skin-primary" />
          </span>
          We have sent a password reset link at you email address. The Link is
          valid for 10 minutes only.
        </div>
      ) : (
        <div className="flex h-full justify-center items-center h-[300px]">
          {/* <form
            id="mc-form"
            className="relative text-center md:max-w-xl mx-auto mb-10"
          >
            <input
              id="mc-email"
              type="email"
              name="EMAIL"
              placeholder="email@example.com"
              className="border border-solid border-primary w-full h-14 sm:h-16 rounded-full bg-transparent placeholder-primary placeholder-opacity-50 text-sm sm:text-base focus:outline-none py-1 pl-8 pr-14 sm:pr-36"
            />
            <button
              id="mc-submit"
              type="submit"
              className="bg-dark transition-all hover:bg-orange hover:text-white px-10 sm:px-3 py-5 sm:py-1 rounded-l-full sm:rounded-l-none rounded-r-full text-white capitalize font-medium text-sm lg:text-md sm:absolute sm:top-0 sm:right-0 sm:h-full mt-3 sm:mt-0 leading-none w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form> */}

          <div className="w-[400px]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="w-full"
            >
              <div className="w-full mb-3 ">
                <Input
                  type="email"
                  variant="outline"
                  label="What is your email address ? "
                  placeholder="What is you email address !"
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
              <div className="text-center mt-8 mb-8">
                <button className="bg-green-500 hover:bg-green-700 text-white text-center py-2 px-6 rounded-full">
                  Send
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
