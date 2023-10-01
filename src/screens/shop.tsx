import { SearchOutlineSvgImage } from '@/components/SVGIcons';
import { SecondaryButton } from '@/components/button';
import CategoryCard from '@/components/categoryCard';
import Container from '@/components/container';
import DataViewBridge from '@/components/dataViewBridge';
import DummySpace from '@/components/dummySpace';
import { SectionHeader } from '@/components/header';
import LayoutWrapper from '@/components/layoutWrapper';
import LocationSelector from '@/components/locationSelector';
import ScrollWrapper from '@/components/scrollWrapper';
import ShopShimmer from '@/components/shimmer/shopShimmer';
import StateEmpty from '@/components/stateEmpty';
import StoreHeroCard from '@/components/storeHeroCard';
import StoreSuperOffers from '@/components/storeSuperOffers';
import useFCMToken from '@/hooks/useFCMToken';
import useFetcher from '@/hooks/useFetcher';
import { useLoading } from '@/hooks/useLoading';
import useNotificationAction from '@/hooks/useNotificationAction';
import { useServices } from '@/services';
import { useStores } from '@/stores';
import { ICartStore } from '@/stores/cart';
import { GET_CART, STORE_CATEGORIES } from '@/utils/apiPaths';
import { fetcher } from '@/utils/fetcher';
import { ICartData, ICartItem, ICategory, ICategoryAttributes } from '@/utils/types';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { ButtonSize, Spacings, View } from 'react-native-ui-lib';

export const Shop = observer(({ route }: { route: any }) => {
  useNotificationAction();
  useFCMToken();
  const scrollY = useSharedValue(0);
  const { user, cart } = useStores();
  const { nav } = useServices();
  const { loading, setLoadingTrue, setLoadingFalse } = useLoading();
  const [cartData, setCartData] = useState<ICartData>();
  const [categoriesFromFetch, setCategoriesFromFetch] = useState<ICategory[]>([]);
  const [categoriesWithBanner, setCategoriesWithBanner] = useState<
    Pick<ICategoryAttributes, 'bannerUrl' | 'name' | 'slug'>[]
  >([]);

  const activeStoreId = route?.params?.shopId?.toString() || user?.currentStore?.toString();

  let { data: categories, loading: categoriesLoading }: { data: ICategory[]; loading: boolean } = useFetcher(
    activeStoreId ? String.prototype.replaceAll.call(STORE_CATEGORIES, '{{storeId}}', activeStoreId) : null,
  );

  const getCartData = async () => {
    setLoadingTrue();
    const { data, isError } = await fetcher(`${GET_CART}?sid=${activeStoreId}`);
    setLoadingFalse();
    if (!isError) {
      setCartData(data);
      user?.setCurrentStore(data?.lastSelectedMerchant?.id, data?.lastSelectedMerchant?.name);
      getCategories(data?.lastSelectedMerchant?.id?.toString());
      const tmp: ICartStore = {};
      if (data?.items) {
        data?.items?.forEach((item: ICartItem) => {
          tmp[item?.product?.productId] = item?.quantity;
        });
        cart?.init?.(tmp, data?.totalItems, data?.total);
      }
    }
  };

  // when user is first time show post logout otherwise it could have fetched store ID from MMKV
  const getCategories = async (sid: string) => {
    const { data: categoriesLatest, isError } = await fetcher(STORE_CATEGORIES.replace('{{storeId}}', sid));
    if (!isError) {
      setCategoriesFromFetch(categoriesLatest);
      const tmpCategoriesWithBanner: (Pick<ICategoryAttributes, 'bannerUrl' | 'name' | 'slug'> & { id: number })[] = [];
      categoriesLatest?.map((c: ICategory) => {
        if (c?.attributes?.bannerUrl) {
          tmpCategoriesWithBanner.push({
            bannerUrl: c?.attributes?.bannerUrl,
            id: c?.id,
            name: c?.attributes?.name,
            slug: c?.attributes?.slug,
          });
        }
      });
      setCategoriesWithBanner(tmpCategoriesWithBanner);
    }
  };

  useEffect(() => {
    getCartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route?.params?.shopId, user?.currentLocation]);

  const headerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: scrollY.value }],
      backgroundColor: interpolateColor(scrollY.value, [0, 20], ['rgba(255,255,255,0)', '#ffffff']),
    };
  });

  const shopCategories = categories ?? categoriesFromFetch;
  return (
    <LayoutWrapper withCartPreview>
      <ScrollWrapper scrollY={scrollY} withFader>
        <Animated.View style={[styles.header, headerStyle]}>
          <View row flexG centerV paddingH-s4 paddingV-s2 spread>
            <View flexS>
              <LocationSelector
                data={
                  cartData?.unsavedAddress ||
                  cartData?.userAddress || { formattedAddressByGoogle: user.currentLocation! }
                }
              />
            </View>
            <View flexS>
              <SecondaryButton
                ghost
                size={ButtonSize.small}
                onPress={() => nav.push('ModalStack', { screen: 'Search' })}
                iconPosition="right"
                iconSVG={SearchOutlineSvgImage}
              />
            </View>
          </View>
        </Animated.View>
        <DataViewBridge
          loading={loading}
          loadingComponent={<ShopShimmer />}
          empty={!cartData?.lastSelectedMerchant}
          emptyComponent={<StateEmpty />}>
          <DummySpace size="s2" />
          <Container>
            <StoreHeroCard data={cartData?.lastSelectedMerchant!} />
          </Container>
          <DummySpace size="s4" />
          <StoreSuperOffers data={categoriesWithBanner} />
          <Container>
            <SectionHeader primaryTitle="Shop By Category" />
          </Container>
          <DummySpace size="s2" />
        </DataViewBridge>
        {cartData?.lastSelectedMerchant && (
          <DataViewBridge loading={categoriesLoading} empty={!shopCategories?.length}>
            <Container>
              <View style={styles.categoryGridView}>
                {shopCategories &&
                  shopCategories?.map?.((category, index) => (
                    <View
                      key={category?.attributes?.name}
                      style={{
                        marginRight: (index + 1) % 4 ? Spacings.s4 : 0,
                        marginBottom: Spacings.s3,
                      }}>
                      <CategoryCard
                        data={category}
                        onPress={() =>
                          nav.push('LooseStack', {
                            screen: 'ProductListing',
                            params: {
                              categoryId: category?.id,
                              categorySlug: category?.attributes?.slug,
                              categoryName: category?.attributes?.name,
                            },
                          })
                        }
                      />
                    </View>
                  ))}
                <View flex-1 />
              </View>
            </Container>
          </DataViewBridge>
        )}
      </ScrollWrapper>
    </LayoutWrapper>
  );
});

const styles = StyleSheet.create({
  header: {
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  categoryGridView: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Spacings.s10,
  },
});
