'use client';

import PrivacyPolicyContents from './PrivacyPolicyContents';

function PrivacyPolicy() {
  return (
    <div className="text-black dark:text-white">
      <div className="bold text-[36px] leading-[54px]">
        Tach Ignite Privacy Policy
      </div>
      <div className="font-normal text-xl !leading-[30px] mb-10">
        This Privacy Policy shall be effective as of: August 3, 2023 and was
        last updated on August 3, 2023.
      </div>
      <div className="font-extralight  text-base mb-10">
        Tach Ignite is an accelerator that provides technical consulting
        services and strategic advice to help startups build their tech stack
        and scale. This Privacy Policy describes Our policies and procedures on
        the collection, use and disclosure of Your information when You use the
        Service and tells You about Your privacy rights and how the law protects
        You. We use Your Personal data to provide and improve the Service. By
        using the Service, You agree to the collection and use of information in
        accordance with this Privacy Policy.
      </div>
      <PrivacyPolicyContents />
    </div>
  );
}

export default PrivacyPolicy;
