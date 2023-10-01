import React from 'react';
import { Text, View } from 'react-native-ui-lib';

const Headline = ({ center, title, subtitle }: { center?: boolean; title: string; subtitle?: string }) => {
  return (
    <View center={center}>
      <Text text1 h1 center={center}>
        {title}
      </Text>
      <Text body text2 center={center}>
        {subtitle}
      </Text>
    </View>
  );
};

export default Headline;
