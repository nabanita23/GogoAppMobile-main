import { useStores } from '@/stores';
import { IProductFilter } from '@/utils/types';
import React from 'react';
import { ButtonSize, Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import ProgressiveImage from './progressiveImage';
import SQCard from './sqCard';

const FilterCard: React.FC<{ data: IProductFilter; selected: boolean; onPress: () => void }> = ({
  data,
  selected,
  onPress,
}) => {
  const { ui } = useStores();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View
        marginB-s4
        style={{
          ...(selected && {
            borderRightColor: Colors.text1,
            borderRightWidth: 1,
          }),
        }}>
        <View paddingH-s2 centerH>
          <SQCard
            backgroundColor={Colors.transparent}
            borderColor={ui.appearance === 'light' ? Colors.transparent : Colors.border1}
            size={ButtonSize.xSmall}>
            <ProgressiveImage
              source={{ uri: data?.images?.[0]?.formats?.thumbnail?.url }}
              thumbnailSource={{ uri: data?.images?.[0]?.formats?.thumbnail?.url }}
              style={{ height: 56, width: 56 }}
              resizeMode="contain"
            />
          </SQCard>
        </View>
        <Text center xSmall marginH-s2 text1 numberOfLines={2}>
          {data?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FilterCard;
