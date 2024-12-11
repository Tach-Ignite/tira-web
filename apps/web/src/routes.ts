/* eslint-disable no-unused-vars */

'use client';

export enum AdminRoutes {
  Dashboard = '/admin/dashboard',
  Products = '/admin/products',
  Services = '/admin/services',
  Categories = '/admin/categories',
  Orders = '/admin/orders',
  Bookings = '/admin/bookings',
  Users = '/admin/users',
  Profile = '/admin/profile',
  Security = '/admin/security',
  Chat = '/admin/chat',
}

export enum AdminConsoleRoutes {
  Overview = '/app/admin-console',
  Organizations = '/app/admin-console/organizations',
  Settings = '/app/admin-console/settings',
  Users = '/app/admin-console/users',
}

export enum UnAuthenticatedRoutes {
  Root = '/',
  About = 'https://www.tachignite.com/about',
  TachColorShop = '/app',
  TermsAndConditions = '/terms-and-conditions',
  PrivacyPolicy = '/privacy-policy',
}

export enum TachColorAuthPages {
  Login = '/app/auth/login',
  SignUp = '/app/auth/signup',
  ForgotPassword = '/app/auth/forgot-password',
  ResetPassword = '/app/auth/reset-password',
}

export enum CustomerRoutes {
  MarketPlace = '/app/marketplace/products',
  Announcement = '/announcement',
  Contact = '/contact',
  MyAccount = '/account',
  Orders = '/account/orders',
  Bookings = '/account/bookings-list',
  Favorites = '/account/favorites',
  Security = '/account/security',
  ProfileCompleted = '/profile/completed',
  Chat = '/account/chat',
  Onboarding = '/onboarding',
}

export enum TachColorShopRoutes {
  Home = '/app',
  Products = '/app/marketplace/products',
  Service = '/app/marketplace/services',
}

export enum TachColorShopConsoleRoutes {
  Overview = '/app/console',
  Organizations = '/app/organizations',
  Settings = '/app/account-settings',
}

export enum OrgConsoleRoutes {
  Overview = '/app/org/:orgFriendlyId',
  OrganizationProfile = '/app/org/:orgFriendlyId/profile',
  OrganizationTeams = '/app/org/:orgFriendlyId/teams',
  OrganizationUsers = '/app/org/:orgFriendlyId/users',
  OrganizationSingleUser = '/app/org/:orgFriendlyId/users/:userId',
  OrganizationSettings = '/app/org/:orgFriendlyId/settings',
}

export enum TeamConsoleRoutes {
  Overview = '/app/org/:orgFriendlyId/teams/:teamFriendlyId',
  TeamMembers = '/app/org/:orgFriendlyId/teams/:teamFriendlyId/users',
  TeamSettings = '/app/org/:orgFriendlyId/teams/:teamFriendlyId/settings',
}

export const AuthConsoleRoutesEnum = {
  ...TachColorShopConsoleRoutes,
} as const;

export enum AccountSettingsRoutes {
  AccountSettings = '/app/account-settings',
  AccountSettingsProfile = '/app/account-settings/profile-settings',
  AccountSettingsSubscriptions = '/app/account-settings/subscriptions',
  AccountSettingsBilling = '/app/account-settings/billing',
}

export const AuthWithoutSidebarRoutesEnum = {
  ...AccountSettingsRoutes,
} as const;

export type AllRoutes =
  | TachColorAuthPages
  | TachColorShopConsoleRoutes
  | AccountSettingsRoutes
  | AdminRoutes;

export enum AuthPages {
  Login = '/auth/login',
  signUp = 'auth/signup',
}
