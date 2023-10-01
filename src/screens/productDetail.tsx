import { PageHeader } from '@/components/header';
import LayoutWrapper from '@/components/layoutWrapper';
import StateInProgress from '@/components/stateInProgress';
import React from 'react';

export const ProductDetail = () => {
  return (
    <LayoutWrapper withSafeView withContainer>
      <PageHeader title="Vishal Provision Store" />
      <StateInProgress />
    </LayoutWrapper>
  );
};
