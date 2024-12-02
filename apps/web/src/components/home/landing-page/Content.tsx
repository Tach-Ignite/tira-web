'use client';

import { OutlinedCircleCheckIcon } from '@src/icons';

interface ContentProps {
  title: string;
  content: string | React.ReactNode;
}

function Content(props: ContentProps) {
  const { content, title } = props;

  return (
    <div className="flex gap-3 max-w-[380px] text-gray-700 dark:text-white">
      <div>
        <OutlinedCircleCheckIcon className="mt-1 text-[20px]" />
      </div>
      <div className="space-y-2">
        <p className="text-xl font-semibold">{title}</p>
        <div className="text-[16px] !leading-[24px]">{content}</div>
      </div>
    </div>
  );
}

export default Content;
