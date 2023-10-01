import { ArrowLeftOutlineSvgImage } from '@/components/SVGIcons';
import LayoutWrapper from '@/components/layoutWrapper';
import StateEmpty from '@/components/stateEmpty';
import { useDebounce } from '@/hooks/useDebounce';
import { useLoading } from '@/hooks/useLoading';
import { useServices } from '@/services';
import { useStores } from '@/stores';
import { STORE_SEARCH } from '@/utils/apiPaths';
import { fetcher } from '@/utils/fetcher';
import { IProduct } from '@/utils/types';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { BorderRadiuses, Colors, Spacings, Text, View } from 'react-native-ui-lib';

const ProductCard = React.lazy(() => import('@/components/productCard'));

export const Search = observer(() => {
  const { user } = useStores();
  const animatedY = useSharedValue(120);
  const animatedOpacity = useSharedValue(1);
  const { nav } = useServices();
  const [searchText, setSearchText] = useState('');
  const { loading, setLoadingTrue, setLoadingFalse } = useLoading();
  const [searchResultData, setSearchResultData] = useState<IProduct[]>([]);

  useEffect(() => {
    if (searchText?.length > 0) {
      animatedOpacity.value = withTiming(0, {
        duration: 200,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    } else {
      setSearchResultData([]);
      animatedOpacity.value = withTiming(1, {
        duration: 500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (animatedY.value <= 0) {
        animatedY.value = 120;
      } else {
        animatedY.value = withSpring(animatedY.value - 40);
      }
    }, 1200);
    return () => clearInterval(interval);
  }, [animatedY]);

  const translateY = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animatedY.value }],
    };
  });

  const opacity = useAnimatedStyle(() => {
    return {
      opacity: animatedOpacity.value,
    };
  });

  const handleTextChange = (inputText: string) => {
    setSearchText(inputText);
    if (searchText?.length >= 2) {
      debouncedFetchData();
    }
  };

  const fetchData = async () => {
    setLoadingTrue();
    const { data, isError } = await fetcher(`${STORE_SEARCH}?text=${searchText}&storeId=${user.currentStore}`);
    setLoadingFalse();
    if (!isError) {
      setSearchResultData(data?.products);
    }
  };

  const debouncedFetchData = useDebounce(fetchData);

  const renderProductItems = useCallback(
    ({ item, index }: { item: IProduct; index: number }) => (
      <View marginB-s4>
        <ProductCard data={item} index={index} hasFilters={false} />
      </View>
    ),
    [],
  );

  return (
    <LayoutWrapper withSafeView withCartPreview={!!searchText}>
      <View bg-screen2 paddingH-s4>
        <View marginV-s4 height={54} style={{ overflow: 'hidden' }}>
          <Animated.View style={[{ left: 50, width: 240, position: 'absolute', bottom: 7 }, translateY, opacity]}>
            <View height={40} centerV>
              <Text text2>Search over 6500+ products</Text>
            </View>
            <View height={40} centerV>
              <Text text2>Search Ghee, Aata, Dal, Rice</Text>
            </View>
            <View height={40} centerV>
              <Text text2>Search Bakery, Chip & much more</Text>
            </View>
            <View height={40} centerV>
              <Text text2>Search over 6500+ products</Text>
            </View>
          </Animated.View>
          <View absL style={{ zIndex: 2 }}>
            <TouchableOpacity onPress={() => nav.pop()}>
              <View center paddingV-s4 paddingR-s2 paddingL-s4>
                {ArrowLeftOutlineSvgImage(Colors.text1, 20)}
              </View>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            keyboardType="default"
            cursorColor={Colors.blue500}
            placeholderTextColor={Colors.text2}
            onChangeText={handleTextChange}
            value={searchText}
          />
        </View>
        <FlatList
          data={searchResultData}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.wrapper}
          ListEmptyComponent={<StateEmpty />}
          refreshing={loading}
          onEndReachedThreshold={0.2}
          numColumns={2}
          onResponderEnd={fetchData}
          getItemLayout={(data, index) => ({ length: 220, offset: 220 * index, index })}
          keyExtractor={item => `received-orders-${item?.id}`}
          renderItem={renderProductItems}
          ListFooterComponent={
            loading ? (
              <View centerH>
                <ActivityIndicator color={Colors.text1} size={40} />
              </View>
            ) : null
          }
        />
      </View>
    </LayoutWrapper>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 200,
  },
  input: {
    minWidth: '100%',
    paddingVertical: Spacings.s4,
    paddingRight: Spacings.s4,
    paddingLeft: Spacings.s10 * 1.25,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Outfit-Medium',
    color: Colors.text1,
    backgroundColor: Colors.transparent,
    borderRadius: BorderRadiuses.br50,
    borderColor: Colors.border1,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
