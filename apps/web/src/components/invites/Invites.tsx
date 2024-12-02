/* eslint-disable no-nested-ternary */

'use client';

import Link from 'next/link';
import { Spinner } from '@src/atoms';
import { useGetInvite } from '@queries/useInviteQuery';
import { TachColorAuthPages } from '@src/routes';
import InviteEmailVerification from './InviteEmailVerification';

function Invites({
  inviteId,
  inviteCode,
}: {
  inviteId: string;
  inviteCode: string;
}) {
  const { data: inviteData, isLoading: isInviteLoading } = useGetInvite(
    inviteId as string,
    inviteCode as string,
  );

  return isInviteLoading ? (
    <div className="m-auto text-center">
      <Spinner />
    </div>
  ) : (
    <div
      id="invite-page"
      className="w-full h-full relative pt-1 px-5 lm:!px-0 lm:!max-w-screen-md lm:!mx-auto py-10"
    >
      {inviteData?.id ? (
        <InviteEmailVerification
          inviteType={inviteData?.inviteType || '-'}
          role={inviteData?.role?.name || '-'}
          orgName={inviteData?.organization?.name || '-'}
          teamName={inviteData?.team?.name || '-'}
        />
      ) : inviteData?.error ? (
        <div className="border-gradient relative px-8 py-8 w-full h-full grid grid-cols-1 place-content-center">
          <div className="h-full text-[16px] relative pb-8 justify-center flex gap-1 m-0">
            <p className="h-full bg-text-gradient mb-10 text-center bg-clip-text text-transparent font-semibold text-[48px] [leading-[58px]">
              {typeof inviteData?.error === 'string' ? inviteData?.error : ''}
            </p>
          </div>
        </div>
      ) : (
        <div className="border-gradient relative px-8 py-4 w-full h-full grid grid-cols-1 place-content-center">
          <div className="text-[16px] relative pb-8 justify-center text-black dark:text-white leading-[19px] flex gap-1 m-0">
            You don&apos;t have any account associated with this email address,
            please Register using below link and same email address to get
            Dashboard access.
          </div>
          <div className="text-[16px] relative pb-8 justify-center text-black dark:text-white leading-[19px] flex gap-1 m-auto">
            <Link
              target="_blank"
              className="underline inline-flex font-bold text-indigo20 dark:text-aqua"
              href={`${TachColorAuthPages.SignUp}?inviteId=${inviteId}&&inviteCode?${inviteCode}`}
            >
              Sign up
            </Link>{' '}
          </div>
        </div>
      )}
    </div>
  );
}

export default Invites;
