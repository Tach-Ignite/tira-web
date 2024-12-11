'use client';

import { usePathname } from 'next/navigation';
import AccountSettings from '@src/components/account-settings';

function AccountSettingsBillingsPage() {
  const pathname = usePathname();
  return <AccountSettings pathname={pathname} />;
}

export default AccountSettingsBillingsPage;
