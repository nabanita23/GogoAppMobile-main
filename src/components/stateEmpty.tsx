import { useDimensions } from '@/hooks/useDimensions';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import LottieAnimations from './animations';
import { CtaEmpty } from './ctaEmpty';
import DummySpace from './dummySpace';

const StateEmpty = () => {
  const [fakeLoading, setFakeLoading] = useState(true);
  const { dim } = useDimensions();

  useEffect(() => {
    const timeout = setTimeout(() => setFakeLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View center marginH-s8 height={dim.height * 0.65}>
      {fakeLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <LottieAnimations name="grocery" loop={true} auto width={dim.width * 0.35} height={dim.width * 0.35} />
          <DummySpace size="s8" />
          <Text body center text2>
            To begin the joy of shopping on your convenience. Add your nearby store now
          </Text>
          <DummySpace size="s4" />
          <CtaEmpty />
        </>
      )}
    </View>
  );
};

export default StateEmpty;
