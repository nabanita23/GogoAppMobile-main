import { ICategory } from '@/utils/types';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { BorderRadiuses, Checkbox, Colors, Text, View } from 'react-native-ui-lib';

const cardWidth = 54;

const CategorySelectionCard = ({
  data,
  onPress,
  selected,
}: {
  data: ICategory;
  onPress: ({ id, value }: { id: string; value: boolean }) => void;
  selected: boolean;
}) => {
  const [localSelected, setLocalSelected] = useState<boolean>(selected);
  const handlePress = () => {
    let tmp = !localSelected;
    onPress({ id: data?.id?.toString(), value: tmp });
    setLocalSelected(tmp);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <View row centerV spread>
        <View row centerV>
          <FastImage
            source={{ uri: data?.attributes?.images?.data?.[0]?.attributes?.formats?.thumbnail?.url }}
            style={{ width: cardWidth, height: cardWidth, borderRadius: BorderRadiuses.br20 }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View>
            <Text text1 body medium marginL-s2>
              {data?.attributes?.name}
            </Text>
            <Text text2 small marginL-s2>
              {data?.attributes?.itemCount}+ Products
            </Text>
          </View>
        </View>
        <View pointerEvents="none">
          <Checkbox value={localSelected} size={20} color={Colors.text1} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategorySelectionCard;
