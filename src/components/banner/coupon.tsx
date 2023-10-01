import { useServices } from '@/services';
import React from 'react';
import { Pressable } from 'react-native';
import { ButtonSize, Colors, Text, View } from 'react-native-ui-lib';
import { ArrowRightOutlineSvgImage } from '../SVGIcons';
import LottieAnimations from '../animations';
import SQCard from '../sqCard';

const Coupon = () => {
  const { nav } = useServices();
  return (
    <Pressable onPress={() => nav.show('ModalStack', { screen: 'Offers' })}>
      <SQCard size={ButtonSize.small} backgroundColor={Colors.screen1} borderColor={Colors.border1}>
        <View row centerV>
          <View>
            <LottieAnimations name="offer" height={50} width={50} auto loop={true} />
          </View>
          <View flexG marginL-s4>
            <Text body orange600>
              Apply promos / coupons
            </Text>
          </View>
          <View marginR-s2>{ArrowRightOutlineSvgImage(Colors.orange600, 20)}</View>
        </View>
      </SQCard>
    </Pressable>
  );
};

export default Coupon;
