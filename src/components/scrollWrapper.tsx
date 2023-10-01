import React from 'react';
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';
import { Colors, Fader } from 'react-native-ui-lib';

type IScrollY = {
  value: number;
};

const ScrollWrapper = ({
  children,
  withSafeView,
  withFader,
  scrollY,
}: {
  children: React.ReactNode;
  withSafeView?: boolean;
  withFader?: boolean;
  scrollY?: IScrollY;
}) => {
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      if (scrollY) {
        scrollY.value = event.contentOffset.y;
      }
    },
  });

  return (
    <>
      <Animated.ScrollView
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={{ paddingBottom: 200 }}
        contentInsetAdjustmentBehavior={withSafeView ? 'automatic' : 'never'}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}>
        {children}
      </Animated.ScrollView>
      {withFader && <Fader visible position={Fader.position.BOTTOM} tintColor={Colors.screen1} />}
    </>
  );
};

export default ScrollWrapper;
