import { useStores } from '@/stores';
import { IButtonBase } from '@/utils/types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors, Spacings, Text, View } from 'react-native-ui-lib';

const Pill: React.FC<Omit<IButtonBase, 'fullWidth' | 'ghost' | 'size' | 'color'>> = ({
  label,
  disabled,
  backgroundColor,
  onPress,
  iconPosition,
  iconSVG,
}) => {
  const { ui } = useStores();
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} activeOpacity={0.8}>
      <View
        row
        center
        br60
        paddingL-s2
        paddingR-s3
        paddingV-s1
        marginR-s2
        style={{
          backgroundColor: ui.appearance === 'light' ? backgroundColor : Colors.transparent,
          borderColor: ui.appearance === 'light' ? Colors.transparent : Colors.border1,
          borderWidth: ui.appearance === 'light' ? 0 : StyleSheet.hairlineWidth,
        }}>
        {iconPosition === 'left' && (
          <View padding-s1 br40 bg-transparent>
            {iconSVG?.(Colors.text1, Spacings.s4)}
          </View>
        )}
        {label && (
          <View marginL-s1={iconPosition === 'left'} marginR-s1={iconPosition === 'right'}>
            <Text center small text1>
              {label}
            </Text>
          </View>
        )}
        {iconPosition === 'right' && (
          <View padding-s1 br40 bg-transparent>
            {iconSVG?.(Colors.text1, Spacings.s4)}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Pill;
