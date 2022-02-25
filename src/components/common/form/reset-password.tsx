import { Fragment, useState, useEffect } from 'react';
import PasswordInput from '@components/ui/password-input';
import { useForm, Controller } from 'react-hook-form';
import Alert from '@components/ui/alert';
import { IoCheckmarkCircle } from 'react-icons/io5';
import { useRouter } from 'next/router';
import Link from '@components/ui/link';

interface FormValues {
  password: string;
}

export default function ResetPassword() {
  const router = useRouter();
  const accessToken = router.query.access;
  // console.log(accessToken);
  const [status, setStatus] = useState('');
  const [pwdStatus, setPwdStatus] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | undefined>('');
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    const fetchTokenStatus = async () => {
      try {
        const res = await fetch(
          `${process.env.API_URL}/auth/reset-password/${accessToken}`
        );
        const result = await res.json();
        console.log(result);
        if (res.status >= 400 && res.status < 600) {
          throw new Error(result.message);
        } else {
          setStatus('success');
        }
      } catch (error: any) {
        console.log(error.message);
        setStatus('failed');
        setErrorMsg(error.message);
      }
    };
    fetchTokenStatus();
  }, [status]);

  async function onSubmit(data: FormValues) {
    try {
      const res = await fetch(
        `${process.env.API_URL}/auth/reset-password/reset/${accessToken}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password: data.password }),
        }
      );

      const result = await res.json();
      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        setPwdStatus('success');
      }
    } catch (error: any) {
      console.log(error);
      console.log(error.message);
      setPwdStatus('failed');
      setErrorMsg(error.message);
    }
  }

  return (
    <>
      {status !== '' ? (
        status === 'failed' ? (
          <div className="flex items-center justify-center h-[400px]">
            <Alert
              message={errorMsg}
              variant="error"
              closeable={true}
              className="mt-5"
              onClose={() => setErrorMsg('')}
            />
          </div>
        ) : pwdStatus === 'success' ? (
          <div className="flex items-center justify-center h-[400px] text-green-700 ">
            <span className="w-10 h-10 me-3 lg:me-4 rounded-full bg-skin-primary bg-opacity-20 flex items-center justify-center flex-shrink-0">
              <IoCheckmarkCircle className="w-5 h-5 text-skin-primary" />
            </span>
            Your Password has been updated successfully !
            <div>
              <Link href="/auth/signin">Sign In</Link>
            </div>
          </div>
        ) : (
          <div className="flex h-full justify-center items-center h-[300px]">
            <div className="w-[400px]">
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="w-full"
              >
                <div className="w-full mb-3 ">
                  <PasswordInput
                    label="Enter Your New Password"
                    variant="outline"
                    placeholder="Enter Your New Password"
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
                <div className="text-center mt-8 mb-8">
                  <button className="bg-green-500 hover:bg-green-700 text-white text-center py-2 px-6 rounded-full">
                    Reset Password
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
        )
      ) : null}
    </>
  );
}
