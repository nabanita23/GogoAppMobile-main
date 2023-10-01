import React from 'react';
import { Text, View } from 'react-native-ui-lib';

const Divider = ({ label }: { label?: string }) => {
  return (
    <View row centerV marginV-s4>
      <View bg-grey50 flex-1 height={1} />
      {label && (
        <View center flexG>
          <Text center small text2 style={{ maxWidth: '90%' }}>
            {label}
          </Text>
        </View>
      )}
      <View bg-grey50 flex-1 height={1} />
    </View>
  );
};

export default Divider;
