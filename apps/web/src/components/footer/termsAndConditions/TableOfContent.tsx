/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */

'use client';

import { TermsAndConditionsTableContent, contents } from '../helper';

const { contentTitle, description, contentCount } =
  TermsAndConditionsTableContent;

function TableOfContent() {
  return (
    <div className="font-extralight	text-[20px] leading-[30px]">
      <div>{description}</div>
      <div>{contentCount}</div>
      {contentTitle?.map((title, index) => (
        <div key={title}>
          {index + 1} - {title}
        </div>
      ))}
      <div className="flex flex-col gap-y-6 pt-14 pb-24">
        {contents?.map((content, index) => (
          <div key={contentTitle[index]}>
            <div className="font-bold text-[24px] leading-[36px]">
              {index + 1} - {contentTitle[index]}
            </div>
            {content?.map(({ content, isItalic }, index) => (
              <div
                key={index}
                className={
                  isItalic
                    ? 'italic font-extralight text-[20px] leading-[30px]'
                    : ''
                }
              >
                {content}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableOfContent;
