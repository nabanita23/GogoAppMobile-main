import { useDimensions } from '@/hooks/useDimensions';
import { getImageUrl, getThumbnailUrl } from '@/utils/imagePaths';
import React from 'react';
import { View } from 'react-native-ui-lib';
import DummySpace from './dummySpace';
import Headline from './headline';
import ProgressiveImage from './progressiveImage';

const StateInProgress = () => {
  const { dim } = useDimensions();

  return (
    <View centerH>
      <DummySpace size="s8" />
      <ProgressiveImage
        source={{ uri: getImageUrl('gogoSearch') }}
        thumbnailSource={{ uri: getThumbnailUrl('gogoSearch') }}
        style={{ width: dim.width * 0.75, height: dim.width * 0.75 }}
        resizeMode="cover"
      />
      <Headline title="Coming soon" subtitle="in 15 days" center />
    </View>
  );
};

export default StateInProgress;
