'use client';

import TableOfContent from './TableOfContent';

function TermsAndConditions() {
  return (
    <div className="text-black dark:text-white">
      <div className="bold text-[36px] leading-[54px]">Terms & Conditions</div>
      <div className="font-normal text-xl	!leading-[30px] mb-10">
        Last update May, 2024
      </div>
      <TableOfContent />
    </div>
  );
}

export default TermsAndConditions;
