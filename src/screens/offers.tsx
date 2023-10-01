import Container from '@/components/container';
import { PageHeader } from '@/components/header';
import LayoutWrapper from '@/components/layoutWrapper';
import OfferCard from '@/components/offerCard';
import React from 'react';

const Offers = () => {
  return (
    <LayoutWrapper withSafeView>
      <PageHeader title="Offers/Promotions" withSpace />
      <Container>
        <OfferCard />
        <OfferCard />
        <OfferCard />
      </Container>
    </LayoutWrapper>
  );
};

export default Offers;
