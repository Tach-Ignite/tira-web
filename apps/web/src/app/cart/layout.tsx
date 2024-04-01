import { TopNavBar } from '@components/layouts/common';

function CartLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <TopNavBar />
      <div className="bg-white  dark:bg-gray-900 p-8">{children}</div>
    </div>
  );
}

export default CartLayout;
