/* eslint-disable no-unused-vars */

import { WizardFooterProps } from '@src/components/onboarding-wizard/types';
import { UseFormReturn } from 'react-hook-form';

export enum UseCaseTypeEnum {
  Individual = 'Individual',
  Business = 'Business',
  Both = 'Both',
  None = 'None',
}

export enum BusinessTypeEnum {
  PaintSupplier = 'PaintSupplier',
  BusinessPartner = 'BusinessPartner',
  ColorConsultant = 'ColorConsultant',
  Other = 'Other',
}

export interface OnboardingEntity {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  linkedInURL?: string;
  countryRegion?: string;
  postalCode?: string;
  state?: string;
  profileRoles?: [];
  useCaseType?: UseCaseTypeEnum;
  onboarding_completed?: string;
  onboarding_step?: string;
  id?: string;
}

export interface GetOnboardingDetailsType {
  message?: string;
  userProfile?: OnboardingEntity;
}

export interface OnboardingFormType {
  useCaseType?: UseCaseTypeEnum;
  profileRoles?: string[];
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  linkedInURL?: string;
  websiteURL?: string;
  countryRegion?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  businessType?: BusinessTypeEnum;
  companyName?: string;
  businessCity?: string;
  businessState?: string;
  businessCountryRegion?: string;
  businessPostalCode?: string;
  businessLinkedInURL?: string;
  businessUrl?: string;
  addressLine1?: string;
  addressLine2?: string;
  onboardingCompleted?: boolean;
  onboardingStep?: number;
}

export interface OnboardingForm {
  form: UseFormReturn<OnboardingFormType>;
}

export interface OnboardingInfoProps
  extends OnboardingForm,
    WizardFooterProps {}
