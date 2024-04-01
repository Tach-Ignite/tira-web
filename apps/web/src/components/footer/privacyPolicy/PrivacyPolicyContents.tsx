/* eslint-disable react/no-unescaped-entities */

'use client';

import { privacyPolicyContents } from '../helper';

const { InterPretation, PersonalData } = privacyPolicyContents;

const {
  collectedData,
  trackingTechnologies,
  useOfPersonalData,
  businessTransactions,
  retentionOfPersonalData,
  securityOfPersonalData,
  cloudProviders,
  authenticatedProviders,
  analytics,
  payments,
  legalBasisOfGDPR,
  rightsUnderGDPR,
  CCPAPrivacy,
  sourcesOfPersonalInfo,
  personalInfoForBusiness,
  disclosureOfPersonalInfo,
  saleOfPersonalInfo,
  saleOfPersonalInfoUnder16,
  rightsUnderCCPA,
  doNotSellMyPersonalInfo,
  californiaPrivacyRights,
  changesToThisPrivacyPolicy,
  childrenPrivacy,
  contactUs,
  linksToOtherWebsites,
  mobileDevices,
} = PersonalData;

const contentClassName = 'font-extralight text-base';
const subtitleClass = 'font-semibold text-[20px] leading-[30px]';

function InterpretationContent() {
  const {
    InterPretationConclusion,
    InterPretationDescription,
    InterPretationDescriptionPoints,
    InterPretationDescriptionTitle,
    InterPretationSubTitle,
    InterPretationTitle,
    InterPretationTitleDescription,
  } = InterPretation;

  return (
    <>
      <div className="font-bold text-[24px] leading-[36px]">
        {InterPretationTitle}
      </div>
      <div className="font-semibold text-[20px] leading-[30px]">
        {InterPretationSubTitle}
      </div>
      <div className={contentClassName}>{InterPretationTitleDescription}</div>
      <div className={subtitleClass}>{InterPretationDescriptionTitle}</div>
      <div className={contentClassName}>{InterPretationDescription}</div>
      <ul className="list-disc pl-6">
        {InterPretationDescriptionPoints?.map((point) => (
          <li className={contentClassName} key={point}>
            {point}
          </li>
        ))}
      </ul>
      <div className={contentClassName}>{InterPretationConclusion}</div>
    </>
  );
}

function TypesOfCollectedData() {
  const {
    collectedDataTitle,
    CollectedDataDescription,
    collectedDataPoints,
    collectedDataSubTitle,
    collectedDataTitleDescription,
  } = collectedData;

  return (
    <>
      <div className={`mt-10 ${subtitleClass}`}>{collectedDataTitle}</div>
      <div className={subtitleClass}>{collectedDataSubTitle}</div>
      {collectedDataTitleDescription?.map((description) => (
        <div className={contentClassName} key={description}>
          {description}
        </div>
      ))}
      <ul className="list-disc pl-8">
        {collectedDataPoints?.map((point) => (
          <li className={contentClassName} key={point}>
            {point}
          </li>
        ))}
      </ul>
      {CollectedDataDescription?.map((description) => (
        <div className={contentClassName} key={description}>
          {description}
        </div>
      ))}
    </>
  );
}

function TrackingTechnologies() {
  const {
    trackingTechnologiesTitleDescription,
    TrackingTechnologiesCookies,
    trackingTechnologiesPoints,
    TrackingTechnologiesCookiesPoints,
  } = trackingTechnologies;

  return (
    <>
      <div className={subtitleClass}>Tracking Technologies and Cookies</div>
      <div className={contentClassName}>
        {trackingTechnologiesTitleDescription}
      </div>
      <ul className="list-disc pl-8">
        {trackingTechnologiesPoints?.map((point) => (
          <li className={contentClassName} key={point}>
            {point}
          </li>
        ))}
      </ul>
      {TrackingTechnologiesCookies?.map((cookie) => (
        <div className={contentClassName} key={cookie}>
          {cookie}
        </div>
      ))}
      <ul className="list-disc mb-10">
        {TrackingTechnologiesCookiesPoints?.map(({ point, purpose }) => (
          <div key={point}>
            <li className={`${contentClassName} ml-8`}>{point}</li>
            {purpose?.map((text) => (
              <div key={text} className={contentClassName}>
                {text}
              </div>
            ))}
          </div>
        ))}
      </ul>
    </>
  );
}

function UseOfPersonalData() {
  const { secondPoints, startingPoints } = useOfPersonalData;
  return (
    <>
      <div className={subtitleClass}>Use of Your Personal Data</div>
      <div className={contentClassName}>
        The Company may use Personal Data for the following purposes:
      </div>
      <ul className="list-disc pl-8">
        {startingPoints?.map((point) => (
          <li className={contentClassName} key={point}>
            {point}
          </li>
        ))}
      </ul>
      <div className={contentClassName}>
        We may share Your personal information in the following situations:
      </div>
      <ul className="list-disc pl-8 mb-10">
        {secondPoints?.map((point) => (
          <li className={contentClassName} key={point}>
            {point}
          </li>
        ))}
      </ul>
    </>
  );
}

function RetentionOfPersonalData() {
  const { descriptions } = retentionOfPersonalData;
  return (
    <>
      <div className={subtitleClass}>Retention of Your Personal Data</div>
      {descriptions?.map((description) => (
        <div className={contentClassName} key={description}>
          {description}
        </div>
      ))}
    </>
  );
}

function BusinessTransactions() {
  const { descriptions, points } = businessTransactions;
  return (
    <div className="py-10">
      <div className={subtitleClass}>Business Transactions</div>
      {descriptions?.map((description) => (
        <div className={contentClassName} key={description}>
          {description}
        </div>
      ))}
      <ul className="list-disc pl-8">
        {points?.map((point) => (
          <li className={contentClassName} key={point}>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SecurityOfPersonalData() {
  const { descriptions } = securityOfPersonalData;
  return (
    <>
      <div className={subtitleClass}>Security of Your Personal Data</div>
      {descriptions?.map((description) => (
        <div className={contentClassName} key={description}>
          {description}
        </div>
      ))}
    </>
  );
}

function CloudProviders() {
  const { points } = cloudProviders;
  return (
    <div className="py-10">
      <div className={subtitleClass}>Cloud Providers</div>
      <div className={contentClassName}>
        We use various cloud providers to host our infrastructure and data.
      </div>
      <ul className="list-disc pl-8">
        {points?.map((point) => (
          <li className={contentClassName} key={point}>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AuthenticatedProviders() {
  const { points } = authenticatedProviders;
  return (
    <div>
      <div className={subtitleClass}>Authentication Providers</div>
      <div className={contentClassName}>
        We use various authentication providers for the convenience of our
        users.
      </div>
      <ul className="list-disc pl-8">
        {points?.map((point) => (
          <li className={contentClassName} key={point}>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Analytics() {
  const { points } = analytics;
  return (
    <div className="py-10">
      <div className={subtitleClass}>Analytics</div>
      <div className={contentClassName}>
        We may use third-party Service providers to monitor and analyze the use
        of our Service.
      </div>
      <ul className="list-disc pl-8">
        {points?.map((point) => (
          <li className={contentClassName} key={point}>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

function EmailMarketing() {
  return (
    <div>
      <div className={subtitleClass}>Email Marketing</div>
      <div className={contentClassName}>
        We may use Your Personal Data to contact You with newsletters, marketing
        or promotional materials and other information that may be of interest
        to You. You may opt-out of receiving any, or all, of these
        communications from Us by following the unsubscribe link or instructions
        provided in any email We send or by contacting Us.
      </div>
    </div>
  );
}

function Payments() {
  return (
    <div className="py-10">
      <div className={subtitleClass}>Payments</div>
      {payments?.map((payment) => (
        <div className={contentClassName} key={payment}>
          {payment}
        </div>
      ))}
    </div>
  );
}
function LegalBasisOfGDPR() {
  const { points } = legalBasisOfGDPR;
  return (
    <>
      <div className={subtitleClass}>
        Legal Basis for Processing Personal Data under GDPR
      </div>
      <div className={contentClassName}>
        We may process Personal Data under the following conditions:
      </div>
      <ul className="list-disc pl-8">
        {points?.map((point) => (
          <li className={contentClassName} key={point}>
            {point}
          </li>
        ))}
      </ul>
      <div className={contentClassName}>
        In any case, the Company will gladly help to clarify the specific legal
        basis that applies to the processing, and in particular whether the
        provision of Personal Data is a statutory or contractual requirement, or
        a requirement necessary to enter into a contract.
      </div>
    </>
  );
}

function RightsUnderGDPR() {
  return (
    <>
      <div className={subtitleClass}>Your Rights under the GDPR</div>
      <div>
        The Company undertakes to respect the confidentiality of Your Personal
        Data and to guarantee You can exercise Your rights.
      </div>
      {rightsUnderGDPR?.map((point) => (
        <div className={contentClassName} key={point}>
          {point}
        </div>
      ))}
    </>
  );
}

function ExercisingGDPR() {
  return (
    <div>
      <div className={subtitleClass}>
        Exercising of Your GDPR Data Protection Rights
      </div>
      <div className={contentClassName}>
        You may exercise Your rights of access, rectification, cancellation and
        opposition by contacting Us. Please note that we may ask You to verify
        Your identity before responding to such requests. If You make a request,
        We will try our best to respond to You as soon as possible.
      </div>
      <div className={contentClassName}>
        You have the right to complain to a Data Protection Authority about Our
        collection and use of Your Personal Data. For more information, if You
        are in the European Economic Area (EEA), please contact Your local data
        protection authority in the EEA.
      </div>
    </div>
  );
}

function CCPAPrivacyPolicy() {
  const { descriptions, notIncludedPoints, points } = CCPAPrivacy;
  return (
    <div className="py-10">
      <div className={subtitleClass}>CCPA Privacy Policy</div>
      {descriptions?.map((description) => (
        <div className={contentClassName} key={description}>
          {description}
        </div>
      ))}
      <ul className="list-disc">
        {points?.map(({ point, example, collected }) => (
          <div key={point}>
            <li className={`${contentClassName} ml-8`}>{point}</li>
            <div className={contentClassName}>{example}</div>
            {collected ? (
              <div className={contentClassName}>{collected}</div>
            ) : null}
          </div>
        ))}
      </ul>
      <div className={contentClassName}>
        Under CCPA, personal information does not include:
      </div>
      <ul className="list-disc pl-8">
        {notIncludedPoints?.map((point) => (
          <li className={contentClassName} key={point}>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SourcesOfPersonalInfo() {
  return (
    <div>
      <div className={subtitleClass}>Sources of Personal Information</div>
      <div className={contentClassName}>
        We obtain the categories of personal information listed above from the
        following categories of sources:
      </div>
      <ul className="list-disc pl-8">
        {sourcesOfPersonalInfo?.map((point) => (
          <li className={contentClassName} key={point}>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PersonalInfoForBusiness() {
  const { descriptions, points } = personalInfoForBusiness;
  return (
    <div className="py-10">
      <div className={subtitleClass}>
        Use of Personal Information for Business Purposes or Commercial Purposes
      </div>
      <div className={contentClassName}>
        We may use or disclose personal information We collect for "business
        purposes" or "commercial purposes" (as defined under the CCPA), which
        may include the following examples:
      </div>
      <ul className="list-disc pl-8">
        {points?.map((point) => (
          <li className={contentClassName} key={point}>
            {point}
          </li>
        ))}
      </ul>
      {descriptions?.map((description) => (
        <div className={contentClassName} key={description}>
          {description}
        </div>
      ))}
    </div>
  );
}

function DisclosureOfPersonalInfo() {
  const { descriptions, points } = disclosureOfPersonalInfo;

  return (
    <div>
      <div className={subtitleClass}>
        Disclosure of Personal Information for Business Purposes or Commercial
        Purposes
      </div>
      <ul className="list-disc pl-8">
        {points?.map((point) => (
          <li className={contentClassName} key={point}>
            {point}
          </li>
        ))}
      </ul>
      {descriptions?.map((description) => (
        <div className={contentClassName} key={description}>
          {description}
        </div>
      ))}
    </div>
  );
}

function SaleOfPersonalInfo() {
  const { descriptions, firstPoints, secondPoints } = saleOfPersonalInfo;
  return (
    <div className="py-10">
      <div className={subtitleClass}>Sale of Personal Information</div>
      {descriptions?.map((description) => (
        <div className={contentClassName} key={description}>
          {description}
        </div>
      ))}
      <ul className="list-disc pl-8">
        {firstPoints?.map((point) => (
          <li className={contentClassName} key={point}>
            {point}
          </li>
        ))}
      </ul>
      <div className={contentClassName}>Share of Personal Information</div>
      <div className={contentClassName}>
        We may share Your personal information identified in the above
        categories with the following categories of third parties:
      </div>
      <ul className="list-disc pl-8">
        {secondPoints?.map((point) => (
          <li className={contentClassName} key={point}>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SaleOfPersonalInfoUnder16() {
  return (
    <div>
      <div className={subtitleClass}>
        Sale of Personal Information of Minors Under 16 Years of Age
      </div>
      {saleOfPersonalInfoUnder16?.map((description) => (
        <div className={contentClassName} key={description}>
          {description}
        </div>
      ))}
    </div>
  );
}

function RightsUnderCCPA() {
  const { list, points, californiaResident, mustRequest, cannotPoints } =
    rightsUnderCCPA;
  return (
    <div className="py-10">
      <div className={subtitleClass}>Your Rights under the CCPA </div>
      <div className={contentClassName}>
        The CCPA provides California residents with specific rights regarding
        their personal information. If You are a resident of California, You
        have the following rights:
      </div>
      {list?.map((li) => (
        <li className={`${contentClassName} list-decimal pl-2`} key={li}>
          {li}
        </li>
      ))}
      {points?.map((point) => (
        <li className={`${contentClassName} list-disc pl-2`} key={point}>
          {point}
        </li>
      ))}
      <div className={contentClassName}>
        Exercising Your CCPA Data Protection Rights
      </div>
      <div className={contentClassName}>
        In order to exercise any of Your rights under the CCPA, and if You are a
        California resident, You can contact Us:
      </div>
      {californiaResident?.map((point) => (
        <li className={`${contentClassName} list-disc pl-2`} key={point}>
          {point}
        </li>
      ))}
      <div className={contentClassName}>
        Only You, or a person registered with the California Secretary of State
        that You authorize to act on Your behalf, may make a verifiable request
        related to Your personal information.
      </div>
      <div className={contentClassName}>Your request to Us must:</div>
      {mustRequest?.map((point) => (
        <li className={`${contentClassName} list-disc pl-2`} key={point}>
          {point}
        </li>
      ))}
      <div className={contentClassName}>
        We cannot respond to Your request or provide You with the required
        information if we cannot:
      </div>
      {cannotPoints?.map((point) => (
        <li className={`${contentClassName} list-disc pl-2`} key={point}>
          {point}
        </li>
      ))}
      <div className={contentClassName}>
        Any disclosures We provide will only cover the 12-month period preceding
        the verifiable request's receipt.
      </div>
      <div className={contentClassName}>
        For data portability requests, We will select a format to provide Your
        personal information that is readily usable and should allow You to
        transmit the information from one entity to another entity without
        hindrance.
      </div>
    </div>
  );
}

function DoNotSellMyPersonalInfo() {
  const { descriptions, points } = doNotSellMyPersonalInfo;
  return (
    <div>
      <div className={subtitleClass}>Do Not Sell My Personal Information</div>
      {descriptions?.map((description) => (
        <div className={contentClassName} key={description}>
          {description}
        </div>
      ))}
      {points?.map((point) => (
        <li className={`${contentClassName} list-disc pl-3`} key={point}>
          {point}
        </li>
      ))}
      <div className={contentClassName}>
        The opt out will place a cookie on Your computer that is unique to the
        browser You use to opt out. If you change browsers or delete the cookies
        saved by your browser, You will need to opt out again.
      </div>
    </div>
  );
}

function MobileDevices() {
  const { descriptions, points } = mobileDevices;
  return (
    <div className="py-10">
      <div className={subtitleClass}>Mobile Devices</div>
      <div className={contentClassName}>
        <div>
          Your mobile device may give You the ability to opt out of the use of
          information about the apps You use in order to serve You ads that are
          targeted to Your interests:
        </div>
        {points?.map((point) => (
          <li className="list-disc pl-3" key={point}>
            {point}
          </li>
        ))}
        {descriptions?.map((description) => (
          <div key={description}>{description}</div>
        ))}
      </div>
    </div>
  );
}

function ChildrenPrivacy() {
  return (
    <div>
      <div className={subtitleClass}>Children's Privacy</div>
      <div className={contentClassName}>
        {childrenPrivacy?.map((description) => (
          <div key={description}>{description}</div>
        ))}
      </div>
    </div>
  );
}

function CaliforniaPrivacyRights() {
  return (
    <div className="py-10">
      <div className={subtitleClass}>
        Your California Privacy Rights (California's Shine the Light law)
      </div>
      <div className={contentClassName}>
        {californiaPrivacyRights?.map((description) => (
          <div key={description}>{description}</div>
        ))}
      </div>
    </div>
  );
}

function LinksToOtherWebsites() {
  return (
    <div>
      <div className={subtitleClass}>Links to Other Websites</div>
      <div className={contentClassName}>
        {linksToOtherWebsites?.map((description) => (
          <div key={description}>{description}</div>
        ))}
      </div>
    </div>
  );
}

function ChangesToThisPrivacyPolicy() {
  return (
    <div className="py-10">
      <div className={subtitleClass}>Changes to this Privacy Policy</div>
      <div className={contentClassName}>
        {changesToThisPrivacyPolicy?.map((description) => (
          <div key={description}>{description}</div>
        ))}
      </div>
    </div>
  );
}

function ContactUs() {
  return (
    <div className="pb-20">
      <div className={subtitleClass}>Contact Us</div>
      <div className={contentClassName}>
        <div>
          If you have any questions about this Privacy Policy, You can contact
          Us:
        </div>
        {contactUs?.map((point) => (
          <li className="list-disc pl-3" key={point}>
            {point}
          </li>
        ))}
      </div>
    </div>
  );
}

function PrivacyPolicyContents() {
  return (
    <div>
      <InterpretationContent />
      <TypesOfCollectedData />
      <TrackingTechnologies />
      <UseOfPersonalData />
      <RetentionOfPersonalData />
      <BusinessTransactions />
      <SecurityOfPersonalData />
      <CloudProviders />
      <AuthenticatedProviders />
      <Analytics />
      <EmailMarketing />
      <Payments />
      <div className={subtitleClass}>GDPR Privacy Policy</div>
      <LegalBasisOfGDPR />
      <RightsUnderGDPR />
      <ExercisingGDPR />
      <CCPAPrivacyPolicy />
      <SourcesOfPersonalInfo />
      <PersonalInfoForBusiness />
      <DisclosureOfPersonalInfo />
      <SaleOfPersonalInfo />
      <SaleOfPersonalInfoUnder16 />
      <RightsUnderCCPA />
      <DoNotSellMyPersonalInfo />
      <MobileDevices />
      <ChildrenPrivacy />
      <CaliforniaPrivacyRights />
      <LinksToOtherWebsites />
      <ChangesToThisPrivacyPolicy />
      <ContactUs />
    </div>
  );
}

export default PrivacyPolicyContents;
