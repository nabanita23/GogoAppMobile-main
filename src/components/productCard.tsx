import { useDimensions } from '@/hooks/useDimensions';
import { useStores } from '@/stores';
import { formatCurrency } from '@/utils/help';
import { IProduct } from '@/utils/types';
import React from 'react';
import { Spacings, Text, View } from 'react-native-ui-lib';
import ProgressiveImage from './progressiveImage';

const ProductQuantity = React.lazy(() => import('@/components/productQuantity'));

const ProductCard = ({ data, index, hasFilters = false }: { data: IProduct; index: number; hasFilters?: boolean }) => {
  const { dim } = useDimensions();
  const { user } = useStores();

  const cardSize = hasFilters ? (dim.width - 80 - Spacings.s2 * 3) * 0.5 : (dim.width - Spacings.s4 * 3) * 0.5;

  const styles = {
    withFilter: {
      marginRight: (index + 1) % 2 !== 0 ? Spacings.s1 : 0,
      marginLeft: (index + 1) % 2 === 0 ? Spacings.s1 : 0,
    },
    withoutFilter: {
      marginRight: (index + 1) % 2 !== 0 ? Spacings.s2 : 0,
      marginLeft: (index + 1) % 2 === 0 ? Spacings.s2 : 0,
    },
  };

  return (
    <View
      flex-1
      bg-screen1
      br30
      padding-s2
      style={[
        { maxWidth: cardSize },
        { ...(hasFilters ? styles.withFilter : styles.withoutFilter), overflow: 'hidden' },
      ]}>
      <View center height={cardSize * 0.75} width={cardSize} style={{ overflow: 'hidden' }}>
        <ProgressiveImage
          source={{ uri: data?.images?.[0]?.formats?.thumbnail?.url || data?.images?.[0]?.url }}
          thumbnailSource={{
            uri: data?.images?.[0]?.formats?.thumbnail?.url || data?.images?.[0]?.url,
          }}
          style={{
            height: cardSize * 0.75,
            width: cardSize,
            transform: [{ translateX: -10 }],
          }}
          resizeMode="contain"
        />
        {!!data?.discountPercent && (
          <View absT absL bg-blue600 padding-s1 width={30} br20>
            <Text center white xxSmall bold numberOfLines={1}>
              {`${data?.discountPercent}%`}
            </Text>
            <Text center white xxSmall>
              Off
            </Text>
          </View>
        )}
      </View>
      <View marginT-s2 marginB-s1>
        <View height={36}>
          <Text small medium text1 numberOfLines={2}>
            {data?.displayName}
          </Text>
        </View>
        <Text xSmall text1>
          {data?.quantityText}
        </Text>
        <View row marginV-s1>
          <View>
            <Text h3 bold text1>
              ₹{data?.sellingPrice}
            </Text>
          </View>
          <View marginL-s1>
            <Text xSmall text2 style={{ textDecorationLine: 'line-through' }}>
              {formatCurrency(data?.mrp)}
            </Text>
          </View>
        </View>
      </View>
      <ProductQuantity pid={data?.productId} sid={user?.currentStore} price={data?.sellingPrice} />
    </View>
  );
};

export default React.memo(ProductCard);
