import { useDimensions } from '@/hooks/useDimensions';
import { getPadding } from '@/utils/help';
import { ICategory, PureFunc } from '@/utils/types';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { BorderRadiuses, ButtonSize, Colors, Spacings, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import SQCard from './sqCard';

export interface ICategoryCard {
  data: ICategory;
  last?: boolean;
  disabled?: boolean;
  onPress?: PureFunc;
}

const CategoryCard: React.FC<ICategoryCard> = ({ data, disabled, onPress }) => {
  const { dim } = useDimensions();

  const gridColumnCount = 4;

  const sqCardPadding: ButtonSize = ButtonSize.xSmall;

  const cardWidth = (dim.width - Spacings.s4 * (gridColumnCount + 1)) / gridColumnCount - getPadding(sqCardPadding) * 2;
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} activeOpacity={0.8}>
      <View centerH>
        <SQCard backgroundColor={Colors.transparent} borderColor={Colors.border1} size={sqCardPadding}>
          <FastImage
            source={{ uri: data?.attributes?.images?.data?.[0]?.attributes?.formats?.thumbnail?.url }}
            style={{ width: cardWidth, height: cardWidth, borderRadius: BorderRadiuses.br20 }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </SQCard>
        <Text center small medium text1 marginT-s1 numberOfLines={2} style={{ maxWidth: cardWidth }}>
          {data?.attributes?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(CategoryCard);
