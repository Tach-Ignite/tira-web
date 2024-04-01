import { UnAuthenticatedTopNavBar } from '@components/layouts/unAuthenticated';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <UnAuthenticatedTopNavBar />
      <div className="bg-light-bg-image dark:bg-dark-bg-image bg-cover bg-no-repeat h-full min-h-[75vh]">
        <div className="pt-14 flex justify-center xs:px-15">{children}</div>
      </div>
    </div>
  );
}
