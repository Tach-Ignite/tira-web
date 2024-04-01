'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDeleteUser, useGetAllUsers } from '@queries';
import { UserType } from '@services';
import { SearchInput } from '@src/atoms/Input';
import { Table } from '../../../atoms/Table';
import { getUserColumns } from '../../../components/user';
import { addQueryParam } from '../../../lib/functions';

function AdminUserListPage() {
  const params = useSearchParams();
  const pageInQuery = params.get('page');
  const searchTermInQuery = params.get('search') || '';

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deletedUser, setDeletedUser] = useState<UserType | undefined>();
  const [currentPage, setCurrentPage] = useState(
    pageInQuery ? Number(pageInQuery) - 1 : 0,
  );

  const router = useRouter();

  const { data: users } = useGetAllUsers({
    page: currentPage + 1,
    searchTerm: searchTermInQuery,
    perPage: 10,
  });

  const { email: deletedUserMail, userId: deletedUserId = '' } =
    deletedUser || {};

  const { mutateAsync: deleteUser } = useDeleteUser({
    failureMessage: true,
    successMessage: 'User deleted Successfully',
  });

  const { data, meta } = users || {};
  const { total = 0 } = meta || {};

  const handleDeleteUser = useCallback(
    (userDetails: UserType) => {
      setShowDeleteModal(!showDeleteModal);
      setDeletedUser(userDetails);
    },
    [showDeleteModal],
  );

  const onConfirmDeleteUser = async () => {
    await deleteUser(deletedUserId);
    setShowDeleteModal(false);
  };

  const onCancelModel = () => {
    setShowDeleteModal(!showDeleteModal);
    setDeletedUser(undefined);
  };

  const onEditButton = useCallback(
    (userId: string) => {
      router.push(`/admin/users/edit/${userId}`);
    },
    [router],
  );

  const onPageChange = async (page: number) => {
    setCurrentPage(page - 1);
    addQueryParam('page', page.toString());
  };

  const columns = useMemo(
    () =>
      getUserColumns({
        onDeleteButton: handleDeleteUser,
        onEditButton,
      }),
    [handleDeleteUser, onEditButton],
  );

  function renderHeader() {
    return (
      <div className="ml-5 max-w-max">
        <SearchInput />
      </div>
    );
  }

  return (
    <Table
      columns={columns}
      data={data}
      currentPage={currentPage}
      totalRows={total}
      withPageCount
      tableBodyClassName="divide-y"
      paginationClassName="border-t"
      showDeleteModal={showDeleteModal}
      currentPageDataLength={data?.length}
      onPageChange={onPageChange}
      deletedName={deletedUserMail}
      renderHeader={renderHeader()}
      onCancelModel={onCancelModel}
      onConfirmDeleteRow={onConfirmDeleteUser}
    />
  );
}

export default AdminUserListPage;
