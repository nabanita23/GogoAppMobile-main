import { useDimensions } from '@/hooks/useDimensions';
import React from 'react';
import { Spacings, View } from 'react-native-ui-lib';
import Container from '../container';
import Box from './box';

const ShopShimmer = () => {
  const { dim } = useDimensions();
  const cardWidth = (dim.width - Spacings.s4 * 4) / 3;
  return (
    <Container>
      <Box height={120} />
      <View row spread centerV>
        <Box height={140} width={'80%'} />
        <Box height={140} width={'16%'} />
      </View>
      <View row spread centerV>
        <Box height={20} width={100} />
        <Box height={10} width={40} />
      </View>
      <View row spread centerV>
        <Box height={cardWidth} width={cardWidth} />
        <Box height={cardWidth} width={cardWidth} />
        <Box height={cardWidth} width={cardWidth} />
      </View>
      <View row spread centerV>
        <Box height={cardWidth} width={cardWidth} />
        <Box height={cardWidth} width={cardWidth} />
        <Box height={cardWidth} width={cardWidth} />
      </View>
    </Container>
  );
};

export default ShopShimmer;
