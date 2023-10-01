import React from 'react';
import { ButtonSize, Colors, Text, View } from 'react-native-ui-lib';
import { SecondaryButton } from './button';
import SQCard from './sqCard';

const OfferCard = () => {
  return (
    <View marginB-s4>
      <SQCard backgroundColor={Colors.transparent} borderColor={Colors.border1} size={ButtonSize.medium}>
        <View row spread bottom>
          <View width="65%">
            <View row>
              <Text h3 text1 marginR-s2>
                GOGO1K
              </Text>
              <Text h3 green500>
                FLAT 10% OFF
              </Text>
            </View>
            <Text small text2 marginV-s2>
              Get FLAT 10% Off on order above Rs 1000/-
            </Text>
            <Text xSmall text1>
              * Valid on first order
            </Text>
          </View>
          <View>
            <SecondaryButton label="Apply" size={ButtonSize.small} onPress={() => {}} />
          </View>
        </View>
      </SQCard>
    </View>
  );
};

export default OfferCard;
