import { useDimensions } from '@/hooks/useDimensions';
import useInfinite from '@/hooks/useInfinite';
import { useServices } from '@/services';
import { MY_RECEIVED_ORDERS } from '@/utils/apiPaths';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderRadiuses, Colors, Spacings, Text, View } from 'react-native-ui-lib';
import DummySpace from './dummySpace';
import OrderReceivedItemCard from './orderReceivedItemCard';

const OrderReceived = observer(() => {
  const { dim } = useDimensions();
  const { nav } = useServices();
  const {
    data,
    loading,
    fetchData,
    fetchFreshData,
  }: { data: any; loading: boolean; fetchData: any; fetchFreshData: any } = useInfinite(
    `${MY_RECEIVED_ORDERS}?sort[0]=createdAt:desc`,
  );

  const cardSize = (dim?.width - Spacings.s4 * 5) / 4;

  const styles = StyleSheet.create({
    wrapper: {
      paddingBottom: dim.height * 0.25,
    },
  });

  const businessProfileData: Record<string, any>[] = [
    {
      label: 'Categories',
      backgroundColor: Colors.screen2,
      editable: true,
      value: '',
      icon: 'https://res.cloudinary.com/dxc5ccfcg/image/upload/v1688196069/gogo-app/icons/category_yvqeyf',
      onPressStack: 'SellerStack',
      onPressScreen: 'SellerShopCategories',
    },
    {
      label: 'Delivery',
      backgroundColor: Colors.screen2,
      editable: true,
      value: '',
      icon: 'https://res.cloudinary.com/dxc5ccfcg/image/upload/v1688196069/gogo-app/icons/delivery_iyed4f',
      onPressStack: 'ModalStack',
      onPressScreen: 'SellerShopCategories',
    },
    {
      label: 'Address',
      backgroundColor: Colors.screen2,
      editable: true,
      value: '',
      icon: 'https://res.cloudinary.com/dxc5ccfcg/image/upload/v1688196069/gogo-app/icons/address_igjge9',
      onPressStack: 'SellerStack',
      onPressScreen: 'SellerShopDetails',
    },
    {
      label: 'Download',
      backgroundColor: Colors.screen2,
      editable: false,
      value: '',
      icon: 'https://res.cloudinary.com/dxc5ccfcg/image/upload/v1688196069/gogo-app/icons/shop-name_ddbxbl',
      onPressStack: 'ModalStack',
      onPressScreen: 'LocationSuggest',
    },
  ];

  const RenderHeader = useCallback(() => {
    return (
      <View bg-screen1 paddingH-s4 marginB-s4>
        <Text h2 text1 marginT-s2>
          Business
        </Text>
        <Text small text2 marginB-s2>
          Add / Update
        </Text>
        <View row centerH marginV-s4>
          {businessProfileData?.map?.((item, index) => (
            <Pressable
              key={item.label}
              onPress={() => {
                if (item?.editable && item?.onPressStack && item?.onPressScreen) {
                  return nav?.push(item?.onPressStack, {
                    screen: item?.onPressScreen,
                    params: {
                      returnScreen: {
                        stack: 'AccountNavigator',
                      },
                    },
                  });
                }
              }}>
              <View center marginR-s4={businessProfileData?.length - 1 !== index} width={cardSize * 0.9}>
                <View
                  center
                  width={cardSize * 0.6}
                  height={cardSize * 0.6}
                  style={{ borderRadius: BorderRadiuses.br50, backgroundColor: item?.backgroundColor }}>
                  <FastImage
                    source={{ uri: item?.icon }}
                    style={{ width: cardSize * 0.35, height: cardSize * 0.35 }}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <Text key={item?.label} text1 small center marginT-s1>
                  {item?.label}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    );
  }, [businessProfileData]);

  const Divider = useCallback(() => <DummySpace size="s4" />, []);

  return (
    <FlatList
      data={data}
      scrollEventThrottle={16}
      ListHeaderComponent={RenderHeader}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={Divider}
      refreshing={loading}
      onRefresh={fetchFreshData}
      onEndReachedThreshold={0.2}
      onResponderEnd={fetchData}
      getItemLayout={(data, index) => ({ length: 142, offset: 142 * index, index })}
      contentContainerStyle={[
        styles.wrapper,
        { ...(data?.length ? { backgroundColor: Colors.screen2 } : { backgroundColor: Colors.screen1 }) },
      ]}
      keyExtractor={item => `received-orders-${item?.id}`}
      renderItem={({ item, index }) => (
        <View paddingH-s4>
          <OrderReceivedItemCard
            data={item}
            index={index}
            total={item?.value}
            cb={() =>
              nav.push('SellerStack', {
                screen: 'SellerOrderReceivedItemView',
                params: {
                  oid: item?.id,
                },
              })
            }
          />
        </View>
      )}
      ListFooterComponent={
        loading ? (
          <View centerH>
            <ActivityIndicator color={Colors.text1} size={40} />
          </View>
        ) : null
      }
    />
  );
});

export default React.memo(OrderReceived);
