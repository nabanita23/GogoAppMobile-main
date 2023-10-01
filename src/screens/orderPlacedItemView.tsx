import { ShopOutlineSvgImage } from '@/components/SVGIcons';
import { PrimaryButton } from '@/components/button';
import CartCalculation from '@/components/cartCalculation';
import CartItemCard from '@/components/cartItemCard';
import Container from '@/components/container';
import { PageHeader, SectionHeader } from '@/components/header';
import LayoutWrapper from '@/components/layoutWrapper';
import ScrollWrapper from '@/components/scrollWrapper';
import { useDimensions } from '@/hooks/useDimensions';
import useFetcher from '@/hooks/useFetcher';
import { useLoading } from '@/hooks/useLoading';
import { useServices } from '@/services';
import { useStores } from '@/stores';
import { ICartStore } from '@/stores/cart';
import { MY_PLACED_ORDERS_DETAILS, REORDER } from '@/utils/apiPaths';
import { fetcher } from '@/utils/fetcher';
import { ICartData, ICartItem, IPlacedOrder } from '@/utils/types';
import React from 'react';
import { ButtonSize, Colors, Fader, Text, Timeline, View } from 'react-native-ui-lib';

const OrderPlacedItemView = ({ route }: { route: any }) => {
  const { dim } = useDimensions();
  const { nav } = useServices();
  const { user, cart } = useStores();
  const { loading, setLoadingTrue, setLoadingFalse } = useLoading();

  const { data, loading: loadingPlacedOrder }: { data: IPlacedOrder & ICartData; loading: boolean } = useFetcher(
    `${MY_PLACED_ORDERS_DETAILS}${route?.params?.oid}`,
  );

  const handleReorder = async () => {
    setLoadingTrue();
    const { data: reorderData, isError } = await fetcher(`${REORDER}${route?.params?.oid}`, { method: 'POST' });
    setLoadingFalse();
    if (!isError) {
      user?.setCurrentStore(reorderData?.lastSelectedMerchant?.id, reorderData?.lastSelectedMerchant?.name);
      const tmp: ICartStore = {};
      if (reorderData?.items) {
        reorderData?.items?.forEach((item: ICartItem) => {
          tmp[item?.product?.productId] = item?.quantity;
        });
        cart?.init?.(tmp, reorderData?.totalItems, reorderData?.total);
      }
      nav.push('LooseStack', { screen: 'Cart' });
    }
  };

  return (
    <LayoutWrapper withContainer withSafeView>
      <PageHeader title="Order Details" subtitle={`# ${route?.params?.orderLongId || data?.orderId}`} />
      <ScrollWrapper>
        <View style={{ marginLeft: -20 }}>
          <Timeline
            point={{
              color: Colors.text1,
            }}
            bottomLine={{ type: Timeline.lineTypes.DASHED, entry: false, color: Colors.text1 }}>
            <Text h3 uppercase>
              {data?.merchant?.name}
            </Text>
            <Text small text2 numberOfLines={1}>
              {data?.merchant?.locality}
            </Text>
          </Timeline>
          <Timeline
            point={{
              color: Colors.text1,
            }}
            topLine={{
              type: Timeline.lineTypes.DASHED,
              entry: false,
              color: Colors.text1,
            }}>
            <Text h3 uppercase>
              {data?.deliveryAddress?.type}
            </Text>
            <Text small text2 numberOfLines={1}>
              {data?.deliveryAddress?.formattedAddressByGoogle}
            </Text>
          </Timeline>
        </View>
        <SectionHeader
          primaryTitle="Ordered Items"
          secondaryTitle={`(${data?.orderItems?.length} items)`}
          enableSecondaryIcon={false}
        />
        {data?.orderItems?.map?.(order => (
          <CartItemCard key={`order-item-${order?.id}`} readonly data={order} />
        ))}
        <View marginV-s4>
          <CartCalculation cartData={data} />
        </View>
      </ScrollWrapper>
      <View absB width={dim.width} bg-screen1>
        <View>
          <Fader visible position={Fader.position.BOTTOM} tintColor={Colors.screen1} />
        </View>
        <Container>
          <PrimaryButton
            loading={loading}
            label="Re-order"
            size={ButtonSize.large}
            iconPosition="right"
            iconSVG={ShopOutlineSvgImage}
            onPress={handleReorder}
          />
        </Container>
      </View>
    </LayoutWrapper>
  );
};

export default OrderPlacedItemView;
