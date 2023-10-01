import Headline from '@/components/headline';
import LayoutWrapper from '@/components/layoutWrapper';
import React from 'react';

export const SignUp: React.FC = () => {
  return (
    <LayoutWrapper withSafeView withContainer>
      <Headline title="Welcome Back!" subtitle="Lorem, ipsum dolor sit amet consectetur adipisicing elit." />
    </LayoutWrapper>
  );
};
