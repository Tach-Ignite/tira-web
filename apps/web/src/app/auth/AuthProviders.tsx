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
    label: 'Git Hub',
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
    <>
      <div className="flex items-center mt-14 mb-8">
        <div className="flex-1 h-px bg-gray-300" />
        <div className="mx-1 text-sm text-gray-500 dark:text-gray-50">OR</div>
        <div className="flex-1 h-px bg-gray-300" />
      </div>
      <div className="flex flex-col gap-2 mb-10">
        {filteredProviders?.map(({ icon: Icon, name, label, authURL }) => (
          <div
            key={name}
            onClick={() => onHandleProvider(authURL)}
            className="flex rounded-lg cursor-pointer border-2 justify-center items-center p-2 border-gray-200 gap-2 dark:border-gray-500"
          >
            <Icon className="text-gray-600 dark:text-gray-400" />
            <div className="text-base	font-medium text-gray-800 dark:text-gray-400">{`${providerLabel} with ${label || name}`}</div>
          </div>
        ))}
      </div>
    </>
  ) : null;
}

export default AuthProviders;
