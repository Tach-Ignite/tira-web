'use client';

import { UserAddIcon } from '@src/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function InviteMembers() {
  const pathname = usePathname();
  const currentPathWithInvite = `${pathname}/invite-member`;
  return (
    <Link
      href={currentPathWithInvite}
      prefetch={false}
      className="flex gap-3 items-center text-black dark:text-white"
    >
      <UserAddIcon className="h-5 w-5" />
      <p>Invite Members</p>
    </Link>
  );
}

export default InviteMembers;
