'use client';

import { FlowBiteButton, FlowBiteButtonProps } from '@src/flowbite';

interface ButtonProps extends FlowBiteButtonProps {}

function Button(props: ButtonProps) {
  const { children, theme, ...rest } = props;

  const defaultTheme = {
    color: {
      gray: 'ring-cyan-700 border border-gray-200 bg-white text-gray-500 focus:text-cyan-700 focus:ring-4 enabled:hover:bg-gray-100 enabled:hover:text-cyan-700 dark:border-gray-600 dark:bg-transparent dark:text-gray-400 dark:enabled:hover:bg-gray-700 dark:enabled:hover:text-white',
      info: 'border border-transparent bg-indigo-700 text-white focus:ring-4 focus:ring-indigo-300 enabled:hover:bg-indigo-800 dark:bg-yellow-400 dark:text-gray-700 dark:focus:ring-yellow-400 dark:enabled:hover:bg-yellow-400',
      failure:
        'border border-transparent bg-red-600 text-red-600 focus:ring-4 focus:ring-0 dark:bg-red-400 dark:focus:ring-0',
    },
    outline: {
      color: {
        gray: 'border border-gray-500 text-gray-500 dark:border-gray-400 dark:text-gray-400',
      },
      on: 'flex w-full justify-center bg-white text-gray-500 transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-gray-400',
    },
    gradientDuoTone: {
      purpleToBlue:
        'bg-gradient-to-r from-purple-600 to-blue-500 text-white focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-gradient-to-bl dark:from-yellow-400 dark:to-red-400 dark:text-black dark:focus:ring-cyan-800',
    },
  };

  return (
    <FlowBiteButton
      {...rest}
      theme={{
        ...defaultTheme,
        ...theme,
      }}
    >
      {children}
    </FlowBiteButton>
  );
}

export default Button;
