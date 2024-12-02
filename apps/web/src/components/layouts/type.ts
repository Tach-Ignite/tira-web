import { AllRoutes } from '@src/routes';
import { IconType } from '@src/icons';

export interface SideBarNavLinkType {
  icon?: IconType;
  name: string;
  url: string;
  iconClass?: string;
}

export interface SideBarContentProps {
  isMobileView?: boolean;
  headerContent?: React.ReactNode;
  navLinks: SideBarNavLinkType[];
}

export interface SideNavLinkType {
  icon: IconType;
  onClick?: () => void;
  key?: string;
  name?: string;
  iconClassName?: string;
  subLinks?: { name: string; url: AllRoutes }[];
  url?: AllRoutes;
}

export interface UserConsoleSideNavType {
  title?: string | React.ReactNode;
  links?: SideNavLinkType[];
}

export interface UserConsoleSideNavProps {
  isAdmin?: boolean;
}
