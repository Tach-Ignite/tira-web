/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable consistent-return */

'use client';

import React, { useEffect, useState } from 'react';
import {
  OrderDetails,
  CartsWrapper,
  OrderDetailsProps,
  EmptyCart,
} from '@components/cart';
import { Stepper } from '@src/atoms';
import { useFetchCartDetails } from '@queries/useCartQuery';
import { useForm } from 'react-hook-form';
import { OrdersEntity, ShippingTypeEnum } from '@services';
import { useCreateOrders } from '@queries/useOrderQuery';
import { loadStripe } from '@stripe/stripe-js';
import { DeleteModal } from '@src/modals';
import DeliveryInformationCard from './DeliveryInformationCard';
import ContactInformationCard from './ContactInformationCard';
import {
  OrderSteps,
  contactInformationFields,
  deliveryInformationFields,
  steps,
} from './types';
import BillingInformation from './BillingInformation';

function OrdersPage() {
  const [completedSteps, setCompletedSteps] = useState<OrderSteps[]>([]);
  const [inCompletedSteps, setInCompletedSteps] = useState<OrderSteps[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetailsProps>({});

  const [showPurchaseConfirmationModal, setShowPurchaseConfirmationModal] =
    useState<boolean>(false);

  const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY!);
  const { data: { cartItems = [] } = {}, refetch } = useFetchCartDetails();

  const ordersForm = useForm<OrdersEntity>({ mode: 'onChange' });

  const {
    formState: { dirtyFields, errors },
    handleSubmit,
    watch,
  } = ordersForm || {};

  const { shippingType } = watch();

  const { mutateAsync: asyncCreateOrders } = useCreateOrders({
    failureMessage: 'Failed to checkout the orders.',
  });

  const dirtyFieldKeys = Object.keys(dirtyFields);

  const errorFieldKeys = Object.keys(errors);

  useEffect(() => {
    if (cartItems?.length) {
      setCompletedSteps([...completedSteps, OrderSteps.ShoppingCart]);
    } else {
      setCompletedSteps(
        completedSteps?.filter((step) => step !== OrderSteps.ShoppingCart),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems?.length]);

  useEffect(() => {
    const deliveryInformationDirtyFields = dirtyFieldKeys?.filter((key) =>
      deliveryInformationFields.includes(key),
    );

    const contactInformationDirtyFields = dirtyFieldKeys?.filter((key) =>
      contactInformationFields.includes(key),
    );

    if (
      deliveryInformationDirtyFields?.length ===
      deliveryInformationFields?.length
    ) {
      setCompletedSteps((prevCompletedSteps) => [
        ...prevCompletedSteps,
        OrderSteps.DeliveryInformation,
      ]);
    } else {
      setCompletedSteps((prevCompletedSteps) =>
        prevCompletedSteps?.filter(
          (step) => step !== OrderSteps.DeliveryInformation,
        ),
      );
    }

    if (
      contactInformationDirtyFields?.length === contactInformationFields?.length
    ) {
      setCompletedSteps((prevCompletedSteps) => [
        ...prevCompletedSteps,
        OrderSteps.ContactInformation,
      ]);
    } else {
      setCompletedSteps((prevCompletedSteps) =>
        prevCompletedSteps?.filter(
          (step) => step !== OrderSteps.ContactInformation,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dirtyFieldKeys?.length]);

  useEffect(() => {
    const deliveryInformationErrorFields = errorFieldKeys?.filter((key) =>
      deliveryInformationFields.includes(key),
    );

    const contactInformationErrorFields = errorFieldKeys?.filter((key) =>
      contactInformationFields.includes(key),
    );

    if (deliveryInformationErrorFields?.length) {
      setInCompletedSteps((prevInCompletedSteps) => [
        ...prevInCompletedSteps,
        OrderSteps.DeliveryInformation,
      ]);
    } else {
      setInCompletedSteps((prevInCompletedSteps) =>
        prevInCompletedSteps?.filter(
          (step) => step !== OrderSteps.DeliveryInformation,
        ),
      );
    }

    if (contactInformationErrorFields?.length) {
      setInCompletedSteps((prevInCompletedSteps) => [
        ...prevInCompletedSteps,
        OrderSteps.ContactInformation,
      ]);
    } else {
      setInCompletedSteps((prevInCompletedSteps) =>
        prevInCompletedSteps?.filter(
          (step) => step !== OrderSteps.ContactInformation,
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorFieldKeys?.length]);

  useEffect(() => {
    let totalPrice = 0;
    let totalItems = 0;
    cartItems?.forEach?.((val) => {
      totalItems += val.quantity;
      totalPrice += val.quantity * val.product.salePrice;
    });
    setOrderDetails({ subTotalPrice: totalPrice, totalPrice, totalItems });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems?.length]);

  const onPurchaseProducts = async (data: OrdersEntity) => {
    const payload = {
      address: data?.address,
      city: data?.city,
      firstName: data?.firstName,
      email: data?.email,
      lastName: data?.lastName,
      phone: data?.phone,
      shippingType: data?.shippingType,
      state: data?.state,
      zipCode: data?.zipCode,
      billingAddress: data?.billingAddress,
      isSameAsShippingInformation: data?.isSameAsShippingInformation,
    };
    const res =
      (await asyncCreateOrders({
        ...payload,
        products: cartItems?.map((item) => ({
          productId: item?.productId,
          quantity: item?.quantity,
        })),
      })) || {};

    if (res?.orderId) {
      const stripe = await stripePromise;
      stripe?.redirectToCheckout({
        sessionId: res?.payment_session_id,
      });
    }
    setShowPurchaseConfirmationModal(false);
  };

  const shippingAmount =
    shippingType === ShippingTypeEnum.OverNight ? 9.99 : 9.99;

  const onShowPurchaseConfirmationModal = () => {
    setShowPurchaseConfirmationModal(!showPurchaseConfirmationModal);
  };

  return (
    <div className="w-full flex gap-10 max-[800px]:flex-col">
      {cartItems?.length ? (
        <div className="min-[1450px]:w-[80%] flex flex-col gap-y-8 max-[1450px]:w-[70%] max-[1050px]:w-[60%] max-[800px]:w-[100%]">
          <Stepper
            steps={steps}
            completedSteps={completedSteps}
            inCompletedSteps={inCompletedSteps}
            className="sticky top-[64px] z-40 max-[390px]:top-40 max-[655px]:top-[118px]"
          />
          <div id={steps[0]}>
            <CartsWrapper
              refetchFn={refetch}
              data={cartItems}
              titleClassName="!font-bold text-xl leading-[30px]"
            />
          </div>
          <DeliveryInformationCard ordersForm={ordersForm} />
          <ContactInformationCard ordersForm={ordersForm} />
          <BillingInformation ordersForm={ordersForm} />
        </div>
      ) : (
        <div className="w-full">
          <EmptyCart />
        </div>
      )}
      <div className="min-[1450px]:w-[20%] max-[1450px]:w-[30%] max-[800px]:w-[100%]">
        {showPurchaseConfirmationModal ? (
          <DeleteModal
            showModal={showPurchaseConfirmationModal}
            onCloseModal={onShowPurchaseConfirmationModal}
            onHandleConfirm={handleSubmit(onPurchaseProducts)}
            buttonNames={['proceed', 'cancel']}
            description="Are you sure you want to proceed with the purchase?"
          />
        ) : null}
        <OrderDetails
          buttonName="Purchase"
          shouldDisableButton={!cartItems?.length}
          totalItems={orderDetails.totalItems}
          subTotalPrice={orderDetails.subTotalPrice}
          totalPrice={orderDetails.totalPrice}
          shippingAmount={shippingType ? shippingAmount : undefined}
          onClick={handleSubmit(onShowPurchaseConfirmationModal)}
          className="sticky top-16 z-20"
        />
      </div>
    </div>
  );
}

export default OrdersPage;
