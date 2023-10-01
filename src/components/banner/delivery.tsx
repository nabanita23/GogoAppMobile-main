import { useLoading } from '@/hooks/useLoading';
import { GET_CART } from '@/utils/apiPaths';
import { fetcher } from '@/utils/fetcher';
import { formatCurrency } from '@/utils/help';
import { IMerchant } from '@/utils/types';
import React from 'react';
import { ButtonSize, Colors, Switch, Text, View } from 'react-native-ui-lib';
import LottieAnimations from '../animations';
import SQCard from '../sqCard';

const Delivery = ({
  data,
  quickDelivery,
  cb,
}: {
  data: IMerchant;
  quickDelivery: boolean;
  cb: (val: boolean) => void;
}) => {
  const { loading, setLoadingTrue, setLoadingFalse } = useLoading();

  const handleQuickDelivery = async () => {
    let quickDeliveryEnabled = !quickDelivery;
    cb(quickDeliveryEnabled);
    setLoadingTrue();
    const { data: cartData, isError } = await fetcher(GET_CART, {
      method: 'PUT',
      body: { quickDelivery: quickDeliveryEnabled },
    });
    setLoadingFalse();
    if (!isError) {
      cb(cartData?.quickDelivery);
    }
  };

  return (
    <SQCard
      size={ButtonSize.small}
      backgroundColor={quickDelivery ? Colors.blue50 : Colors.screen1}
      borderColor={Colors.border1}>
      <View row centerV paddingH-s4 spread>
        <LottieAnimations
          name="delivery"
          height={60}
          width={60}
          loop={true}
          auto={false}
          playOnce={quickDelivery ? [41, 244] : [0, 40]}
        />
        <View marginR-s4 flex-G>
          <Text h3 text1>
            Quick delivery<Text red500> *</Text>
          </Text>
          <Text small text1>
            Get this order in 10 mins
          </Text>
          <Text xSmall text2>
            {loading
              ? 'Updating cart'
              : quickDelivery
              ? `${formatCurrency(data?.quickDeliveryFee)} applied`
              : `${formatCurrency(data?.quickDeliveryFee)} will be applicable`}
          </Text>
        </View>
        <View right>
          <Switch value={quickDelivery} onColor={Colors.blue600} onValueChange={handleQuickDelivery} />
        </View>
      </View>
    </SQCard>
  );
};

export default Delivery;
