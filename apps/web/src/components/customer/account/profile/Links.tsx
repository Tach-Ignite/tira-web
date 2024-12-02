'use client';

import { LabelInput as Input } from '@src/atoms';
import { urlPattern } from '@src/lib/constants/validation';
import { usePathname } from 'next/navigation';
import { UseFormReturn } from 'react-hook-form';

function Links({ form }: { form: UseFormReturn }) {
  const { control } = form;

  const pathName = usePathname();

  const isAdminConsolePage = pathName?.includes('admin-console');

  return (
    <div className="flex flex-col gap-10 xl:!w-[75%] w-[100%]">
      <Input
        control={control}
        name="linkedInURL"
        label="LinkedIn profile URL"
        placeholder="https://www.linkedin.com/..."
        rules={{
          pattern: urlPattern,
        }}
        errorMessage="Please enter a valid URL."
        isRequired={!isAdminConsolePage}
      />
      <Input
        control={control}
        name="websiteURL"
        label="Website URL"
        placeholder="https://www..."
        rules={{
          pattern: urlPattern,
        }}
        errorMessage="Please enter a valid URL."
      />
      <Input
        control={control}
        name="githubURL"
        label="Github URL"
        placeholder="https://www..."
        rules={{
          pattern: urlPattern,
        }}
        errorMessage="Please enter a valid URL."
      />
      <Input
        control={control}
        name="mediumURL"
        label="Medium URL"
        placeholder="https://www..."
        rules={{
          pattern: urlPattern,
        }}
        errorMessage="Please enter a valid URL."
      />
      <Input
        control={control}
        name="stackOverflowURL"
        label="Stack Overflow URL"
        placeholder="https://www..."
        rules={{
          pattern: urlPattern,
        }}
        errorMessage="Please enter a valid URL."
      />
      <Input
        control={control}
        name="calendarLink"
        label="Calendar link"
        placeholder="https://www..."
        rules={{
          pattern: urlPattern,
        }}
        errorMessage="Please enter a valid URL."
      />
    </div>
  );
}

export default Links;
