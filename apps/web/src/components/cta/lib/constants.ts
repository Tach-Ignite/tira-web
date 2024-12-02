/* eslint-disable no-unused-vars */

import PlaceholderCTAImage from '../../../../public/assets/placeholder-cta-sections.png';

export enum CTASectionType {
  ABOUT = 'about',
  COHORT = 'cohort',
  SERVICE = 'service',
  FORM_LINKS = 'form-links',
  DEFAULT = 'default',
}

export const aboutData = [
  {
    title: 'Customer Storefront',
    subTitle: '',
    description: `Email: user@example.com <br/> Password: user@Password1`,
    image: PlaceholderCTAImage,
  },
  {
    title: 'Admin Dashboard',
    subTitle: '',
    description: `Email: admin@example.com <br/> Password: admin@Password1`,
    image: PlaceholderCTAImage,
  },
];

export const defaultData = [
  {
    title: 'What is Tira ?',
    subTitle: '',
    description1: `Tach Ignite Reference Architecture (TIRA) is an open-source reference architecture used to build products for startups. TIRA is based on React + Next.js + TypeScript + Tailwind CSS. Its component-based structure, flexibility and adaptability make it quickly suitable to a number of industries and use cases. `,
    description2: ``,
    image: PlaceholderCTAImage,
    listItems: [
      {
        checked: true,
        description: 'Customer Sign In / Sign Up',
      },
      {
        checked: true,
        description: 'Browse Products and Service',
      },
      {
        checked: true,
        description: 'Booking system',
      },
      {
        checked: true,
        description: 'Notification system',
      },
      {
        checked: true,
        description: 'Products / Services Checkout ',
      },
      {
        checked: true,
        description: 'Chat',
      },
    ],
  },
  {
    title: 'Customer Features',
    subTitle: '',
    description1: `Users with the Customer role can view and order products through user-facing pages. 
Its component-based structure, along with its flexibility and adaptability, makes it suitable for various industries and use cases`,
    description2: '',
    image: PlaceholderCTAImage,
    listItems: [
      {
        checked: true,
        description: 'User Registration and Authentication',
      },
      {
        checked: true,
        description: 'User Profile Management',
      },
      {
        checked: true,
        description: 'Product and Service Browsing',
      },
      {
        checked: true,
        description: 'Shopping Cart and Favorites',
      },
      {
        checked: true,
        description: 'Order Management',
      },
      {
        checked: true,
        description: 'Booking Management',
      },
      {
        checked: true,
        description: 'Payment and Checkout',
      },
      {
        checked: true,
        description: 'Customer Support',
      },
      {
        checked: true,
        description: 'Notifications',
      },
    ],
  },
  {
    title: 'Admin Features',
    subTitle: '',
    description1:
      'The sample application is a simple e-commerce website, including admin management features. It allows users with the Admin role to manage inventory including adding, editing, and deleting products, services, categories, users, and orders through the admin dashboard',
    description2: '',
    image: PlaceholderCTAImage,
    listItems: [
      {
        checked: true,
        description: 'Admin Dashboard',
      },
      {
        checked: true,
        description: 'Product and Service Management',
      },
      {
        checked: true,
        description: 'Order Management',
      },
      {
        checked: true,
        description: 'Booking Management',
      },
      {
        checked: true,
        description: 'User Management',
      },
      {
        checked: true,
        description: 'Content Management',
      },
      {
        checked: true,
        description: 'Settings and Configurations',
      },
      {
        checked: true,
        description: 'Communication and Support',
      },
      {
        checked: true,
        description: 'Notifications Management',
      },
    ],
  },
];

export const serviceItems = [
  {
    id: 1,
    title: 'Registration and Authentication',
    description: `Sign in/sign up via credentials (email and password), Sign in/sign up via third-party providers (Google, LinkedIn, Microsoft, GitHub), Password recovery and reset & Email verification `,
    showIcon: true,
    icon: 'LoginIcon',
  },
  {
    id: 2,
    title: 'Profile Management',
    description: `Edit personal information (name, email, phone, profile picture) & Change password `,
    showIcon: true,
    icon: 'ProfileIcon',
  },
  {
    id: 3,
    title: 'Product and Service Browsing',
    description: `View product list and details, View service list and details , Search and filter products/services by category, price, etc & View announcements and promotional content `,
    showIcon: true,
    icon: 'ProductServiceBrowseIcon',
  },
  {
    id: 4,
    title: 'Order Management',
    description: `Checkout process (shipping details, payment information), Order tracking and status updates & View order history and details `,
    showIcon: true,
    icon: 'CartPlusIcon',
  },
  {
    id: 5,
    title: 'Booking Management',
    description: `1. Checkout process (shipping details, payment information) \n2. Order tracking and status updates \n3. View booking history and details \n4. Update booking status (pending, shipped, completed, cancelled) \n5. Add notes to booking \n6. Process booking cancellations `,
  },
  {
    id: 6,
    title: 'Payment and Checkout',
    description: `Integration with payment gateways (Stripe)`,
  },
  {
    id: 7,
    title: 'Content Management',
    description: `1. Create and manage announcements and promotional content \n2. Create and manage categories for products and services `,
  },
  {
    id: 8,
    title: 'User Management',
    description: `1. View and manage user accounts \n2. Assign roles and permissions `,
  },
  {
    id: 9,
    title: 'Customer Support',
    description: `Contact us form`,
  },
  {
    id: 10,
    title: 'Notifications & Management',
    description: 'Set up and manage notifications for new orders/bookings',
  },
];

export const serviceData = {
  id: '123',
  title: 'Services',
  items: serviceItems,
  image: PlaceholderCTAImage,
};

export const CohortItems = [
  {
    id: 1,
    title: 'Tach Color Shop',
    subTitle: 'New Colors announced',
    buttonName: 'View Demo',
    buttonLink: '/tach-color-shop',
    image: PlaceholderCTAImage,
    links: [
      {
        id: 1,
        name: 'Glowing Sapphire',
        path: '/tach-color-shop',
      },
      {
        id: 2,
        name: 'Blazing Amber',
        path: '/tach-color-shop',
      },
    ],
  },
];

export const FormLinksItems = [
  {
    id: 1,
    primaryTitle: 'Checkout Tira Demos',
    secondaryTitle: '',
    links: [
      {
        id: 1,
        name: 'Demo Link 1',
        path: '/tach-color-shop',
      },
      {
        id: 2,
        name: 'Demo Link 2',
        path: '/tach-color-shop',
      },
      {
        id: 3,
        name: 'Demo Link 3',
        path: '/tach-color-shop',
      },
    ],
  },
];
