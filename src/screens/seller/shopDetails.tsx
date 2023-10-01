import { AbstractSolidImage, ArrowRightOutlineSvgImage } from '@/components/SVGIcons';
import { PrimaryButton } from '@/components/button';
import Container from '@/components/container';
import DummyInputAsButton from '@/components/dummyInputAsButton';
import DummySpace from '@/components/dummySpace';
import { PageHeader } from '@/components/header';
import Input from '@/components/input';
import LayoutWrapper from '@/components/layoutWrapper';
import ScrollWrapper from '@/components/scrollWrapper';
import SQCard from '@/components/sqCard';
import useFetcher from '@/hooks/useFetcher';
import { useLoading } from '@/hooks/useLoading';
import { useServices } from '@/services';
import { useStores } from '@/stores';
import { IGoogleAddress } from '@/utils/address';
import { UPDATE_STORE_DATA } from '@/utils/apiPaths';
import { fetcher } from '@/utils/fetcher';
import { formatAddressFromGoogle } from '@/utils/help';
import { IAddress, IMerchant, MessageBoundary } from '@/utils/types';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { ButtonSize, Colors, Text, View } from 'react-native-ui-lib';

const initialSellerAddress: IAddress = {
  addressLine1: '',
  addressLine2: '',
  city: '',
  pinCode: '',
  landmark: '',
  addressByGoogle: null,
};

export const ShopDetails = observer(({ route }: { route: any }) => {
  const { user } = useStores();
  const { nav } = useServices();
  const { loading, setLoadingTrue, setLoadingFalse } = useLoading(false);
  const { data: sellerData, loading: fetchingSellerLoading } = useFetcher(
    user?.sellerBusinessStoreId ? `${UPDATE_STORE_DATA}/${user?.sellerBusinessStoreId}` : null,
  );

  const [sellerName, setSellerName] = useState<string>('');
  const [sellerNameError, setSellerNameError] = useState<MessageBoundary | null>(null);
  const [sellerAddress, setSellerAddress] = useState<IAddress>(initialSellerAddress);
  const [sellerAddressErrors, setSellerAddressErrors] = useState<any>(null);

  const updateSellerData = (key: keyof IAddress, value: string) => {
    setSellerAddress({ ...sellerAddress, [key]: value });
  };
  const updateSellerAddressErrors = (key: string, message: string) => {
    setSellerAddressErrors({ ...sellerAddressErrors, [key]: { type: 'error', message, inline: true } });
  };

  const handleSubmit = async () => {
    setSellerNameError(null);
    setSellerAddressErrors(null);
    if (!sellerName) {
      return setSellerNameError({ type: 'error', message: 'Please enter Shop name', inline: true });
    }
    if (!sellerAddress.addressLine1 || sellerAddress?.addressLine1?.length < 10) {
      return updateSellerAddressErrors('addressLine1', 'Please enter address');
    }
    if (!sellerAddress.landmark) {
      return updateSellerAddressErrors('landmark', 'Please enter locality');
    }
    if (!sellerAddress.city) {
      return updateSellerAddressErrors('city', 'Please enter city name');
    }
    if (!sellerAddress.pinCode) {
      return updateSellerAddressErrors('pinCode', 'Please enter valid Pin Code');
    }

    setLoadingTrue();
    const {
      data,
      isError,
      error: err,
    } = await fetcher<IMerchant>(
      user?.sellerBusinessStoreId ? `${UPDATE_STORE_DATA}/${user?.sellerBusinessStoreId}` : UPDATE_STORE_DATA,
      {
        method: user?.sellerBusinessStoreId ? 'PUT' : 'POST',
        body: { ...sellerAddress, name: sellerName },
      },
    );
    setLoadingFalse();
    if (isError) {
      err?.details?.errors?.map(item => updateSellerAddressErrors(item?.path[0], item?.message));
    } else {
      user?.setSellerBusinessStoreId(data?.id!);
      route?.params?.returnScreen?.stack
        ? nav.jump(route?.params?.returnScreen?.stack)
        : nav.push('SellerStack', { screen: 'SellerShopCategories' });
    }
  };

  useEffect(() => {
    setSellerName(sellerData?.name);
    setSellerAddress({
      addressLine1: sellerData?.addressLine1,
      addressLine2: sellerData?.addressLine2,
      city: sellerData?.city,
      pinCode: sellerData?.pinCode,
      landmark: sellerData?.landmark,
      formattedAddressByGoogle: sellerData?.formattedAddressByGoogle,
    });
  }, [sellerData]);

  useEffect(() => {
    if (route?.params?.address) {
      const formattedAddress = formatAddressFromGoogle(route?.params?.address?.address_components);
      setSellerAddress({
        city: formattedAddress?.locality as string,
        pinCode: formattedAddress?.postal_code as string,
        addressByGoogle: route?.params?.address,
      });
    }
  }, [route?.params?.address]);

  if (fetchingSellerLoading) {
    return <ActivityIndicator />;
  }

  return (
    <LayoutWrapper withSafeView>
      <Container>
        <PageHeader title="Basic Shop Details" />
        <ScrollWrapper>
          <View paddingV-s4>
            <Text h2>Store details</Text>
            <Text small text2 marginT-s1>
              Update your shop/store information
            </Text>
          </View>
          <SQCard backgroundColor={Colors.screen2} size={ButtonSize.large} borderColor={Colors.transparent}>
            <Input
              error={sellerNameError}
              placeholder="Shop full name"
              size={ButtonSize.small}
              value={sellerName}
              onChangeText={(value: string) => setSellerName(value)}
            />
            <DummySpace size="s4" />
            <DummyInputAsButton
              data={
                (route?.params?.address as IGoogleAddress) || {
                  formatted_address: sellerData?.formattedAddressByGoogle,
                }
              }
              placeholder="Shop address selector"
              size={ButtonSize.small}
              onPress={() =>
                nav?.push('ModalStack', {
                  screen: 'LocationSuggest',
                  params: {
                    returnScreen: {
                      stack: 'SellerStack',
                      screen: 'SellerShopDetails',
                    },
                  },
                })
              }
            />
            <DummySpace size="s4" />
            <Input
              keyboardType="default"
              placeholder="Address Line 1"
              size={ButtonSize.small}
              value={sellerAddress?.addressLine1 as string}
              error={sellerAddressErrors?.addressLine1}
              onChangeText={(value: string) => updateSellerData('addressLine1', value)}
            />
            <DummySpace size="s4" />
            <Input
              keyboardType="default"
              placeholder="Address Line 2"
              size={ButtonSize.small}
              value={sellerAddress?.addressLine2 as string}
              onChangeText={(value: string) => updateSellerData('addressLine2', value)}
            />
            <DummySpace size="s4" />
            <Input
              keyboardType="default"
              placeholder="Landmark"
              size={ButtonSize.small}
              value={sellerAddress?.landmark as string}
              error={sellerAddressErrors?.landmark}
              onChangeText={(value: string) => updateSellerData('landmark', value)}
            />
            <DummySpace size="s4" />
            <View row spread>
              <View marginR-s2>
                <Input
                  width="45%"
                  keyboardType="default"
                  placeholder="City"
                  size={ButtonSize.small}
                  value={sellerAddress?.city as string}
                  error={sellerAddressErrors?.city}
                  onChangeText={(value: string) => updateSellerData('city', value)}
                />
              </View>
              <View>
                <Input
                  width="45%"
                  keyboardType="default"
                  placeholder="Postal code"
                  size={ButtonSize.small}
                  value={sellerAddress?.pinCode as string}
                  error={sellerAddressErrors?.pinCode}
                  onChangeText={(value: string) => updateSellerData('pinCode', value)}
                />
              </View>
            </View>
          </SQCard>
        </ScrollWrapper>
      </Container>
      <View
        absT
        absR
        style={{
          transform: [{ translateX: 300 }, { translateY: -430 }, { rotate: '-40deg' }],
          zIndex: -1,
        }}>
        {AbstractSolidImage('red', 500)}
      </View>
      <View absB absL absR paddingH-s4 paddingB-s4 center>
        <PrimaryButton
          fullWidth
          loading={loading}
          label={route?.params?.returnScreen?.stack ? 'Done' : 'Save & Continue'}
          size={ButtonSize.large}
          iconPosition="right"
          iconSVG={ArrowRightOutlineSvgImage}
          onPress={handleSubmit}
        />
      </View>
    </LayoutWrapper>
  );
});
