import {
  ArrowRightOutlineSvgImage,
  CallOutlineSvgImage,
  CrossOutlineImage,
  LocationOutlineSvgImage,
  TickOutlineImage,
} from '@/components/SVGIcons';
import { BSheet } from '@/components/bSheet';
import { PrimaryButton, SecondaryButton } from '@/components/button';
import Container from '@/components/container';
import { PageHeader } from '@/components/header';
import LayoutWrapper from '@/components/layoutWrapper';
import ProgressiveImage from '@/components/progressiveImage';
import ReceivedItemSelectableCard from '@/components/receivedItemSelectableCard';
import StateEmpty from '@/components/stateEmpty';
import { useDimensions } from '@/hooks/useDimensions';
import { useLoading } from '@/hooks/useLoading';
import { useServices } from '@/services';
import { MY_RECEIVED_ORDERS } from '@/utils/apiPaths';
import { fromNow } from '@/utils/dayformat';
import { fetcher } from '@/utils/fetcher';
import { formatCurrency } from '@/utils/help';
import { getImageUrl, getThumbnailUrl } from '@/utils/imagePaths';
import { PureFunc } from '@/utils/types';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import openMap from 'react-native-open-maps';

import Pill from '@/components/button/pill';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Linking } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ButtonSize, Colors, Fader, Text, View } from 'react-native-ui-lib';

const OrderReceivedItemView = ({ route }: { route: any }) => {
  const { dim } = useDimensions();
  const { nav } = useServices();
  const bSheetRef = useRef<BottomSheetModal>(null);
  const bSheetCancelRef = useRef<BottomSheetModal>(null);
  const selectedProductItems = useRef<Record<string, boolean>>({});
  const { loading, setLoadingTrue, setLoadingFalse } = useLoading();
  const [orderStatus, setOrderStatus] = useState<string>('');
  const [orderDetails, setOrderDetails] = useState();

  const handleCall = () => {
    try {
      Linking.openURL(`tel://${orderDetails?.customer?.phoneNumber}`);
    } catch (error) {
      console.log('error', error);
    }
  };

  const openBottomSheet = () => bSheetRef?.current?.present();
  const closeBottomSheet = () => bSheetRef?.current?.close();

  const openCancelBottomSheet = () => bSheetCancelRef?.current?.present();
  const closeCancelBottomSheet = () => bSheetCancelRef?.current?.close();

  const submitCancel = () => {
    updateStatusRemote({ status: 'sellerCancelled', cb: () => setOrderStatus('sellerCancelled') });
  };

  const submitDispatch = (selectedProducts: string[]) => {
    updateStatusRemote({
      status: 'readyForDispatch',
      availableItems: selectedProducts,
      cb: () => {
        setOrderStatus('readyForDispatch');
        nav.pop();
      },
    });
  };

  const submitDelivered = () => {
    updateStatusRemote({
      status: 'delivered',
      cb: () => {
        setOrderStatus('delivered');
        nav.pop();
      },
    });
  };

  const updateStatusRemote = async ({
    status,
    availableItems = [],
    cb,
  }: {
    status: string;
    availableItems?: string[];
    cb: PureFunc;
  }) => {
    if (!status) {
      return;
    }
    setLoadingTrue();
    const { isError } = await fetcher(`${MY_RECEIVED_ORDERS}/${route?.params?.oid}`, {
      method: 'PUT',
      body: { status, availableItems },
    });
    setLoadingFalse();
    if (!isError) {
      cb?.();
      closeCancelBottomSheet();
    }
  };

  const getOrderedItems = async () => {
    setLoadingTrue();
    const { data, isError } = await fetcher(`${MY_RECEIVED_ORDERS}/${route?.params?.oid}`);
    setLoadingFalse();
    if (!isError) {
      setOrderDetails(data);
      setOrderStatus(data?.status);
    }
  };

  useEffect(() => {
    getOrderedItems();
  }, []);

  const handleSelect = ({ id, value }: { id: string; value: boolean }) => {
    selectedProductItems.current = { ...selectedProductItems.current, [id]: value };
  };

  const handleDispatchSubmit = (withConfirmation?: boolean) => {
    const x = Object.entries(selectedProductItems.current)?.filter(item => item[1]);
    const selectedProducts: string[] = x?.map(item => item[0]);
    if (!withConfirmation && selectedProducts?.length !== orderDetails?.orderItems?.length) {
      openBottomSheet();
      return;
    }
    submitDispatch(selectedProducts);
  };

  const RenderListHeaderComponent = useCallback(() => {
    return (
      <>
        <View row spread paddingH-s4 marginV-s4>
          <View width="66%">
            <Text small text1 marginB-s2>
              ID: #{orderDetails?.orderId}
            </Text>
            <View row centerV>
              <View>
                <Text h3 text1 numberOfLines={3}>
                  {orderDetails?.customer?.firstName + orderDetails?.customer?.lastName}
                </Text>
                <Text small text2>
                  {fromNow(orderDetails?.createdAt)}
                </Text>
              </View>
              <View marginL-s4>
                <Pill
                  label="Call"
                  backgroundColor={Colors.gray200}
                  onPress={handleCall}
                  iconPosition="left"
                  iconSVG={CallOutlineSvgImage}
                />
              </View>
            </View>
          </View>
          <View right>
            {orderStatus === 'sellerCancelled' || orderStatus === 'cancelled' ? (
              <Text h3 orange500>
                Cancelled
              </Text>
            ) : (
              <>
                {orderDetails?.status === 'pendingPayment' ? (
                  <Text h3 red500>
                    Not Paid
                  </Text>
                ) : (
                  <Text h3 green500>
                    Paid
                  </Text>
                )}
              </>
            )}
            <Text h3 marginT-s2>
              {formatCurrency(orderDetails?.value)}
            </Text>
            <Text small text2>
              {orderDetails?.orderItems?.length} items
            </Text>
          </View>
        </View>
        <View row padding-s4 bg-blue100 centerV>
          <View flexS>
            <Text h3 text1>
              Delivery Address:
            </Text>
            <Text small text1 marginT-s1>
              {orderDetails?.deliveryAddress?.formattedAddressByGoogle}
            </Text>
          </View>
          <View>
            <SecondaryButton
              iconSVG={LocationOutlineSvgImage}
              iconPosition="right"
              onPress={() =>
                openMap({
                  latitude: orderDetails?.deliveryAddress?.lat,
                  longitude: orderDetails?.deliveryAddress?.long,
                })
              }
            />
          </View>
        </View>
      </>
    );
  }, [orderDetails, orderStatus]);

  return (
    <LayoutWrapper withSafeView>
      <Container>
        <PageHeader
          title="Order Details"
          rightIcon={
            orderStatus === 'sellerCancelled' ||
            orderStatus === 'cancelled' ||
            orderStatus === 'delivered' ||
            orderStatus === 'closed'
              ? undefined
              : CrossOutlineImage
          }
          rightAction={openCancelBottomSheet}
        />
      </Container>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<StateEmpty />}
        data={orderDetails?.orderItems}
        ListHeaderComponent={RenderListHeaderComponent}
        renderItem={({ item, index }) => (
          <ReceivedItemSelectableCard
            item={item}
            cb={handleSelect}
            lastItem={orderDetails?.orderItems?.length - 1 === index}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
      <View>
        <Fader visible position={Fader.position.BOTTOM} tintColor={Colors.screen1} />
      </View>
      {!(orderStatus === 'sellerCancelled' || orderStatus === 'cancelled' || orderStatus === 'delivered') && (
        <Container>
          <PrimaryButton
            loading={loading}
            label={orderStatus === 'readyForDispatch' ? 'Mark Delivered ?' : 'Mark for dispatch ?'}
            size={ButtonSize.large}
            onPress={() => (orderStatus === 'readyForDispatch' ? submitDelivered() : handleDispatchSubmit())}
          />
        </Container>
      )}
      <BSheet
        ref={bSheetRef}
        points={['46%']}
        footer={
          <View spread row>
            <View marginR-s2 flexG>
              <SecondaryButton size={ButtonSize.large} label="Review" onPress={closeBottomSheet} />
            </View>
            <View marginL-s2 flexG>
              <PrimaryButton
                backgroundColor={Colors.green600}
                size={ButtonSize.large}
                label="Proceed"
                onPress={() => handleDispatchSubmit(true)}
                iconPosition="right"
                iconSVG={ArrowRightOutlineSvgImage}
              />
            </View>
          </View>
        }>
        <View spread centerH>
          <ProgressiveImage
            source={{ uri: getImageUrl('gogoConfused') }}
            thumbnailSource={{ uri: getThumbnailUrl('gogoConfused') }}
            style={{ width: dim.width * 0.5, height: dim.width * 0.5 }}
            resizeMode="cover"
          />
          <Text text1 body center marginB-s4>
            Some items are not marked for delivery? Please confirm if you have reviewed the order list
          </Text>
        </View>
      </BSheet>
      <BSheet
        ref={bSheetCancelRef}
        points={['30%']}
        footer={
          <View spread row>
            <View marginR-s2 flexG>
              <SecondaryButton
                size={ButtonSize.large}
                label="No"
                onPress={closeCancelBottomSheet}
                iconPosition="left"
                iconSVG={TickOutlineImage}
              />
            </View>
            <View marginL-s2 flexG>
              <PrimaryButton
                loading={loading}
                backgroundColor={Colors.red600}
                size={ButtonSize.large}
                label="Cancel"
                onPress={submitCancel}
                iconPosition="left"
                iconSVG={CrossOutlineImage}
              />
            </View>
          </View>
        }>
        <View spread centerH>
          <Text text1 h1 center marginV-s4>
            Are you sure!
          </Text>
          <Text text1 body center>
            Please confirm if you want to{'\n'} cancel this order
          </Text>
        </View>
      </BSheet>
    </LayoutWrapper>
  );
};

export default OrderReceivedItemView;
