'use client';

import { Button } from '@src/atoms';
import { Spinner } from '@src/flowbite';
import { AuthSubmitButtonProps } from './types';

function AuthSubmitButton(props: AuthSubmitButtonProps) {
  const { label, onSubmit, isPending } = props;

  return (
    <Button
      fullSized
      disabled={isPending}
      className="hover:!opacity-80"
      theme={{
        base: 'px-4 py-2',
        inner: {
          base: 'flex justify-center',
        },
        size: { md: 'text-base leading-6 font-bold' },
      }}
      onClick={onSubmit}
    >
      {isPending ? (
        <Spinner
          size="md"
          color="info"
          theme={{ color: { info: 'fill-indigo-700 dark:fill-yellow-400' } }}
        />
      ) : (
        label
      )}
    </Button>
  );
}

export default AuthSubmitButton;
