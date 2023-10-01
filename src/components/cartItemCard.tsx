import { useDimensions } from '@/hooks/useDimensions';
import { formatCurrency } from '@/utils/help';
import { ICartItem, PureFunc } from '@/utils/types';
import React, { Suspense } from 'react';
import { ActivityIndicator } from 'react-native';
import { Spacings, Text, View } from 'react-native-ui-lib';
import ProductQuantity from './productQuantity';
import ProgressiveImage from './progressiveImage';

type ICartItemCard = {
  data: ICartItem;
  cb?: PureFunc;
  readonly?: boolean;
};

const CartItemCard: React.FC<ICartItemCard> = ({ data, cb, readonly = false }) => {
  const { dim } = useDimensions();

  return (
    <View row paddingV-s2 centerV top={readonly}>
      <View center flexS style={{ marginRight: Spacings.s4 }}>
        <ProgressiveImage
          source={{
            uri:
              data?.product?.images?.[0]?.formats?.medium?.url ||
              data?.product?.images?.[0]?.formats?.thumbnail?.url ||
              data?.product?.images?.[0]?.url,
          }}
          thumbnailSource={{
            uri:
              data?.product?.images?.[0]?.formats?.medium?.url ||
              data?.product?.images?.[0]?.formats?.thumbnail?.url ||
              data?.product?.images?.[0]?.url,
          }}
          style={{ height: dim.width * 0.15, width: dim.width * 0.15 }}
          resizeMode="contain"
        />
      </View>
      <View flex-1 marginH-s2={!readonly}>
        <Text body medium text1 numberOfLines={1} ellipsizeMode="tail">
          {data?.product?.displayName}
        </Text>
        <View row={readonly} centerV>
          <Text xSmall text1 marginR-s2={!readonly} marginB-s1>
            {data?.product?.quantityText}
          </Text>
          <View row centerV={readonly}>
            <Text small bold text1>
              {formatCurrency(data?.sellingPrice)}
            </Text>
            {!!data?.discountPercent && (
              <Text xSmall marginL-s1 text2 style={{ textDecorationLine: 'line-through' }}>
                {formatCurrency(data?.mrp)}
              </Text>
            )}
            {readonly && (
              <Text xSmall text2 marginL-s1>
                (Qty. :{data?.quantity})
              </Text>
            )}
          </View>
        </View>
      </View>
      <View flexS marginL-s4>
        {!readonly ? (
          <Suspense fallback={<ActivityIndicator />}>
            <ProductQuantity
              slim
              pid={data?.product?.productId}
              sid={parseInt(data?.storeId)}
              price={data?.sellingPrice}
              cb={cb}
            />
          </Suspense>
        ) : (
          <Text small bold right>
            {formatCurrency(data?.quantity * data?.sellingPrice)}
          </Text>
        )}
      </View>
    </View>
  );
};

export default CartItemCard;
