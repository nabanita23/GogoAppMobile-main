import { useDimensions } from '@/hooks/useDimensions';
import { useStores } from '@/stores';
import { IAddress } from '@/utils/types';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import { Pressable } from 'react-native';
import { Colors, Text, View } from 'react-native-ui-lib';
import { useServices } from '../services/index';
import { ChevDownOutlineSvgImage, LocationSolidSvgImage } from './SVGIcons';
import LottieAnimations from './animations';
import { BSheet } from './bSheet';
import Divider from './divider';
import GooglePlacesInput from './googlePlacesInput';
import MyLocation from './myLocation';

const LocationSelector = observer(({ data }: { data: Pick<IAddress, 'formattedAddressByGoogle'> }) => {
  const { user } = useStores();
  const bSheetRef = useRef<BottomSheetModal>(null);
  const { nav } = useServices();
  const { dim } = useDimensions();

  const openBottomSheet = () => bSheetRef?.current?.present();
  const closeBottomSheet = () => bSheetRef?.current?.close();

  const cb = (details: any) => {
    closeBottomSheet();
    nav.push('ModalStack', {
      screen: 'LocationMarker',
      params: { details },
    });
  };

  useEffect(() => {
    if (!user?.currentLocation) {
      openBottomSheet();
    }
  }, [user?.currentLocation]);

  return (
    <View>
      <Pressable onPress={() => nav?.push('ModalStack', { screen: 'LocationSuggest' })}>
        <View row>
          <View marginR-s2>{LocationSolidSvgImage(Colors.text1, 22)}</View>
          <View>
            <Text xSmall text2>
              Delivery location
            </Text>
            <View row centerV style={{ maxWidth: dim.width * 0.6 }}>
              <Text small text1 numberOfLines={1}>
                {user?.currentLocation ? data?.formattedAddressByGoogle : 'Select your location'}
              </Text>
              {ChevDownOutlineSvgImage(Colors.text1, 22)}
            </View>
          </View>
        </View>
      </Pressable>
      <BSheet ref={bSheetRef} points={['80%']} permanent>
        <View row centerV>
          <View flexS center marginR-s4>
            <LottieAnimations name="share-location" height={100} width={100} loop={true} auto={true} />
          </View>
          <View flexS>
            <Text h2 text1 marginB-s1>
              Share your location
            </Text>
            <Text small text2 marginB-s2>
              Please share your location to provide you best tailored experience.
            </Text>
          </View>
        </View>
        <GooglePlacesInput cb={cb} />
        <Divider label="or" />
        <MyLocation cb={cb} />
      </BSheet>
    </View>
  );
});

export default LocationSelector;
