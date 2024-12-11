/* eslint-disable react/require-default-props */

'use client';

interface HighlightBoxProps {
  title?: string;
  items: { id?: number; label: string; content: string }[];
}

function HighlightBox(props: HighlightBoxProps) {
  const { items, title = 'Highlights' } = props;

  return (
    <div className="w-full bg-white sm:!min-w-[350px] shadow-xl dark:bg-gray-800 rounded-lg p-5 pb-10">
      <p className="text-[18px] leading-[23px] font-semibold text-black dark:text-white">
        {title}
      </p>
      <div className="space-y-3 mt-5">
        {items?.map(({ label, content }) => (
          <div
            className="flex gap-3 text-gray-500 dark:text-gray-300"
            key={content}
          >
            <p className="font-medium">{label}: </p>
            <p>{content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HighlightBox;
