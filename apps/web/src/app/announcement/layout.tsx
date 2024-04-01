import { UnAuthenticatedTopNavBar } from '@components/layouts/unAuthenticated';

export default function AnnouncementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <UnAuthenticatedTopNavBar />
      <div className="bg-white dark:bg-gray-900 pt-20 px-20 max-[860px]:px-3 pb-5">
        {children}
      </div>
    </div>
  );
}
