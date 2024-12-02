/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */

'use client';

import { useEffect, useCallback, useState } from 'react';
import { Spinner } from '@src/atoms';
import { OnboardingWizard } from '@components/onboarding-wizard';
import { OnboardingWizards } from '@components/onboarding-wizard/types';
import {
  ChooseUseCaseType,
  SelectProfileRoles,
  PersonalInformation,
  BusinessInformation,
  ChooseBusinessType,
  AccountSetupCompleted,
} from '@components/onboarding';
import {
  OnboardingFormType,
  UseCaseTypeEnum,
} from '@components/onboarding/types';
import {
  useGetUserProfile,
  useGetCurrentUser,
  useUpdateUserProfileRole,
  useUpdateUserProfile,
} from '@queries/useUsersQuery';
import { ProfileRoles } from '@services';
import { TachColorShopConsoleRoutes } from '@src/routes';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@context/AuthContext';
import { useForm } from 'react-hook-form';

function OnboardingPage() {
  const onboardingForm = useForm<OnboardingFormType>({ mode: 'all' });
  const { watch, handleSubmit, reset, formState } = onboardingForm;

  const [totalSteps, setTotalSteps] = useState(6);
  const [activeStepIndex, setActiveStepIndex] = useState(
    OnboardingWizards.useCaseType,
  );
  const [loadCount, setLoadCount] = useState(0);
  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const router = useRouter();

  const { data: user, isLoading: isLoadingUserData } = useGetCurrentUser();

  const { setAuthenticatedUser, authenticatedUser } = useAuthContext();

  const { userId } = user || {};

  const {
    data: onboardingData,
    refetch,
    isLoading: isLoadingProfileData,
  } = useGetUserProfile();

  const userProfileData = onboardingData?.data || {};

  const { onboardingCompleted: isOnboardingCompleted = false } =
    userProfileData || {};

  const {
    useCaseType,
    profileRoles = [],
    firstName = '',
    lastName = '',
    companyName = '',
    phoneNumber = '',
    linkedInURL = '',
    websiteURL = '',
    countryRegion = '',
    postalCode = '',
    state = '',
    city = '',
    businessLinkedInURL = '',
    businessUrl = '',
    businessCity = '',
    businessState = '',
    businessCountryRegion = '',
    businessPostalCode = '',
    addressLine1 = '',
    addressLine2 = '',
    businessType,
  } = watch();

  const { mutateAsync: updateOnboarding, isPending } = useUpdateUserProfile({});

  const { mutateAsync: updateUserAsync, isPending: isPendingRoleUpdate } =
    useUpdateUserProfileRole({
      successMessage: '',
      failureMessage: true,
      onSuccessCallback: () => {
        refetch();
      },
    });

  const onHandleBack = useCallback(() => {
    setActiveStepIndex((prevIndex) => prevIndex - 1);
  }, [setActiveStepIndex]);

  const onHandleLastButton = useCallback(async () => {
    if (activeStepIndex === OnboardingWizards.RoleSelect) {
      const updatedUser = await updateUserAsync({
        profileRoles: [] as ProfileRoles[],
      });
      setAuthenticatedUser?.({
        ...authenticatedUser,
        profileRoles: updatedUser?.profileRoles || [],
        userId: userId as string,
      });
    }
    await updateOnboarding({
      ...(activeStepIndex === OnboardingWizards.useCaseType
        ? { useCaseType: UseCaseTypeEnum.None }
        : {}),
      onboardingStep: activeStepIndex + 1,
    });
    setActiveStepIndex((prevIndex) => prevIndex + 1);
    if (Number(activeStepIndex) === totalSteps) {
      router?.push(TachColorShopConsoleRoutes.Overview);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setActiveStepIndex, activeStepIndex, router]);

  const onHandleNext = async () => {
    try {
      const isBusinessOrBoth =
        useCaseType === UseCaseTypeEnum.Business ||
        useCaseType === UseCaseTypeEnum.Both;

      if (activeStepIndex === OnboardingWizards.useCaseType) {
        await updateOnboarding({
          useCaseType,
          isOnboarding: true,
          onboardingStep: activeStepIndex + 1,
        });
        setActiveStepIndex((prevIndex) => prevIndex + 1);
      }
      if (activeStepIndex === OnboardingWizards.RoleSelect) {
        const updatedUser = await updateUserAsync({
          profileRoles: profileRoles as ProfileRoles[],
        });
        setAuthenticatedUser?.({
          ...authenticatedUser,
          profileRoles: updatedUser?.profileRoles || [],
          userId: userId as string,
        });
        if (updatedUser) {
          await updateOnboarding({
            isOnboarding: true,
            onboardingStep: activeStepIndex + 1,
          });
        }
        setActiveStepIndex((prevIndex) => prevIndex + 1);
      }
      if (activeStepIndex === OnboardingWizards.PersonalInformation) {
        await updateOnboarding({
          firstName,
          lastName,
          phoneNumber,
          linkedInURL,
          countryRegion,
          postalCode,
          state,
          isOnboarding: true,
          onboardingStep: activeStepIndex + 1,
        });
        setActiveStepIndex((prevIndex) => prevIndex + 1);
      }
      if (
        isBusinessOrBoth &&
        activeStepIndex === OnboardingWizards.ChooseBusinessType
      ) {
        await updateOnboarding({
          businessType,
          isOnboarding: true,
        });
        setActiveStepIndex((prevIndex) => prevIndex + 1);
      }
      if (
        isBusinessOrBoth &&
        activeStepIndex === OnboardingWizards.BusinessInformation
      ) {
        await updateOnboarding({
          companyName,
          addressLine1,
          addressLine2,
          businessCity,
          businessState,
          businessCountryRegion,
          businessPostalCode,
          businessLinkedInURL,
          businessUrl,
          isOnboarding: true,
          onboardingStep: activeStepIndex + 1,
        });
        setActiveStepIndex((prevIndex) => prevIndex + 1);
      }
      if (
        (!isBusinessOrBoth && activeStepIndex === 3) ||
        (isBusinessOrBoth &&
          activeStepIndex === OnboardingWizards.AccountSetupCompleted)
      ) {
        const isBusinessData =
          useCaseType === UseCaseTypeEnum.Business ||
          useCaseType === UseCaseTypeEnum.Both
            ? {
                businessType,
                companyName,
                addressLine1,
                addressLine2,
                businessCity,
                businessState,
                businessCountryRegion,
                businessPostalCode,
                businessLinkedInURL,
                businessUrl,
              }
            : {};
        const finalProfileData = {
          onboardingCompleted: true,
          useCaseType,
          firstName,
          lastName,
          phoneNumber,
          linkedInURL,
          countryRegion,
          postalCode,
          state,
          city,
          ...isBusinessData,
        };
        // console.log('finalProfileData ::', finalProfileData);
        await updateOnboarding({
          ...finalProfileData,
        });
      }
    } catch (e) {
      setActiveStepIndex(activeStepIndex);
    }
  };

  const steps = [
    {
      title: 'How are you planning to use Color Shop?',
      description: 'Let us know how you’re engaging with Color Shop.',
      content: <ChooseUseCaseType form={onboardingForm} />,
      lastButtonText: 'Skip for now',
      showFooter: true,
      showAlways: true,
    },
    {
      title: 'What roles describe your involvement with Color Shop?',
      description: 'Select all that apply so we can customize your experience.',
      content: <SelectProfileRoles form={onboardingForm} />,
      lastButtonText: 'Skip for now',
      showFooter: true,
      showAlways: true,
    },
    {
      title: 'Tell us about yourself',
      description: '',
      content: (
        <PersonalInformation
          form={onboardingForm}
          onHandleNext={handleSubmit(onHandleNext)}
        />
      ),
      showFooter: true,
      showAlways: true,
    },
    {
      title: 'Describe Your Company Type',
      description: '',
      content: <ChooseBusinessType form={onboardingForm} />,
      showFooter: true,
      showAlways: false,
    },
    {
      title: 'Describe Your Color Shop Type',
      description: '',
      content: (
        <BusinessInformation
          form={onboardingForm}
          onHandleNext={handleSubmit(onHandleNext)}
        />
      ),
      showFooter: true,
      showAlways: false,
    },
    {
      title: ``,
      description: '',
      content: <AccountSetupCompleted onHandleNext={onHandleNext} />,
      lastButtonText: '',
      showFooter: false,
      showAlways: true,
    },
  ];

  const getNextButtonDisableStatus = () => {
    if (
      activeStepIndex === OnboardingWizards.useCaseType &&
      useCaseType?.length &&
      useCaseType !== UseCaseTypeEnum.None
    ) {
      return false;
    }
    if (
      activeStepIndex === OnboardingWizards.RoleSelect &&
      profileRoles?.length
    ) {
      return false;
    }
    if (
      activeStepIndex === OnboardingWizards.PersonalInformation &&
      firstName?.length &&
      lastName?.length
    ) {
      return false;
    }
    if (
      activeStepIndex === OnboardingWizards.ChooseBusinessType &&
      businessType
    ) {
      return false;
    }
    if (
      activeStepIndex === OnboardingWizards.BusinessInformation &&
      companyName?.length
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (onboardingData?.data?.userId || user?.profileRoles) {
      reset({ ...userProfileData, profileRoles: user?.profileRoles });
    }
    if (loadCount < 1 && !onboardingData?.data) {
      refetch();
    }
  }, [onboardingData, user]);

  useEffect(() => {
    if (onboardingData?.data?.onboardingStep && loadCount < 1) {
      setActiveStepIndex(onboardingData?.data?.onboardingStep);
      setLoadCount(loadCount + 1);
    }
    if (isOnboardingCompleted) {
      if (
        useCaseType &&
        (useCaseType === UseCaseTypeEnum.Business ||
          useCaseType === UseCaseTypeEnum.Both)
      ) {
        setActiveStepIndex(5);
      } else {
        setActiveStepIndex(3);
      }
      setTimeout(() => {
        router?.push(TachColorShopConsoleRoutes.Overview);
      }, 5000);
    }
  }, [onboardingData]);

  useEffect(() => {
    if (
      useCaseType &&
      (useCaseType === UseCaseTypeEnum.Business ||
        useCaseType === UseCaseTypeEnum.Both)
    ) {
      setTotalSteps(6);
    } else {
      setTotalSteps(4);
    }
  }, [useCaseType]);

  useEffect(() => {
    const disabled = getNextButtonDisableStatus();
    setIsNextDisabled(disabled);
  }, [formState]);

  return isLoadingProfileData || isLoadingUserData ? (
    <div className="w-full h-full flex items-center justify-center px-8 py-20">
      <Spinner
        size="lg"
        className="fill-primary-250 dark:fill-blue-400 h-[50px] mt-[50px] w-[50px]"
      />
    </div>
  ) : (
    <div className="w-full h-full flex items-center justify-center px-1 md:!px-14">
      <OnboardingWizard
        steps={
          totalSteps === 6 ? steps : steps?.filter((step) => step.showAlways)
        }
        totalSteps={totalSteps}
        activeStepIndex={activeStepIndex}
        onHandleNext={onHandleNext}
        shouldDisableNextButton={
          isLoadingUserData ||
          isPending ||
          isPendingRoleUpdate ||
          isNextDisabled
        }
        onHandleLastButton={onHandleLastButton}
        onHandleBack={
          activeStepIndex === OnboardingWizards.useCaseType
            ? undefined
            : onHandleBack
        }
      />
    </div>
  );
}

export default OnboardingPage;
