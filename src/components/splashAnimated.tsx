import { useDimensions } from '@/hooks/useDimensions';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Splash from './splash';

const SplashAnimated = ({ hide }: { hide: boolean }) => {
  const { dim } = useDimensions();
  const [removeSplash, setRemoveSplash] = useState(false);
  const translateY = useSharedValue(0);
  const opacityValue = useSharedValue(1);

  useEffect(() => {
    if (hide) {
      translateY.value = withTiming(dim.height + 200, {
        duration: 500,
      });
      opacityValue.value = withTiming(0, {
        duration: 300,
      });
      setTimeout(() => {
        setRemoveSplash(true);
      }, 1000);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hide]);

  const hideAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -translateY.value }],
      //   opacity: opacityValue.value,
    };
  });

  if (removeSplash) {
    return null;
  }

  return (
    <Animated.View style={[styles.fullScreen, hideAnimation]} pointerEvents="none">
      <Splash />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default SplashAnimated;
