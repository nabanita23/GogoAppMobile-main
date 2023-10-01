import { ArrowRightOutlineSvgImage } from '@/components/SVGIcons';
import { Alert } from '@/components/alert';
import { PrimaryButton } from '@/components/button';
import CategorySelectionCard from '@/components/categorySelectionCard';
import Container from '@/components/container';
import DataViewBridge from '@/components/dataViewBridge';
import { PageHeader } from '@/components/header';
import LayoutWrapper from '@/components/layoutWrapper';
import useFetcher from '@/hooks/useFetcher';
import { useLoading } from '@/hooks/useLoading';
import { useServices } from '@/services';
import { useStores } from '@/stores';
import { ALL_CATEGORIES, STORE_CATEGORIES, UPDATE_STORE_CATEGORIES } from '@/utils/apiPaths';
import { fetcher } from '@/utils/fetcher';
import { ICategory } from '@/utils/types';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ButtonSize, Text, View } from 'react-native-ui-lib';

export const ShopCategory = ({ route }: { route: any }) => {
  const { user } = useStores();
  const { nav } = useServices();
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { loading, setLoadingTrue, setLoadingFalse } = useLoading(false);
  const selectedCategories = useRef<Record<string, boolean>>({});
  const {
    data: selectedCategoriesFromRemote,
    loading: selectedCategoriesFromRemoteLoading,
  }: {
    data: ICategory[];
    loading: boolean;
  } = useFetcher(
    user?.sellerBusinessStoreId ? STORE_CATEGORIES.replace(/{{storeId}}/g, `${user?.sellerBusinessStoreId}`) : null,
  );
  const {
    data: allCategoriesFromRemote,
    loading: allCategoriesFromRemoteLoading,
  }: { data: ICategory[]; loading: boolean } = useFetcher(ALL_CATEGORIES);

  useEffect(() => {
    setLoadingTrue();
    const tmp: Record<string, boolean> = {};
    selectedCategoriesFromRemote?.map?.(category => {
      tmp[category.id] = true;
    });
    selectedCategories.current = tmp;
    setTimeout(setLoadingFalse, 0);
  }, [selectedCategoriesFromRemote, selectedCategoriesFromRemoteLoading]);

  const handleSelect = ({ id, value }: { id: string; value: boolean }) => {
    value && setError(false);
    setError(false);
    selectedCategories.current = { ...selectedCategories.current, [id]: value };
  };

  const handleSubmit = async () => {
    setError(false);
    setSubmitting(true);
    const { isError } = await fetcher(
      UPDATE_STORE_CATEGORIES.replace('{{storeId}}', `${user?.sellerBusinessStoreId}`),
      {
        method: 'POST',
        body: {
          categories: Object.keys(selectedCategories.current)
            ?.filter(item => selectedCategories?.current?.[item] === true)
            ?.map?.(item => parseInt(item, 10)),
        },
      },
    );
    setSubmitting(false);
    if (!isError) {
      route?.params?.returnScreen?.stack
        ? nav.jump(route?.params?.returnScreen?.stack)
        : nav.push('SellerStack', { screen: 'SellerSuccess' });
    } else {
      setError(true);
    }
  };

  const keyCategoryItem = useCallback((item: ICategory) => `select-category-${item?.id}`, []);

  const renderCategoryItem = useCallback(
    ({ item }: { item: ICategory }) => (
      <CategorySelectionCard data={item} selected={selectedCategories?.current?.[item.id]} onPress={handleSelect} />
    ),
    [selectedCategories],
  );

  return (
    <LayoutWrapper withSafeView>
      <Container>
        <PageHeader title="Add Products/Categories" />
        <View>
          <View paddingV-s2>
            <DataViewBridge loading={loading || allCategoriesFromRemoteLoading} empty={!allCategoriesFromRemote}>
              <FlatList
                data={allCategoriesFromRemote}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingBottom: 200 }}
                ListHeaderComponent={
                  <View marginB-s4>
                    <Text h2>Select categories</Text>
                    <Text small text2 marginT-s1>
                      Pick categories which you want to add in your store.{'\n'} Don't worry you can update it anytime.
                    </Text>
                    {error && <Alert error={{ message: 'Please select at-least one category', type: 'error' }} />}
                  </View>
                }
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View height={StyleSheet.hairlineWidth} marginV-s2 bg-border2 />}
                keyExtractor={keyCategoryItem}
                renderItem={renderCategoryItem}
              />
            </DataViewBridge>
          </View>
        </View>
      </Container>
      <View absB absL absR paddingH-s4>
        <PrimaryButton
          fullWidth
          loading={submitting}
          label={route?.params?.returnScreen?.stack ? 'Done' : 'Continue'}
          size={ButtonSize.large}
          iconPosition="right"
          iconSVG={ArrowRightOutlineSvgImage}
          onPress={handleSubmit}
        />
      </View>
    </LayoutWrapper>
  );
};
