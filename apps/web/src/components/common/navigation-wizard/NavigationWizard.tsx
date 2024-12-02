'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { BreadcrumbType } from '@src/components/common/breadcrumb/types';
import NavigationWizardPage from './NavigationWizardPage';
import NavigationWizardFooter from './NavigationWizardFooter';
import { NavigationWizardProps } from './types';
import NavigationWizardPageHeader from './NavigationWizardPageHeader';

function capitalizeWords(str: string) {
  return str
    .split(/[-\s]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(' ');
}

function NavigationWizard(props: NavigationWizardProps) {
  const {
    onHandleBack,
    showGoBack,
    fullBreadcrumbs,
    initialBreadcrumbs,
    handleCurrentPathBreadcrumb,
    actionButtons,
    additionalHeaders,
    showStepInfo = true,
    showBreadcrumbDivider = false,
    ...rest
  } = props || {};

  const pathname = usePathname();

  const [pathBreadcrumbs, setPathBreadcrumbs] = useState<BreadcrumbType[]>();

  useEffect(() => {
    const queryPaths = pathname?.split('/')?.slice(1);
    const pathBreadcrumbs = queryPaths
      ?.filter((path) => path !== 'tach-color-shop')
      ?.map((path: string, index: number) => {
        const urlPath =
          index === 0
            ? `${process.env.APP_URL}/${path}`
            : `${process.env.APP_URL}/${queryPaths.slice(0, index + 1).join('/')}`;

        const isCurrentPath =
          queryPaths[Number(queryPaths?.length) - 1] === `${path}`;

        const url = isCurrentPath ? undefined : urlPath;

        return {
          name: capitalizeWords(path),
          url,
          onClick:
            isCurrentPath && typeof handleCurrentPathBreadcrumb === 'function'
              ? handleCurrentPathBreadcrumb
              : undefined,
        };
      });

    if (initialBreadcrumbs?.length) {
      setPathBreadcrumbs([...initialBreadcrumbs, ...pathBreadcrumbs]);
    } else {
      setPathBreadcrumbs(pathBreadcrumbs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialBreadcrumbs?.length, pathname]);

  const filteredBreadcrumbs =
    typeof fullBreadcrumbs !== 'undefined' ? fullBreadcrumbs : pathBreadcrumbs;

  return (
    <div className="py-2">
      <NavigationWizardPageHeader
        showGoBack={showGoBack}
        fullBreadcrumbs={filteredBreadcrumbs}
        onHandleBack={onHandleBack}
        showBreadcrumbDivider={showBreadcrumbDivider}
        {...rest}
      />
      <div className="my-1">
        <NavigationWizardPage
          {...rest}
          additionalHeaders={additionalHeaders}
          showStepInfo={showStepInfo}
        />
      </div>
      {actionButtons?.length && (
        <NavigationWizardFooter actionButtons={actionButtons} />
      )}
    </div>
  );
}

export default NavigationWizard;
