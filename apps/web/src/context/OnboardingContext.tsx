/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable consistent-return */

'use client';

import {
  getDefinedValues,
  getNextButtonDisableStatus,
  OnboardingFormType,
  UseCaseTypeEnum,
} from '@components/onboarding/types';
import { useAuthContext } from '@context/AuthContext';
import {
  useGetUserProfile,
  useUpdateUserProfile,
  useUpdateUserProfileRole,
} from '@queries';
import { ProfileRoles } from '@services';
import { Spinner } from '@src/atoms';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToast } from '@context/ToastContext';
import {
  OnboardingContextProps,
  OnboardingWizard,
} from '@components/onboarding-wizard/types';
import { defaultOnboardingSteps } from '@components/onboarding/onboardingConstants';

const OnboardingContext = createContext<OnboardingContextProps | undefined>(
  undefined,
);

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const onboardingForm = useForm<OnboardingFormType>({ mode: 'all' });

  const { reset, getValues, handleSubmit } = onboardingForm;

  const { setAuthenticatedUser, authenticatedUser } = useAuthContext();

  const { showErrorToast } = useToast();

  const { userId } = authenticatedUser || {};

  const {
    data: onboardingData,
    isLoading: isLoadingOnboardingData,
    isFetched,
    isError,
    error,
  } = useGetUserProfile();

  const {
    mutateAsync: updateOnboarding,
    isPending: isOnboardingUpdatePending,
  } = useUpdateUserProfile({});

  const {
    mutateAsync: updateUserPofileRoleAsync,
    isPending: isRoleUpdatePending,
  } = useUpdateUserProfileRole({
    successMessage: '',
    failureMessage: true,
  });

  useEffect(() => {
    const { onboardingStep, onboardingCompleted } = onboardingData?.data || {};
    if (onboardingCompleted) {
      const step = onboardingStep || defaultOnboardingSteps;
      setActiveStep(step - 1);
    } else {
      setActiveStep(!onboardingStep ? 0 : Number(onboardingStep) - 1);
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [onboardingData?.data?.id, onboardingData?.data?.onboardingCompleted]);

  useEffect(() => {
    if (onboardingData?.data) {
      const { user } = onboardingData?.data || {};
      reset({ ...onboardingData?.data, profileRoles: user?.profileRoles });
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [onboardingData?.data, isFetched]);

  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  const onHandleNext = async () => {
    try {
      const formValues = getValues();
      const { profileRoles, ...rest } = formValues || {};

      const onboardingStep = activeStep + 1;
      const isLastStep = activeStep === totalSteps - 1;

      const filteredObject = getDefinedValues(rest);

      const isOnboardingCompleted = isLastStep
        ? {
            onboardingStep: activeStep + 1,
            onboardingCompleted: isLastStep,
          }
        : {
            isOnboarding: true,
            onboardingCompleted: activeStep === totalSteps - 1,
            onboardingStep: activeStep + 2,
          };

      if (activeStep === OnboardingWizard.SelectRole) {
        const updatedUser = await updateUserPofileRoleAsync({
          profileRoles: profileRoles as ProfileRoles[],
        });
        setAuthenticatedUser?.({
          ...authenticatedUser,
          profileRoles: updatedUser?.profileRoles || [],
          userId: userId as string,
        });
        if (updatedUser) {
          const updatedOnboardingData = await updateOnboarding({
            isOnboarding: true,
            onboardingStep: activeStep + 2,
          });
          if (updatedOnboardingData?.data?.id) {
            setActiveStep(onboardingStep);
          }
        }
      } else {
        const updatedOnboardingData = await updateOnboarding({
          ...filteredObject,
          ...isOnboardingCompleted,
        });
        if (updatedOnboardingData?.data?.id) {
          if (isLastStep) {
            return updatedOnboardingData;
          }
          if (activeStep < totalSteps - 1) {
            setActiveStep(onboardingStep);
          }
        } else if (updatedOnboardingData?.error) {
          showErrorToast({ message: updatedOnboardingData?.error });
          setActiveStep(activeStep);
        }
      }
    } catch (e) {
      setActiveStep(activeStep);
    }
  };

  const onHandleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const onHandleSkip = async () => {
    if (activeStep === OnboardingWizard.SelectRole) {
      const updatedUser = await updateUserPofileRoleAsync({
        profileRoles: [] as ProfileRoles[],
      });
      setAuthenticatedUser?.({
        ...authenticatedUser,
        profileRoles: updatedUser?.profileRoles || [],
        userId: userId as string,
      });
    }
    await updateOnboarding({
      ...(activeStep === OnboardingWizard.SelectUserType
        ? { useCaseType: UseCaseTypeEnum.None, isOnboarding: true }
        : { isOnboarding: true }),
      onboardingStep: activeStep + 2,
    });
    setActiveStep(activeStep + 1);
  };

  const shouldDisableNextButton = getNextButtonDisableStatus(
    activeStep,
    getValues(),
  );

  if (isError) {
    return (
      <div className="text-danger text-center mt-[100px]">
        {(error as any)?.error}
      </div>
    );
  }

  return (
    <OnboardingContext.Provider
      value={{
        activeStep,
        setTotalSteps,
        totalSteps,
        onHandleNext: handleSubmit(onHandleNext),
        onHandleSkip,
        onHandleBack,
        onboardingForm,
        shouldDisableNextButton:
          shouldDisableNextButton ||
          isOnboardingUpdatePending ||
          isRoleUpdatePending,
      }}
    >
      {isLoadingOnboardingData ||
      !isPageLoaded ||
      (onboardingData?.data && !onboardingData?.data?.id) ? (
        <div className="w-full h-full flex items-center justify-center px-8 py-20">
          <Spinner
            size="lg"
            className="fill-action dark:fill-action-dark h-[50px] w-[50px]"
          />
        </div>
      ) : (
        children
      )}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
