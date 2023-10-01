import { PageHeader } from '@/components/header';
import LayoutWrapper from '@/components/layoutWrapper';
import ProgressiveImage from '@/components/progressiveImage';
import SQCard from '@/components/sqCard';
import { useDimensions } from '@/hooks/useDimensions';
import React from 'react';
import { ButtonSize, Colors, View } from 'react-native-ui-lib';

export const ShowQR = () => {
  const { dim } = useDimensions();
  return (
    <LayoutWrapper withSafeView withContainer>
      <PageHeader title="Vishal Provision Store" />
      <View center height={dim.height - 40}>
        <SQCard backgroundColor={Colors.white} size={ButtonSize.large}>
          <ProgressiveImage
            source={{
              uri: 'https://res.cloudinary.com/dxc5ccfcg/image/upload/v1684306137/Vishal_GoGoApp_v214m8',
            }}
            thumbnailSource={{
              uri: 'https://res.cloudinary.com/dxc5ccfcg/image/upload/v1684306137/Vishal_GoGoApp_v214m8',
            }}
            style={{ width: dim.width * 0.55, height: dim.width * 0.55 }}
            resizeMode="contain"
          />
        </SQCard>
      </View>
    </LayoutWrapper>
  );
};
