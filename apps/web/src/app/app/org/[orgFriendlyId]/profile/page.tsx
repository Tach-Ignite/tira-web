'use client';

import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { Spinner } from '@src/atoms';
import NavigationWizardFooter from '@components/common/navigation-wizard/NavigationWizardFooter';
import {
  useGetSingleOrganizationByFriendlyId,
  useUpdateOrganizationProfile,
} from '@queries/useOrganizationsQuery';
import { FileService, OrganizationsEntity } from '@services';
import { PercentagePieChart } from '@src/charts';
import { getCompletionNumber } from '@src/lib/functions';
import { UserRoles } from '@src/types/modules';
import OrgProfileForm from './OrgProfileForm';

interface OrganizationFormType extends OrganizationsEntity {
  files?: File[];
}

function OrganizationProfilePage() {
  const orgProfileForm = useForm<OrganizationFormType>({
    mode: 'all',
  });

  const { orgFriendlyId } = useParams() || {};

  const {
    formState: { isValid, isDirty },
    reset,
    handleSubmit,
  } = orgProfileForm;

  const {
    data: organizationDetails,
    isLoading,
    isError,
    error,
  } = useGetSingleOrganizationByFriendlyId(orgFriendlyId as string);

  const { mutateAsync: updateOrganizationProfileAsync, isPending } =
    useUpdateOrganizationProfile({
      successMessage: 'Profile has been successfully updated.',
      failureMessage: true,
    });

  const {
    id,
    updatedAt,
    createdAt,
    orgFriendlyId: detailOrgFriendlyId,
    orgUsers,
    ...restDetails
  } = organizationDetails || {};

  const { name: orgUserRoleName } = orgUsers?.[0]?.role || {};

  const completionPercentage = getCompletionNumber(restDetails);

  const resetOrganization = () => {
    reset({
      ...organizationDetails,
      files: [],
    });
  };

  const getFileUrl = async (file?: File) => {
    if (file) {
      const formData = new FormData();
      formData.append('files', file);

      const res = await FileService.uploadMultiImage(formData);
      return res?.data?.[0];
    }
    return undefined;
  };

  const onSaveOrganizationProfile = async (data: OrganizationFormType) => {
    const { files, ...rest } = data || {};

    const orgLogoUrl = await getFileUrl(files?.[0]);

    const response = await updateOrganizationProfileAsync({
      ...rest,
      logoUrl: orgLogoUrl as string,
      orgFriendlyId: orgFriendlyId as string,
    });

    if (response?.data?.id) {
      reset({ ...response?.data });
    }
  };

  useEffect(() => {
    resetOrganization();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationDetails?.id]);

  const actionButtons = [
    {
      label: 'Discard changes',
      shouldDisable: !isDirty,
      onClick: resetOrganization,
      className: 'dark:!border-white dark:!text-white',
    },
    {
      label: 'Save',
      isPending: isPending || isLoading,
      onClick: handleSubmit(onSaveOrganizationProfile),
      shouldDisable: !isValid || !isDirty,
      className: 'dark:!border-white dark:!text-white',
    },
  ];

  if (orgUserRoleName && orgUserRoleName !== UserRoles.OrgAdmin) {
    return (
      <div className="text-danger text-center">
        Only Admin can see the profile details
      </div>
    );
  }
  if (isError) {
    return (
      <div className="text-danger text-center">{(error as any)?.error}</div>
    );
  }

  return isLoading ? (
    <div className="m-auto text-center">
      <Spinner className="fill-primary-dark dark:fill-primary-dark" />
    </div>
  ) : (
    <div className="space-y-3">
      <div className="float-end">
        <PercentagePieChart
          title=""
          gainedAmount={completionPercentage}
          totalAmount={15}
          dropdownValue=""
          dropdownOptions={[]}
          progressLabel=""
          isConsoleComponent
        />
      </div>
      <OrgProfileForm form={orgProfileForm} />
      <NavigationWizardFooter actionButtons={actionButtons} />
    </div>
  );
}

export default OrganizationProfilePage;
