import { hapticOptions } from '@/utils/constants';
import { getPadding, getRadius } from '@/utils/help';
import { MessageBoundary } from '@/utils/types';
import React, { useEffect } from 'react';
import { Platform, StyleSheet, TextInputProps } from 'react-native';
import { SquircleView } from 'react-native-figma-squircle';
import { TextInput } from 'react-native-gesture-handler';
import { trigger } from 'react-native-haptic-feedback';
import { ButtonSize, Colors, Spacings, Text, View } from 'react-native-ui-lib';
import { Alert } from './alert';

export type IInput = {
  width?: string;
  label?: string;
  size?: ButtonSize;
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad' | 'url';
  placeholder: string;
  value: string;
  onChangeText: (inputText: string) => void;
  centered?: boolean;
  error?: MessageBoundary | null;
} & TextInputProps;

const Input = ({
  label,
  error,
  value,
  placeholder,
  onChangeText,
  multiline,
  width = '100%',
  centered = false,
  size = ButtonSize.small,
  keyboardType = 'default',
  ...props
}: IInput) => {
  const styles = StyleSheet.create({
    input: {
      textAlign: centered ? 'center' : 'auto',
      minWidth: width,
      paddingVertical: Platform.OS === 'ios' ? Spacings.s2 : Spacings.s1,
      paddingHorizontal: Spacings.s2,
      fontSize: 15,
      fontWeight: '500',
      fontFamily: 'Outfit-Medium',
      color: Colors.text1,
      backgroundColor: Colors.transparent,
    },
  });

  useEffect(() => {
    if (!!error?.type && !!error.message) {
      trigger('notificationError', hapticOptions);
    }
  }, [error?.message, error?.type]);

  return (
    <View>
      {label && (
        <Text body marginB-s2>
          {label}
        </Text>
      )}
      <SquircleView
        style={[
          {
            backgroundColor: Colors.screen1,
            padding: size ? getPadding(size) : 0,
            borderColor: error?.type === 'error' ? Colors.red500 : Colors.border1,
            borderRadius: size ? getRadius(size) : Spacings.s2,
          },
        ]}
        squircleParams={{
          cornerSmoothing: 0.7,
          cornerRadius: size ? getRadius(size) : Spacings.s2,
          fillColor: Colors.screen1,
          strokeColor: error?.type === 'error' ? Colors.red500 : Colors.border1,
          strokeWidth: StyleSheet.hairlineWidth,
        }}>
        <TextInput
          {...props}
          keyboardType={keyboardType}
          cursorColor={Colors.blue500}
          placeholder={placeholder}
          selectionColor={error?.message ? Colors.red500 : Colors.text1}
          placeholderTextColor={error?.message ? Colors.red400 : Colors.text2}
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, multiline && props.style]}
        />
      </SquircleView>
      {!!error?.type && !!error.message && <Alert error={error} centered={centered} />}
    </View>
  );
};

export default Input;
