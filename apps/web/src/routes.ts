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
  Overview = '/tach-color-shop/admin-console',
  Organizations = '/tach-color-shop/admin-console/organizations',
  Settings = '/tach-color-shop/admin-console/settings',
  Users = '/tach-color-shop/admin-console/users',
}

export enum UnAuthenticatedRoutes {
  Root = '/',
  About = 'https://www.tachignite.com/about',
  TachColorShop = '/tach-color-shop',
  TermsAndConditions = '/terms-and-conditions',
  PrivacyPolicy = '/privacy-policy',
}

export enum TachColorAuthPages {
  Login = '/tach-color-shop/auth/login',
  SignUp = '/tach-color-shop/auth/signup',
  ForgotPassword = '/tach-color-shop/auth/forgot-password',
  ResetPassword = '/tach-color-shop/auth/reset-password',
}

export enum CustomerRoutes {
  MarketPlace = '/tach-color-shop/marketplace/products',
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
  Home = '/tach-color-shop',
  Products = '/tach-color-shop/marketplace/products',
  Service = '/tach-color-shop/marketplace/services',
}

export enum TachColorShopConsoleRoutes {
  Overview = '/tach-color-shop/console',
  Organizations = '/tach-color-shop/organizations',
  Settings = '/tach-color-shop/account-settings',
}

export const AuthConsoleRoutesEnum = {
  ...TachColorShopConsoleRoutes,
} as const;

export enum AccountSettingsRoutes {
  AccountSettings = '/tach-color-shop/account-settings',
  AccountSettingsProfile = '/tach-color-shop/account-settings/profile-settings',
  AccountSettingsSubscriptions = '/tach-color-shop/account-settings/subscriptions',
  AccountSettingsBilling = '/tach-color-shop/account-settings/billing',
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
