'use client';

import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useGetUser } from '@queries';
import { UserType } from '@services';
import { EditUserForm } from '../../../../../components/user';

function EditUserPage() {
  const userForm = useForm<UserType>({ mode: 'all' });

  const { userId } = useParams() || {};
  const { reset } = userForm || {};

  const { data: user } = useGetUser(userId as string);

  const resetFormToDefault = useCallback(() => {
    if (user?.userId) {
      reset({ ...user });
    }
  }, [reset, user]);

  useEffect(() => {
    resetFormToDefault();
  }, [resetFormToDefault]);

  return <EditUserForm form={userForm} onDiscard={resetFormToDefault} />;
}

export default EditUserPage;
