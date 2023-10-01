import { AbstractSolidImage } from '@/components/SVGIcons';
import DataViewBridge from '@/components/dataViewBridge';
import DummySpace from '@/components/dummySpace';
import { PageHeader } from '@/components/header';
import LayoutWrapper from '@/components/layoutWrapper';
import StateEmpty from '@/components/stateEmpty';
import { StoreCard } from '@/components/storeCard';
import useInfinite from '@/hooks/useInfinite';
import { MY_STORES } from '@/utils/apiPaths';
import { IMerchant } from '@/utils/types';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { FlatList } from 'react-native';
import { Spacings, View } from 'react-native-ui-lib';

export const Stores = observer(() => {
  const {
    data,
    loading,
    fetchData,
    fetchFreshData,
  }: { data: IMerchant[]; loading: boolean; fetchData: any; fetchFreshData: any } = useInfinite(MY_STORES);

  return (
    <LayoutWrapper withSafeView>
      {!loading ? (
        <FlatList
          data={data}
          onRefresh={fetchFreshData}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={<PageHeader title="My Stores" />}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingHorizontal: Spacings.s4 }}
          ListHeaderComponentStyle={{ paddingBottom: Spacings.s4 }}
          ListEmptyComponent={<DataViewBridge loading={false} empty />}
          keyExtractor={item => `store-${item?.id}`}
          getItemLayout={(item, index) => ({ length: 200, offset: 200 * index, index })}
          ItemSeparatorComponent={() => <DummySpace size="s4" />}
          ListFooterComponentStyle={{ padding: Spacings.s4 }}
          renderItem={({ item }) => <StoreCard data={item} />}
          refreshing={loading}
          onEndReachedThreshold={0.2}
          onResponderEnd={fetchData}
        />
      ) : (
        <StateEmpty />
      )}
      <View
        absT
        absR
        style={{
          transform: [{ translateX: 130 }, { translateY: -240 }],
          zIndex: -1,
        }}>
        {AbstractSolidImage('red', 300)}
      </View>
    </LayoutWrapper>
  );
});
