/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-css-tags */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CookieModal } from '@src/modals';
import { ThemeModeScript } from '@src/flowbite';
import Script from 'next/script';
import { Footer } from '../components/layouts';
import authenticated from '../services/authenticated';
import Providers from './Providers';
import GoogleAnalytics from './GoogleAnalytics';
import DarkGreenGraph from '../../public/assets/db-dark-green-graph.webp';
import DarkRedGraph from '../../public/assets/db-dark-red-graph.webp';
import RedGraph from '../../public/assets/db-red-graph.webp';
import GreenGraph from '../../public/assets/db-green-graph.webp';
import DarkBgImage from '../../public/assets/dark-bg-image.png';
import LightBgImage from '../../public/assets/light-bg-image.png';
import DemoDarkLandingImage from '../../public/assets/demo-dark-landing-img.webp';
import DemoLightLandingImage from '../../public/assets/demo-light-landing-img.webp';
import HomeDarkLandingImage from '../../public/assets/home-dark-landing-img.png';
import HomeLightLandingImage from '../../public/assets/home-light-landing-img.png';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TachIgnite',
  description: 'TARA WEB App',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const className = `h-screen ${inter?.className}`;
  const isAuthenticated = await authenticated();

  const setInitialThemeScript = `
    (function() {
      // Function to get the initial theme
      function getInitialTheme() {
        const savedTheme = window.localStorage.getItem('flowbite-theme-mode');
        if (savedTheme && savedTheme !== 'auto') {
          return savedTheme;
        }
        // const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        // return systemPrefersDark ? 'dark' : 'light';
        return 'auto';
      }

      // Function to apply the theme
      function applyTheme(theme) {
        window.localStorage.setItem('flowbite-theme-mode', theme);
      }

      // Set the initial theme
      const initialTheme = getInitialTheme();
      applyTheme(initialTheme);
    })();
  `;

  return (
    <html lang="en">
      <head>
        <link
          fetchPriority="high"
          rel="preload"
          href={DarkGreenGraph?.src}
          as="image"
          type="image/webp"
        />
        <link
          fetchPriority="high"
          rel="preload"
          href={DarkBgImage?.src}
          as="image"
          type="image/png"
        />
        <link
          rel="preload"
          fetchPriority="high"
          href={DarkRedGraph.src}
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          fetchPriority="high"
          href={GreenGraph.src}
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          fetchPriority="high"
          href={RedGraph?.src}
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          fetchPriority="high"
          href={DemoDarkLandingImage.src}
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          fetchPriority="high"
          href={DemoLightLandingImage.src}
          as="image"
          type="image/webp"
        />
        <link
          rel="preload"
          fetchPriority="high"
          href={HomeDarkLandingImage.src}
          as="image"
          type="image/png"
        />
        <link
          rel="preload"
          fetchPriority="high"
          href={HomeLightLandingImage.src}
          as="image"
          type="image/png"
        />
        <link
          rel="preload"
          fetchPriority="high"
          href={LightBgImage.src}
          as="image"
          type="image/png"
        />

        {/*
 
      
        <link rel="preconnect" href="https://media.nedigital.sg" />
        <link rel="dns-prefetch" href="https://media.nedigital.sg" />

        
        <link
          rel="preload"
          href="/path-to-font.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />


      
        <link rel="preload" href="./globals.css" as="style" /> */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css"
          rel="stylesheet"
        />
        <noscript>
          <link rel="stylesheet" href="non-critical.css" />
        </noscript>

        <Script
          type="text/javascript"
          src={process.env.CAPTCHA_SCRIPT_URL}
          defer
        />
        <Script
          id="set-initial-theme"
          dangerouslySetInnerHTML={{ __html: setInitialThemeScript }}
          strategy="beforeInteractive" // Ensure the script runs before hydration
        />
        <ThemeModeScript />
      </head>
      <GoogleAnalytics />
      <body className={`${className} flex flex-col min-h-screen`}>
        <Providers authenticated={isAuthenticated}>
          <main className="flex-1"> {children}</main>
          <Footer />
          <CookieModal />
        </Providers>
      </body>
    </html>
  );
}
