import { useForm, Controller } from 'react-hook-form';
import { Fragment, useState, useEffect } from 'react';
import useWindowSize from '@utils/use-window-size';
import Alert from '@components/ui/alert';
import Input from '@components/ui/input';
import TextArea from '@components/ui/form/text-area';
import HeroIcon from '@components/icons/hero';
import { IoCheckmarkCircle } from 'react-icons/io5';

interface FormValues {
  name: string;
  email: string;
  subject: string;
  contact: string;
  message: string;
}

export default function ContactForm() {
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState('');
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

  async function onSubmit(data: FormValues) {
    setProcessing(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('subject', data.subject);
    formData.append('contact', data.contact);
    formData.append('message', data.message);

    try {
      const res = await fetch(`${process.env.API_URL}/contact`, {
        method: 'POST',
        body: formData,
      });

      // const result = await res.json();

      if (res.status >= 400 && res.status < 600) {
        throw new Error();
      } else {
        setStatus('success');
        setProcessing(false);
        reset();
      }
    } catch (error: any) {
      console.log(error.message);
      setStatus('failed');
      setErrorMsg('Something went wrong !');
      setProcessing(false);
    }
  }

  return (
    <>
      <div className="text-center w-full">
        <svg
          className="text-gray-100 h-8 mx-auto"
          viewBox="0 0 150 29"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g
            id="Page-1"
            stroke="none"
            stroke-width="1"
            fill="none"
            fillRule="evenodd"
          >
            <g id="Desktop-HD" transform="translate(-1112.000000, -438.000000)">
              <g id="logo-4" transform="translate(1112.000000, 438.000000)">
                <path
                  d="M76.6605841,24.316569 L76.6605841,6.43875952 L94.3451636,17.7743071 C94.7005374,18.0021643 95.1070794,18.1154024 95.5136215,18.1154024 C95.9201636,18.1154024 96.3267056,18.0021643 96.6820794,17.7743071 L114.366659,6.43875952 L114.366659,24.316569 L76.6605841,24.316569 Z M109.288388,4.65802143 L95.5136215,13.4871405 L81.7388551,4.65802143 L109.288388,4.65802143 Z M114.366659,0.437140476 L76.6605841,0.437140476 L74.5178271,0.437140476 L72.375771,0.437140476 L72.375771,24.316569 L72.375771,28.53745 L76.6605841,28.53745 L114.366659,28.53745 L118.651472,28.53745 L118.651472,24.316569 L118.651472,0.437140476 L116.509416,0.437140476 L114.366659,0.437140476 Z"
                  id="Fill-76"
                ></path>
                <path
                  d="M10.224743,18.2356143 L14.5039486,6.60247143 L18.7831542,18.2356143 L10.224743,18.2356143 Z M10.8415654,0.847352381 L0.225911215,27.8822571 L6.89179907,27.8822571 L8.6196028,23.3023286 L20.3875935,23.3023286 L22.074743,27.8822571 L28.7406308,27.8822571 L18.1656308,0.847352381 L10.8415654,0.847352381 Z"
                  id="Fill-77"
                ></path>
                <path
                  d="M51.8908879,5.50827381 C54.7303738,5.50827381 57.1990654,7.25103571 58.3507009,9.43984524 L63.3707944,7.0079881 C61.4369159,3.6439881 57.9392523,0.401511905 51.8908879,0.401511905 C43.661215,0.401511905 37.2834112,6.07584524 37.2834112,14.3850357 C37.2834112,22.6942262 43.661215,28.3685595 51.8908879,28.3685595 C57.9392523,28.3685595 61.3955607,25.0853452 63.3707944,21.7213452 L58.3507009,19.3302262 C57.1990654,21.5590833 54.7303738,23.2617976 51.8908879,23.2617976 C46.9121495,23.2617976 43.2911215,19.4917976 43.2911215,14.3850357 C43.2911215,9.27758333 46.9121495,5.50827381 51.8908879,5.50827381"
                  id="Fill-78"
                ></path>
                <polygon
                  id="Fill-79"
                  points="149.674276 5.91365238 149.674276 0.846938095 130.25278 0.846938095 130.25278 27.8825333 149.674276 27.8825333 149.674276 22.815819 136.095771 22.815819 136.095771 16.6954381 149.386192 16.6954381 149.386192 11.6287238 136.095771 11.6287238 136.095771 5.91365238"
                ></polygon>
              </g>
            </g>
          </g>
        </svg>
      </div>
      <div className="max-w-screen-xl px-8 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto bg-gray-100 text-gray-900 rounded-lg shadow-lg">
        <div className="">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              We are always ready to help you !
            </h2>
            <div className="text-gray-700 mt-8">
              Hate forms? Send us an <span className="underline">email</span>{' '}
              instead.
            </div>
          </div>
          <div className="mt-10 text-center">
            <HeroIcon />
          </div>
        </div>
        {status === 'success' ? (
          <div className="flex items-center justify-center text-green-700 ">
            <span className="w-10 h-10 me-3 lg:me-4 rounded-full bg-skin-primary bg-opacity-20 flex items-center justify-center flex-shrink-0">
              <IoCheckmarkCircle className="w-5 h-5 text-skin-primary" />
            </span>
            Thank you for contacting us ! We will reply in 24 hours .
          </div>
        ) : (
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="w-full"
            >
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
              <div className="w-full  mb-3 ">
                <Input
                  type="text"
                  variant="outline"
                  label="Contact Number "
                  placeholder="Mobile Number"
                  {...register('contact', {
                    required: 'You must provide your mobile number !',
                    pattern: {
                      value: /^((\+91?)|\+)?[7-9][0-9]{9}$/,
                      message: 'Invalid Mobile Number !',
                    },
                  })}
                  error={errors.contact?.message}
                />
              </div>
              <div className="w-full  mb-3 ">
                <Input
                  type="text"
                  variant="outline"
                  label="Subject of your message "
                  placeholder="subject"
                  {...register('subject', {
                    required: 'You must provide subject !',
                  })}
                  error={errors.subject?.message}
                />
              </div>
              <div className="w-full ">
                <TextArea
                  variant="outline"
                  label="Message"
                  {...register('message')}
                  placeholder=" Write your message here .. ?"
                />
              </div>
              <div className="text-center mt-8 mb-8">
                <button className="bg-green-500 hover:bg-green-700 text-white text-center py-2 px-5 rounded-full">
                  {processing ? 'Sending ... ' : 'Send Message'}
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
        )}
      </div>
    </>
  );
}
