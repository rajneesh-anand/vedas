import { Fragment, useState, useEffect, InputHTMLAttributes } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { HiOutlineSelector, HiCheck } from 'react-icons/hi';
import { useTranslation } from 'next-i18next';

interface Option {
  name: string;
  value: string;
}

interface Props {
  options: Option[];
  label?: string;
}
const ListBox: React.FC<Props> = ({ options, label }) => {
  const { t } = useTranslation('common');
  const currentSelectedItem = options[0];
  const [selectedItem, setSelectedItem] = useState<Option>(currentSelectedItem);

  function handleItemClick(values: Option) {
    setSelectedItem(values);
  }

  return (
    <Listbox value={selectedItem} onChange={handleItemClick}>
      {({ open }) => (
        <div className="relative ms-2 lg:ms-0 z-10 min-w-[180px]">
          {label && (
            <Listbox.Label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-skin-base ">
              {label}
            </Listbox.Label>
          )}

          <Listbox.Button className="border border-gray-300  text-heading text-[13px] md:text-sm font-semibold  relative w-full py-2 ps-3 pe-10 text-start bg-white rounded-lg shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm cursor-pointer h-11 md:h-12">
            <span className="block truncate">{t(selectedItem.name)}</span>
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
              {options?.map((option, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `${active ? 'text-amber-900 bg-gray-100' : 'text-gray-900'}
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
                        {t(option.name)}
                      </span>
                      {selected ? (
                        <span
                          className={`${active ? 'text-amber-600' : ''}
                                check-icon absolute inset-y-0 start-0 flex items-center ps-3`}
                        >
                          <HiCheck className="w-5 h-5" aria-hidden="true" />
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
  );
};

export default ListBox;
