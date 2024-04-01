/* eslint-disable react/require-default-props */

'use client';

import { Spinner } from '@src/flowbite';
import { Button } from '@src/atoms';

interface AuthSubmitButtonProps {
  label: string;
  isPending?: boolean;
  onSubmit: () => void;
}
function AuthSubmitButton({
  label = 'Submit',
  onSubmit,
  isPending = false,
}: AuthSubmitButtonProps) {
  return (
    <Button
      fullSized
      disabled={isPending}
      className="dark:bg-yellow-400 hover:!bg-indigo-700 dark:hover:!bg-yellow-400"
      theme={{
        base: 'p-4',
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
