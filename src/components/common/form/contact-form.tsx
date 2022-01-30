import { Fragment, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import useWindowSize from '@utils/use-window-size';
import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import TextArea from '@components/ui/form/text-area';
import FileInput from '@components/ui/form/file-input';
import Multiselect from '@components/ui/form/multi-select';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Listbox, Transition } from '@headlessui/react';
import { HiOutlineSelector, HiCheck } from 'react-icons/hi';
import { ClassOptions, StreamOptions, SubjectsOptions } from '@data/student';
import { StatesOptions } from '@data/state';
import { IoCheckmarkCircle } from 'react-icons/io5';

interface FormValues {
  fName: string;
  lName: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  contact: string;
  email: string;
  school: string;
  class: string;
  stream: string;
  subjects: string[];
  message: string;
}

const ContactForm: React.FC = () => {
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState('');
  const [selectedClass, setSelectedClass] = useState(ClassOptions[0]);
  const [selectedState, setSelectedState] = useState(StatesOptions[0]);
  const [selectedStream, setSelectedStream] = useState(StreamOptions[0]);
  const [selectedSubject, setSelectedSubject] = useState<Array<string>>([]);
  const [profilePhoto, setProfilePhoto] = useState(null);

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
    console.log(acceptedFiles);
    setProfilePhoto(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  function isSelected(value: any) {
    return selectedSubject.find((el) => el === value) ? true : false;
  }

  function removeSubject(value: any) {
    const removedSelection = selectedSubject.filter(
      (selected) => selected !== value
    );
    setSelectedSubject(removedSelection);
  }

  function handleSelection(value: any) {
    const selectedResult = selectedSubject.filter(
      (selected) => selected === value
    );

    if (selectedResult.length) {
      removeSubject(value);
    } else {
      setSelectedSubject((currents) => [...currents, value]);
    }
  }

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
    formData.append('fName', data.fName);
    formData.append('lName', data.lName);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('state', data.state ? data.state : StatesOptions[0]);
    formData.append('pincode', data.pincode);
    formData.append('contact', data.contact);
    formData.append('email', data.email);
    formData.append('school', data.school);
    formData.append('class', data.class ? data.class : ClassOptions[0]);
    formData.append('stream', data.stream ? data.stream : StreamOptions[0]);
    formData.append('message', data.message);
    formData.append(
      'subjects',
      selectedSubject.length === 0
        ? JSON.stringify([])
        : JSON.stringify(selectedSubject)
    );
    formData.append('photo', profilePhoto!);
    try {
      const res = await fetch(`${process.env.API_URL}/enrollment`, {
        method: 'POST',
        body: formData,
      });

      if (res.status >= 400 && res.status < 600) {
        throw new Error('Bad response from server');
      } else {
        setStatus('success');
        setProcessing(false);
        reset();
      }

      const result = await res.json();
      console.log(result);
    } catch (error) {
      console.log(error);
      setStatus('failed');
      setProcessing(false);
    }
  }

  const { t } = useTranslation();

  if (status === 'success') {
    return (
      <div className="border border-skin-base bg-skin-secondary px-4 lg:px-5 py-4 rounded-md flex items-center justify-start text-green-700 text-sm md:text-base mb-6 lg:mb-8">
        <span className="w-10 h-10 me-3 lg:me-4 rounded-full bg-skin-primary bg-opacity-20 flex items-center justify-center flex-shrink-0">
          <IoCheckmarkCircle className="w-5 h-5 text-skin-primary" />
        </span>
        Thank you for enrolling with Vedas Acacdemy
      </div>
    );
  } else {
    return (
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
        <div className="flex flex-wrap -mx-3 mb-6 justify-center">
          <img
            className="inline object-cover w-32 h-32 mr-2 border-black rounded-full overflow-hidden border"
            src={profilePhoto ? URL.createObjectURL(profilePhoto) : '/logo.svg'}
            alt="Profile Photo"
          />
        </div>

        <div className="flex flex-wrap -mx-3 mb-6 justify-center">
          <div {...getRootProps()}>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              {...getInputProps()}
            />
            <div
              className={
                'w-full px-6 py-2 border rounded border-solid border-gray-900 bg-gray-200 '
              }
            >
              <p className="text-center text-[12px] text-semibold uppercase">
                Choose Your Photo{' '}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Input
              variant="solid"
              type="text"
              label="First Name"
              placeholder="Enter Your First Name"
              {...register('fName', {
                required: 'You must provide your first name !',
              })}
              error={errors.fName?.message}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <Input
              type="text"
              variant="solid"
              label="Last Name"
              placeholder="Enter Your Last Name"
              {...register('lName', {
                required: 'You must provide your last name !',
              })}
              error={errors.lName?.message}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <Input
              type="text"
              variant="solid"
              label="Address"
              placeholder="Enter Your Address"
              {...register('address', {
                required: 'You must provide your address !',
              })}
              error={errors.address?.message}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <Input
              type="text"
              variant="solid"
              label="City"
              placeholder="Your City/Town Name"
              {...register('city')}
              error={errors.city?.message}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
                    <div className="relative ms-2 lg:ms-0 z-10 min-w-[180px]">
                      <Listbox.Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-skin-base ">
                        State
                      </Listbox.Label>

                      <Listbox.Button className="border border-gray-300  text-heading text-[13px] md:text-sm font-semibold  relative w-full py-2 ps-3 pe-10 text-start bg-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm cursor-pointer h-11 md:h-12">
                        <span className="block truncate">{selectedState}</span>
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
                                      selected ? 'font-medium' : 'font-normal'
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
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <Input
              type="text"
              variant="solid"
              label="Pin Code"
              placeholder=""
              {...register('pincode', {
                pattern: {
                  value: /^[1-9][0-9]{5}$/,
                  message: 'Invalid Pin Code !',
                },
              })}
              error={errors.pincode?.message}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <Input
              type="text"
              variant="solid"
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
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <Input
              type="email"
              variant="solid"
              label="Email ( Optional ) "
              placeholder="Email Id"
              {...register('email', {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: 'Invalid email address !',
                },
              })}
              error={errors.email?.message}
            />
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <Input
              type="text"
              variant="solid"
              label="School / College Name"
              placeholder="What is the name of your school ?"
              {...register('school')}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
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
                    <div className="relative ms-2 lg:ms-0 z-10 min-w-[180px]">
                      <Listbox.Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-skin-base ">
                        Academic Class
                      </Listbox.Label>

                      <Listbox.Button className="border border-gray-300  text-heading text-[13px] md:text-sm font-semibold  relative w-full py-2 ps-3 pe-10 text-start bg-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm cursor-pointer h-11 md:h-12">
                        <span className="block truncate">{selectedClass}</span>
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
                                      selected ? 'font-medium' : 'font-normal'
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
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <Controller
              name="stream"
              control={control}
              render={({ field: { onChange } }) => (
                <Listbox
                  value={selectedStream}
                  onChange={(e) => {
                    onChange(e);
                    setSelectedStream(e);
                  }}
                >
                  {({ open }) => (
                    <div className="relative ms-2 lg:ms-0 z-10 min-w-[180px]">
                      <Listbox.Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-skin-base ">
                        Stream ( Optional )
                      </Listbox.Label>

                      <Listbox.Button className="border border-gray-300  text-heading text-[13px] md:text-sm font-semibold  relative w-full py-2 ps-3 pe-10 text-start bg-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm cursor-pointer h-11 md:h-12">
                        <span className="block truncate">{selectedStream}</span>
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
                          {StreamOptions?.map((option, idx) => (
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
                                      selected ? 'font-medium' : 'font-normal'
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
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <Controller
              name="subjects"
              control={control}
              render={({ field: { onChange } }) => (
                <Listbox
                  value={selectedSubject}
                  onChange={(e) => {
                    onChange(e);
                    handleSelection(e);
                  }}
                >
                  {({ open }) => (
                    <div className="relative ms-2 lg:ms-0 z-10 min-w-[180px]">
                      <Listbox.Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-skin-base ">
                        Pick Your Subjects
                      </Listbox.Label>

                      <span className="inline-block w-full rounded-md shadow-sm">
                        <Listbox.Button className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5  h-11 md:h-12">
                          {!selectedSubject.length && 'One or more subjects'}
                          {selectedSubject.map((item, index) => (
                            <div
                              key={index}
                              className="inline-flex items-center px-1 mr-1 mt-1 rounded text-white bg-gray-400"
                            >
                              {item}
                              <div
                                className="ml-1 bg-gray-100 rounded-full cursor-pointer"
                                onClick={() => removeSubject(item)}
                              >
                                <svg
                                  width="15"
                                  height="15"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L10 8.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.4142 10L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10 11.4142L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L8.58579 10L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z"
                                    fill="#4A5568"
                                  />
                                </svg>
                              </div>
                            </div>
                          ))}
                          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg
                              className="h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                            >
                              <path
                                d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </Listbox.Button>
                      </span>

                      <Transition
                        show={open}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
                      >
                        <Listbox.Options
                          static
                          className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                        >
                          {SubjectsOptions?.map((item, index) => {
                            const selected = isSelected(item);
                            return (
                              <Listbox.Option key={index} value={item}>
                                {({ active }) => (
                                  <div
                                    className={`${
                                      active
                                        ? 'text-white bg-blue-600'
                                        : 'text-gray-900'
                                    } cursor-default select-none relative py-2 pl-8 pr-4`}
                                  >
                                    <span
                                      className={`${
                                        selected
                                          ? 'font-semibold'
                                          : 'font-normal'
                                      } block truncate`}
                                    >
                                      {item}
                                    </span>
                                    {selected && (
                                      <span
                                        className={`${
                                          active
                                            ? 'text-white'
                                            : 'text-blue-600'
                                        } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                                      >
                                        <svg
                                          className="h-5 w-5"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                      </span>
                                    )}
                                  </div>
                                )}
                              </Listbox.Option>
                            );
                          })}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  )}
                </Listbox>
              )}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <TextArea
              variant="solid"
              label="Message ( Optional )"
              {...register('message')}
              placeholder=" Do you have any query ?"
            />
          </div>
        </div>
        <div className="text-center">
          <Button variant="formButton" className="" type="submit">
            {processing ? 'Submitting Form ... ' : 'Enroll'}
          </Button>
        </div>
      </form>
    );
  }
};

export default ContactForm;
