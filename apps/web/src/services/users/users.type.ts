/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */

import { UserTypeEnum, UserRoles } from '@src/types/modules/UserType';
import { CompletionStatusEnum } from '@src/types/modules/statusEnum';
import {
  UseCaseTypeEnum,
  BusinessTypeEnum,
} from '@src/components/onboarding/types';
import { PaginationMetaType } from '@src/types/modules/pagination';
import { OrgUsers } from '@services/organizations/organization.type';
import { TeamUsers } from '@services/teams/team.type';

export interface UserRole {
  name: string;
  createdAt?: Date;
  lastName?: string;
  id: string;
}

export interface UserTotalCountsType {
  data: {
    totalUsersCount: number;
  };
}

export interface ChangePasswordPayloadType {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword?: string;
}

export enum GenderIdentityEnum {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
  NotToSay = 'NotToSay',
}

export enum ThemeModeEnum {
  DARK = 'dark',
  LIGHT = 'light',
  SYSTEM = 'auto',
}

export enum ProfileRoles {
  MasterOfHues = 'MasterOfHues',
  PigmentWizard = 'PigmentWizard',
  ShadeGuru = 'ShadeGuru',
  ContentCreator = 'ContentCreator',
  ThreeDDesigner = 'ThreeDDesigner',
  SpectrumExplorer = 'SpectrumExplorer',
}

export interface UpdateUserProfileRoleArgs {
  profileRoles?: ProfileRoles[];
}

export interface UserProfile {
  id: string;
  fullName: string | null;
  phoneNumber: string | null;
  emailAddress: string | null;
  city: string | null;
  state: string | null;
  genderIdentity: string | null;
  race: string[];
  militaryVeteran: boolean | null;
  linkedInURL: string | null;
  websiteURL: string | null;
  githubURL: string | null;
  mediumURL: string | null;
  stackOverflowURL: string | null;
  calendarLink: string | null;
  completedSteps: number | null;
  status: string;
  userId: string;
}

export interface Role {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export interface UserEntity {
  userId: string;
  email: string;
  name: string | null;
  firstName: string | null;
  lastName: string | null;
  hash: string;
  sub: string | null;
  profileRoles?: ProfileRoles[];
  userType: string;
  phoneNumber: string | null;
  profileImage: string | null;
  emailVerifiedAt: string;
  createdAt: string;
  updatedAt: string;
  roleId: string;
  orgUsers?: OrgUsers[];
  teamUsers?: TeamUsers[];
  totalTeams?: number;
  userProfile?: UserProfileEntity;
}

export interface UserProfileEntity {
  id?: string;
  files?: File[];
  profileImageUrlFiles?: File[];
  profileImageUrl?: string;
  fullName?: string;
  phoneNumber?: string;
  emailAddress?: string;
  city?: string;
  state?: string;
  countryRegion?: string;
  postalCode?: string;
  useCaseType?: UseCaseTypeEnum;
  themeMode?: string;
  genderIdentity?: GenderIdentityEnum;
  race?: string[];
  militaryVeteran?: string;
  linkedInURL?: string;
  websiteURL?: string;
  user?: UserEntity;
  githubURL?: string;
  mediumURL?: string;
  status?: CompletionStatusEnum;
  stackOverflowURL?: string;
  calendarLink?: string;
  completedSteps?: string;
  userId?: string;
  firstName?: string;
  lastName?: string;
  tiraUsedFor?: BusinessTypeEnum;
  businessType?: BusinessTypeEnum;
  companyName?: string;
  addressLine1?: string;
  addressLine2?: string;
  businessCity?: string;
  businessState?: string;
  businessCountryRegion?: string;
  businessPostalCode?: string;
  businessLinkedInURL?: string;
  businessUrl?: string;
  businessName?: string;
  businessEmail?: string;
  businessIndustry?: string;
  personalizedContent?: string[];
  personalizedServices?: string[];
  onboardingCompleted?: boolean;
  onboardingStep?: number;
  isOnboarding?: boolean;
  // onboardingPlan?: OnboardingPlanEnum;
}

export interface UserType {
  userId: string;
  name?: string;
  createdAt?: Date;
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  userType?: UserTypeEnum;
  roleId?: string;
  email?: string;
  userStatus?: 'Active' | 'DeActive';
  profileImage?: string;
  phoneNumber?: string;
  profileRoles?: string[];
  userProfile?: UserProfileEntity;
  orgUsers?: OrgUsers[];
  teamUsers?: TeamUsers[];
}

export interface UserPayloadType {
  email: string;
  password: string;
  inviteId?: string;
  inviteCode?: string;
}

export interface AdminConsoleUserResponseType {
  data: UserEntity[];
  meta: PaginationMetaType;
}

export interface UserProfileType extends Omit<UserType, 'role'> {
  emailVerifiedAt?: Date;
  files?: File[];
}

export interface GetAllAdminConsoleUsersListsArgs {
  page: number;
  perPage: number;
  orgId?: string;
  teamId?: string;
  searchTerm: string;
}

export interface UpdateUserRoleDto {
  roleId: string;
  userId?: string;
  orgId?: string;
  teamId?: string;
}

export interface UpdatedUserProfileDto {
  fullName: string | null;
  phoneNumber: string | null;
  city: string | null;
  state: string | null;
  genderIdentity: string | null;
  race: string[];
  militaryVeteran: boolean | null;
  linkedInURL: string | null;
  websiteURL: string | null;
  githubURL: string | null;
  mediumURL: string | null;
  stackOverflowURL: string | null;
  emailAddress?: string | null;
  calendarLink: string | null;
}

export interface UpdateAnyUserDetailsDto {
  fullName?: string;
  userStatus?: 'Active' | 'DeActive';
  userProfile?: UpdatedUserProfileDto;
}

export interface UpdateAnyUserDetailsArgs {
  userId: string;
  data: UpdateAnyUserDetailsDto;
}

export const UserStatusMap: { [key: string]: string } = {
  Active: 'De-Activate',
  DeActive: 'Activate',
};
