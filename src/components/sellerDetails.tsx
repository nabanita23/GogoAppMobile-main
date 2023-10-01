import { useDimensions } from '@/hooks/useDimensions';
import { IAddress, IMerchant } from '@/utils/types';
import React from 'react';
import { ButtonSize, Colors, Text, View } from 'react-native-ui-lib';
import DummySpace from './dummySpace';
import ProgressiveImage from './progressiveImage';
import SQCard from './sqCard';

const SellerDetails: React.FC<{ data: IMerchant & IAddress; forShare?: boolean }> = ({ data, forShare = false }) => {
  const { dim } = useDimensions();

  return (
    <View flexG padding-s4>
      <View flexG center>
        <SQCard
          backgroundColor={Colors.screen1}
          size={ButtonSize.small}
          borderColor={forShare ? Colors.screen1 : Colors.border1}>
          <ProgressiveImage
            source={{
              uri: data?.qrcodeImage?.formats?.medium?.url,
            }}
            thumbnailSource={{
              uri: data?.qrcodeImage?.formats?.thumbnail?.url,
            }}
            style={{ width: dim.width * 0.45, height: dim.width * 0.45 }}
            resizeMode="contain"
          />
        </SQCard>
      </View>
      <DummySpace size="s6" />
      <View flexG>
        <Text h1 text1 center>
          {data?.name}
        </Text>
        <Text body text2 center>
          {data?.addressLine1} {data?.addressLine2} {data?.locality} {'\n'} {data?.city} {data?.pinCode}
        </Text>
        <Text body text2 center marginV-s4>
          {`www.mygogo.app/store/${data?.id}`}
        </Text>
      </View>
    </View>
  );
};

export default SellerDetails;
