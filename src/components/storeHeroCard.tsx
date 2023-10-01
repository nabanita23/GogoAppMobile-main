import { IMerchant } from '@/utils/types';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useRef } from 'react';
import { Linking, Pressable, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';
import Share from 'react-native-share';
import { ButtonSize, Colors, Spacings, Text, View } from 'react-native-ui-lib';
import ViewShot from 'react-native-view-shot';
import {
  CallOutlineSvgImage,
  ChevDownOutlineSvgImage,
  MapSolidSvgImage,
  ScanOutlineSvgImage,
  WhatsAppOutlineSvgImage,
} from './SVGIcons';
import { BSheet } from './bSheet';
import { PrimaryButton } from './button';
import Pill from './button/pill';
import DummySpace from './dummySpace';
import SellerDetails from './sellerDetails';
import SQCard from './sqCard';

const StoreHeroCard: React.FC<{ data: IMerchant }> = ({ data }) => {
  const viewRef = useRef<ViewShot>();
  const bSheetRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = () => bSheetRef?.current?.present();

  const captureScreen = async () => {
    viewRef?.current?.capture?.().then(uri => {
      const shareOptions = {
        title: `Share ${data?.name}`,
        message: `Scan QR or open https://mygogo.app/store/${data.id} and enjoy ordering from ${data?.name}`,
        url: uri,
        social: Share.Social.WHATSAPP,
      };

      Share.open(shareOptions)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    });
  };

  const handleCall = () => {
    try {
      Linking.openURL(`tel://${data?.phoneNumber || data?.owner?.phoneNumber || data?.tollFreeNumber}`);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View>
      <SQCard
        backgroundColor={data?.owner?.phoneNumber ? Colors.screen1 : Colors.red100}
        borderColor={data?.owner?.phoneNumber && Colors.border1}
        size={ButtonSize.medium}>
        <View
          row
          paddingB-s2
          style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: Colors.border1 }}>
          <Pressable onPress={openBottomSheet} style={{ flex: 1 }}>
            <View flex paddingR-s4>
              <View row paddingR-s2>
                <Text h2 text1 numberOfLines={1}>
                  {data?.name}
                </Text>
                {ChevDownOutlineSvgImage(Colors.text1, 28)}
              </View>
              <DummySpace size="s2" />
              <View row>
                {data?.owner?.phoneNumber && (
                  <View row centerV marginR-s2>
                    <Rating
                      type="star"
                      ratingCount={5}
                      imageSize={Spacings.s3}
                      readonly={true}
                      startingValue={data?.rating ?? 5}
                    />
                    <Text small text1 marginL-s2>
                      {data?.id}
                    </Text>
                  </View>
                )}
                <View row centerV marginR-s2>
                  {MapSolidSvgImage(Colors.gray400, 14)}
                  <Text small text1 marginL-s1>
                    {data?.locality}
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
          <View paddingL-s3>
            <PrimaryButton
              size={ButtonSize.large}
              onPress={openBottomSheet}
              iconPosition="left"
              iconSVG={ScanOutlineSvgImage}
            />
          </View>
        </View>
        {data?.owner?.phoneNumber ? (
          <View paddingT-s3 row>
            <Pill
              label="Call"
              backgroundColor={Colors.gray200}
              onPress={handleCall}
              iconPosition="left"
              iconSVG={CallOutlineSvgImage}
            />
            <Pill
              label="Share"
              backgroundColor={Colors.gray200}
              onPress={captureScreen}
              iconPosition="left"
              iconSVG={WhatsAppOutlineSvgImage}
            />
          </View>
        ) : (
          <View paddingT-s3>
            <Text center red500>
              This store is out of service
            </Text>
          </View>
        )}
      </SQCard>
      <ViewShot ref={viewRef} options={{ format: 'png', quality: 1 }} style={{ top: -1000, position: 'absolute' }}>
        <View padding-s4 bg-screen1 pointerEvents="none">
          <SellerDetails data={data} forShare />
        </View>
      </ViewShot>
      <BSheet ref={bSheetRef} points={['50%']}>
        <SellerDetails data={data} />
      </BSheet>
    </View>
  );
};

export default StoreHeroCard;
