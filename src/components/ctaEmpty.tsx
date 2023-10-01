import { useServices } from '@/services';
import React from 'react';
import { ButtonSize, View } from 'react-native-ui-lib';
import { ScanOutlineSvgImage, ShopOutlineSvgImage, StoresOutlineSvgImage } from './SVGIcons';
import { PrimaryButton, SecondaryButton } from './button';

export const CtaEmpty = () => {
  const { nav } = useServices();
  return (
    <View>
      <View row marginB-s3>
        <View marginR-s2 flex-1>
          <SecondaryButton
            size={ButtonSize.medium}
            label="My Stores"
            onPress={() => nav.jump('StoresNavigator')}
            iconPosition="right"
            iconSVG={StoresOutlineSvgImage}
          />
        </View>
        <View marginL-s2 flex-1>
          <PrimaryButton
            size={ButtonSize.medium}
            label="Scan Store"
            onPress={() => nav.jump('ScanNavigator')}
            iconPosition="left"
            iconSVG={ScanOutlineSvgImage}
          />
        </View>
      </View>
      <SecondaryButton
        fullWidth
        size={ButtonSize.medium}
        label="Selected Store"
        onPress={() => nav.jump('ShopNavigator')}
        iconPosition="right"
        iconSVG={ShopOutlineSvgImage}
      />
    </View>
  );
};
