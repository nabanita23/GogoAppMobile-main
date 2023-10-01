import { useServices } from '@/services';
import { fromNow } from '@/utils/dayformat';
import { formatCurrency } from '@/utils/help';
import { IPlacedOrder } from '@/utils/types';
import React from 'react';
import { ButtonSize, Colors, Text, View } from 'react-native-ui-lib';
import { ShopOutlineSvgImage } from './SVGIcons';
import { PrimaryButton, SecondaryButton } from './button';
import ClubbedThumbnails from './clubbedThumbnails';
import SQCard from './sqCard';

const OrderPlacedItemCard = ({ data, total }: { data: IPlacedOrder; total: number }) => {
  const { nav } = useServices();
  return (
    <SQCard
      size={ButtonSize.large}
      backgroundColor={Colors.screen1}
      shadowColor={Colors.gray300}
      borderColor={Colors.transparent}>
      <View row spread>
        <View width={'66%'}>
          <Text small text1 marginB-s2>
            ID: #{data?.orderId}
          </Text>
          <Text h3 text1 numberOfLines={3}>
            {data?.merchant?.name}
          </Text>
          <Text small text2>
            {fromNow(data?.createdAt)}
          </Text>
        </View>
        <View right>
          {data?.status === 'sellerCancelled' || data?.status === 'cancelled' ? (
            <Text h3 orange500>
              Cancelled
            </Text>
          ) : (
            <>
              {data?.status !== 'pendingPayment' ? (
                <Text h3 green500>
                  Paid
                </Text>
              ) : (
                <Text h3 red500>
                  Not Paid
                </Text>
              )}
            </>
          )}
          <Text h3 marginT-s2>
            {formatCurrency(total)}
          </Text>
        </View>
      </View>
      <ClubbedThumbnails data={data} imageDisplayLimit={3} />
      <View row>
        <View flexG marginR-s2>
          <SecondaryButton
            label="Details"
            onPress={() =>
              nav.push('LooseStack', {
                screen: 'OrderPlacedItemView',
                params: { orderLongId: data?.orderId, oid: data?.id },
              })
            }
          />
        </View>
        <View flexG marginL-s2>
          <PrimaryButton
            label="Re-order"
            iconPosition="right"
            iconSVG={ShopOutlineSvgImage}
            onPress={() =>
              nav.push('LooseStack', {
                screen: 'OrderPlacedItemView',
                params: { sid: data?.merchant?.id, oid: data?.id },
              })
            }
          />
        </View>
      </View>
    </SQCard>
  );
};

export default OrderPlacedItemCard;
