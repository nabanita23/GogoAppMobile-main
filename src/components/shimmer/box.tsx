import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { BorderRadiuses, Colors, Spacings } from 'react-native-ui-lib';

const Box = ({ height, width }: { height: number; width?: number | string }) => {
  const animatedOpacity = useSharedValue(1);

  useEffect(() => {
    animatedOpacity.value = 1;
    animatedOpacity.value = withRepeat(
      withTiming(0.75, {
        duration: 500,
      }),
      100,
      true,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styles = StyleSheet.create({
    box: {
      height,
      width,
      backgroundColor: Colors.screen2,
      borderRadius: BorderRadiuses.br60,
      marginVertical: Spacings.s2,
    },
  });

  const opacity = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
    };
  });
  // bg-screen2 height={height} width={width} br60 marginV-s2
  return <Animated.View style={[styles.box, opacity]} />;
};

export default Box;
