/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import RoleCard from '@src/cards/RoleCard';
import { allRoles } from './onboardingConstants';

function SelectProfileRoles() {
  return (
    <div className="w-full grid grid-cols-1 lg:!grid-cols-2 2xl:!grid-cols-3 gap-14 tab:!gap-8 lg:!gap-4 xl:!gap-8 place-items-center">
      {allRoles?.map((detail) => (
        <RoleCard key={detail?.roleName} {...detail} />
      ))}
    </div>
  );
}

export default SelectProfileRoles;
