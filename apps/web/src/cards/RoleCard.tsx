/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

// import Image from 'next/image';
import { ProfileRoles } from '@services';
import { ImagePlaceholderIcon } from '@src/icons';
import { RoleCardProps } from './types';

function RoleCard(props: RoleCardProps) {
  const { description, form, roleName } = props || {};

  const { watch, setValue } = form;

  const selectedRoles = watch('profileRoles') || [];

  const isRoleSelected = selectedRoles?.includes(roleName);

  const onSelectRole = () => {
    if (selectedRoles?.includes(roleName)) {
      const filteredRoles = selectedRoles?.filter(
        (role: string) => role !== roleName,
      );
      setValue('profileRoles', filteredRoles);
    } else {
      setValue('profileRoles', [...selectedRoles, roleName]);
    }
  };

  const getRoleName = (UserProfileRole: ProfileRoles) => {
    if (UserProfileRole === ProfileRoles.MasterOfHues) {
      return 'Master of Hues';
    }
    if (UserProfileRole === ProfileRoles.PigmentWizard) {
      return 'Pigment Wizard';
    }
    if (UserProfileRole === ProfileRoles.ShadeGuru) {
      return 'Shade Guru';
    }
    if (UserProfileRole === ProfileRoles.ContentCreator) {
      return 'Content Creator';
    }
    if (UserProfileRole === ProfileRoles.ThreeDDesigner) {
      return '3D Color Designer';
    }
    if (UserProfileRole === ProfileRoles.SpectrumExplorer) {
      return 'Spectrum Explorer';
    }
    return UserProfileRole;
  };

  return (
    <div
      onClick={onSelectRole}
      className={`min-h-[160px] w-4/5 md:w-full grid grid-cols-1 md:!grid-cols-[1fr_4fr] gap-6 md:gap-[16px] rounded-3xl cursor-pointer no-select shadow-l dark:shadow-sm outline-4 outline outline-black dark:!outline-white py-8 px-4 md:!p-4 ${isRoleSelected ? '!bg-indigo !bg-opacity-60 outline outline-secondary' : ''}`}
    >
      <div className="grid grid-cols-1 place-items-center">
        <ImagePlaceholderIcon className="w-[80px] h-[80px] dark:text-white" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:!gap-1 text-start">
        <p className="flex items-end justify-start font-semibold leading-[30px] text-[18px] text-gray-900 dark:text-white">
          {getRoleName(roleName)}
        </p>
        <p className="w-full flex items-start justify-start leading-[18px] text-[12px] text-black dark:text-white">
          {description}
        </p>
      </div>
    </div>
  );
}

export default RoleCard;
