import { ChevRightOutlineSvgImage } from '@/components/SVGIcons';
import LottieAnimations from '@/components/animations';
import { PrimaryButton } from '@/components/button';
import DummySpace from '@/components/dummySpace';
import LayoutWrapper from '@/components/layoutWrapper';
import { useLoading } from '@/hooks/useLoading';
import { useServices } from '@/services';
import { useStores } from '@/stores';
import { SELECT_CURRENT_MERCHANT } from '@/utils/apiPaths';
import { hapticOptions } from '@/utils/constants';
import { fetcher } from '@/utils/fetcher';
import { ICartData } from '@/utils/types';
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

export const Success = () => {
  const { user } = useStores();
  const { nav } = useServices();
  const { loading, setLoadingTrue, setLoadingFalse } = useLoading(false);
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

  const handleSubmit = async () => {
    setLoadingTrue();
    const { data, isError } = await fetcher<ICartData>(`${SELECT_CURRENT_MERCHANT}${user?.sellerBusinessStoreId}`, {
      method: 'PUT',
    });
    if (!isError) {
      setLoadingFalse();
      user?.setCurrentStore(user?.sellerBusinessStoreId!, data?.lastSelectedMerchant?.name!);
      setTimeout(() => {
        nav.jump('ShopNavigator', { screen: 'Shop', params: { shopId: user?.sellerBusinessStoreId } });
      }, 0);
    }
  };

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
          your super store is ready for orders
        </Text>
        <DummySpace size="s4" />
        <Text text2 body center>
          You can find your store inside
        </Text>
        <View row>
          <Text body text2>
            Settings
          </Text>
          {ChevRightOutlineSvgImage(Colors.text2, 24)}
          <Text body text2>
            My Business
          </Text>
        </View>
        <DummySpace size="s4" />
        <View>
          <PrimaryButton loading={loading} size={ButtonSize.large} label="Check now" onPress={handleSubmit} />
        </View>
      </Animated.View>
    </LayoutWrapper>
  );
};
