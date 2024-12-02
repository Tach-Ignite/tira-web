/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/require-default-props */

'use client';

import HighlightBox from './HighlightBox';
import NotificationBox from './NotificationBox';

const items = [
  { label: 'Name', content: 'Item 1' },
  { label: 'Name', content: 'Item 2' },
];

function Content({
  content1,
  content2,
}: {
  content1: string;
  content2?: string;
}) {
  return (
    <div className="text-gray-500 dark:text-gray-300">
      <p>{content1}</p>
      {content2 ? <p>{content2}</p> : null}
    </div>
  );
}

const notifications = [
  {
    title: 'New User Logged In',
    content: (
      <Content
        content1="Admin Console Overview Page"
        content2="Welcome to the Admin Console!"
      />
    ),
  },
  {
    title: 'Job Application',
    content: <Content content1="Mohamed is applied for full stack developer" />,
  },
  {
    title: 'Profile Completed',
    content: (
      <Content
        content1="Mohamed is completed his team profile"
        content2="Mohamed is completed his org profile"
      />
    ),
  },
];

function SuperAdminOverviewPage() {
  return (
    <div className="space-y-7 w-fit">
      <NotificationBox notifications={notifications} />
      <HighlightBox items={items} />
    </div>
  );
}

export default SuperAdminOverviewPage;
