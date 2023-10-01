import React from 'react';
import { View } from 'react-native-ui-lib';
import Container from '../container';
import DummySpace from '../dummySpace';
import Box from './box';

const CartShimmer = () => {
  return (
    <Container>
      {[...new Array(5)].map((_, i) => (
        <View row spread centerV key={`dummy-shimmer-cart-${i}`}>
          <Box height={60} width={'16%'} />
          <Box height={60} width={'80%'} />
        </View>
      ))}
      <DummySpace size="s10" />
      <View row spread centerV>
        <Box height={10} width={40} />
        <Box height={20} width={100} />
      </View>
    </Container>
  );
};

export default CartShimmer;
