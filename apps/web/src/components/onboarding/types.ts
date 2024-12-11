/* eslint-disable no-unused-vars */

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

export const getDefinedValues = (values: {}) =>
  Object.fromEntries(
    Object.entries(values).filter(
      ([key, value]) =>
        value !== null &&
        value !== undefined &&
        !(Array.isArray(value) && value.length === 0),
    ),
  );

const stepValidationRules: Array<(data: OnboardingFormType) => boolean> = [
  (data) => !!data.useCaseType && data.useCaseType !== UseCaseTypeEnum.None,
  (data) => (data.profileRoles?.length || 0) > 0,
  (data) => !!data.firstName && !!data.lastName,
  (data) => !!data.businessType,
  (data) => !!data.companyName,
];

export const getNextButtonDisableStatus = (
  stepIndex: number,
  formData: OnboardingFormType,
): boolean => {
  const validateStep = stepValidationRules[stepIndex];
  return validateStep ? !validateStep(formData) : true;
};
