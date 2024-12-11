'use client';

import Link from 'next/link';

export interface InfoValuesType {
  label: string;
  isLink?: boolean;
  linkName?: string;
  secondaryLabel?: string;
  value?: string | React.ReactElement;
}
export interface ViewPageInfoCardProps {
  infoValues: InfoValuesType[];
}

function LabelValue({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="text-black dark:text-gray-400 text-[14px] leading-[21px] flex mt-2 flex-col gap-3">
      <p>{label}</p>
      <div className="break-words">{children}</div>
    </div>
  );
}

function ViewPageInfoCard(props: ViewPageInfoCardProps) {
  const { infoValues } = props;

  return (
    <div className="p-10 rounded-lg mt-5 border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex md:!flex-row gap-x-2 gap-y-3 !flex-col justify-evenly">
      {infoValues?.map(({ label, linkName = '', value = '', isLink }) => (
        <LabelValue key={label} label={label}>
          {isLink ? (
            <Link
              target="_blank"
              className="font-normal text-[16px] underline leading-[24px] text-[#007AFF]"
              href={value as string}
            >
              {linkName}
            </Link>
          ) : (
            value
          )}
        </LabelValue>
      ))}
    </div>
  );
}

export default ViewPageInfoCard;
