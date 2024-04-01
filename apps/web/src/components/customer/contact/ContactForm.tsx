'use client';

import useRecaptcha from '@hooks/useCaptcha';
import { useCreateInquiry } from '@queries';
import { InquiryEntity } from '@services';
import { Checkbox, Button } from '@src/atoms';
import { LabelInput, Textarea } from '@src/atoms/Input';
import { emailPattern, namePattern } from '@src/lib/constants/validation';
import { formatPhoneNumber } from '@src/lib/numbers';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

const defaultValues = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  reason: '',
  isPolicyAccepted: false,
};

function ContactForm() {
  const { handleSubmit, control, reset, watch, setValue } =
    useForm<InquiryEntity>({
      mode: 'all',
      defaultValues,
    });

  const { reason, isPolicyAccepted = false } = watch();

  const { getCaptchaToken } = useRecaptcha();

  const { mutateAsync: addInquiryAsync } = useCreateInquiry({
    successMessage: 'Your request has been submitted successfully.',
    failureMessage: 'Failed to submit the request',
  });

  const onSendMessage = async (data: InquiryEntity) => {
    const token = await getCaptchaToken('inquiryFormSubmit');
    await addInquiryAsync({ ...data, captchaToken: token });
    reset(defaultValues);
  };

  const onPhoneInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setValue('phone', formatPhoneNumber(input), { shouldDirty: true });
  };

  return (
    <div className="border border-gray-300 dark:border-none m-auto w-fit p-6 rounded-lg dark:bg-gray-800">
      <p className="text-black dark:text-white font-bold text-xl leading-[30px] mb-8">
        Contact Us
      </p>
      <div className="flex flex-col gap-y-5">
        <div className="flex gap-24 max-[500px]:gap-6 max-[350px]:flex-col">
          <LabelInput
            name="firstName"
            label="First Name"
            placeholder="Input text"
            control={control}
            isRequired
            rules={{
              pattern: namePattern,
            }}
            errorMessage="Invalid name"
          />
          <LabelInput
            name="lastName"
            label="Last Name"
            placeholder="Input text"
            control={control}
            isRequired
            rules={{
              pattern: namePattern,
            }}
            errorMessage="Invalid name"
          />
        </div>
        <div className="flex gap-24 max-[500px]:gap-6 max-[350px]:flex-col">
          <LabelInput
            name="email"
            label="Email"
            type="email"
            placeholder="Input text"
            control={control}
            isRequired
            rules={{
              pattern: emailPattern,
            }}
            errorMessage="Entered value does not match email format"
          />
          <LabelInput
            name="phone"
            label="Phone"
            type="tel"
            placeholder="Input text"
            control={control}
            isRequired
            maxLength={14}
            onChange={onPhoneInput}
          />
        </div>
        <div className="flex gap-24 mt-3 max-[500px]:gap-6">
          <Textarea
            control={control}
            name="reason"
            isRequired
            label="Tell us something"
            placeholder="Write text here ..."
            helperText={`${reason?.length || 0}/500 Characters`}
            rows={8}
          />
        </div>
        <Checkbox
          control={control}
          name="isPolicyAccepted"
          isChecked={isPolicyAccepted}
          label={
            <>
              I agree to the{' '}
              <Link
                target="_blank"
                className="underline text-indigo-600 dark:text-yellow-400"
                href="/privacy-policy"
              >
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link
                target="_blank"
                className="underline text-indigo-600 dark:text-yellow-400"
                href="/terms-and-conditions"
              >
                Terms of Services
              </Link>
            </>
          }
        />
        <div className="place-self-center">
          <Button
            color="gray"
            disabled={!isPolicyAccepted}
            onClick={handleSubmit(onSendMessage)}
            theme={{
              size: { md: 'px-10 py-2 text-sm' },
              color: {
                gray: `bg-indigo-600 text-white dark:bg-gradient-to-r dark:from-yellow-400 dark:to-red-400 dark:text-black`,
              },
            }}
          >
            Send message
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
