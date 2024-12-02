import * as icons from '@src/icons';

function getIconFromName(iconName: string) {
  const allIcon: any = icons;
  const reactIcon = allIcon?.[iconName];
  if (!reactIcon) {
    throw new Error(
      `The following icon was not found among imported packages: ${iconName}`,
    );
  }
  return reactIcon;
}

export default getIconFromName;
