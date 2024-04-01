import React from 'react';
import { LabelInput } from '@src/atoms/Input';
import { emailPattern } from '@src/lib/constants/validation';
import { formatPhoneNumber } from '@src/lib/numbers';
import { UserTypeEnum } from '@src/types/modules/UserType';
import { useAuthContext } from '@context/AuthContext';
import { NotificationsCardProps } from './types';

function ContactInformationCard(props: NotificationsCardProps) {
  const { profileForm } = props;

  const { authenticatedUser } = useAuthContext();

  const { control, setValue } = profileForm;

  const onPhoneInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setValue('phone', formatPhoneNumber(input), { shouldDirty: true });
  };

  const { userType } = authenticatedUser || {};

  const isLocalUser = userType === UserTypeEnum.LOCAL;

  return (
    <div className="shadow-xl rounded-2xl bg-white dark:bg-gray-800">
      <div className="text-black dark:text-white font-semibold text-sm border-b px-6 pt-6 pb-2 border-gray-200 dark:border-gray-600">
        Contact Information
      </div>
      <div className="px-6 pb-6">
        <div className="grid grid-cols-3 gap-5 pt-6">
          <div className="grid-cols-subgrid min-[920px]:col-span-1 max-[920px]:col-span-3">
            <div className="text-black dark:text-white text-sm font-normal" />
          </div>
          <div className="grid-cols-subgrid min-[920px]:col-span-2 max-[920px]:col-span-3">
            <div className="flex gap-3 max-[450px]:flex-col">
              <div>
                <LabelInput
                  name="email"
                  label="Email"
                  rules={{
                    pattern: emailPattern,
                  }}
                  disabled={!isLocalUser}
                  placeholder="Email Address"
                  control={control}
                  isRequired
                  errorMessage="Entered value does not match email format"
                />
              </div>
              <div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactInformationCard;
