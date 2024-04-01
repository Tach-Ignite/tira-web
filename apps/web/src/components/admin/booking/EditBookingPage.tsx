/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import { useCancelBooking, useUpdateBooking } from '@queries/useBookingQuery';
import {
  BookingStatusEnum,
  BookingsEntity,
  BookingPaymentStatusEnum,
} from '@services';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { convertToDollarAmount } from '@src/lib/numbers';
import { BreadcrumbWithActions } from '@components/breadcrumbWithActions';
import { DeleteModal } from '@src/modals';
import { FlowBiteDropdown, DropdownItem } from '@src/flowbite';
import { convertToPDTDate } from '@src/lib/date';
import { ArrowDownIcon } from '@src/icons';
import EditBookingInfoCard from './EditBookingInfoCard';
import DetailsCard from './DetailsCard';

import AddBookingNotes from './AddBookingNotes';
import BookingDetails from './BookingDetails';

const bookingOptions = [
  BookingStatusEnum.Pending,
  BookingStatusEnum.Cancelled,
  BookingStatusEnum.Confirmed,
];

function EditBookingPage(props: any) {
  const { isCustomer, bookingDetails, paramBookingId } = props;

  const bookingForm = useForm<BookingsEntity>({ mode: 'all' });

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const { mutateAsync: cancelOrder } = useCancelBooking({
    successMessage: 'Booking has been Cancelled.',
    failureMessage: true,
  });

  const { mutateAsync: updateBooking } = useUpdateBooking({
    successMessage: 'Booking has been Updated.',
    failureMessage: true,
  });

  const {
    watch,
    reset,
    setValue,
    formState: { dirtyFields },
  } = bookingForm || {};

  const dirtyFieldKeys = Object.keys(dirtyFields);

  const {
    adminNotes: updatedBookingNotes = '',
    status: selectedBookingStatus,
  } = watch();

  const {
    firstName,
    lastName,
    address,
    city,
    state,
    zipCode,
    email = '',
    phone = '',
    contactFirstName,
    contactLastName,
    contactEmail,
    contactPhone,
    contactAddress,
    adminNotes = '',
    bookingNotes = '',
    status,
    createdAt,
    bookingId,
    payments,
    duration,
    service,
  } = bookingDetails || {};

  const { transactionDetails = '', status: paymentStatus } =
    payments?.[0] || {};

  const transactionDetailsJson = transactionDetails
    ? JSON.parse(transactionDetails)
    : {};

  const { payment_method_types, customer_details } =
    transactionDetailsJson || {};

  const { name } = customer_details || {};

  const paymentMethod = payment_method_types?.[0];

  const showPaymentErrorStatus =
    paymentStatus === BookingPaymentStatusEnum.Failed;

  useEffect(() => {
    if (bookingId) {
      reset({ adminNotes, status });
    }
  }, [reset, bookingId, adminNotes, status]);

  const isCancelled = status === BookingStatusEnum.Cancelled;

  const onChangeStatus = useCallback(
    (status: BookingStatusEnum) => {
      if (selectedBookingStatus && selectedBookingStatus !== status) {
        setValue('status', status, { shouldDirty: true });
      }
    },
    [selectedBookingStatus, setValue],
  );

  const bookingOverview = useMemo(
    () => [
      {
        label: 'Duration',
        value: `${(duration ?? 0).toString()} ${duration && duration > 1 ? 'Minutes' : 'Minute'}`,
      },
      {
        label: 'Service Price',
        value: convertToDollarAmount(service?.price || 0, true),
      },
      {
        label: 'Notes',
        value: bookingNotes,
      },
      {
        label: 'Status',
        value: status,
      },
      isCustomer
        ? {}
        : {
            label: 'Booking Status',
            value: (
              <FlowBiteDropdown
                label=""
                className={isCancelled ? '!hidden' : ''}
                inline
                renderTrigger={() => (
                  <span
                    className={`border cursor-pointer items-center gap-2 rounded-lg justify-center flex border-gray-300 text-gray-700 dark:text-gray-400 dark:border-gray-500 px-5 py-2.5 ${isCancelled ? '!cursor-not-allowed opacity-50' : ''}`}
                  >
                    {selectedBookingStatus || 'Change Booking Status'}
                    <ArrowDownIcon />
                  </span>
                )}
              >
                {bookingOptions?.map((status) => (
                  <DropdownItem
                    key={status}
                    onClick={() => onChangeStatus(status)}
                  >
                    {status}
                  </DropdownItem>
                ))}
              </FlowBiteDropdown>
            ),
          },
    ],
    [
      duration,
      status,
      service,
      isCustomer,
      isCancelled,
      selectedBookingStatus,
      bookingNotes,
      onChangeStatus,
    ],
  );

  const personalInformation = useMemo(
    () => [
      { label: 'Name', value: `${firstName} ${lastName}` },
      { label: 'Email', value: email },
      {
        label: 'Phone',
        value: phone,
      },
      { label: 'Address', value: address },
    ],
    [email, phone, firstName, lastName, address],
  );

  const contactInformation = useMemo(
    () => [
      { label: 'Name', value: `${contactFirstName} ${contactLastName}` },
      { label: 'Email', value: contactEmail },
      {
        label: 'Phone',
        value: contactPhone,
      },
      { label: 'Address', value: contactAddress },
    ],
    [
      contactEmail,
      contactPhone,
      contactFirstName,
      contactLastName,
      contactAddress,
    ],
  );

  const paymentDetails = useMemo(
    () => [
      {
        label: 'Method',
        value: paymentMethod
          ? paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)
          : '--',
      },
      {
        label: 'Card Number',
        value: paymentMethod ? '**** **** **** ****' : '--',
      },
      { label: 'Card Holder', value: name || '--' },
      {
        label: 'Address',
        value: `${address},${city},${state},${zipCode}`,
      },
    ],
    [address, city, name, paymentMethod, state, zipCode],
  );

  const onDiscard = () => {
    reset({ adminNotes, status });
  };

  const onCancelOrder = () => {
    setShowDeleteModal(true);
  };

  const onUpdateBooking = async () => {
    await updateBooking({
      adminNotes: updatedBookingNotes as '',
      bookingId: paramBookingId as string,
      status:
        status === selectedBookingStatus ? undefined : selectedBookingStatus,
    });
  };

  const onSaveChanges = async () => {
    if (
      dirtyFieldKeys?.includes('status') &&
      selectedBookingStatus === BookingStatusEnum.Cancelled
    ) {
      setShowDeleteModal(true);
    } else {
      await onUpdateBooking();
    }
  };

  const onDeleteNotes = async () => {
    await updateBooking({
      adminNotes: '',
      bookingId: paramBookingId as string,
    });
  };

  const onCancelModel = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const onConfirmDeleteModal = async () => {
    if (
      dirtyFieldKeys?.includes('status') &&
      selectedBookingStatus === BookingStatusEnum.Cancelled
    ) {
      await onUpdateBooking();
    } else {
      await cancelOrder(paramBookingId as string);
    }
    setShowDeleteModal(false);
  };

  const shouldEnableSaveButton = useMemo(
    () =>
      selectedBookingStatus !== status || adminNotes !== updatedBookingNotes,
    [status, selectedBookingStatus, adminNotes, updatedBookingNotes],
  );

  return bookingId ? (
    <>
      <BreadcrumbWithActions
        isEditing
        shouldDisabledSaveButton={!shouldEnableSaveButton}
        isCustomer={isCustomer}
        shouldDisabledDiscardButton={!dirtyFieldKeys?.length}
        onDiscard={onDiscard}
        onSaveChange={onSaveChanges}
        additionalActions={
          !isCustomer && status !== BookingStatusEnum.Cancelled ? (
            <div
              className="font-medium text-center cursor-pointer text-xs mr-4 leading-[18px] text-red-600 dark:text-red-400"
              onClick={onCancelOrder}
            >
              Cancel Booking
            </div>
          ) : undefined
        }
      />
      <div className="flex flex-col gap-y-8 mt-4">
        <EditBookingInfoCard
          bookingDetails={bookingDetails}
          form={bookingForm}
          showPaymentErrorStatus={showPaymentErrorStatus}
        />
        <div className="grid grid-cols-5 gap-5 mb-24">
          <div className="col-span-5 lg:col-span-3 flex flex-col gap-y-8">
            <DetailsCard
              title="Booking Overview"
              details={bookingOverview}
              isSideCard={false}
            />
            <BookingDetails
              bookingDetails={bookingDetails}
              form={bookingForm}
            />
            {isCustomer ? null : (
              <AddBookingNotes
                bookingDetails={bookingDetails}
                form={bookingForm}
                onDeleteNotes={onDeleteNotes}
              />
            )}
          </div>
          <div className="flex flex-col col-span-5 lg:col-span-2 gap-y-8">
            <DetailsCard
              title="Personal Information"
              details={personalInformation}
            />
            <DetailsCard
              title="Contact Information"
              details={contactInformation}
            />
            <DetailsCard
              title="Payment Details"
              showPaymentErrorStatus={showPaymentErrorStatus}
              details={paymentDetails}
            />
          </div>
        </div>
      </div>
      {showDeleteModal ? (
        <DeleteModal
          showModal={showDeleteModal}
          onCloseModal={onCancelModel}
          buttonNames={['Cancel Booking', 'Discard Change']}
          onHandleConfirm={onConfirmDeleteModal}
          description={`Are you sure you want to cancel the Booking #${paramBookingId} purchased by ${firstName} ${lastName} on ${createdAt ? convertToPDTDate(new Date(createdAt)) : ''}?`}
        />
      ) : null}
    </>
  ) : null;
}

export default EditBookingPage;
