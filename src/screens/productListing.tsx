import { SearchOutlineSvgImage } from '@/components/SVGIcons';
import DataViewBridge from '@/components/dataViewBridge';
import DummySpace from '@/components/dummySpace';
import FilterCard from '@/components/filterCard';
import { PageHeader } from '@/components/header';
import LayoutWrapper from '@/components/layoutWrapper';
import { ProductListingShimmer } from '@/components/shimmer/productListingShimmer';
import { useDimensions } from '@/hooks/useDimensions';
import useFetcher from '@/hooks/useFetcher';
import { useLoading } from '@/hooks/useLoading';
import { useServices } from '@/services';
import { useStores } from '@/stores';
import { PRODUCTS_BY_FILTER, SUB_CATEGORIES } from '@/utils/apiPaths';
import { fetcher } from '@/utils/fetcher';
import { ICategoryAttributes, IMeta, IProduct, IProductFilter } from '@/utils/types';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Colors, Spacings, View } from 'react-native-ui-lib';

const ProductCard = React.lazy(() => import('@/components/productCard'));

export const ProductListing = observer(({ route }: { route: any }) => {
  const { user } = useStores();
  const { nav } = useServices();
  const productFlatListRef = useRef<FlatList>(null);
  const { dim } = useDimensions();
  const [currentPage, setCurrentPage] = useState<number>(2);
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const { loading, setLoadingTrue, setLoadingFalse } = useLoading(false);
  const categoryId = route?.params?.params?.categoryId || route?.params?.categoryId;
  const categoryName = route?.params?.params?.categoryName || route?.params?.categoryName;
  const { data: subCategoriesData, loading: isFilterLoading }: { data: ICategoryAttributes; loading: boolean } =
    useFetcher(`${SUB_CATEGORIES.replace('{{storeId}}', user?.currentStore?.toString())}${categoryId}`);

  const [selectedFilter, setSelectedFilter] = useState<IProductFilter | null>(null);
  const productFilter: IProductFilter | null = selectedFilter || subCategoriesData?.productFilters?.[0] || null;
  const {
    data: products,
    meta,
    loading: isProductLoading,
  }: { data: IProduct[]; meta: IMeta; loading: boolean } = useFetcher(
    productFilter?.slug ? `${PRODUCTS_BY_FILTER}${productFilter.slug}&pagination[page]=1` : null,
  );

  const fetchMoreProducts = async () => {
    if (currentPage < meta?.pagination?.pageCount) {
      setLoadingTrue();
      const { data: moreProducts, isError } = await fetcher(
        `${PRODUCTS_BY_FILTER}${productFilter?.slug}&pagination[page]=${currentPage}`,
      );
      if (!isError) {
        allProducts?.length === 0
          ? setAllProducts([...products, ...moreProducts])
          : setAllProducts([...allProducts, ...moreProducts]);
        setCurrentPage(currentPage + 1);
        setLoadingFalse();
      }
    }
  };

  const renderFilterItems = useCallback(
    ({ item, index }: { item: IProductFilter; index: number }) => (
      <FilterCard
        data={item}
        selected={selectedFilter?.id ? item?.id === selectedFilter?.id : index === 0}
        onPress={() => {
          if (item.id !== selectedFilter?.id) {
            setAllProducts([]);
            setCurrentPage(2);
            setSelectedFilter(item);
            productFlatListRef?.current?.scrollToOffset({ animated: true, offset: 0 });
          }
        }}
      />
    ),
    [selectedFilter],
  );

  const keyFilterItems = useCallback((item: any) => `category-${item?.id}`, []);

  const renderProductItems = useCallback(
    ({ item, index }: { item: IProduct; index: number }) => <ProductCard data={item} index={index} hasFilters={true} />,
    [],
  );

  const keyProductItems = useCallback((item: any) => `product-${item?.id}`, []);

  return (
    <LayoutWrapper withSafeView withCartPreview>
      <View paddingH-s4>
        <PageHeader
          title={categoryName || subCategoriesData?.name}
          rightIcon={SearchOutlineSvgImage}
          rightAction={() => nav.push('ModalStack', { screen: 'Search' })}
        />
      </View>
      <DummySpace size="s1" />
      {!isFilterLoading && !!subCategoriesData?.productFilters?.length ? (
        <View row>
          <View flexS width={80}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={subCategoriesData?.productFilters}
              scrollEventThrottle={16}
              renderItem={renderFilterItems}
              keyExtractor={keyFilterItems}
              getItemLayout={(data, index) => ({ length: 200, offset: 200 * index, index })}
              contentContainerStyle={{ paddingBottom: dim.height * 0.25 }}
            />
          </View>
          <View flexG bg-screen2 height={dim.height}>
            <DataViewBridge loading={isProductLoading} empty={!products?.length}>
              <FlatList
                ref={productFlatListRef}
                data={allProducts?.length ? allProducts : products}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                renderItem={renderProductItems}
                numColumns={2}
                contentContainerStyle={{ paddingBottom: dim.height * 0.25, minHeight: dim.height }}
                columnWrapperStyle={{
                  paddingHorizontal: Spacings.s2,
                  paddingTop: Spacings.s2,
                }}
                keyExtractor={keyProductItems}
                getItemLayout={(data, index) => ({ length: 200, offset: 200 * index, index })}
                ListFooterComponent={
                  loading ? (
                    <View centerH>
                      <ActivityIndicator color={Colors.text1} size={40} />
                    </View>
                  ) : null
                }
                refreshing={loading}
                onEndReachedThreshold={0.2}
                onResponderEnd={fetchMoreProducts}
              />
            </DataViewBridge>
          </View>
        </View>
      ) : (
        <ProductListingShimmer />
      )}
    </LayoutWrapper>
  );
});
