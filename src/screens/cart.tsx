import {
  AbstractSolidImage,
  ArrowRightOutlineSvgImage,
  LocationOutlineSvgImage,
  PlusOutlineSvgImage,
  TickOutlineImage,
} from '@/components/SVGIcons';
import { BSheet } from '@/components/bSheet';
import Delivery from '@/components/banner/delivery';
import { PrimaryButton, SecondaryButton } from '@/components/button';
import CartCalculation from '@/components/cartCalculation';
import CartItemCard from '@/components/cartItemCard';
import Container from '@/components/container';
import DataViewBridge from '@/components/dataViewBridge';
import Divider from '@/components/divider';
import DummySpace from '@/components/dummySpace';
import { PageHeader } from '@/components/header';
import LayoutWrapper from '@/components/layoutWrapper';
import CartShimmer from '@/components/shimmer/cartShimmer';
import StateEmpty from '@/components/stateEmpty';
import { useDebounce } from '@/hooks/useDebounce';
import { useLoading } from '@/hooks/useLoading';
import { useServices } from '@/services';
import { useStores } from '@/stores';
import { GET_CART, PLACE_ORDER } from '@/utils/apiPaths';
import { fetcher } from '@/utils/fetcher';
import { formatCurrency } from '@/utils/help';
import { ICartData } from '@/utils/types';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useToast } from 'react-native-toast-notifications';
import { ButtonSize, Colors, Spacings, Text, View } from 'react-native-ui-lib';
import AnimatedNumber from 'rn-animated-number';

export const Cart = observer(() => {
  const { cart } = useStores();
  const { nav } = useServices();
  const scrollY = useSharedValue(0);
  const toast = useToast();
  const bSheetRef = useRef<BottomSheetModal>(null);
  const firstLoadingRef = useRef<boolean>(true);
  const { loading, setLoadingTrue, setLoadingFalse } = useLoading(false);
  const [cartData, setCartData] = useState<ICartData>();
  const [quickDelivery, setQuickDelivery] = useState<boolean>(false);

  const openConfirmBottomSheet = () => bSheetRef?.current?.present();
  const closeConfirmBottomSheet = () => bSheetRef?.current?.close();

  const refreshCart = async () => {
    const { data, isError } = await fetcher<ICartData>(GET_CART);
    if (!isError) {
      setQuickDelivery(data?.quickDelivery!);
      setCartData(data);
    }
  };

  const placeOrder = async () => {
    if (cart.totalPrice !== 0) {
      setLoadingTrue();
      const { data, isError, error } = await fetcher(PLACE_ORDER, { method: 'POST' });
      setLoadingFalse();
      if (!isError && data?.order?.id) {
        cart?.init({}, 0, 0);
        closeConfirmBottomSheet();
        setTimeout(() => nav.push('LooseStack', { screen: 'OrderSuccess' }), 200);
      } else {
        toast.show(error?.message!, { type: 'error', id: 'error' });
      }
    }
  };

  const debouncedRefreshCart = useDebounce(refreshCart);

  useEffect(() => {
    debouncedRefreshCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart?.totalUnits, quickDelivery]);

  useEffect(() => {
    debouncedRefreshCart();
    setTimeout(() => {
      firstLoadingRef.current = false;
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Define the scroll handler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Define the animated style for the header
  const headerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, 100], // Adjust the range as needed
      [1, 0], // Adjust the values as needed
      Extrapolate.CLAMP,
    );
    const scale = interpolate(
      scrollY.value,
      [0, 100], // Adjust the range as needed
      [1, 0], // Adjust the values as needed
    );
    const translateY = interpolate(
      scrollY.value,
      [0, 100], // Adjust the range as needed
      [0, -300], // Adjust the values as needed
    );
    return {
      opacity,
      transform: [{ translateY }, { scale }],
    };
  });

  const AnimPrice = useCallback(({ value }: { value: number }) => {
    return (
      <AnimatedNumber
        textStyle={{ color: Colors.text1, fontSize: value > 10000 ? 18 : 20, fontFamily: 'Outfit-Bold' }}
        format={'₹ %&%'}
        duration={0.5}
        value={value}
      />
    );
  }, []);

  return (
    <LayoutWrapper withSafeView>
      <Animated.View style={[styles.abstractStyle, headerStyle]}>{AbstractSolidImage('red', 300)}</Animated.View>
      <Container>
        <PageHeader
          title="Cart"
          subtitle={cartData?.lastSelectedMerchant?.name}
          rightAction={() => nav.jump('ShopNavigator', { screen: 'shop' })}
          rightIcon={PlusOutlineSvgImage}
        />
      </Container>
      <DataViewBridge
        loading={firstLoadingRef.current}
        loadingComponent={<CartShimmer />}
        empty={cartData?.totalItems === 0 || cart?.totalUnits === 0}
        emptyComponent={<StateEmpty />}>
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          data={cartData?.items}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingHorizontal: Spacings.s4 }}
          keyExtractor={item => item?.product?.productId}
          renderItem={({ item }) => {
            return cart.quantity(item?.product?.productId) !== 0 ? <CartItemCard data={item} cb={refreshCart} /> : null;
          }}
          ListFooterComponent={
            <>
              <DummySpace size="s4" />
              <Delivery data={cartData?.lastSelectedMerchant!} quickDelivery={quickDelivery} cb={setQuickDelivery} />
              <View marginV-s8>
                <CartCalculation cartData={cartData} />
              </View>
            </>
          }
        />
        <View paddingH-s4 paddingT-s4 style={{ borderTopColor: Colors.border2, borderTopWidth: 1 }}>
          <View row marginB-s4 centerV>
            <View flexS row centerV>
              {LocationOutlineSvgImage(Colors.text1, 16)}
              <Text small text1 marginL-s1 numberOfLines={2} width={'75%'}>
                {cartData?.userAddress?.formattedAddressByGoogle || cartData?.unsavedAddress?.formattedAddressByGoogle}
              </Text>
            </View>
            <View flexS width={100}>
              <SecondaryButton
                label="Change"
                size={ButtonSize.xSmall}
                onPress={() => nav.push('LooseStack', { screen: 'AddressSelection' })}
              />
            </View>
          </View>
          <View row spread centerV>
            <View flexS paddingR-s4 width={120}>
              <Text body text2>
                Total
              </Text>
              <AnimPrice value={cartData?.grandTotal!} />
            </View>
            <View flexG>
              {cartData?.userAddress?.formattedAddressByGoogle ? (
                <PrimaryButton
                  label="Confirm Order"
                  backgroundColor={Colors.green600}
                  size={ButtonSize.large}
                  onPress={openConfirmBottomSheet}
                  iconPosition="right"
                  iconSVG={ArrowRightOutlineSvgImage}
                />
              ) : (
                <PrimaryButton
                  label="Update Address"
                  size={ButtonSize.large}
                  onPress={() =>
                    nav.push('LooseStack', {
                      screen: 'AddressSelection',
                      params: { address: cartData?.unsavedAddress },
                    })
                  }
                />
              )}
            </View>
          </View>
        </View>
      </DataViewBridge>
      <BSheet
        ref={bSheetRef}
        points={['40%']}
        footer={
          <View spread centerV row>
            <View marginR-s2 flexS>
              <SecondaryButton size={ButtonSize.large} label="Cancel" onPress={closeConfirmBottomSheet} />
            </View>
            <View marginL-s2 flexG>
              <PrimaryButton
                loading={loading}
                disabled={cart.totalPrice === 0}
                size={ButtonSize.large}
                backgroundColor={Colors.green600}
                label="Order Now"
                onPress={placeOrder}
                iconSVG={TickOutlineImage}
                iconPosition="right"
              />
            </View>
          </View>
        }>
        <View flexG spread centerH bottom>
          <Text text1 body center marginV-s2>
            Placing Order?
          </Text>
          <Divider />
          <Text h1 text1 marginT-s2>
            Pay {formatCurrency(cartData?.grandTotal!)}
          </Text>
          <Text text2 body center marginT-s4>
            You can pay directly to seller{'\n'} via cash or UPI
          </Text>
        </View>
      </BSheet>
    </LayoutWrapper>
  );
});

const styles = StyleSheet.create({
  abstractStyle: {
    ...StyleSheet.absoluteFillObject,
    left: 180,
    top: -280,
    zIndex: -1,
  },
});
