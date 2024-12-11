/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { FlowBiteSelect } from '@src/flowbite';
import { TeamUserRoles } from '@services/organizations/organization.type';
import { useToast } from '@context/ToastContext';
import { useUpdateTeamUserRole } from '@queries/useOrganizationsQuery';

export default function AssignOrgUserRole({
  id,
  userId,
  orgId,
  teamId,
  value,
  onSuccessCallback,
  options,
}: {
  id: string;
  userId: string;
  orgId: string;
  teamId: string;
  value: string;
  onSuccessCallback: () => void;
  options: {
    label: string;
    value: string;
  }[];
}) {
  const { showErrorToast } = useToast();
  const [selectedValue, setSelectedValue] = useState(value);
  const { mutateAsync: updateUserRoleAsync, isPending: isPendingRoleUpdate } =
    useUpdateTeamUserRole({});

  const handleRoleUpdate = async (userId: string, data: TeamUserRoles) => {
    try {
      const reqBody = {
        orgId: orgId as string,
        teamId: teamId as string,
        userId,
        data,
      };
      const result = await updateUserRoleAsync({ ...reqBody });
      if (result) {
        onSuccessCallback();
      }
    } catch (error) {
      showErrorToast({ message: 'Failed to update user role.' });
    }
  };

  const onRoleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    const selectedRole = options?.find(
      (r) => r?.value === event.target.value,
    )?.value;
    if (selectedRole) {
      const data: TeamUserRoles = {
        role: selectedRole as 'team-admin' | 'team-member',
      };
      await handleRoleUpdate(userId, data);
    }
  };
  return (
    <div className="flex flex-col gap-5 w-1/2">
      <FlowBiteSelect
        id={`role-select-${id}`}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          onRoleChange(event);
        }}
        sizing="sm"
        name={`user-role-${id}`}
        className="w-full"
        // color={textColor}
        disabled={isPendingRoleUpdate}
        theme={{
          field: {
            select: {
              sizes: {
                sm: 'p-2 sm:text-xs',
              },
              colors: {
                failure:
                  'border-none bg-red-50 text-gray-900 placeholder-gray-400 focus:border-none focus:ring-0 dark:border-solid dark:border-red-400  dark:bg-gray-700 dark:text-gray-400 dark:focus:border-red-500 dark:focus:ring-red-500',
                info: 'placeholder-text-gray-500 border-none bg-indigo-50 text-gray-900 focus:border-none focus:ring-0 dark:border-solid dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-gray-600 dark:focus:ring-0',
                gray: 'border-gray-300 bg-gray-50 text-gray-500 focus:border-gray-500 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-gray-500 dark:focus:ring-gray-500',
              },
            },
          },
        }}
      >
        {options?.map(({ label, value: optionValue }) => (
          <option
            key={`user-role-${optionValue}`}
            label={label}
            value={optionValue}
            selected={optionValue === selectedValue}
            className="p-2"
          >
            {label}
          </option>
        ))}
      </FlowBiteSelect>
    </div>
  );
}
