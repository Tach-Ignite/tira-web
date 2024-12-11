import { ProfileRoles } from '@services';
import { BusinessTypeEnum, UseCaseTypeEnum } from './types';

export const defaultOnboardingSteps = 4;

export const userTypes = [
  {
    type: UseCaseTypeEnum.Individual,
    description1: 'I’m here to explore colors, and contribute personally.',
    description2:
      'Suitable for visual artists or any users not representing a business.',
  },
  {
    type: UseCaseTypeEnum.Business,
    description1: 'I’m representing my company or organization.',
    description2:
      'Ideal for corporate or service providers representing a company.',
  },
  {
    type: UseCaseTypeEnum.Both,
    description1:
      'I’ll be using Color Shop both personally and on behalf of a business.',
    description2:
      'Suitable for individuals who have dual roles, like painters who also owns a color shop.',
  },
];

export const allRoles = [
  {
    roleName: ProfileRoles.MasterOfHues,
    roleLabel: 'Master of Hues',
    description: `You're here to manage colors or palettes.`,
  },
  {
    roleName: ProfileRoles.PigmentWizard,
    roleLabel: 'Pigment Wizard',
    description: `You're here to do color-mixing.`,
  },
  {
    roleName: ProfileRoles.ShadeGuru,
    roleLabel: 'Shade Guru',
    description: `You're here as specialist in nuanced color choices.`,
  },
  {
    roleName: ProfileRoles.ContentCreator,
    roleLabel: 'Content Creator',
    description: `You're here to produce tutorials, tips and visual content for the shop's online presence.`,
  },
  {
    roleName: ProfileRoles.ThreeDDesigner,
    roleLabel: '3D Color Designer',
    description: `You're here to use software to simulate color application in visual space.`,
  },
  {
    roleName: ProfileRoles.SpectrumExplorer,
    roleLabel: 'Spectrum Explorer',
    description: `You're here to explore and experiment with full color range.`,
  },
];

export const businessTypes = [
  {
    type: BusinessTypeEnum.PaintSupplier,
    label: 'Paint Supplier',
    description1:
      'A business creating and delivering paint products and color solutions for various applications',
  },
  {
    type: BusinessTypeEnum.BusinessPartner,
    label: 'Business Partner',
    description1:
      'An organization collaborating with color-related business to support their growth and expansion efforts',
  },
  {
    type: BusinessTypeEnum.ColorConsultant,
    label: 'Color Consultant',
    description1:
      'A company or individual offering expertise and services to assist color shops in meeting their business needs',
  },
  {
    type: BusinessTypeEnum.Other,
    description1: '',
  },
];
