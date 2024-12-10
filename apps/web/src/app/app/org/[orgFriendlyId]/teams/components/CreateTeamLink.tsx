'use client';

import { UserAddIcon } from '@src/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function CreateTeamLink() {
  const pathname = usePathname();
  const currentPathWithInvite = `${pathname}/create-team`;
  return (
    <Link
      href={currentPathWithInvite}
      prefetch={false}
      className="flex gap-3 items-center text-black dark:text-white"
    >
      <UserAddIcon className="h-5 w-5" />
      <p>New Team</p>
    </Link>
  );
}

export default CreateTeamLink;
