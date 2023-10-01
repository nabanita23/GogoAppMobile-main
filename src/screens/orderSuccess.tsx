import { ChevRightOutlineSvgImage } from '@/components/SVGIcons';
import LottieAnimations from '@/components/animations';
import { PrimaryButton, SecondaryButton } from '@/components/button';
import DummySpace from '@/components/dummySpace';
import LayoutWrapper from '@/components/layoutWrapper';
import { useServices } from '@/services';
import { hapticOptions } from '@/utils/constants';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { trigger } from 'react-native-haptic-feedback';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { ButtonSize, Colors, Text, View } from 'react-native-ui-lib';

export const OrderSuccess = () => {
  const { nav } = useServices();
  const animatedValue1 = useSharedValue(0);
  const animatedValue2 = useSharedValue(0);

  useEffect(() => {
    setTimeout(() => {
      trigger('notificationSuccess', hapticOptions);
      animatedValue1.value = withTiming(200, { duration: 250 });
      animatedValue2.value = withDelay(1350, withTiming(200, { duration: 250 }));
    }, 750);
  }, []);

  const lottieWrapper1 = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: interpolate(animatedValue2.value, [0, 200], [1, 0.65]) },
        { translateY: interpolate(animatedValue2.value, [0, 80], [0, -130]) },
      ],
    };
  });

  const lottieWrapper2 = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(animatedValue1.value, [0, 200], ['#4ade80', 'rgba(255,255,255,0)']),
    };
  });

  const contentWrapper = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animatedValue2.value, [100, 200], [0, 1]),
      transform: [{ translateY: interpolate(animatedValue2.value, [0, 200], [420, 360]) }],
    };
  });

  const styles = StyleSheet.create({
    successLottie: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    successContent: {
      transform: [{ translateY: 420 }],
      opacity: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <LayoutWrapper>
      <Animated.View style={[styles.successLottie, lottieWrapper2, lottieWrapper1]}>
        <LottieAnimations name="success" loop={false} height={280} width={280} auto />
      </Animated.View>
      <Animated.View style={[styles.successContent, contentWrapper]}>
        <Text text1 h1 center>
          Congratulations
        </Text>
        <Text text2 body center>
          Your order has been placed successfully
        </Text>
        <DummySpace size="s4" />
        <Text text2 body center>
          You can find order in account page
        </Text>
        <View row>
          <Text body text2>
            Settings
          </Text>
          {ChevRightOutlineSvgImage(Colors.text2, 24)}
          <Text body text2>
            Orders
          </Text>
        </View>
        <DummySpace size="s4" />
        <View center>
          <PrimaryButton
            size={ButtonSize.medium}
            label="Continue Shopping"
            onPress={() => nav.jump('ShopNavigator', { screen: 'Shop' })}
          />
          <DummySpace size="s2" />
          <SecondaryButton
            size={ButtonSize.medium}
            label="My Orders"
            onPress={() =>
              nav.jump('AccountNavigator', {
                screen: 'Account',
                params: {
                  tabScreen: 'orderPlaced',
                },
              })
            }
          />
        </View>
      </Animated.View>
    </LayoutWrapper>
  );
};
