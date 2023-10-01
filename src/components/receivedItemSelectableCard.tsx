import { useDimensions } from '@/hooks/useDimensions';
import { formatCurrency } from '@/utils/help';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Checkbox, Colors, Drawer, Spacings, Text, View } from 'react-native-ui-lib';

const ReceivedItemSelectableCard = ({ item, cb, lastItem }) => {
  const { dim } = useDimensions();
  const [selected, setSelected] = useState<boolean>(false);

  const handlePress = () => {
    const tmp = !selected;
    setSelected(tmp);
    cb({ id: item?.id, value: tmp });
  };

  return (
    <Drawer
      itemsMinWidth={130}
      rightItems={[
        {
          text: selected ? 'Unavailable' : 'Available',
          background: selected ? Colors.red500 : Colors.green600,
          onPress: handlePress,
        },
      ]}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        disabled={item?.status === 'sellerCancelled' || item?.status === 'cancelled'}>
        <View
          row
          height={80}
          bg-screen1
          bg-green100={selected}
          centerV
          paddingV-s2
          paddingH-s4
          style={{ borderBottomColor: Colors.border2, borderBottomWidth: lastItem ? 0 : StyleSheet.hairlineWidth }}>
          <View width={50}>
            <FastImage
              source={{ uri: item?.product?.images?.[0]?.formats?.thumbnail?.url }}
              style={{ height: 50, width: 50 }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View absF center bg-green100 pointerEvents="none" style={{ opacity: selected ? 1 : 0 }}>
              <Checkbox value={selected} color={Colors.text1} />
            </View>
          </View>

          <View flexG marginL-s4 style={{ maxWidth: dim?.width - Spacings.s4 * 3 - 100 }}>
            <Text body text1 numberOfLines={2} ellipsizeMode="tail">
              {item.product.displayName}
            </Text>
            <Text small text2>
              {formatCurrency(item.sellingPrice)}
            </Text>
          </View>
          <View width={50}>
            <Text h2 text1 style={{ textAlign: 'right' }}>
              x {item.quantity}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Drawer>
  );
};

export default ReceivedItemSelectableCard;
