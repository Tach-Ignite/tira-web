'use client';

import { BreadcrumbWithActions } from '@components/breadcrumbWithActions';
import { useChangePassword } from '@queries';
import { ChangePasswordPayloadType } from '@services';
import { PasswordLabelInput } from '@src/atoms';
import { passwordComplexityPattern } from '@src/lib/constants/validation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function SecurityPage() {
  const { control, handleSubmit, watch, reset, clearErrors, setError } =
    useForm<ChangePasswordPayloadType>({
      mode: 'onChange',
    });

  const [showCurrentPassword, setShowCurrentPassword] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(true);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(true);

  const { currentPassword, newPassword, confirmNewPassword } = watch();

  const { mutateAsync: changePassword } = useChangePassword({
    successMessage: 'Your password has been successfully changed.',
    failureMessage: true,
  });

  const resetForm = () => {
    reset({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
  };

  const onSaveChanges = async (data: ChangePasswordPayloadType) => {
    const dd = await changePassword(data);
    if (!dd?.error) {
      resetForm();
    }
  };

  const shouldDisableSaveButton =
    !currentPassword || !newPassword || !confirmNewPassword;

  return (
    <div className="flex flex-col gap-5 w-full mt-2">
      <BreadcrumbWithActions
        onDiscard={resetForm}
        shouldDisabledDiscardButton={shouldDisableSaveButton}
        shouldDisabledSaveButton={shouldDisableSaveButton}
        onSaveChange={handleSubmit(onSaveChanges)}
        isEditing
        showBreadcrumb={false}
      />
      <div className="bg-white dark:bg-gray-800 rounded-2xl px-6 py-8 shadow-xl">
        <div className="font-semibold pb-5 text-sm leading-[!21px] text-black dark:text-gray-200 border-b border-gray-200">
          Change Password
        </div>
        <div className="flex pt-10 m-auto flex-col gap-8 w-max xl:w-[25%]">
          <PasswordLabelInput
            showPassword={showCurrentPassword}
            setShowPassword={setShowCurrentPassword}
            control={control}
            name="currentPassword"
            label="Current Password"
            rules={{
              validate: (
                value: string,
                formValues: ChangePasswordPayloadType,
              ) => {
                const { newPassword } = formValues || {};

                if (value !== newPassword) {
                  clearErrors('newPassword');
                } else if (value === newPassword) {
                  setError('newPassword', {
                    message:
                      'New password must be different from the current one.',
                    type: 'validate',
                  });
                }
                return true;
              },
            }}
          />
          <PasswordLabelInput
            showPassword={showNewPassword}
            setShowPassword={setShowNewPassword}
            control={control}
            name="newPassword"
            label="New Password"
            rules={{
              validate: (
                value: string,
                formValues: ChangePasswordPayloadType,
              ) => {
                const { currentPassword, confirmNewPassword } =
                  formValues || {};
                if (currentPassword === value) {
                  return 'New password must be different from the current one.';
                }
                if (value === confirmNewPassword) {
                  clearErrors('confirmNewPassword');
                }
                if (confirmNewPassword && value !== confirmNewPassword) {
                  setError('confirmNewPassword', {
                    message:
                      'Confirm New Password should match the above password',
                    type: 'validate',
                  });
                }
                return (
                  passwordComplexityPattern.test(value) ||
                  'Password should contain atleast 8 characters, one number and one special character'
                );
              },
            }}
          />
          <PasswordLabelInput
            showPassword={showConfirmNewPassword}
            setShowPassword={setShowConfirmNewPassword}
            control={control}
            name="confirmNewPassword"
            label="Confirm New Password"
            rules={{
              validate: (
                value: string,
                formValues: ChangePasswordPayloadType,
              ) => {
                const { newPassword } = formValues || {};
                if (newPassword !== value) {
                  return 'Confirm New Password should match the above password';
                }
                return true;
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SecurityPage;
