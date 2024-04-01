import React from 'react';

export interface PageInfoProps {
  title: string;
  titleClassName?: string;
  description: React.ReactNode;
  buttonName?: string;
  navigateUrl: string;
  navigateTarget?: '_self' | '_blank';
}
