/* eslint-disable react/require-default-props */
/* eslint-disable no-unsafe-optional-chaining */

'use client';

import { Button } from '@src/atoms';
import { CancelIcon } from '@src/icons';
import { useState } from 'react';

interface NotificationOptionType {
  title?: string;
  content?: React.ReactNode;
}

function NotificationBox({
  notifications,
}: {
  notifications: NotificationOptionType[];
}) {
  const [hideNotification, setHideNotification] = useState(false);

  const [activeNotificationIndex, setActiveNotificationIndex] = useState(0);

  const onHideNotification = () => {
    setHideNotification(!hideNotification);
  };

  const activeNotification = notifications[activeNotificationIndex];

  const { content, title } = activeNotification || {};

  const onBackNotification = () => {
    setActiveNotificationIndex(activeNotificationIndex - 1);
  };

  const onNextNotification = () => {
    setActiveNotificationIndex(activeNotificationIndex + 1);
  };

  return hideNotification ? null : (
    <div className="bg-white sm:!min-w-[350px] dark:bg-gray-800 shadow-xl rounded-lg p-5 space-y-5">
      <div className="text-lg font-semibold text-black dark:text-white flex justify-between items-center">
        <p>{title}</p>
        <CancelIcon
          onClick={onHideNotification}
          className="h-6 w-6 cursor-pointer"
        />
      </div>
      {content}
      <div className="mt-5 flex xs:!justify-between !justify-center gap-3 flex-wrap">
        {activeNotificationIndex === 0 ? null : (
          <Button
            className="py-3"
            size="sm"
            onClick={onBackNotification}
            theme={{
              color: {
                info: '!bg-transparent dark:text-yellow-400 text-indigo-600 border border-indigo-600 dark:border-yellow-400 hover:!bg-opacity-80',
              },
              size: { sm: 'px-8 text-[16px] font-medium' },
            }}
          >
            Back
          </Button>
        )}
        {activeNotificationIndex === notifications?.length - 1 ? null : (
          <Button
            className="py-3"
            size="sm"
            theme={{
              color: {
                info: '!bg-transparent dark:text-yellow-400 text-indigo-600 border border-indigo-600 dark:border-yellow-400 hover:!bg-opacity-80',
              },
              size: { sm: 'px-8 text-[16px] font-medium' },
            }}
            onClick={onNextNotification}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

export default NotificationBox;
