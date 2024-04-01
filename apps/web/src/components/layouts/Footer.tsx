import React from 'react';
import {
  LinkedInIcon,
  GithubIcon,
  TwitterIcon,
  InstagramIcon,
} from '@src/icons';
import Link from 'next/link';
import { TachLogo } from './common';

const resources = [
  { name: 'Site Link 1', url: '' },
  { name: 'Site Link 2', url: '' },
];

const legals = [
  { name: 'Privacy Policy', url: '/privacy-policy' },
  { name: 'Terms and Conditions', url: '/terms-and-conditions' },
];

const socialMedias = [
  { name: 'LinkedIn', Icon: LinkedInIcon },
  { name: 'Github', Icon: GithubIcon },
  { name: 'Twitter', Icon: TwitterIcon },
  { name: 'Instagram', Icon: InstagramIcon },
];

interface FooterLinksProps {
  title: string;
  links: { name: string; url: string }[];
}

function FooterLinks(props: FooterLinksProps) {
  const { title, links } = props;
  return (
    <div className="flex flex-col gap-2">
      <div className="text-black font-semibold text-sm dark:text-white">
        {title}
      </div>
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

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-white dark:bg-gray-800 px-8 py-4 border border-x-0	border-b-0 border-gray-200 dark:border-gray-800 w-full inline-block">
      <div className="flex w-[100%] mb-8 flex-wrap">
        <div className="lg:w-[70%] md:w-[65%] sm:w-[50%] xs:w-[100%]">
          <TachLogo className="flex" />
        </div>
        <div className="flex w-[100%] justify-between lg:w-[30%] md:w-[35%] sm:w-[50%] max-sm:mt-4 flex-wrap">
          <FooterLinks title="Resources" links={resources} />
          <FooterLinks title="Legal" links={legals} />
        </div>
      </div>
      <div className="h-px width-[100%] bg-gray-400" />
      <div className="flex justify-between  mt-4 text-gray-500 dark:text-gray-300 flex-wrap">
        <div className="text-xs font-medium">@ {currentYear} Copyright</div>
        <div className="flex gap-4 flex-wrap">
          {socialMedias?.map(({ Icon, name }) => (
            <Icon key={name} className="h-6 w-6 cursor-pointer" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
