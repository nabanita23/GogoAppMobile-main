import React from 'react';
import { View } from 'react-native-ui-lib';

const Container = ({ children }: { children: React.ReactNode }) => {
  return <View paddingH-s4>{children}</View>;
};

export default Container;
