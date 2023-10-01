import useInfinite from '@/hooks/useInfinite';
import { MY_PLACED_ORDERS } from '@/utils/apiPaths';
import { IPlacedOrder } from '@/utils/types';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { Colors, Spacings, View } from 'react-native-ui-lib';
import DummySpace from './dummySpace';
import OrderPlacedItemCard from './orderPlacedItemCard';
import StateEmpty from './stateEmpty';

const OrderPlaced = () => {
  const {
    data,
    loading: loadingPlacedOrder,
    fetchData,
    fetchFreshData,
  }: { data: IPlacedOrder[]; loading: boolean; fetchData: any; fetchFreshData: any } = useInfinite(
    `${MY_PLACED_ORDERS}?sort[0]=createdAt:desc`,
  );

  if (loadingPlacedOrder) {
    return <StateEmpty />;
  }

  return (
    <FlatList
      data={data}
      scrollEventThrottle={16}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.wrapper,
        { ...(data?.length ? { backgroundColor: Colors.screen2 } : { backgroundColor: Colors.screen1 }) },
      ]}
      ListEmptyComponent={<StateEmpty />}
      ItemSeparatorComponent={() => <DummySpace size="s2" />}
      refreshing={loadingPlacedOrder}
      onRefresh={fetchFreshData}
      onEndReachedThreshold={0.2}
      onResponderEnd={fetchData}
      getItemLayout={(_, index) => ({ length: 200, offset: 200 * index, index })}
      keyExtractor={item => `placed-orders-${item?.id}`}
      renderItem={({ item }) => <OrderPlacedItemCard data={item} total={item?.value} />}
      ListFooterComponent={
        loadingPlacedOrder ? (
          <View centerH>
            <ActivityIndicator color={Colors.text1} size={40} />
          </View>
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: Spacings.s4,
    paddingVertical: Spacings.s4,
  },
  container: {
    flex: 1,
    paddingTop: 200,
  },
});

export default OrderPlaced;
