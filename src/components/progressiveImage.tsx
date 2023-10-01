import React, { useCallback, useRef, useState } from 'react';
import { Animated, ImageProps, StyleSheet } from 'react-native';
import { Colors, Image, View } from 'react-native-ui-lib';
import SQCard from './sqCard';

export const blurredImage = 'https://res.cloudinary.com/dxc5ccfcg/image/upload/v1688394153/fallback_hgiyon.png';

interface IProgressiveImage {
  thumbnailSource?: {
    uri?: string;
  };
  source?: {
    uri?: string;
  };
}

const ProgressiveImage: React.FC<IProgressiveImage & ImageProps> = ({ thumbnailSource, source, style, ...props }) => {
  const [error, setError] = useState(!source?.uri);

  const thumbnailAnimated = useRef(new Animated.Value(0)).current;

  const imageAnimated = useRef(new Animated.Value(0)).current;

  const FallbackImage = useCallback(
    () => (
      <View style={[{ ...StyleSheet.absoluteFillObject }]}>
        <SQCard backgroundColor={Colors.transparent} borderColor={Colors.border1}>
          <Image source={{ uri: blurredImage }} style={style} />
        </SQCard>
      </View>
    ),
    [style],
  );

  const handleImageError = () => {
    setError(true);
  };

  const handleThumbnailLoad = () => {
    Animated.timing(thumbnailAnimated, {
      useNativeDriver: true,
      toValue: 1,
      duration: 2000,
    }).start();
  };

  const onImageLoad = () => {
    Animated.timing(thumbnailAnimated, {
      useNativeDriver: true,
      toValue: 0,
    }).start();
    Animated.timing(imageAnimated, { useNativeDriver: true, toValue: 1 }).start();
  };

  return (
    <View>
      {thumbnailSource && (
        <Animated.Image
          {...props}
          source={thumbnailSource}
          style={[style, { opacity: thumbnailAnimated }]}
          onLoad={handleThumbnailLoad}
          blurRadius={1}
        />
      )}
      {error ? (
        <FallbackImage />
      ) : (
        <Animated.Image
          {...props}
          source={source}
          style={[{ ...StyleSheet.absoluteFillObject }, { opacity: imageAnimated }, style]}
          onLoad={onImageLoad}
          onError={handleImageError}
        />
      )}
    </View>
  );
};

export default React.memo(ProgressiveImage);
