import React from 'react';
import FastImage from 'react-native-fast-image';
import { Text, View } from 'react-native-ui-lib';

const Splash = () => {
  return (
    <View bg-black flex center>
      <FastImage
        style={{ width: 120, height: 120, borderRadius: 30 }}
        source={{
          uri: 'https://res.cloudinary.com/dxc5ccfcg/image/upload/v1685810830/logo_wjbge7',
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text white center style={{ fontSize: 16, fontFamily: 'Outfit-Regular', lineHeight: 16 * 1.3, marginTop: 10 }}>
        Your trusted {'\n'} Superstore
      </Text>
    </View>
  );
};

export default React.memo(Splash);
