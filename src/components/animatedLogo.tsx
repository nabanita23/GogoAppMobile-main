import { useDimensions } from '@/hooks/useDimensions';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { Colors, Text, View } from 'react-native-ui-lib';

const startingPosition = 0;

const AnimatedLogo = ({ image, size, roundSize }: { image?: string; size?: number; roundSize?: number }) => {
  const { dim } = useDimensions();
  const x = useSharedValue(startingPosition);
  const imageSize = size ?? dim.width * 0.25;

  const styles = StyleSheet.create({
    backgroundImage: {
      position: 'absolute',
      backgroundColor: Colors.button1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: roundSize ?? 30,
    },
    foregroundImage: {
      borderRadius: roundSize ?? 30,
    },
  });

  useEffect(() => {
    x.value = -100;
    x.value = withDelay(100, withSpring(startingPosition));
  }, []);

  const eventHandler = useAnimatedGestureHandler({
    onActive: event => {
      x.value = startingPosition + event.translationX;
    },
    onEnd: () => (x.value = withSpring(startingPosition)),
  });

  const uaf = useAnimatedStyle(() => {
    return {
      zIndex: 1,
      transform: [{ translateX: x.value }],
    };
  });

  const uab = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value / 6 }, { scale: interpolate(x.value, [-100, 0, 100], [0.85, 1, 0.85]) }],
    };
  });

  return (
    <View>
      <View>
        <Animated.View style={[styles.backgroundImage, { width: imageSize, height: imageSize }, uab]}>
          <Text bold white style={{ fontSize: 40 }}>
            #1
          </Text>
        </Animated.View>
      </View>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={uaf}>
          <FastImage
            source={{ uri: image || 'https://res.cloudinary.com/dxc5ccfcg/image/upload/v1685810830/logo_wjbge7' }}
            style={[styles.foregroundImage, { width: imageSize, height: imageSize }]}
            resizeMode={FastImage.resizeMode.contain}
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default AnimatedLogo;
