import { Loose, Tabs } from '@/screens';
import { useServices } from '@/services';
import { PureFunc } from '@/utils/types';
import React from 'react';
import { Linking, Modal, Pressable, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Colors, Text, View } from 'react-native-ui-lib';
import { ChevRightOutlineSvgImage } from './SVGIcons';

type Item = {
  editable: boolean;
  external: boolean;
  value: string;
  icon: string;
  label: string;
  onPressStack: Tabs & Modal & Loose;
  onPressScreen: string;
};

type ISettingItem = {
  data: Item;
  cb: PureFunc;
  lastItem: boolean;
};

const SettingItem: React.FC<ISettingItem> = ({ data, cb, lastItem }) => {
  const { nav } = useServices();

  const openRemoteUrl = async (url: string) => {
    // Checking if the link is supported for links with custom URL scheme.
    await Linking.openURL(url);
  };

  return (
    <Pressable
      onPress={() => {
        if (data?.editable && data?.external) {
          return openRemoteUrl(data?.onPressScreen);
        } else if (data?.editable && data?.onPressStack && data?.onPressScreen) {
          return nav?.push(data?.onPressStack, { screen: data?.onPressScreen });
        }
        return data?.value === 'Logout' ? cb?.() : null;
      }}>
      <View row spread paddingT-s4>
        <View flexS marginR-s4>
          <FastImage
            source={{
              uri: data?.icon,
            }}
            style={{ width: 20, height: 20 }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View
          row
          flexG
          spread
          paddingB-s4
          style={{ borderBottomColor: Colors.border2, borderBottomWidth: lastItem ? 0 : StyleSheet.hairlineWidth }}>
          <View
            flexG
            style={{
              maxWidth: '80%',
            }}>
            {data?.label && data?.value !== 'Logout' && (
              <Text h3 text1>
                {data?.label}
              </Text>
            )}
            <Text body text1>
              {data?.value}
            </Text>
          </View>
          {data?.editable && (
            <View flexS right>
              {ChevRightOutlineSvgImage(Colors.text2, 24)}
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default SettingItem;
