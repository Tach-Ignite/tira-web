/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/control-has-associated-label */

'use client';

import { getCookie, setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CookieIcon, CrossOutlineIcon } from '@src/icons';
import { Button } from '@src/atoms';

export const Cookie_Accepted = 'accepted-cookie';

const now = new Date();

const expiryDateToOneYear = new Date(
  now.getFullYear() + 1,
  now.getMonth(),
  now.getDate(),
);

function CookieModal() {
  const [acceptedType, setAcceptedType] = useState<string>(
    getCookie(Cookie_Accepted) || '',
  );

  const [show, setShow] = useState(false);

  const onAcceptAllCookies = () => {
    setCookie(Cookie_Accepted, 'all', { expires: expiryDateToOneYear });
    setAcceptedType(getCookie(Cookie_Accepted) || '');
  };

  const onAcceptEssentialCookies = () => {
    setCookie(Cookie_Accepted, 'essential', { expires: expiryDateToOneYear });
    setAcceptedType(getCookie(Cookie_Accepted) || '');
  };

  const onCancelCookieModal = () => {
    setAcceptedType('Cancelled');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShow(true);
    }
  }, []);

  return !acceptedType && show ? (
    <div>
      <div className="fixed rounded-lg bottom-0 left-0 m-4 bg-white dark:bg-gray-700 shadow-3xl h-max self-end sm:max-w-[546px] w-auto bg-opacity-50 dark:bg-opacity-80 z-[9999]">
        <div className="flex items-start justify-between rounded-t dark:border-gray-600 border-b-0 p-2">
          <button
            className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            type="button"
            onClick={onCancelCookieModal}
          >
            <CrossOutlineIcon aria-hidden className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 pb-6">
          <div className="flex gap-2 items-center mx-auto justify-center ">
            <CookieIcon className="h-10 w-10 text-purple-700 dark:text-yellow-400" />
            <span className="bold text-[24px] leading-[36px] bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-400 dark:from-yellow-400 dark:to-red-400">
              We use Cookies
            </span>
          </div>
          <div className="text-center mt-5 mb-10 text-base text-gray-500 dark:text-gray-50">
            To ensure an optimal experience, this site utilizes cookies. By
            selecting "Accept essential cookies," we will respect your privacy
            by only setting cookies necessary for the site's operation,
            excluding those for analytics and marketing purposes. Read more
            about our{' '}
            <Link
              href="/privacy-policy"
              className="underline text-indigo-600 dark:text-yellow-400"
            >
              privacy policy
            </Link>
            .
          </div>
          <div className="flex justify-center flex-wrap gap-4">
            <Button gradientDuoTone="purpleToBlue" onClick={onAcceptAllCookies}>
              Accept all cookies
            </Button>
            <Button
              outline
              color="dark"
              onClick={onAcceptEssentialCookies}
              theme={{
                outline: {
                  on: 'flex w-full justify-center bg-white text-gray-800 transition-all duration-75 ease-in dark:bg-gray-800 dark:text-gray-400',
                },
                color: {
                  dark: 'border border-transparent bg-gray-200 text-white focus:ring-0 focus:ring-0 dark:border-gray-400 dark:bg-gray-400',
                },
              }}
            >
              Accept essential cookies
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default CookieModal;
