import React, { useMemo } from 'react';

import Image from 'next/image';
import { EditBookingProps } from './types';

function BookingDetails(props: EditBookingProps) {
  const { bookingDetails } = props || {};

  const { service } = bookingDetails || {};

  const serviceName = service?.serviceName;
  const description = service?.description;
  const imageUrl = service?.imageUrls[0] || [];

  const { startTime, bookingDate, duration } = bookingDetails || {};

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  const formattedBookingDate = useMemo(
    () => formatDate(bookingDate as string),
    [bookingDate],
  );

  const formattedStartTime = useMemo(
    () => formatTime(startTime as string),
    [startTime],
  );

  return (
    <div className="bg-white dark:bg-gray-800 shadow-xl px-6 py-8 rounded-2xl">
      <div className="font-bold mb-3 text-sm lg:text-xl lg:leading-[30px] text-black dark:text-gray-50">
        Current Booking Details
      </div>
      <hr className="border-t border-gray-300 dark:border-gray-700 my-4" />
      <div className="grid grid-cols-4 gap-4 text-sm lg:text-base text-gray-900 dark:text-gray-50">
        <div className="font-semibold text-left min-w-[175px]">Service</div>
        <div className="font-semibold text-right w-auto">Date</div>
        <div className="font-semibold text-right w-auto">Time</div>
        <div className="font-semibold text-right w-auto">Duration</div>
      </div>
      <hr className="border-t border-gray-300 dark:border-gray-700 my-4" />
      <div className="grid grid-cols-4 gap-4 items-center text-sm lg:text-base text-gray-900 dark:text-gray-50">
        <div className="flex items-center">
          <Image
            alt="Service Image"
            src={`${process.env.BUCKET_PREFIX}${imageUrl}`}
            width={75}
            height={75}
            className="w-[75px] h-[75px]"
          />
          <div className=" w-[calc(100%-75px)]">
            <div className="font-semibold">{serviceName}</div>
            <div className="text-gray-600 dark:text-gray-400">
              {description && `${description?.slice(0, 15)}...`}
            </div>
          </div>
        </div>
        <div className="font-semibold text-right">{formattedBookingDate}</div>
        <div className="font-semibold text-right">{formattedStartTime}</div>
        <div className="font-semibold text-right">
          {(duration ?? 0).toString()}
          {duration && duration > 1 ? ' Minutes' : ' Minute'}
        </div>
      </div>
    </div>
  );
}

export default BookingDetails;
