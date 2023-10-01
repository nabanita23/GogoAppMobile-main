import { useServices } from '@/services';
import React from 'react';
import { ButtonSize, Colors, Spacings, Text, View } from 'react-native-ui-lib';
import { ArrowRightOutlineSvgImage } from '../SVGIcons';
import AnimatedLogo from '../animatedLogo';
import { PrimaryButton } from '../button';
import Container from '../container';
import DummySpace from '../dummySpace';
import SQCard from '../sqCard';

const Partner = () => {
  const { nav } = useServices();
  return (
    <View paddingV-s4 flexG bottom>
      <Container>
        <SQCard
          backgroundColor={Colors.purple100}
          shadowColor={Colors.purple500}
          borderColor={Colors.transparent}
          size={ButtonSize.large}>
          <View height={90} row spread>
            <View>
              <Text h3 text2>
                Start earning now with
              </Text>
              <Text text1 h2>
                ₹0 investment
              </Text>
              <Text text2 small marginT-s1>
                Start your own superstore {'\n'} in 1 click
              </Text>
            </View>
            <View style={{ width: 120, height: 120, transform: [{ translateY: -Spacings.s8 }] }}>
              <AnimatedLogo
                roundSize={20}
                size={120}
                image={
                  'https://res.cloudinary.com/dxc5ccfcg/image/upload/w_370/v1689918633/gogo-app/merchant-avdesh-ji_xhxxuh'
                }
              />
            </View>
          </View>
        </SQCard>
        <DummySpace size="s4" />
        <PrimaryButton
          label="Open store with ₹0.00"
          size={ButtonSize.large}
          iconPosition="right"
          iconSVG={ArrowRightOutlineSvgImage}
          onPress={() => nav.push('SellerStack', { screen: 'SellerIntro' })}
        />
      </Container>
    </View>
  );
};

export default Partner;
