import { ArrowRightOutlineSvgImage } from '@/components/SVGIcons';
import { PrimaryButton, SecondaryButton } from '@/components/button';
import Container from '@/components/container';
import DummySpace from '@/components/dummySpace';
import FeatureCard from '@/components/featureCard';
import { PageHeader } from '@/components/header';
import LayoutWrapper from '@/components/layoutWrapper';
import ScrollWrapper from '@/components/scrollWrapper';
import SQCard from '@/components/sqCard';
import { useDimensions } from '@/hooks/useDimensions';
import { useServices } from '@/services';
import { features } from '@/utils/categories';
import { formatCurrency } from '@/utils/help';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { ButtonSize, Colors, Spacings, Text, View } from 'react-native-ui-lib';

export const Intro = () => {
  const { nav } = useServices();
  const { dim } = useDimensions();

  const handleClick = () => {
    nav.push('SellerStack', { screen: 'SellerUserDetails' });
  };

  return (
    <LayoutWrapper withSafeView>
      <View bg-screen1 paddingH-s4>
        <PageHeader title="Let's Begin" />
      </View>
      <ScrollWrapper withSafeView>
        <Container>
          <DummySpace size="s4" />
          <Text h3 regular center text2>
            Your next
          </Text>
          <Text bold center style={{ fontSize: 36, marginTop: -10 }} text1>
            Big move
          </Text>
          <Text body center text2 marginV-s2>
            Start growing your business 24x7. {'\n'}Take the advantage of AI and powerful business intelligence.
          </Text>
          <View center marginT-s2>
            <SecondaryButton
              size={ButtonSize.small}
              iconPosition="left"
              iconSVG={ArrowRightOutlineSvgImage}
              onPress={handleClick}
            />
          </View>
          <DummySpace size="s4" />
        </Container>
        <View row center>
          <DummySpace size="s4" />
          <FastImage
            source={{
              uri: 'https://res.cloudinary.com/dxc5ccfcg/image/upload/v1686144214/gogo-app/benefits_dcgepu',
            }}
            style={{ width: dim.width - Spacings.s4 * 4, height: dim.width - Spacings.s4 * 4 }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View center>
          <View center width="90%">
            <DummySpace size="s10" />
            <Text h1 text1 center>
              Pricing
            </Text>
            <Text body text2 center>
              Simple, Transparent, Straight
            </Text>
          </View>
          <DummySpace size="s4" />
          <SQCard backgroundColor={Colors.purple50} borderColor={Colors.purple100} size={ButtonSize.large}>
            <View center marginV-s6 width={dim.width * 0.76}>
              <Text small marginT-s2 style={{ textDecorationLine: 'line-through' }}>
                {formatCurrency(1500)}/month
              </Text>
              <Text bold style={{ fontSize: 36 }}>
                {formatCurrency(0)}/month
              </Text>
              <Text body text1 center>
                for 1 year{'\n'}limited slots available
              </Text>
            </View>
            <DummySpace size="s4" />
            <SecondaryButton label="Start now" size={ButtonSize.large} onPress={handleClick} />
          </SQCard>
          <View center width="90%">
            <DummySpace size="s10" />
            <Text h1 text1 center>
              Features
            </Text>
            <Text body text2 center>
              for exponential growth
            </Text>
            <DummySpace size="s4" />
            <SQCard backgroundColor={Colors.green50} borderColor={Colors.green100} size={ButtonSize.large}>
              {features?.map?.(feature => (
                <FeatureCard key={feature.id} data={feature} />
              ))}
              <DummySpace size="s4" />
              <SecondaryButton label="Let's do it" size={ButtonSize.large} onPress={handleClick} />
            </SQCard>
          </View>
        </View>
      </ScrollWrapper>

      <Container>
        <PrimaryButton
          label="Open Store"
          size={ButtonSize.large}
          iconPosition="right"
          iconSVG={ArrowRightOutlineSvgImage}
          onPress={handleClick}
        />
      </Container>
    </LayoutWrapper>
  );
};
