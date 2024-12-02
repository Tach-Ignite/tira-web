/* eslint-disable react/require-default-props */

'use client';

import { UseFormReturn } from 'react-hook-form';

function ProfileSettings({ form }: { form: UseFormReturn }) {
  const { control } = form;

  return (
    <div className="flex flex-col gap-10 xl:!w-[75%] w-[100%]">
      <p>Coming Soon!</p>
    </div>
  );
}

export default ProfileSettings;
