import { PureFunc } from '@/utils/types';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { ButtonSize, Checkbox, Colors, Text, View } from 'react-native-ui-lib';
import SQCard from './sqCard';

const SelectionCard = ({
  last,
  title,
  subtitle,
  onPress,
  svgIcon,
  bgColor,
}: {
  last?: boolean;
  title: string;
  subtitle: string;
  onPress: PureFunc;
  svgIcon: Function;
  bgColor: string;
}) => {
  const [select, setSelect] = useState<boolean>(false);

  const handlePress = () => {
    setSelect(!select);
    onPress();
  };

  return (
    <Pressable onPress={handlePress}>
      <View marginR-s4={!last} marginB-s2>
        <SQCard backgroundColor={bgColor} borderColor={Colors.transparent} size={ButtonSize.medium}>
          <View height={110} width={110}>
            <View row centerV spread marginB-s4>
              {svgIcon(Colors.text1, 20)}
              <Checkbox value={select} size={20} color={Colors.text1} />
            </View>
            <Text text1 body medium marginB-s1>
              {title}
            </Text>
            <Text text2 text1>
              {subtitle}
            </Text>
          </View>
        </SQCard>
      </View>
    </Pressable>
  );
};

export default SelectionCard;
