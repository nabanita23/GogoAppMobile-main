import { ArrowRightOutlineSvgImage } from '@/components/SVGIcons';
import { PrimaryButton } from '@/components/button';
import DummySpace from '@/components/dummySpace';
import { PageHeader } from '@/components/header';
import Input from '@/components/input';
import LayoutWrapper from '@/components/layoutWrapper';
import SQCard from '@/components/sqCard';
import { useServices } from '@/services';
import React from 'react';
import { ButtonSize, Colors, Text, View } from 'react-native-ui-lib';

const ShopFeatures = () => {
  const { nav } = useServices();
  return (
    <LayoutWrapper withSafeView withContainer>
      <PageHeader title="Shop Features" />
      <DummySpace size="s4" />
      <Text body text1 marginB-s2>
        Delivery Options
      </Text>
      <View>
        <View paddingV-s4>
          <Text h3>Store details</Text>
          <Text small text2>
            Store related details are required
          </Text>
        </View>
        <SQCard backgroundColor={Colors.sky50} size={ButtonSize.large} borderColor={Colors.transparent}>
          <Input placeholder="Full shop name" size={ButtonSize.small} value="1" onChangeText={() => {}} />
          <DummySpace size="s4" />
          <Input placeholder="Address" size={ButtonSize.small} value="1" onChangeText={() => {}} />
          <DummySpace size="s4" />
          <Input placeholder="GSTIN" size={ButtonSize.small} value="1" onChangeText={() => {}} />
        </SQCard>
      </View>

      <View absB absL absR paddingH-s4>
        <PrimaryButton
          fullWidth
          label="Continue"
          size={ButtonSize.large}
          iconPosition="right"
          iconSVG={ArrowRightOutlineSvgImage}
          onPress={() => nav.push('SellerStack', { screen: 'SellerShopCategories' })}
        />
      </View>
    </LayoutWrapper>
  );
};

export default ShopFeatures;
