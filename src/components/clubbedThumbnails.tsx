import { IPlacedOrder } from '@/utils/types';
import React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Colors, Spacings, Text, View } from 'react-native-ui-lib';

const ClubbedThumbnails = ({ data, imageDisplayLimit = 3 }: { data: IPlacedOrder; imageDisplayLimit?: number }) => {
  return (
    <View row flexG marginV-s4>
      {data?.orderItems.slice(0, imageDisplayLimit)?.map?.((order, index) => (
        <View br60 center bg-screen1 key={`order-${order.id}`} style={[styles.imageWrapper, { zIndex: index }]}>
          <FastImage
            source={{ uri: order?.product?.images?.[0]?.formats?.thumbnail?.url }}
            style={{ height: 34, width: 34 }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      ))}
      {data?.orderItems?.length > imageDisplayLimit && (
        <View
          br60
          center
          bg-screen1
          height={35}
          width={35}
          style={{ zIndex: imageDisplayLimit, borderColor: Colors.border1, borderWidth: StyleSheet.hairlineWidth }}>
          <Text small text1>{`+${data?.orderItems?.length - imageDisplayLimit}`}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    overflow: 'hidden',
    marginRight: -Spacings.s2,
    borderColor: Colors.border1,
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export default ClubbedThumbnails;
