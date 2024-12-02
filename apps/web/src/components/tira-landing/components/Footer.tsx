/* eslint-disable react/require-default-props */

import React from 'react';
import { LinkedInIcon, GithubIcon, CopyrightIcon } from '@src/icons';
import Link from 'next/link';
import Image from 'next/image';

import { FlowBiteToggleSwitch, useThemeMode } from '@src/flowbite';
import { currentYear } from '@src/lib/date';
import { useAuthContext } from '@context/AuthContext';
import { TachLogo } from '@components/layouts/common';
import { UnAuthenticatedRoutes } from '@src/routes';
import { usePathname } from 'next/navigation';
import TachIgniteLogo from '../../../../public/assets/tach-ignite-logo.svg';

const links = [
  {
    name: 'Terms and Conditions',
    url: UnAuthenticatedRoutes.TermsAndConditions,
  },
  { name: 'Privacy Policy', url: UnAuthenticatedRoutes.PrivacyPolicy },
];

const company = [
  { name: 'About Tach Ignite', url: 'https://www.tachignite.com/about' },
  { name: 'TIRA', url: '' },
  { name: 'Contact us', url: 'https://www.tachignite.com/contact' },
  { name: 'Privacy Policy', url: '/privacy-policy' },
  { name: 'Terms and Conditions', url: '/terms-and-conditions' },
];

const frameworks = [
  { name: 'Next.js', url: 'https://nextjs.org/' },
  { name: 'Typescript', url: 'https://www.typescriptlang.org/' },
  { name: 'Tailwind CSS', url: 'https://tailwindcss.com/' },
  { name: 'React', url: 'https://react.dev/' },
];

const design = [
  { name: 'Tailwind CSS', url: 'https://tailwindcss.com/' },
  { name: 'Flowbite', url: 'https://flowbite-react.com/' },
  { name: 'Tailwind UI', url: 'https://tailwindui.com/' },
  { name: 'Headless UI', url: 'https://react.dev/' },
];

const socialMedias = [
  {
    name: 'Github',
    Icon: GithubIcon,
    url: 'https://github.com/Tach-Ignite/tira-web',
  },
  {
    name: 'LinkedIn',
    Icon: LinkedInIcon,
    url: 'https://www.linkedin.com/company/tach-ignite/',
  },
];

interface FooterLinksProps {
  title: string;
  links: { name: string; url: string }[];
}

function FooterLinks(props: FooterLinksProps) {
  const { title, links } = props;
  return (
    <div className="flex flex-col gap-2">
      <div className="text-neutral text-sm dark:text-white">{title}</div>
      {links?.map(({ name, url }) => (
        <Link
          href={url}
          key={name}
          className="text-black font-normal text-sm dark:text-white"
        >
          {name}
        </Link>
      ))}
    </div>
  );
}

function AuthenticatedFooterContent() {
  const { toggleMode } = useThemeMode();

  const { isAuthenticated } = useAuthContext();

  const currentTheme =
    typeof window !== 'undefined' &&
    window.localStorage.getItem('flowbite-theme-mode');

  const isToggled = currentTheme === 'dark';

  return (
    <div>
      <div className="flex flex-wrap gap-y-10 gap-x-5 sm:!justify-around !justify-start md:!items-center !items-start text-neutral dark:text-white">
        <div className="flex gap-5 flex-wrap md:!justify-center items-center">
          <TachLogo showLogoName={false} />
          <div className="flex gap-2 items-center">
            <CopyrightIcon />
            <p className="text-center">{currentYear} Tach Ignite, Inc.</p>
          </div>
        </div>
        <div className="flex md:!flex-row !flex-col gap-x-8 gap-y-4">
          {links?.map(({ name, url }) => (
            <Link key={url} href={url}>
              {name}
            </Link>
          ))}
        </div>
        <FlowBiteToggleSwitch
          className="tab:!block !hidden"
          theme={{
            toggle: {
              checked: {
                color: { blue: 'bg-primary dark:bg-warning' },
                off: 'border-neutral-light bg-neutral dark:border-neutral dark:bg-neutral-800',
              },
              sizes: {
                md: 'h-6 w-11 after:absolute after:left-[2px] after:top-px after:h-5 after:w-5',
              },
            },
          }}
          checked={isToggled}
          onChange={toggleMode}
        />
      </div>
      <div className="!flex justify-end relative pt-5 pb-0 tab:!hidden">
        <FlowBiteToggleSwitch
          theme={{
            toggle: {
              checked: {
                color: { blue: 'bg-primary dark:bg-warning' },
                off: 'border-neutral-light bg-neutral dark:border-neutral dark:bg-neutral-800',
              },
              sizes: {
                md: 'h-6 w-11 after:absolute after:left-[2px] after:top-px after:h-5 after:w-5',
              },
            },
          }}
          checked={isToggled}
          onChange={toggleMode}
        />
      </div>
    </div>
  );
}

function Footer({ isHomePage = false }: { isHomePage?: boolean }) {
  const { isAuthenticated } = useAuthContext();

  const pathname = usePathname();

  const showCompactFooter =
    isAuthenticated &&
    !pathname.includes('auth') &&
    pathname !== UnAuthenticatedRoutes.Root &&
    pathname !== UnAuthenticatedRoutes.TachColorShop;

  return (
    <div
      className={`bg-white dark:bg-neutral-800 sm:!px-8 !px-4 !py-4 ${showCompactFooter ? '' : '!pb-0'} border border-x-0	border-b-0 border-neutral-light/10 dark:border-neutral-800 w-full inline-block`}
    >
      {showCompactFooter ? null : (
        <div className="flex w-[100%] mb-8 flex-wrap justify-between gap-3 !gap-y-5">
          <div>
            <Link href="/" className="flex">
              <Image
                alt="Tach-Ignite-Logo"
                width="0"
                height="0"
                src={TachIgniteLogo}
              />
              <span className="font-semibold text-2xl leading-9 ml-3 dark:text-white  max-[760px]:hidden max-[655px]:block max-[350px]:hidden">
                {isHomePage ? 'TIRA' : 'Tach Color Shop'}
              </span>
            </Link>
            {/* <div className="px-2 py-4 text-xs font-medium text-neutral-light dark:text-white/70">
              @ Copyright {currentYear} TIRA. All rights
              <br />
              reserved.
            </div> */}
          </div>
          <FooterLinks title="Company" links={company} />
          <FooterLinks title="Frameworks" links={frameworks} />
          <FooterLinks title="Design" links={design} />
          <div className="flex flex-col gap-2">
            <div className="text-neutral text-sm dark:text-white">
              Follow us
            </div>
            <div className="flex gap-4 flex-wrap">
              {socialMedias?.map(({ Icon, name, url = '' }) => (
                <Link
                  href={url}
                  target="_blank"
                  key={name}
                  className="text-black font-normal text-sm dark:text-white"
                >
                  <Icon key={name} className="h-6 w-6 cursor-pointer" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      <div
        className={`!text-sm w-full ${showCompactFooter ? '' : 'sm:!px-8 !px-0 py-6 border-t border-neutral-light/10'}`}
      >
        <AuthenticatedFooterContent />
      </div>
    </div>
  );
}

export default Footer;
