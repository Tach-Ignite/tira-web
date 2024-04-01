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
}

export enum UnAuthenticatedRoutes {
  Root = '/',
  Demo = '/demo',
  About = 'https://www.tachignite.com/about',
}

export enum CustomerRoutes {
  MarketPlace = '/marketplace',
  Announcement = '/announcement',
  Contact = '/contact',
  MyAccount = '/account',
  Orders = '/account/orders',
  Bookings = '/account/bookings-list',
  Favorites = '/account/favorites',
  Security = '/account/security',
  ProfileCompleted = '/profile/completed',
}

export enum AuthPages {
  Login = '/auth/login',
  signUp = 'auth/signup',
}
