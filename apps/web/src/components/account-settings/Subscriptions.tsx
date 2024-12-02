'use client';

import { UseFormReturn } from 'react-hook-form';

function Subscriptions({ form }: { form: UseFormReturn }) {
  const { control } = form;

  return (
    <div className="flex flex-col gap-8 xl:!w-[60%] w-[100%] relative">
      <p>Coming Soon!</p>
    </div>
  );
}

export default Subscriptions;
