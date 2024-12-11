import type { Config } from 'tailwindcss';

const flowBitePlugin = require('flowbite-react/tailwind');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    flowBitePlugin.content({ base: './' }),
  ],
  // darkMode: 'class',
  theme: {
    screens: {
      xs: '350px',
      sm: '500px',
      tab: '655px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    colors: {
      primary: {
        light: 'var(--color-primary-light)',
        DEFAULT: 'var(--color-primary)',
        dark: 'var(--color-primary-dark)',
      },
      secondary: {
        light: 'var(--color-secondary-light)',
        DEFAULT: 'var(--color-secondary)',
        dark: 'var(--color-secondary-dark)',
      },
      neutral: {
        light: 'var(--color-neutral-light)',
        DEFAULT: 'var(--color-neutral)',
        '800': 'var(--color-neutral-800)',
        dark: 'var(--color-neutral-dark)',
      },
      danger: {
        light: 'var(--color-danger-light)',
        DEFAULT: 'var(--color-danger)',
        dark: 'var(--color-danger-dark)',
      },
      warning: {
        light: 'var(--color-warning-light)',
        DEFAULT: 'var(--color-warning)',
        dark: 'var(--color-warning-dark)',
      },
      info: {
        light: 'var(--color-info-light)',
        DEFAULT: 'var(--color-info)',
        dark: 'var(--color-info-dark)',
      },
      success: {
        light: 'var(--color-success-light)',
        DEFAULT: 'var(--color-success)',
      },
      indigo: {
        DEFAULT: 'var(--color-indigo)',
        dark: 'var(--color-indigo-dark)',
      },
      white: {
        DEFAULT: 'var(--color-white)',
        dark: 'var(--color-white-dark)',
      },
      black: {
        DEFAULT: 'var(--color-black)',
        dark: 'var(--color-black-dark)',
      },
      action: {
        DEFAULT: 'var(--color-action)',
        dark: 'var(--color-action-dark)',
      },
      surface: {
        DEFAULT: 'var(--color-surface)',
        dark: 'var(--color-surface-dark)',
      },
      borderPrimary: {
        DEFAULT: 'var(--color-borderPrimary)',
        dark: 'var(--color-borderPrimary-dark)',
      },
      textBody: {
        DEFAULT: 'var(--color-textBody)',
        dark: 'var(--color-textBody-dark)',
      },
      disabledText: {
        DEFAULT: 'var(--color-textDisabled)',
        dark: 'var(--color-textDisabled-dark)',
      },
      textLink: {
        DEFAULT: 'var(--color-textLink)',
        dark: 'var(--color-textLink-dark)',
      },
      surfaceDisabled: {
        DEFAULT: 'var(--color-surfaceDisabled)',
        dark: 'var(--color-surfaceDisabled-dark)',
      },
      disabledBorder: {
        DEFAULT: 'var(--color-disabledBorder)',
        dark: 'var(--color-disabledBorder-dark)',
      },
      disabledBtnText: {
        DEFAULT: 'var(--color-disabledBtnText)',
        dark: 'var(--color-disabledBtnText-dark)',
      },
      inputPlaceholderText: {
        DEFAULT: 'var(--color-inputPlaceholderText)',
        dark: 'var(--color-inputPlaceholderText-dark)',
      },
    },
    extend: {
      keyframes: {
        bounceSequential: {
          '0%, 100%': { transform: 'translateY(0)' },
          '33%': { transform: 'translateY(-5px)' },
          '66%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        bounceFirst: 'bounceSequential 1.5s infinite',
        bounceSecond: 'bounceSequential 1.5s infinite 0.5s',
        bounceThird: 'bounceSequential 1.5s infinite 1s',
      },
      opacity: {
        '16': '.16',
      },
      minHeight: {
        'calc-content': 'calc(100vh - 68px)',
        'auth-calc-content': 'calc(100vh - 352px)',
        'comp-calc-content': 'calc(100vh - 127px)',
      },
      backgroundOpacity: {
        '65': '0.65',
      },
      boxShadow: {
        sm: '0px 1px 2px 0px #00000014',
        l: '0px 4px 4px 0px #00000040',
        xl: '0px 1px 40px -1px #8080800A, 0px 1px 40px 0px #8080800A',
        '2xl': '0px 1px 2px -1px #0000001A, 0px 1px 3px 0px #0000001A',
        '3xl': '0px 2px 4px -2px #0000000D, 0px 4px 6px -1px #0000001A',
        'input-dark-shadow': '0 0 0 1000px #374151 inset !important',
      },
      spacing: {
        '20p': '20%',
        '40p': '40%',
      },
      // colors: {
      //   primary: {
      //     100: '#E1EFFE',
      //     200: '#C3DDFD',
      //     700: '#1A56DB',
      //     800: '#1E429F',
      //   },
      //   indigo: {
      //     50: '#F0F5FF',
      //     200: '#CDDBFE',
      //     300: '#B4C6FC',
      //     500: '#6875F5',
      //     600: '#5850EC',
      //     700: '#5145CD',
      //   },
      //   blue: {
      //     50: '#EBF5FF',
      //     300: '#A4CAFE',
      //     400: '#76A9FA',
      //     700: '#1A56DB',
      //   },
      //   gray: {
      //     50: '#F9FAFB',
      //     100: '#F3F4F6',
      //     200: '#E5E7EB',
      //     300: '#D1D5DB',
      //     400: '#9CA3AF',
      //     500: '#6B7280',
      //     600: '#4B5563',
      //     700: '#374151',
      //     800: '#1F2A37',
      //     900: '#111928',
      //   },
      //   red: {
      //     100: '#FDE8E8',
      //     400: '#F98080',
      //     500: '#F05252',
      //     600: '#E02424',
      //     800: '#9B1C1C',
      //   },
      //   yellow: {
      //     100: '#FDF6B2',
      //     200: '#FCE96A',
      //     300: '#FACA15',
      //     400: '#E3A008',
      //     800: '#723B13',
      //   },
      //   orange: {
      //     200: '#FCD9BD',
      //     400: '#FF8A4C',
      //     600: '#D03801',
      //     700: '#B43403',
      //   },
      //   purple: {
      //     100: '#EDEBFE',
      //     200: '#DCD7FE',
      //     300: '#CABFFD',
      //     400: '#AC94FA',
      //     700: '#6C2BD9',
      //     900: '#4A1D96',
      //   },
      //   pink20: '#F9F6FF',
      //   dark10: '#434242A6',
      //   aqua: '#02E6FF',
      //   indigo20: '#65558F',
      //   gray70: '#D1D1D6',
      //   azure: '#0a0a1e',
      //   dark90: '#121212',
      //   secondary: '#888',
      // },
    },
  },
  plugins: [
    flowBitePlugin.plugin(),
    // function ({ addBase, theme }: any) {
    //   addBase({
    //     // Override default colors globally
    //     '*': {
    //       color: theme('colors.white', '#ffffff'), // Default all unspecified colors to black
    //       backgroundColor: theme('colors.white', '#ffffff'),
    //     },
    //   });
    // },
  ],
};
export default config;
