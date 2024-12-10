/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

// import Image from 'next/image';
import { ProfileRoles } from '@services';
import Image from 'next/image';
import { RoleCardProps } from './types';
import PlaceholderImage from '../../public/assets/select-card-placeholder.png';

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
      className={`min-h-[160px] w-4/5 md:w-full grid grid-cols-1 md:!grid-cols-[2fr_4fr] gap-6 md:!gap-[4px] cursor-pointer no-select border-2 rounded-[2px] border-borderPrimary dark:border-borderPrimary-dark py-8 px-4 md:!p-[12px] lg:!p-[16px] !bg-surface dark:!bg-surface-dark ${isRoleSelected ? '!outline !outline-3 !outline-action !bg-opacity-20' : ''}`}
    >
      <div className="grid grid-cols-1 place-items-center">
        <Image
          src={PlaceholderImage}
          alt="Select Card Placeholder"
          width={0}
          height={0}
          // quality={70}
          className="!w-[80px] !h-[80px] md:!w-[117px] md:!h-[117px]"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:!gap-[2px] text-start">
        <p className="flex pt-2 items-start justify-start font-[600] leading-[24px] text-[20px] text-textBody dark:text-textBody-dark">
          {getRoleName(roleName)}
        </p>
        <p className="w-full flex items-start justify-start font-[400] leading-[24px] text-[16px] text-textBody dark:text-textBody-dark">
          {description}
        </p>
      </div>
    </div>
  );
}

export default RoleCard;
