'use client';

import { Invites } from '@components/invites';
import { useParams, useSearchParams } from 'next/navigation';

function InvitesPage() {
  const { inviteId } = useParams() || {};
  const params = useSearchParams();
  const inviteCode = params.get('code') || '';

  return (
    <Invites inviteId={inviteId as string} inviteCode={inviteCode as string} />
  );
}

export default InvitesPage;
