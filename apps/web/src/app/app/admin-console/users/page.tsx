'use client';

import { AdminConsoleRoutes } from '@src/routes';
import { AdminConsoleUserTable } from './components';

function UsersPage() {
  return <AdminConsoleUserTable urlPrefix={AdminConsoleRoutes.Users} />;
}

export default UsersPage;
