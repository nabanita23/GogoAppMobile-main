import { useDimensions } from '@/hooks/useDimensions';
import React, { useLayoutEffect } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar, StyleSheet } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Spacings, View } from 'react-native-ui-lib';
import CartPreview from './cartPreview';

interface ILayoutWrapper {
  children: React.ReactNode;
  centered?: boolean;
  withSafeView?: boolean;
  withContainer?: boolean;
  withAnimated?: boolean;
  withCartPreview?: boolean;
}

const LayoutWrapper: React.FC<ILayoutWrapper> = ({
  children,
  centered = false,
  withSafeView = false,
  withContainer = false,
  withAnimated = false,
  withCartPreview = false,
}) => {
  const { dim } = useDimensions();
  const transition = useSharedValue(Platform.OS === 'android' ? 0 : 100);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(transition.value, {
            duration: 400,
            easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
    };
  });

  useLayoutEffect(() => {
    transition.value = 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View flex bg-screen1 useSafeArea={withSafeView} style={[withSafeView && styles.topSpace]}>
        <Animated.View style={[{ transform: [{ translateY: 100 }] }, styles.container, animatedStyle]}>
          <View flex center={centered} reanimated={withAnimated} paddingH-s4={withContainer} height={dim.height}>
            {children}
          </View>
        </Animated.View>
        {withCartPreview && <CartPreview />}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSpace: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  sideSpace: {
    paddingHorizontal: Spacings.s4,
  },
});

export default LayoutWrapper;
