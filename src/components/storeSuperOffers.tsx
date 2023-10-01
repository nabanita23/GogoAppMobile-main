import { useDimensions } from '@/hooks/useDimensions';
import { useServices } from '@/services';
import { banners } from '@/utils/categories';
import { ICategoryAttributes } from '@/utils/types';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { BorderRadiuses, Colors, Spacings, View } from 'react-native-ui-lib';
import ProgressiveImage from './progressiveImage';

const StoreSuperOffers = ({
  data,
}: {
  data: (Pick<ICategoryAttributes, 'bannerUrl' | 'name' | 'slug'> & { id: number })[];
}) => {
  const { dim } = useDimensions();
  const { nav } = useServices();
  const scrollX = useSharedValue(0);

  const slideWidth = dim.width * 0.825;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const barStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollX.value,
      [0, 320 * banners?.length], // Adjust the range as needed
      [0, 40], // Adjust the values as needed
    );
    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View centerH height={slideWidth / 2 + Spacings.s4 + 3}>
      <Animated.FlatList
        horizontal
        pagingEnabled
        snapToInterval={slideWidth + Spacings.s4}
        snapToAlignment="start"
        decelerationRate="normal"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        renderToHardwareTextureAndroid
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={item => item.slug}
        renderItem={({ item, index }) => (
          <View
            br60
            marginL-s4
            marginR-s4={index === data.length - 1}
            bg-screen2
            width={slideWidth}
            height={slideWidth / 2}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                nav.push('LooseStack', {
                  screen: 'ProductListing',
                  params: {
                    categoryId: item?.id,
                    categorySlug: item?.slug,
                    categoryName: item?.name,
                  },
                })
              }>
              <ProgressiveImage
                source={{ uri: item?.bannerUrl }}
                thumbnailSource={{ uri: item?.bannerUrl }}
                style={{ width: slideWidth, height: slideWidth / 2 }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        )}
      />
      <View height={3} width={40} bg-gray300 marginT-s4 br40 style={{ overflow: 'hidden' }}>
        <Animated.View style={[styles.barBaseStyle, barStyle]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barBaseStyle: {
    zIndex: 1,
    height: 3,
    width: 40 / banners?.length,
    borderRadius: BorderRadiuses.br40,
    backgroundColor: Colors.text1,
  },
});

export default StoreSuperOffers;
