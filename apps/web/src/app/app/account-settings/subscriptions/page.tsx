'use client';

import { usePathname } from 'next/navigation';
import AccountSettings from '@src/components/account-settings';

function AccountSettingsSubscriptionsPage() {
  const pathname = usePathname();
  return <AccountSettings pathname={pathname} />;
}

export default AccountSettingsSubscriptionsPage;
