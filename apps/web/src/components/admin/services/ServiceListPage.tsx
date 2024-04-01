'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { Button } from '@src/atoms';
import { PlusIcon } from '@src/icons';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { ServiceType } from '@src/types/modules';
import { useDeleteService, useGetAllServices } from '@queries/useServicesQuery';
import { ServicesEntity } from '@services';
import getServiceListColumns from './getServiceListColumn';
import { addQueryParam } from '../../../lib/functions';

const SearchInput = dynamic(() => import('@src/atoms/Input/SearchInput'), {
  ssr: false,
});

const Table = dynamic(() => import('../../../atoms/Table/Table'), {
  ssr: false,
});

interface Meta {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev?: string | null;
  next?: string | null;
}

interface Pagination<T> {
  data: T[];
  meta: Meta;
}

function ServiceListPage() {
  const params = useSearchParams();
  const pageInQuery = params.get('page');
  const searchTermInQuery = params.get('search') || '';
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deletedService, setDeletedService] = useState<
    ServiceType | undefined
  >();

  const [currentPage, setCurrentPage] = useState(
    pageInQuery ? Number(pageInQuery) - 1 : 0,
  );
  const router = useRouter();

  const { serviceName: deleteServiceName, serviceId: deletedServiceId = '' } =
    deletedService || {};

  const { data } = useGetAllServices({
    page: (currentPage + 1).toString(),
    perPage: '10',
    searchTerm: searchTermInQuery,
  });

  const servicesData = data as Pagination<ServicesEntity> | undefined;

  const { services }: any = servicesData ?? [];
  const meta = servicesData?.meta ?? {
    total: 0,
    lastPage: 1,
    currentPage: 1,
    perPage: 10,
  };

  const { mutateAsync: deleteService } = useDeleteService({
    failureMessage: 'Failed to delete Service.',
    successMessage: 'Service has been deleted.',
  });

  const { total = 0 } = meta || {};

  const handleDeleteService = useCallback(
    (serviceDetails: ServiceType) => {
      setShowDeleteModal(!showDeleteModal);
      setDeletedService(serviceDetails);
    },
    [showDeleteModal],
  );

  const onEditButton = useCallback(
    (serviceId: string) => {
      router.push(`/admin/services/edit/${serviceId}`);
    },
    [router],
  );

  const onViewButton = useCallback(
    (serviceId: string) => {
      router.push(`/admin/services/view/${serviceId}`);
    },
    [router],
  );

  const columns = useMemo(
    () =>
      getServiceListColumns({
        onDeleteButton: handleDeleteService,
        onEditButton,
        onViewButton,
      }),
    [handleDeleteService, onEditButton, onViewButton],
  );

  const onCancelModel = () => {
    setShowDeleteModal(!showDeleteModal);
    setDeletedService(undefined);
  };

  const onConfirmDeleteService = async () => {
    await deleteService(deletedServiceId);
    setShowDeleteModal(false);
  };

  const onPageChange = async (page: number) => {
    setCurrentPage(page - 1);
    addQueryParam('page', page.toString());
  };

  function renderHeader() {
    return (
      <div className="flex w-full px-6 max-[1100px]:flex-col max-[1100px]:gap-2">
        <div className="flex w-full gap-3 text-gray-700 dark:text-gray-200 items-center">
          <div className="font-medium text-xl">Services</div>
          {services?.length ? (
            <div className="text-xs mt-1">
              {services?.length || 0} of {total || 0} Services Shown
            </div>
          ) : null}
        </div>
        <div className="flex gap-4 max-[840px]:gap-2 max-[840px]:flex-col">
          <div className="min-w-max">
            <SearchInput />
          </div>
          <div className="min-w-max">
            <Link href="/admin/services/add">
              <Button gradientDuoTone="purpleToBlue">
                <PlusIcon size={20} className="mr-2" /> Add Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Table
      columns={columns}
      data={services}
      paginationClassName="border-t-4"
      currentPage={currentPage}
      totalRows={total}
      withPageCount
      showDeleteModal={showDeleteModal}
      deletedName={deleteServiceName}
      currentPageDataLength={services?.length}
      onPageChange={onPageChange}
      renderHeader={renderHeader()}
      onCancelModel={onCancelModel}
      modalDescription="Are you sure you want to cancel the Service"
      onConfirmDeleteRow={onConfirmDeleteService}
      modalButtonNames={['Delete Service', 'Discard Change']}
    />
  );
}

export default ServiceListPage;
