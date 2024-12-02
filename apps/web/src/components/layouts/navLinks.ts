'use client';

import {
  AdminConsoleRoutes,
  AdminRoutes,
  CustomerRoutes,
  TachColorAuthPages,
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
  ChatIcon,
  HeartSolidIcon,
  SettingsIcon,
} from '@src/icons';
import logout from '@services/logout';

export const adminSideBarNavLinks = [
  { name: 'dashboard', icon: DesktopIcon, url: AdminRoutes.Dashboard },
  { name: 'products', icon: LayerIcon, url: AdminRoutes.Products },
  { name: 'services', icon: BriefCaseIcon, url: AdminRoutes.Services },
  { name: 'categories', icon: TagIcon, url: AdminRoutes.Categories },
  { name: 'bookings', icon: CalendarLight, url: AdminRoutes.Bookings },
  { name: 'orders', icon: TruckIcon, url: AdminRoutes.Orders },
  {
    name: 'Chat',
    icon: ChatIcon,
    url: AdminRoutes.Chat,
  },
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
    name: 'favorites',
    icon: HeartOutlinedIcon,
    url: CustomerRoutes.Favorites,
    iconClass: 'w-4 h-4 mr-1',
  },
  {
    name: 'Chat',
    icon: ChatIcon,
    url: CustomerRoutes.Chat,
    iconClass: 'w-5 h-[18px]',
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
    name: 'Security',
    icon: LockFillIcon,
    url: CustomerRoutes.Security,
    iconClass: 'w-5 h-5',
  },
];

export const customerNavLinks = [
  { name: 'Marketplace', url: CustomerRoutes.MarketPlace },
  { name: 'Announcements', url: CustomerRoutes.Announcement },
  { name: 'Contact Us', url: CustomerRoutes.Contact },
];

export const accountNavLinks = [
  {
    name: 'My Profile',
    icon: CircleUserIcon,
    url: CustomerRoutes.MyAccount,
    customerOnly: true,
    iconClass: 'w-6 h-6',
  },
  {
    name: 'Favorites',
    icon: HeartSolidIcon,
    url: CustomerRoutes.Favorites,
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
  // { name: 'Home', url: UnAuthenticatedRoutes.Root },
  { name: 'Marketplace', url: CustomerRoutes.MarketPlace },
  { name: 'Announcements', url: CustomerRoutes.Announcement },
  { name: 'Contact Us', url: CustomerRoutes.Contact },
  // {
  //   name: 'About Tach',
  //   url: UnAuthenticatedRoutes.About,
  // },
];

export const adminConsoleSettingNavLinks = [
  {
    icon: SettingsIcon,
    name: 'Settings',
    url: AdminConsoleRoutes.Settings,
  },
  {
    icon: LogoutIcon,
    name: 'Logout',
    iconClassName: 'rotate-180',
    url: TachColorAuthPages.Login,
    onClick: logout,
  },
];
