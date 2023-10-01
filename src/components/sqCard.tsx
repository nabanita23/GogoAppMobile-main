import { getPadding, getRadius } from '@/utils/help';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SquircleView } from 'react-native-figma-squircle';
import { ButtonSize, Colors, Spacings } from 'react-native-ui-lib';

const SQCard = ({
  noPad = false,
  size,
  backgroundColor = Colors.transparent,
  shadowColor = Colors.transparent,
  borderColor = Colors.grey50,
  children,
}: {
  noPad?: boolean;
  size?: ButtonSize;
  backgroundColor?: string;
  shadowColor?: string;
  borderColor?: string;
  children: React.ReactNode;
}) => {
  return (
    <SquircleView
      style={[
        {
          padding: size && !noPad ? getPadding(size) : 0,
          borderColor: borderColor,
        },
        {
          ...(shadowColor && {
            shadowColor,
            borderRadius: size ? getRadius(size) * 1.75 : Spacings.s2,
            ...styles.shadow,
          }),
        },
      ]}
      squircleParams={{
        cornerSmoothing: 0.7,
        cornerRadius: size ? getRadius(size) * 1.75 : Spacings.s6,
        fillColor: backgroundColor,
        strokeColor: borderColor,
        strokeWidth: StyleSheet.hairlineWidth,
      }}>
      <View>{children}</View>
    </SquircleView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    backgroundColor: Colors.screen1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
});

export default SQCard;
