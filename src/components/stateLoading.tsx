import { useDimensions } from '@/hooks/useDimensions';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'react-native-ui-lib';

const StateLoading = () => {
  const { dim } = useDimensions();

  return (
    <View centerH>
      <ActivityIndicator />
    </View>
  );
};

export default StateLoading;
