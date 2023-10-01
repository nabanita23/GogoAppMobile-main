import { useDimensions } from '@/hooks/useDimensions';
import { useLoading } from '@/hooks/useLoading';
import { useServices } from '@/services';
import { useStores } from '@/stores';
import { SELECT_CURRENT_MERCHANT } from '@/utils/apiPaths';
import { fetcher } from '@/utils/fetcher';
import { formatDistance, isEmpty } from '@/utils/help';
import { ICartData, IMerchant } from '@/utils/types';
import MaskedView from '@react-native-community/masked-view';
import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { SquircleView } from 'react-native-figma-squircle';
import { Spacings, Text, View } from 'react-native-ui-lib';
import ProgressiveImage from './progressiveImage';

const MaskElement = () => (
  <SquircleView
    style={StyleSheet.absoluteFill}
    squircleParams={{
      cornerRadius: 20,
      cornerSmoothing: 0.7,
      fillColor: 'white',
    }}
  />
);

export const StoreCard = ({ data }: { data: IMerchant }) => {
  const { dim } = useDimensions();
  const { nav } = useServices();
  const { user } = useStores();
  const { loading, setLoadingTrue, setLoadingFalse } = useLoading(false);

  const handleSubmit = async () => {
    setLoadingTrue();
    const { data: cartData, isError } = await fetcher<ICartData>(`${SELECT_CURRENT_MERCHANT}${data?.id}`, {
      method: 'PUT',
    });
    if (!isError) {
      setLoadingFalse();
      user.setCurrentStore(data?.id, cartData?.lastSelectedMerchant?.name!);
      setTimeout(() => {
        nav.jump('ShopNavigator', { screen: 'Shop', params: { shopId: data?.id } });
      }, 0);
    }
  };

  return (
    <Pressable onPress={handleSubmit}>
      <View row centerV>
        <MaskedView maskElement={<MaskElement />}>
          <ProgressiveImage
            source={{ uri: data?.featuredImage?.formats?.medium?.url }}
            thumbnailSource={{ uri: data?.featuredImage?.formats?.thumbnail?.url }}
            style={{ width: 100, height: 100 }}
            resizeMode="cover"
          />
        </MaskedView>
        <View marginL-s4 width={dim.width - Spacings.s4 * 3 - 100}>
          <Text h2 text1 numberOfLines={1} marginB-s1>
            {data?.name}
          </Text>
          {!isEmpty(data?.distanceInMeters) && (
            <Text small marginL-s1 text1 numberOfLines={2} ellipsizeMode="tail">
              {formatDistance(data.distanceInMeters)} away
            </Text>
          )}
          <Text small marginL-s1 text2 marginT-s1>
            ({data?.locality})
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
