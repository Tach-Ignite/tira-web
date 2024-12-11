/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */

'use client';

interface UserBasicInfoProps {
  title: string;
  info: { key: string; value?: string }[];
}

function UserBasicInfo(props: UserBasicInfoProps) {
  const { info, title } = props || {};

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl px-6 py-8 w-full">
      <div className="flex justify-between gap-3 pb-5 flex-wrap items-center mb-5 border-b border-gray-200">
        <div className="font-semibold text-md leading-[!21px] text-black dark:text-gray-200">
          {title}
        </div>
      </div>
      <div className="space-y-3 mt-5">
        {info?.map(({ key, value }) => (
          <div
            key={key}
            className="text-black dark:text-gray-400 text-[14px] leading-[21px] flex mt-2 items-center gap-3"
          >
            <p>{key}:</p>
            <p className="font-semibold dark:text-gray-50">{value || '-'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserBasicInfo;
