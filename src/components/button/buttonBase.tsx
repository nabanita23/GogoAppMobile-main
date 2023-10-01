import { hapticOptions } from '@/utils/constants';
import { getIconSize, getPadding, getRadius } from '@/utils/help';
import { IButtonBase } from '@/utils/types';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { SquircleView } from 'react-native-figma-squircle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { trigger } from 'react-native-haptic-feedback';
import { ButtonSize, Colors, Spacings, Text, View } from 'react-native-ui-lib';

const ButtonBase: React.FC<IButtonBase> = ({
  fullWidth = false,
  ghost,
  label,
  color = Colors.text1,
  backgroundColor,
  onPress,
  disabled,
  iconPosition,
  iconSVG,
  size = ButtonSize.medium,
  loading = false,
}) => {
  const handlePress = () => {
    trigger('impactLight', hapticOptions);
    onPress();
  };
  return (
    <TouchableOpacity disabled={disabled} onPress={handlePress} activeOpacity={0.8}>
      <SquircleView
        style={[
          fullWidth && { display: 'flex', minWidth: '100%' },
          backgroundColor !== Colors.transparent && { ...styles.wrapper, shadowColor: backgroundColor },
          {
            marginBottom: Spacings.s1,
            paddingVertical: getPadding(size),
            paddingHorizontal: label ? getPadding(size) * 2 : getPadding(size),
            borderRadius: size ? getRadius(size) : Spacings.s2,
          },
        ]}
        squircleParams={{
          cornerSmoothing: 0.7,
          cornerRadius: getRadius(size),
          fillColor: backgroundColor,
          strokeColor: ghost ? color : backgroundColor,
          strokeWidth: 1,
        }}>
        <View>
          <View row center style={{ ...(loading && { opacity: 0 }) }}>
            {iconPosition === 'left' && iconSVG?.(color, getIconSize(size))}
            {label && (
              <View center marginL-s2={iconPosition === 'left'} marginR-s2={iconPosition === 'right'}>
                <Text
                  center
                  numberOfLines={1}
                  body={size === ButtonSize.large}
                  small={size === ButtonSize.small || size === ButtonSize.xSmall || size === ButtonSize.medium}
                  style={{ color }}>
                  {label}
                </Text>
              </View>
            )}
            {iconPosition === 'right' && iconSVG?.(color, getIconSize(size))}
          </View>
          {loading && (
            <View absF center>
              <ActivityIndicator color={color} size={size === ButtonSize.large ? 24 : 20} />
            </View>
          )}
        </View>
      </SquircleView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
    backgroundColor: Colors.screen1,
  },
});

export default React.memo(ButtonBase);
