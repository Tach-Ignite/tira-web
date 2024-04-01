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
