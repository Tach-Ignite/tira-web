import { CustomerRoutes, TachColorShopRoutes } from '@src/routes';
import { notAuthenticatedNavLinks } from '../navLinks';

const inactiveLinkClass = 'py-1';
const activeLinkClass = 'py-1 border-b-[4px] border-purple-1000';

export const getLinkClassNames = (name: string, pathname: string) => {
  if (name === notAuthenticatedNavLinks?.[0]?.name) {
    const className =
      pathname?.includes(TachColorShopRoutes.Products) ||
      pathname?.includes(TachColorShopRoutes.Service)
        ? activeLinkClass
        : inactiveLinkClass;
    return className;
  }
  if (name === notAuthenticatedNavLinks?.[1]?.name) {
    const className = pathname?.includes(CustomerRoutes.Announcement)
      ? activeLinkClass
      : inactiveLinkClass;
    return className;
  }
  if (name === notAuthenticatedNavLinks?.[2]?.name) {
    const className = pathname?.includes(CustomerRoutes.Contact)
      ? activeLinkClass
      : inactiveLinkClass;
    return className;
  }
  return inactiveLinkClass;
};
