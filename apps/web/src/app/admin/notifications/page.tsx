'use client';

import { NotificationsTable } from '@components/admin/dashboard';

function Notifications() {
  return (
    <div className="w-full">
      <div className="font-bold text-lg leading-[24px] text-black dark:text-white mb-4">
        Notifications
      </div>
      <div>
        <NotificationsTable />
      </div>
    </div>
  );
}

export default Notifications;
