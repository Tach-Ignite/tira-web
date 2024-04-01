'use client';

import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';

import { Button, Stepper } from '@src/atoms';

import { useForm } from 'react-hook-form';
import {
  useCreateBookingService,
  useGetServiceSlots,
  useGetUniqueService,
} from '@queries/useServicesQuery';
import AppSpinner from '@components/appSpinner/AppSpinner';
import { loadStripe } from '@stripe/stripe-js';
import { ArrowLeftIcon, ArrowRightIcon, Calendar } from '@src/icons';
import { getDayName, getFullDates } from '@src/lib/date';
import BookTime from '../bookTime';
import PersonalInformationForm from '../personalInformationForm';
import ReviewInformation from '../reviewInformation';
import BookingConfirmed from '../bookingConfirmed';
import BookingServiceType from '../../types';

function BookNow() {
  const { serviceId } = useParams() || {};

  const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY!);

  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [inCompletedSteps, setInCompletedSteps] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date | string>('');
  const [bookingResponse, setBookingResponse] = useState<any>();

  const bookServiceform = useForm<any>({
    mode: 'onChange',
  });

  const steps: string[] = [
    'Book appointment',
    'Personal&Contact Information',
    'Review',
    'Payment',
  ];

  const { setValue, handleSubmit } = bookServiceform;

  const handleDateChange = (event: {}) => {
    const date = event as Date;
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000,
    );
    const selectDate = localDate.toISOString();
    setSelectedDate(selectDate);
    setValue('bookingDate', selectDate);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prevStep) => {
        const nextStep = prevStep + 1;

        return nextStep;
      });
      setCompletedSteps((prevCompletedSteps) => {
        const newCompletedSteps = [...prevCompletedSteps, currentStep];

        return newCompletedSteps;
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setCompletedSteps(
        completedSteps.filter((step) => step !== currentStep - 1),
      );
    }
  };

  const convertToISOString = (date: string, time: string) => {
    const [timeString, modifier] = time.split(' ');
    const [hoursPart, minutes] = timeString.split(':').map(Number);

    let hours = hoursPart;

    if (modifier === 'PM' && hours < 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0;
    }

    const dateObject = new Date(date);
    dateObject.setHours(hours, minutes, 0, 0);

    return dateObject.toISOString();
  };

  const { data: serviceDetails } = useGetUniqueService(serviceId as string);

  const { saleEndDate, saleStartDate, weeklyHours } = serviceDetails || {};

  const selectedDays = Object.keys(weeklyHours || {});

  const dateWithDays =
    saleStartDate &&
    saleEndDate &&
    getFullDates(new Date(saleStartDate), new Date(saleEndDate));

  const dates = dateWithDays && dateWithDays?.map(({ date }) => date);

  const filteredDates =
    dates &&
    (dates?.filter((date) =>
      selectedDays.includes(getDayName(date)),
    ) as Date[]);

  useEffect(() => {
    if (filteredDates?.length) {
      setSelectedDate(new Date(filteredDates?.[0]).toISOString());
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredDates?.length]);

  const { data, isLoading } = useGetServiceSlots(
    serviceId as string,
    selectedDate as string,
  );

  const { slots } = data ?? [];

  const { mutateAsync: addBookingAsync } = useCreateBookingService({
    successMessage: 'Booking has been created.',
    failureMessage: 'Failed to create Booking.',
  });

  const onBookService = useCallback(
    async (data: BookingServiceType) => {
      delete data.isSameAsPersonal;

      const startISOString = convertToISOString(
        data.bookingDate as string,
        data.startTime as string,
      );
      const endISOString = convertToISOString(
        data.bookingDate as string,
        data.endTime as string,
      );

      const dataToSend = {
        ...data,
        serviceId: serviceId as string,
        duration: 10 as number,
        startTime: startISOString,
        endTime: endISOString,
      };
      try {
        const res = await addBookingAsync(dataToSend);

        setBookingResponse(res);
        handleNext();
      } catch (e) {
        return e;
      }

      return '';
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [addBookingAsync, serviceId],
  );

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    stripe?.redirectToCheckout({
      sessionId: bookingResponse?.payment_session_id,
    });
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const stepParam = queryParams.get('currentStep');

    if (stepParam && !isNaN(Number(stepParam))) {
      setCurrentStep(Number(stepParam));
    }
  }, []);

  if (isLoading) {
    return (
      <div className="relative">
        <AppSpinner show />
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col justify-center">
      <Stepper
        steps={steps}
        completedSteps={completedSteps}
        inCompletedSteps={inCompletedSteps}
        currentStep={currentStep}
      />

      {currentStep === 0 && (
        <BookTime
          handleDateChange={handleDateChange}
          slots={slots}
          form={bookServiceform}
          serviceDetails={serviceDetails}
          selectedDate={selectedDate}
        />
      )}
      {currentStep === 1 && (
        <PersonalInformationForm
          form={bookServiceform}
          serviceDetails={serviceDetails}
        />
      )}
      {currentStep === 2 && (
        <ReviewInformation
          bookingResponse={bookingResponse}
          serviceDetails={serviceDetails}
          form={bookServiceform}
        />
      )}
      {currentStep === 3 && <BookingConfirmed />}

      {currentStep !== 3 && (
        <div className="gap-5 flex justify-center w-full mx-auto max-w-[536px] mt-16">
          <Button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="w-[50%]"
            outline
            gradientDuoTone="purpleToBlue"
          >
            <ArrowLeftIcon size={20} className="mr-2" />
            Back
          </Button>
          {currentStep === 2 ? (
            <Button
              onClick={handleCheckout}
              disabled={currentStep === steps.length - 1}
              className="w-[50%]"
              gradientDuoTone="purpleToBlue"
            >
              <Calendar size={20} className="mr-2" /> Confirm Booking
            </Button>
          ) : (
            <Button
              onClick={
                currentStep === 1 ? handleSubmit(onBookService) : handleNext
              }
              disabled={currentStep === steps.length - 1}
              className="w-[50%]"
              gradientDuoTone="purpleToBlue"
            >
              Next <ArrowRightIcon size={20} className="ml-2" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default BookNow;
