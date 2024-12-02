'use client';

import React from 'react';
import About from './About';
import Cohort from './Cohort';
import Services from './Services';
import FormLinks from './FormLinks';
import DefaultSection from './DefaultSection';
import { CTASectionType } from './lib/constants';
import './styles.css';

function CtaSection({
  id,
  type,
  sectionData,
  sectionProperties,
  className,
}: any) {
  if (type === CTASectionType.ABOUT) {
    return (
      <About
        data={sectionData}
        sectionProperties={sectionProperties}
        className={className}
      />
    );
  }
  if (type === CTASectionType.SERVICE) {
    return (
      <Services
        service={sectionData}
        sectionProperties={sectionProperties}
        className={className}
      />
    );
  }
  if (type === CTASectionType.COHORT && sectionData?.length) {
    return sectionData?.map((data: any) => (
      <Cohort
        key={data?.id}
        data={data}
        sectionProperties={sectionProperties}
      />
    ));
  }
  if (type === CTASectionType.FORM_LINKS) {
    return (
      <FormLinks data={sectionData} sectionProperties={sectionProperties} />
    );
  }
  if (type === CTASectionType.DEFAULT) {
    return (
      <DefaultSection
        id={id}
        data={sectionData}
        sectionProperties={sectionProperties}
        className={className}
      />
    );
  }

  return null;
}

export default CtaSection;
