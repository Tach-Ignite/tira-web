/* eslint-disable no-unused-vars */

import { UserTypeEnum, UserRoles } from '@src/types/modules/UserType';
import { CompletionStatusEnum } from '@src/types/modules/statusEnum';

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
  userType: string;
  phoneNumber: string | null;
  profileImage: string | null;
  emailVerifiedAt: string;
  createdAt: string;
  updatedAt: string;
  roleId: string;
}

export interface UserProfileEntity {
  fullName?: string;
  phoneNumber?: string;
  emailAddress?: string;
  city?: string;
  state?: string;
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
  profileImage?: string;
  phoneNumber?: string;
  userProfile?: UserProfileEntity;
}
export interface UserProfileType extends Omit<UserType, 'role'> {
  emailVerifiedAt?: Date;
  files?: File[];
}
