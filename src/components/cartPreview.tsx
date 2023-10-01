import { useServices } from '@/services';
import { useStores } from '@/stores';
import { PageWithBottomTab } from '@/utils/constants';
import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { BorderRadiuses, ButtonSize, Colors, Spacings, Text, View } from 'react-native-ui-lib';
import AnimatedNumber from 'rn-animated-number';
import { ArrowRightOutlineSvgImage } from './SVGIcons';
import SQCard from './sqCard';

const CartPreview = observer(() => {
  const { cart } = useStores();
  const cartPosition = useSharedValue(120);
  const countPosition = useSharedValue(0);
  const totalCountMemory = useRef(cart.totalUnits);
  const route = useRoute();
  const { nav } = useServices();
  const [withTab, setWithTab] = useState(false);

  const styles = StyleSheet.create({
    cartWrapper: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: withTab ? Spacings.s1 : Spacings.s9,
      paddingHorizontal: Spacings.s4,
    },
    countWrapper: {
      height: 28,
      width: 28,
      backgroundColor: Colors.screen1,
      borderRadius: BorderRadiuses.br40,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const AnimPrice = useCallback(({ value }: { value: number }) => {
    return (
      <AnimatedNumber
        textStyle={{ color: Colors.white, fontSize: 16, fontFamily: 'Outfit-Medium' }}
        format={'₹ %&%'}
        duration={0.5}
        value={value}
      />
    );
  }, []);

  useEffect(() => {
    if (totalCountMemory.current !== cart.totalUnits) {
      totalCountMemory.current = cart.totalUnits;
      countPosition.value = withRepeat(
        withTiming(20, {
          duration: 50,
          easing: Easing.linear,
        }),
        1,
        false,
      );
      setTimeout(() => {
        countPosition.value = 0;
      }, 50);
    }
    if (cart.totalUnits > 0) {
      cartPosition.value = 0;
    } else {
      cartPosition.value = 120;
    }
    setWithTab(PageWithBottomTab.includes(route.name));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.totalUnits, route.name]);

  useEffect(() => {
    if (cart.totalUnits > 0) {
      cartPosition.value = 0;
    } else {
      cartPosition.value = 120;
    }
    setWithTab(PageWithBottomTab.includes(route.name));
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(cartPosition.value, {
            duration: 170,
            easing: Easing.linear,
          }),
        },
      ],
    };
  });

  const animatedCountStyle = useAnimatedStyle(() => {
    return { transform: [{ translateY: countPosition.value }] };
  });

  return (
    <Animated.View style={[animatedStyle, styles.cartWrapper]}>
      <Pressable
        onPress={() => {
          nav.pop();
          nav.push('LooseStack', { screen: 'Cart' });
        }}>
        <SQCard
          size={ButtonSize.small}
          backgroundColor={Colors.button1}
          shadowColor={Colors.slate600}
          borderColor={Colors.transparent}>
          <View row spread padding-s2>
            <View row centerV>
              <Animated.View style={[styles.countWrapper, animatedCountStyle]}>
                <Text h3 text1>
                  {cart.totalUnits}
                </Text>
              </Animated.View>
              <View marginL-s2>
                <AnimPrice value={cart.totalPrice} />
              </View>
            </View>
            <View row centerV>
              <Text h3 medium screen1 marginH-s2>
                Cart
              </Text>
              {ArrowRightOutlineSvgImage(Colors.screen1, 14)}
            </View>
          </View>
        </SQCard>
      </Pressable>
    </Animated.View>
  );
});

export default CartPreview;
