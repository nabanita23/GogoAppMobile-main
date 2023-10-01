import React from 'react';
import FastImage from 'react-native-fast-image';
import { Spacings, Text, View } from 'react-native-ui-lib';

const FeatureCard = ({ data }: { data: any }) => {
  return (
    <View row marginB-s4>
      <View marginR-s4 top>
        <FastImage
          source={{ uri: data?.url }}
          style={{ width: 24, height: 24, marginTop: Spacings.s2 }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View>
        <Text h3 text1>
          {data?.title}
        </Text>
        <Text small text2>
          {data?.subtitle}
        </Text>
      </View>
    </View>
  );
};

export default FeatureCard;
