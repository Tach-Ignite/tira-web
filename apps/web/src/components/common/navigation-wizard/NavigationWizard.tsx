/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */

'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { BreadcrumbType } from '@src/components/common/breadcrumb/types';
import NavigationWizardPage from './NavigationWizardPage';
import NavigationWizardFooter from './NavigationWizardFooter';
import { NavigationWizardProps } from './types';
import NavigationWizardPageHeader from './NavigationWizardPageHeader';

function generateLinks(
  url: string,
  splitSegment: string,
  showCurrentPathBreadcrumb: boolean = true,
) {
  const parts = url.split(splitSegment);

  const baseUrl = `${parts[0]}${splitSegment}`;
  const remainingPath = parts[1].split('/').filter(Boolean);

  let links = remainingPath.map((part, index) => ({
    name: capitalizeWords(part),
    url: `${baseUrl}/${remainingPath.slice(0, index + 1).join('/')}`,
  }));

  // Exclude the last breadcrumb if `showCurrentPathBreadcrumb` is false
  if (!showCurrentPathBreadcrumb) {
    links = links.slice(0, -1);
  }

  return links;
}

function replaceNumberNames(
  links: { name: string; url: string }[],
  replacements: string[],
) {
  let replacementIndex = 0;
  return links.map((link) => {
    if (/\d/.test(link.name) && replacementIndex < replacements.length) {
      const replacement = replacements[replacementIndex];
      replacementIndex++;
      return {
        ...link,
        name: replacement,
      };
    }
    return link;
  });
}

function capitalizeWords(str: string) {
  return str
    .split(/[-\s]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(' ');
}

function NavigationWizard(props: NavigationWizardProps) {
  const {
    id,
    onHandleBack,
    showGoBack,
    fullBreadcrumbs,
    initialBreadcrumbs,
    handleCurrentPathBreadcrumb,
    actionButtons,
    additionalHeaders,
    showStepInfo = true,
    showBreadcrumbDivider = false,
    breadcrumbReplacements = [],
    showCurrentPathBreadcrumb = true,
    steps,
    splitSegment = '',
    isNestedNavigationComponent = false,
    ...rest
  } = props || {};

  const pathname = usePathname();

  const [pathBreadcrumbs, setPathBreadcrumbs] = useState<BreadcrumbType[]>();

  useEffect(() => {
    const pathBreadcrumbs = generateLinks(
      `${process.env.APP_URL}${pathname}`,
      `${splitSegment?.length ? splitSegment : '/app'}`,
      showCurrentPathBreadcrumb,
    );
    const updatedLinks = replaceNumberNames(
      pathBreadcrumbs,
      breadcrumbReplacements,
    );

    if (initialBreadcrumbs?.length) {
      setPathBreadcrumbs([...initialBreadcrumbs, ...updatedLinks]);
    } else {
      setPathBreadcrumbs(updatedLinks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    initialBreadcrumbs?.length,
    pathname,
    breadcrumbReplacements,
    showCurrentPathBreadcrumb,
  ]);

  const filteredBreadcrumbs =
    typeof fullBreadcrumbs !== 'undefined' ? fullBreadcrumbs : pathBreadcrumbs;

  const isFullPage = steps?.find((step) => step?.url === pathname)?.name
    ? false
    : true;

  // console.log('id ::', id, steps);
  // console.log('pathname ::', pathname);

  return (
    <div id={id || 'navigation-component'} className="">
      <NavigationWizardPageHeader
        showGoBack={showGoBack}
        fullBreadcrumbs={filteredBreadcrumbs}
        onHandleBack={onHandleBack}
        showBreadcrumbDivider={showBreadcrumbDivider}
        steps={steps}
        isFullPage={isFullPage}
        {...rest}
      />
      <div className="py-10">
        <NavigationWizardPage
          {...rest}
          steps={steps}
          additionalHeaders={additionalHeaders}
          showStepInfo={showStepInfo}
          isFullPage={isFullPage}
          isNestedNavigationComponent={isNestedNavigationComponent}
        />
      </div>
      {actionButtons?.length && (
        <NavigationWizardFooter actionButtons={actionButtons} />
      )}
    </div>
  );
}

export default NavigationWizard;
