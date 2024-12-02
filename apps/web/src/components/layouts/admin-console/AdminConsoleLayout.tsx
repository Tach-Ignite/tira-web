'use client';

import { useParams, usePathname } from 'next/navigation';
import Footer from '@components/tira-landing/components/Footer';
import AdminConsoleSideNav from './AdminConsoleSideNav';
import AdminConsoleHeader from './AdminConsoleHeader';

function AdminConsoleLayout({ children }: { children: React.ReactNode }) {
  const { userId } = useParams() || {};
  const currentPath = usePathname();

  const isInviteUserPage = currentPath?.includes('invite-user');

  return (
    <div className="h-full">
      <AdminConsoleHeader />
      <div className="bg-white dark:bg-neutral min-h-comp-calc-content">
        <div className="w-full pb-9">
          <div className="flex mx-10 py-10 gap-10">
            {userId || isInviteUserPage ? null : <AdminConsoleSideNav />}
            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AdminConsoleLayout;
