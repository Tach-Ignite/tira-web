'use client';

import {
  AdminRoutes,
  CustomerRoutes,
  UnAuthenticatedRoutes,
} from '@src/routes';
import {
  DesktopIcon,
  LayerIcon,
  TagIcon,
  TruckIcon,
  OutlinedUsersIcon,
  ProfileIcon,
  HeartOutlinedIcon,
  LogoutIcon,
  LockFillIcon,
  CircleUserIcon,
  BriefCaseIcon,
  CalendarLight,
} from '@src/icons';

export const adminSideBarNavLinks = [
  { name: 'dashboard', icon: DesktopIcon, url: AdminRoutes.Dashboard },
  { name: 'products', icon: LayerIcon, url: AdminRoutes.Products },
  { name: 'services', icon: BriefCaseIcon, url: AdminRoutes.Services },
  { name: 'categories', icon: TagIcon, url: AdminRoutes.Categories },
  { name: 'orders', icon: TruckIcon, url: AdminRoutes.Orders },
  { name: 'bookings', icon: CalendarLight, url: AdminRoutes.Bookings },
  { name: 'users', icon: OutlinedUsersIcon, url: AdminRoutes.Users },
  { name: 'profile', icon: ProfileIcon, url: AdminRoutes.Profile },
  {
    name: 'Security',
    icon: LockFillIcon,
    url: AdminRoutes.Security,
  },
];

export const customerAccountSideBarNavLinks = [
  {
    name: 'profile',
    icon: ProfileIcon,
    url: CustomerRoutes.MyAccount,
    iconClass: 'w-5 h-5',
  },
  {
    name: 'orders',
    icon: TruckIcon,
    url: CustomerRoutes.Orders,
    iconClass: 'w-5 h-5',
  },
  {
    name: 'bookings',
    icon: CalendarLight,
    url: CustomerRoutes.Bookings,
    iconClass: 'w-5 h-5',
  },
  {
    name: 'favorites',
    icon: HeartOutlinedIcon,
    url: CustomerRoutes.Favorites,
    iconClass: 'w-4 h-4 mr-1',
  },
  {
    name: 'Security',
    icon: LockFillIcon,
    url: CustomerRoutes.Security,
    iconClass: 'w-5 h-5',
  },
];

export const customerNavLinks = [
  { name: 'Contact Us', url: CustomerRoutes.Contact },
  { name: 'Marketplace', url: CustomerRoutes.MarketPlace },
];

export const accountNavLinks = [
  {
    name: 'My Account',
    icon: CircleUserIcon,
    url: CustomerRoutes.MyAccount,
    customerOnly: true,
    iconClass: 'w-6 h-6',
  },
  {
    name: 'Logout',
    icon: LogoutIcon,
    customerOnly: false,
    iconClass: 'ml-1',
  },
];

export const notAuthenticatedNavLinks = [
  { name: 'Home', url: UnAuthenticatedRoutes.Root },
  { name: 'Demo', url: UnAuthenticatedRoutes.Demo },
  { name: 'Announcement', url: CustomerRoutes.Announcement },
  { name: 'Marketplace', url: CustomerRoutes.MarketPlace },
  { name: 'Contact Us', url: CustomerRoutes.Contact },
  {
    name: 'About Tach',
    url: UnAuthenticatedRoutes.About,
  },
];
