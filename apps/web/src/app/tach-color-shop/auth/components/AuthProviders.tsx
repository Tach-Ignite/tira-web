/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/require-default-props */

'use client';

import { useRouter } from 'next/navigation';

import {
  GithubIcon,
  GoogleIcon,
  LinkedInIcon,
  MicrosoftIcon,
} from '@src/icons';

const providers = [
  {
    icon: GithubIcon,
    name: 'Github',
    label: 'GitHub',
    authURL: '/auth/github',
  },
  { icon: GoogleIcon, name: 'Google', authURL: '/auth/google' },
  { icon: LinkedInIcon, name: 'LinkedIn', authURL: '/auth/linkedin' },
  { icon: MicrosoftIcon, name: 'Microsoft', authURL: '/auth/microsoft' },
];

const filteredEnvClientVariables = [
  { name: 'Github', variable: process.env.GIT_OAUTH_CLIENT_ID },
  { name: 'Google', variable: process.env.GOOGLE_CLIENT_ID },
  { name: 'LinkedIn', variable: process.env.LINKEDIN_CLIENT_ID },
  { name: 'Microsoft', variable: process.env.AZURE_CLIENT_ID },
]
  ?.filter(({ variable }) => Boolean(variable))
  ?.map(({ name }) => name);

const filteredProviders = providers?.filter(({ name }) =>
  filteredEnvClientVariables?.includes(name),
);

function AuthProviders({ isLoginPage }: { isLoginPage?: boolean }) {
  const providerLabel = isLoginPage ? 'Login' : 'Sign Up';
  const router = useRouter();
  const onHandleProvider = async (authURL: string = '') => {
    router.push(`${process.env.API_URL}${authURL}`);
  };

  return filteredProviders?.length ? (
    <div className={`space-y-4 mb-10 ${isLoginPage ? 'md:!mt-3 mt-0' : ''}`}>
      {filteredProviders?.map(({ icon: Icon, name, label, authURL }) => (
        <div
          key={name}
          onClick={() => onHandleProvider(authURL)}
          className="flex rounded-lg cursor-pointer border-2 justify-center items-center p-2 border-gray-200 md:!gap-10 !gap-5 dark:border-gray-500"
        >
          <Icon className="text-gray-600 dark:text-gray-400" />
          <div className="text-base	font-medium text-gray-800 dark:text-gray-400 text-center">{`${providerLabel} with ${label || name}`}</div>
        </div>
      ))}
    </div>
  ) : null;
}

export default AuthProviders;
