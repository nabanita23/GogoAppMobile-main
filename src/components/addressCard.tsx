import { useLoading } from '@/hooks/useLoading';
import { useServices } from '@/services';
import { useStores } from '@/stores';
import { SELECT_USER_DELIVERY_ADDRESS } from '@/utils/apiPaths';
import { fetcher } from '@/utils/fetcher';
import { IAddress } from '@/utils/types';
import React, { useEffect } from 'react';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { Colors, RadioButton, Text, View } from 'react-native-ui-lib';
import { MallOutlineSvgImage } from './SVGIcons';

export const AddressCard: React.FC<{ data: IAddress; selected?: boolean; cb?: (id: number) => void }> = ({
  data,
  selected,
  cb,
}) => {
  const { user } = useStores();
  const { nav } = useServices();
  const { loading, setLoadingTrue, setLoadingFalse } = useLoading(false);

  const updateAddressRemote = async () => {
    setLoadingTrue();
    const { isError } = await fetcher(`${SELECT_USER_DELIVERY_ADDRESS}${data?.id}`, {
      method: 'PUT',
    });
    setLoadingFalse();
    if (!isError) {
      user.setCurrentLocationAndGeo(data?.formattedAddressByGoogle!, {
        latitude: data?.lat!,
        longitude: data?.long!,
        latitudeDelta: 0.006,
        longitudeDelta: 0.006,
      });
      if (!cb) {
        nav.jump('ShopNavigator', { screen: 'Shop' });
      }
    }
  };

  const handlePress = () => {
    cb?.(data?.id!);
    updateAddressRemote?.();
  };

  useEffect(() => {
    if (selected) {
      handlePress();
    }
  }, [selected]);

  return (
    <Pressable onPress={handlePress}>
      <View marginB-s4>
        <View
          br40
          padding-s4
          style={{ borderWidth: StyleSheet.hairlineWidth, borderColor: selected ? Colors.text1 : Colors.border1 }}>
          <View row centerV marginB-s2>
            {cb ? (
              <RadioButton size={20} selected={selected} color={Colors.button1} />
            ) : (
              MallOutlineSvgImage(Colors.text1, 20)
            )}
            <Text h3 marginL-s2 text1 uppercase>
              {data?.type}
            </Text>
          </View>
          <Text small text2={!selected} text1={selected}>
            {data?.formattedAddressByGoogle}
          </Text>
        </View>
        {loading && (
          <View absF center>
            <ActivityIndicator />
          </View>
        )}
      </View>
    </Pressable>
  );
};
