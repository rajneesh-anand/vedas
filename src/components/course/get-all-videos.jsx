import React, { Fragment, useEffect, useState } from 'react';
import { useFormData } from '@contexts/search/plan.context';
import { FaPlayCircle } from 'react-icons/fa';
import { MdOutlineFilterList } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import Link from '@components/ui/link';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { HiOutlineSelector, HiCheck } from 'react-icons/hi';
import { Listbox, Transition } from '@headlessui/react';

const ModalVideo = dynamic(() => import('react-modal-video'), {
  ssr: false,
});

const ClassOptions = [
  { value: 'six', name: 'CLASS VI' },
  { value: 'seven', name: 'CLASS VII' },
  { value: 'eight', name: 'CLASS VIII' },
  { value: 'nine', name: 'CLASS IX' },
  { value: 'ten', name: 'CLASS X' },
  { value: 'eleven', name: 'CLASS XI' },
  { value: 'twelve', name: 'CLASS XII' },
];
const MediumOptions = ['ENGLISH MEDIUM', 'HINDI MEDIUM'];

const CourseVideo = () => {
  const { data: session, status } = useSession();
  const [videoData, setVideoData] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [videoUrl, setVideoUrl] = useState([]);
  const [subjectMedia, setMedia] = useState([]);
  const [selectedClass, setSelectedClass] = useState(ClassOptions[0]);
  const [selectedMedium, setSelectedMedium] = useState(MediumOptions[0]);

  const openModal = (url) => {
    setVideoUrl(url.split('?v='));
    setIsOpen(!isOpen);
  };

  const setSubjectMedia = (subject) => {
    const filteredSubject = videoData.filter((sub) => sub.subject === subject);
    setMedia(filteredSubject);
  };

  const handelChange = (value) => {
    const classFilter = ClassOptions.find((item) => item.value === value);
    setSelectedClass(classFilter);
  };

  useEffect(async () => {
    let res;
    let result;
    let searchText = `${selectedClass.name}-${selectedMedium}`;

    switch (searchText) {
      case 'CLASS VI-ENGLISH MEDIUM':
        res = await fetch(`${process.env.API_URL}/class/six/english`);
        result = await res.json();
        setVideoData(result);
        setMedia(result);
        break;
      case 'CLASS VI-HINDI MEDIUM':
        res = await fetch(`${process.env.API_URL}/class/six/hindi`);
        result = await res.json();
        setVideoData(result);
        setMedia(result);
        break;
      case 'CLASS VII-ENGLISH MEDIUM':
        res = await fetch(`${process.env.API_URL}/class/seven/english`);
        result = await res.json();
        setVideoData(result);
        setMedia(result);
        break;
      case 'CLASS VII-HINDI MEDIUM':
        res = await fetch(`${process.env.API_URL}/class/seven/hindi`);
        result = await res.json();
        setVideoData(result);
        setMedia(result);
        break;
      case 'CLASS VIII-ENGLISH MEDIUM':
        res = await fetch(`${process.env.API_URL}/class/eight/english`);
        result = await res.json();
        setVideoData(result);
        setMedia(result);
        break;
      case 'CLASS VIII-HINDI MEDIUM':
        res = await fetch(`${process.env.API_URL}/class/eight/hindi`);
        result = await res.json();
        setVideoData(result);
        setMedia(result);
        break;
      case 'CLASS IX-ENGLISH MEDIUM':
        res = await fetch(`${process.env.API_URL}/class/nine/english`);
        result = await res.json();
        setVideoData(result);
        setMedia(result);
        break;
      case 'CLASS IX-HINDI MEDIUM':
        res = await fetch(`${process.env.API_URL}/class/nine/hindi`);
        result = await res.json();
        setVideoData(result);
        setMedia(result);
        break;

      case 'CLASS X-ENGLISH MEDIUM':
        res = await fetch(`${process.env.API_URL}/class/ten/english`);
        result = await res.json();
        setVideoData(result);
        setMedia(result);
        break;
      case 'CLASS X-HINDI MEDIUM':
        res = await fetch(`${process.env.API_URL}/class/ten/hindi`);
        result = await res.json();
        setVideoData(result);
        setMedia(result);
        break;
      case 'CLASS XI-ENGLISH MEDIUM':
        res = await fetch(`${process.env.API_URL}/class/eleven/english`);
        result = await res.json();
        setVideoData(result);
        setMedia(result);
        break;
      case 'CLASS XI-HINDI MEDIUM':
        res = await fetch(`${process.env.API_URL}/class/eleven/hindi`);
        result = await res.json();
        setVideoData(result);
        setMedia(result);
        break;
      case 'CLASS XII-ENGLISH MEDIUM':
        res = await fetch(`${process.env.API_URL}/class/twelve/english`);
        result = await res.json();
        setVideoData(result);
        setMedia(result);
        break;
      case 'CLASS XII-HINDI MEDIUM':
        res = await fetch(`${process.env.API_URL}/class/twelve/hindi`);
        result = await res.json();
        setVideoData(result);
        setMedia(result);
        break;
      default:
        res = await fetch(`${process.env.API_URL}/class/six/english`);
        result = await res.json();
        setVideoData(result);
        setMedia(result);
    }
  }, [selectedClass, selectedMedium]);

  return (
    <>
      <div className="pt-24 pb-16">
        <div className="relative mb-8">
          <div className="flex  justify-center flex-col lg:flex-row items-center underlineAnchor ">
            <h1 className="text-[14px] md:text-3xl text-gray-800 font-bold mb-2 ">
              To avail our study material and sample papers
            </h1>
            <Link
              href={`/plans?class=${selectedClass.value}`}
              className="relative text-[14px] md:text-3xl font-bold text-white text-transparent bg-clip-text bg-blue-500  px-2 mb-2"
            >
              Buy our study plan
            </Link>
          </div>

          <p className="text-center lg:text-start">
            Choose our study plans according to your academic board and medium
            of education
          </p>
        </div>

        <div className="flex flex-wrap justify-between items-center flex-col lg:flex-row pb-2 border-b">
          <div className="inline-flex items-center text-blue-700">
            <MdOutlineFilterList size={22} />
            <p className="pl-2">Filter Videos</p>
          </div>
          <div className="flex flex-wrap justify-between flex-col lg:flex-row">
            <div className="w-full lg:w-40 lg:mr-4">
              <Listbox
                value={selectedClass.value}
                onChange={(event) => {
                  handelChange(event);
                }}
              >
                <div className="relative mt-1">
                  <Listbox.Button className="border text-blue-700  text-heading text-[13px] md:text-sm font-semibold  relative w-full py-2 ps-3 pe-10 text-start bg-white  shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm cursor-pointer ">
                    <span className="block truncate">{selectedClass.name}</span>
                    <span className="absolute inset-y-0 end-0 flex items-center pe-2 pointer-events-none">
                      <HiOutlineSelector
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                          value={option.value}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={`${
                                  selected ? 'font-medium' : 'font-normal'
                                } block truncate`}
                              >
                                {option.name}
                              </span>
                              {selected ? (
                                <span
                                  className={`${active ? 'text-amber-600' : ''}
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
              </Listbox>
            </div>

            <div className="w-full lg:w-48">
              <Listbox value={selectedMedium} onChange={setSelectedMedium}>
                <div className="relative mt-1">
                  <Listbox.Button className="border text-blue-700 text-heading text-[13px] md:text-sm font-semibold  relative w-full py-2 ps-3 pe-10 text-start bg-white  shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm cursor-pointer ">
                    <span className="block truncate">{selectedMedium}</span>
                    <span className="absolute inset-y-0 end-0 flex items-center pe-2 pointer-events-none">
                      <HiOutlineSelector
                        className="w-5 h-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                                  selected ? 'font-medium' : 'font-normal'
                                } block truncate`}
                              >
                                {option}
                              </span>
                              {selected ? (
                                <span
                                  className={`${active ? 'text-amber-600' : ''}
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
              </Listbox>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap py-6 justify-center overflow-hidden">
          {videoData.map((item, index) => {
            return (
              <button
                key={index}
                className="bg-blue-500 transition duration-200 ease-in hover:box-shadow hover:bg-blue-700 text-white text-[14px] uppercase py-2 px-8 rounded-full mr-2 mb-3 "
                onClick={() => setSubjectMedia(item.subject)}
              >
                {item.subject}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap mt-2 pb-2 md:pb-6 justify-center lg:justify-initial items-center min-h-[200px] ">
          {subjectMedia.length > 0 ? (
            <ul>
              {subjectMedia.map((ele, index) =>
                ele.media.map((item, index) => {
                  return (
                    <li key={index}>
                      <div className="flex flex-col lg:flex-row mb-2 mt-1 justify-center lg:justify-start">
                        <p className="text-[13.5px] lg:text-[15.5px] py-2  lg:min-w-[600px]">
                          {item.videoTitle}
                        </p>
                        {item.videoLink !== '' ? (
                          session ? (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                openModal(item.videoLink);
                              }}
                              className="bg-indigo-100 hover:bg-indigo-500 hover:text-white py-2 px-4 rounded inline-flex items-center"
                            >
                              Watch Video
                              <span className="pl-2">
                                <FaPlayCircle />
                              </span>
                            </button>
                          ) : (
                            <Link
                              href="/auth/signin"
                              className="bg-indigo-100 hover:bg-indigo-500 hover:text-white py-2 px-4 rounded inline-flex items-center"
                            >
                              Watch Video{' '}
                              <span className="pl-2">
                                <FaPlayCircle />
                              </span>
                            </Link>
                          )
                        ) : (
                          <button className="bg-indigo-100 hover:bg-indigo-500 hover:text-white py-2 px-4 rounded inline-flex items-center">
                            Coming Soon ...
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          ) : (
            <p>Course Video will be available soon...</p>
          )}
        </div>
      </div>
      {videoUrl.length > 0 && (
        <ModalVideo
          channel="youtube"
          videoId={videoUrl[1]}
          isOpen={!isOpen}
          onClose={() => setIsOpen(!isOpen)}
        />
      )}
    </>
  );
};

export default CourseVideo;
