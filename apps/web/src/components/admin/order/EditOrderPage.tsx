/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import {
  useCancelOrder,
  useGetSingleOrder,
  useUpdateOrder,
} from '@queries/useOrderQuery';
import {
  OrderStatusEnum,
  OrdersEntity,
  PaymentStatusEnum,
  ShippingTypeEnum,
} from '@services';
import { useParams } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { convertToDollarAmount } from '@src/lib/numbers';
import { BreadcrumbWithActions } from '@components/breadcrumbWithActions';
import { DeleteModal } from '@src/modals';
import { FlowBiteDropdown, DropdownItem } from '@src/flowbite';
import { convertToPDTDate } from '@src/lib/date';
import { ArrowDownIcon } from '@src/icons';
import EditOrderInfoCard from './EditOrderInfoCard';
import DetailsCard from './DetailsCard';
import OrderDetails from './OrderDetails';
import AddNotes from './AddNotes';

const orderOptions = [
  OrderStatusEnum.Pending,
  OrderStatusEnum.InTransit,
  OrderStatusEnum.Cancelled,
  OrderStatusEnum.Shipped,
  OrderStatusEnum.Completed,
];

function EditOrderPage({ isCustomer }: { isCustomer?: boolean }) {
  const orderForm = useForm<OrdersEntity>({ mode: 'all' });

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const { orderId: paramOrderId } = useParams() || {};

  const { data: { data: orderDetails } = {} } = useGetSingleOrder(
    paramOrderId as string,
  );

  const { mutateAsync: cancelOrder } = useCancelOrder({
    successMessage: 'Order has been Cancelled.',
    failureMessage: true,
  });

  const { mutateAsync: updateOrder } = useUpdateOrder({
    successMessage: 'Order has been Updated.',
    failureMessage: true,
  });

  const {
    watch,
    reset,
    setValue,
    formState: { dirtyFields },
  } = orderForm || {};

  const dirtyFieldKeys = Object.keys(dirtyFields);

  const {
    shippingNotes: updatedShippingNotes = '',
    orderStatus: selectedOrderStatus,
  } = watch();

  const {
    shippingType,
    firstName,
    total = 0,
    lastName,
    address,
    city,
    state,
    zipCode,
    email = '',
    orderItems = [],
    phone = '',
    shippingNotes = '',
    orderStatus,
    createdAt,
    orderId,
    billingAddress,
    payments,
  } = orderDetails || {};

  const {
    address: billAddress,
    city: billingCity,
    state: billingState,
    zipCode: billingZipCode,
  } = billingAddress || {};

  const { transactionDetails = '', status: paymentStatus } =
    payments?.[0] || {};

  const transactionDetailsJson = transactionDetails
    ? JSON.parse(transactionDetails)
    : {};

  const { payment_method_types, customer_details } =
    transactionDetailsJson || {};

  const { name } = customer_details || {};

  const paymentMethod = payment_method_types?.[0];

  const showPaymentErrorStatus = paymentStatus === PaymentStatusEnum.Failed;

  useEffect(() => {
    if (orderId) {
      reset({ shippingNotes, orderStatus });
    }
  }, [reset, orderId, shippingNotes, orderStatus]);

  const deliveryInformation = useMemo(
    () => [
      { label: 'Name', value: `${firstName} ${lastName}` },
      {
        label: 'Address',
        value: `${address},${city},${state},${zipCode}`,
      },
      {
        label: 'Shipping',
        value:
          shippingType === ShippingTypeEnum.OverNight
            ? 'Next day delivery'
            : '5-7 business days',
      },
    ],
    [firstName, lastName, address, city, state, zipCode, shippingType],
  );

  const shippingAmount =
    shippingType === ShippingTypeEnum.OverNight ? 9.99 : 9.99;

  const isCancelled = orderStatus === OrderStatusEnum.Cancelled;

  const onChangeStatus = useCallback(
    (orderStatus: OrderStatusEnum) => {
      if (selectedOrderStatus && selectedOrderStatus !== orderStatus) {
        setValue('orderStatus', orderStatus, { shouldDirty: true });
      }
    },
    [selectedOrderStatus, setValue],
  );

  const orderOverview = useMemo(
    () => [
      { label: 'Total Items', value: `${orderItems?.length || 0}` },
      {
        label: 'Subtotal',
        value: convertToDollarAmount(total, true),
      },
      {
        label: 'Shipping',
        value: convertToDollarAmount(shippingAmount, true),
      },
      {
        label: 'Total',
        value: convertToDollarAmount(total + shippingAmount, true),
      },
      isCustomer
        ? {}
        : {
            label: 'Order Status',
            value: (
              <FlowBiteDropdown
                label=""
                className={isCancelled ? '!hidden' : ''}
                inline
                renderTrigger={() => (
                  <span
                    className={`border cursor-pointer items-center gap-2 rounded-lg justify-center flex border-gray-300 text-gray-700 dark:text-gray-400 dark:border-gray-500 px-5 py-2.5 ${isCancelled ? '!cursor-not-allowed opacity-50' : ''}`}
                  >
                    {selectedOrderStatus || 'Change Order Status'}
                    <ArrowDownIcon />
                  </span>
                )}
              >
                {orderOptions?.map((order) => (
                  <DropdownItem
                    key={order}
                    onClick={() => onChangeStatus(order)}
                  >
                    {order}
                  </DropdownItem>
                ))}
              </FlowBiteDropdown>
            ),
          },
    ],
    [
      orderItems?.length,
      total,
      isCustomer,
      shippingAmount,
      isCancelled,
      selectedOrderStatus,
      onChangeStatus,
    ],
  );

  const contactInformation = useMemo(
    () => [
      { label: 'Email', value: email },
      {
        label: 'Phone',
        value: phone,
      },
    ],
    [email, phone],
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
        value: `${billAddress},${billingCity},${billingState},${billingZipCode}`,
      },
    ],
    [
      billAddress,
      billingCity,
      name,
      paymentMethod,
      billingState,
      billingZipCode,
    ],
  );

  const onDiscard = () => {
    reset({ shippingNotes, orderStatus });
  };

  const onCancelOrder = () => {
    setShowDeleteModal(true);
  };

  const onUpdateOrder = async () => {
    await updateOrder({
      shippingNotes: updatedShippingNotes,
      orderId: paramOrderId as string,
      orderStatus:
        orderStatus === selectedOrderStatus ? undefined : selectedOrderStatus,
    });
  };

  const onSaveChanges = async () => {
    if (
      dirtyFieldKeys?.includes('orderStatus') &&
      selectedOrderStatus === OrderStatusEnum.Cancelled
    ) {
      setShowDeleteModal(true);
    } else {
      await onUpdateOrder();
    }
  };

  const onDeleteNotes = async () => {
    await updateOrder({
      shippingNotes: '',
      orderId: paramOrderId as string,
    });
  };

  const onCancelModel = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  const onConfirmDeleteModal = async () => {
    if (
      dirtyFieldKeys?.includes('orderStatus') &&
      selectedOrderStatus === OrderStatusEnum.Cancelled
    ) {
      await onUpdateOrder();
    } else {
      await cancelOrder(paramOrderId as string);
    }
    setShowDeleteModal(false);
  };

  const shouldEnableSaveButton = useMemo(
    () =>
      selectedOrderStatus !== orderStatus ||
      shippingNotes !== updatedShippingNotes,
    [orderStatus, selectedOrderStatus, shippingNotes, updatedShippingNotes],
  );

  return orderId ? (
    <>
      <BreadcrumbWithActions
        isEditing
        shouldDisabledSaveButton={!shouldEnableSaveButton}
        isCustomer={isCustomer}
        shouldDisabledDiscardButton={!dirtyFieldKeys?.length}
        onDiscard={onDiscard}
        onSaveChange={onSaveChanges}
        additionalActions={
          !isCustomer && orderStatus !== OrderStatusEnum.Cancelled ? (
            <div
              className="font-medium text-center cursor-pointer text-xs mr-4 leading-[18px] text-red-600 dark:text-red-400"
              onClick={onCancelOrder}
            >
              Cancel Order
            </div>
          ) : undefined
        }
      />
      <div className="flex flex-col gap-y-8 mt-4">
        <EditOrderInfoCard
          orderDetails={orderDetails}
          form={orderForm}
          isCustomer={isCustomer}
          showPaymentErrorStatus={showPaymentErrorStatus}
        />
        <div className="grid grid-cols-5 gap-5 mb-24">
          <div className="col-span-5 lg:col-span-3 flex flex-col gap-y-8">
            <DetailsCard
              title="Order Overview"
              details={orderOverview}
              isSideCard={false}
            />
            <OrderDetails orderDetails={orderDetails} form={orderForm} />
            {isCustomer ? null : (
              <AddNotes
                orderDetails={orderDetails}
                form={orderForm}
                onDeleteNotes={onDeleteNotes}
              />
            )}
          </div>
          <div className="flex flex-col col-span-5 lg:col-span-2 gap-y-8">
            <DetailsCard
              title="Delivery Information"
              details={deliveryInformation}
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
          buttonNames={['Cancel Order', 'Discard Change']}
          onHandleConfirm={onConfirmDeleteModal}
          description={`Are you sure you want to cancel the order ${paramOrderId} purchased by ${firstName} ${lastName} on ${createdAt ? convertToPDTDate(new Date(createdAt)) : ''}?`}
        />
      ) : null}
    </>
  ) : null;
}

export default EditOrderPage;
