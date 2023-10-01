import { fromNow } from '@/utils/dayformat';
import { formatCurrency, formatPhoneNumber } from '@/utils/help';
import { IPlacedOrder } from '@/utils/types';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ButtonSize, Colors, Spacings, Text, View } from 'react-native-ui-lib';
import { ArrowRightOutlineSvgImage } from './SVGIcons';
import SQCard from './sqCard';

const imageDisplayLimit = 3;

const OrderReceivedItemCard = ({
  data,
  total,
  cb,
}: {
  data: IPlacedOrder;
  index: number;
  total: number;
  cb?: () => void;
}) => {
  return (
    <TouchableOpacity onPress={cb}>
      <SQCard size={ButtonSize.large} backgroundColor={Colors.screen1} borderColor={Colors.border1}>
        <View row spread>
          <View width="66%">
            <Text small text1 marginB-s2>
              ID: #{data?.orderId}
            </Text>
            <Text h3 text1 numberOfLines={3}>
              {data?.customer?.firstName + data?.customer?.lastName || formatPhoneNumber(data?.customer?.phoneNumber)}
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
                {data?.status === 'pendingPayment' ? (
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
              {formatCurrency(total)}
            </Text>
            <Text small text2>
              {data?.orderItems?.length} items
            </Text>
          </View>
        </View>
        <View row flexG marginT-s2>
          {data?.orderItems.slice(0, imageDisplayLimit)?.map?.((order, index) => (
            <View
              br60
              center
              bg-screen1
              key={`order-${order.id}`}
              style={{
                overflow: 'hidden',
                marginRight: -Spacings.s2,
                zIndex: index,
                borderColor: Colors.border2,
                borderWidth: StyleSheet.hairlineWidth,
              }}>
              <FastImage
                source={{
                  uri: order?.product?.images?.[0]?.formats?.thumbnail?.url || order?.product?.images?.[0]?.url,
                }}
                style={{ height: 34, width: 34 }}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          ))}
          {data?.orderItems?.length > imageDisplayLimit && (
            <View
              br60
              center
              bg-screen1
              height={35}
              width={35}
              style={{ zIndex: imageDisplayLimit, borderColor: Colors.border1, borderWidth: StyleSheet.hairlineWidth }}>
              <Text small text1>{`+${data?.orderItems?.length - imageDisplayLimit}`}</Text>
            </View>
          )}
          <View flexG right>
            <View centerV right height={35} width={35} style={{ zIndex: imageDisplayLimit }}>
              {ArrowRightOutlineSvgImage(Colors.text1, 20)}
            </View>
          </View>
        </View>
      </SQCard>
    </TouchableOpacity>
  );
};

export default OrderReceivedItemCard;
