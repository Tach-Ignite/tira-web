'use client';

import {
  AccountSetupCompleted,
  BusinessInformation,
  ChooseBusinessType,
  ChooseUseCaseType,
  PersonalInformation,
  SelectProfileRoles,
} from '@components/onboarding';
import { OnboardingWizard } from '@components/onboarding-wizard';
import { UseCaseTypeEnum } from '@components/onboarding/types';
import { useOnboarding } from '@context/OnboardingContext';
import { useEffect } from 'react';

function OnboardingPage() {
  const { onboardingForm, setTotalSteps } = useOnboarding();

  const { watch } = onboardingForm;

  const { useCaseType } = watch();

  const showBusinessTypeSteps =
    useCaseType === UseCaseTypeEnum.Business ||
    useCaseType === UseCaseTypeEnum.Both;

  const businessTypeSteps = [
    {
      title: 'Describe Your Color Shop Type',
      description: '',
      content: <ChooseBusinessType />,
    },
    {
      title: 'Tell us about your business',
      description: '',
      content: <BusinessInformation />,
    },
  ];

  const steps = [
    {
      title: 'How are you planning to use Color Shop?',
      description: 'Let us know how you’re engaging with Color Shop.',
      content: <ChooseUseCaseType />,
      showSkipButton: true,
    },
    {
      title: 'What roles describe your involvement with Color Shop?',
      description: 'Select all that apply so we can customize your experience.',
      content: <SelectProfileRoles />,
      showSkipButton: true,
    },
    {
      title: 'Tell us about yourself',
      description: '',
      content: <PersonalInformation />,
    },
    ...(showBusinessTypeSteps ? businessTypeSteps : []),
    {
      title: `Your Account is Ready!`,
      description: `Thank you for completing the onboarding process. We’re setting up your
              personalized dashboard with everything you need to get started.`,
      content: <AccountSetupCompleted />,
    },
  ]?.filter(({ content }) => Boolean(content));

  useEffect(() => {
    if (steps?.length) {
      setTotalSteps(steps?.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps?.length]);

  return (
    <div className="w-full h-full flex items-center justify-center px-1 tab:!px-16 lg:!px-8 2xl:!px-16">
      <OnboardingWizard steps={steps} />
    </div>
  );
}

export default OnboardingPage;
