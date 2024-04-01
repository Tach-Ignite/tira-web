'use client';

import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Label, Card, FlowBiteSelect } from '@src/flowbite';
import { useGetAllRoles, useUpdateUser } from '@queries';
import { ApiKeysEnum } from '@queries/apiKeys';
import { UserType } from '@services';
import { useAuthContext } from '@context/AuthContext';
import { EditUserFormProps } from './types';
import { BreadcrumbWithActions } from '../breadcrumbWithActions';
import { LabelInput } from '../../atoms/Input';
import { DatePicker } from '../../atoms/Datepicker';
import { emailPattern } from '../../lib/constants/validation';

function EditUserForm(props: EditUserFormProps) {
  const { form, onDiscard } = props || {};

  const { setAuthenticatedUser, authenticatedUser } = useAuthContext();

  const { userId: currentUserId } = authenticatedUser || {};

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { isDirty },
  } = form || {};

  const userRoleId = watch('roleId');
  const userId = watch('userId');

  const router = useRouter();

  const { mutateAsync: updateUserAsync } = useUpdateUser({
    successMessage: 'Changes have been saved!',
    failureMessage: true,
    invalidateQueries: [[ApiKeysEnum.GetUser, userId]],
    onSuccessCallback: () => router.push('/admin/users'),
  });

  const { data: roles } = useGetAllRoles();

  const onSaveChanges = useCallback(
    async (data: UserType) => {
      const { email, name, userId, roleId } = data || {};

      const updatedUser = await updateUserAsync({
        email,
        userId,
        name,
        roleId,
      });

      const isCurrentUser = updatedUser?.data?.userId === currentUserId;
      isCurrentUser && setAuthenticatedUser?.(updatedUser?.data);
    },
    [currentUserId, updateUserAsync, setAuthenticatedUser],
  );

  const onSelectTags = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event?.target || {};
    setValue('roleId', value, { shouldDirty: true });
  };

  return (
    <div className="w-[100%]">
      <BreadcrumbWithActions
        isEditing
        onDiscard={onDiscard}
        shouldDisabledSaveButton={!isDirty}
        onSaveChange={handleSubmit(onSaveChanges)}
      />
      <Card className="py-6 rounded-2xl mt-5">
        <div className="flex w-[100%] max-[1200px]:flex-col gap-4">
          <div className="w-[50%] max-[1200px]:w-[100%] max-[500px]:flex-col flex gap-4">
            <div className="w-[50%] max-[500px]:w-[100%]">
              <LabelInput
                name="name"
                label="Name"
                placeholder="name"
                control={control}
              />
            </div>
            <div className="w-[50%] max-[500px]:w-[100%]">
              <Label>User Role</Label>
              <FlowBiteSelect
                theme={{
                  field: {
                    select: {
                      sizes: {
                        sm: 'p-2 sm:text-xs',
                      },
                      withShadow: { on: 'shadow-sm' },
                      colors: {
                        gray: 'border-gray-300 bg-gray-50 text-gray-500 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500',
                      },
                    },
                  },
                }}
                onChange={onSelectTags}
                sizing="sm"
              >
                {roles?.length === 0 ? (
                  <option className="p-2">Select Role</option>
                ) : null}
                {roles?.map(({ name, id }) => (
                  <option
                    key={name}
                    label={name}
                    value={id}
                    selected={userRoleId === id}
                  >
                    {name}
                  </option>
                ))}
              </FlowBiteSelect>
            </div>
          </div>
          <div className="w-[50%] max-[1200px]:w-[100%] max-[500px]:flex-col flex gap-4">
            <div className="w-[50%] max-[500px]:w-[100%]">
              <LabelInput
                name="email"
                label="Email"
                rules={{
                  pattern: emailPattern,
                }}
                placeholder="Email Address"
                control={control}
                isRequired
                errorMessage="Entered value does not match email format"
              />
            </div>
            <div className="w-[50%] max-[500px]:w-[100%]">
              <DatePicker
                control={control}
                label="Email Verified"
                name="createdAt"
                disabled
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default EditUserForm;
