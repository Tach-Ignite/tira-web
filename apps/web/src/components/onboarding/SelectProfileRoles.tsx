/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */

'use client';

import { useMemo } from 'react';
import { useThemeMode } from '@src/flowbite';
import { ImagePlaceholderIcon } from '@src/icons';
import RoleCard from '@src/cards/RoleCard';
import { ProfileRoles } from '@services';
import { OnboardingForm } from './types';

function SelectProfileRoles(props: OnboardingForm) {
  const { form } = props || {};

  const { mode } = useThemeMode();

  const themeMode = useMemo(() => {
    if (typeof window !== 'undefined') {
      const localStorageMode =
        localStorage?.getItem('flowbite-theme-mode') || '';
      return mode || localStorageMode;
    }
    return mode;
  }, [mode]);

  const allRoles = [
    {
      icon: themeMode === 'dark' ? ImagePlaceholderIcon : ImagePlaceholderIcon,
      roleName: ProfileRoles.MasterOfHues,
      selectedIcon: ImagePlaceholderIcon,
      description: `You're here to manage colors or palettes.`,
    },
    {
      icon: themeMode === 'dark' ? ImagePlaceholderIcon : ImagePlaceholderIcon,
      roleName: ProfileRoles.PigmentWizard,
      selectedIcon: ImagePlaceholderIcon,
      description: `You're here to do color-mixing.`,
    },
    {
      icon: themeMode === 'dark' ? ImagePlaceholderIcon : ImagePlaceholderIcon,
      roleName: ProfileRoles.ShadeGuru,
      selectedIcon: ImagePlaceholderIcon,
      description: `You're here as specialist in nuanced color choices.`,
    },
    {
      icon: themeMode === 'dark' ? ImagePlaceholderIcon : ImagePlaceholderIcon,
      roleName: ProfileRoles.ContentCreator,
      selectedIcon: ImagePlaceholderIcon,
      description: `You're here to produce tutorials, tips and visual content for the shop's online presence.`,
    },
    {
      icon: themeMode === 'dark' ? ImagePlaceholderIcon : ImagePlaceholderIcon,
      roleName: ProfileRoles.ThreeDDesigner,
      selectedIcon: ImagePlaceholderIcon,
      description: `You're here to use software to simulate color application in visual space.`,
    },
    {
      icon: themeMode === 'dark' ? ImagePlaceholderIcon : ImagePlaceholderIcon,
      roleName: ProfileRoles.SpectrumExplorer,
      selectedIcon: ImagePlaceholderIcon,
      description: `You're here to explore and experiment with full color range.`,
    },
  ];

  return (
    <div className="py-4 md:py-10 px-2 md:!px-8 pb-8 md:!mb-0 text-center flex flex-col items-center justify-center">
      <div>
        <div className="grid grid-cols-1 xl:!grid-cols-3 gap-10 place-items-center">
          {allRoles?.map((detail) => (
            <RoleCard key={detail?.roleName} form={form} {...detail} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectProfileRoles;
