import { getPadding, getRadius } from '@/utils/help';
import { PureFunc } from '@/utils/types';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { SquircleView } from 'react-native-figma-squircle';
import { Colors, Spacings, Text, View } from 'react-native-ui-lib';
import Input, { IInput } from './input';

const DummyInputAsButton = ({
  onPress,
  size,
  placeholder,
  data,
}: Pick<IInput, 'label' | 'size' | 'placeholder'> & { onPress: PureFunc; data: any }) => {
  return (
    <View>
      {!data ? (
        <View pointerEvents="none">
          <Input
            multiline={true}
            numberOfLines={3}
            keyboardType="default"
            placeholder={placeholder}
            size={size}
            value=""
            textAlignVertical="top"
            onChangeText={() => {}}
            style={{ height: 60 }}
          />
        </View>
      ) : (
        <SquircleView
          style={[
            {
              padding: size ? getPadding(size) : 0,
              backgroundColor: Colors.screen1,
              borderColor: Colors.border1,
              borderRadius: size ? getRadius(size) : Spacings.s2,
            },
          ]}
          squircleParams={{
            cornerSmoothing: 0.7,
            cornerRadius: size ? getRadius(size) : Spacings.s2,
            fillColor: Colors.screen1,
            strokeColor: Colors.border1,
            strokeWidth: StyleSheet.hairlineWidth,
          }}>
          <View height={60} padding-s2>
            <Text text1={data?.formatted_address} text2={!data?.formatted_address} body medium>
              {data?.formatted_address || 'Pick address'}
            </Text>
          </View>
        </SquircleView>
      )}
      <Pressable style={{ ...StyleSheet.absoluteFillObject }} onPress={onPress} />
    </View>
  );
};

export default DummyInputAsButton;
