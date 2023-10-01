import { useLoading } from '@/hooks/useLoading';
import { useServices } from '@/services';
import { IGoogleAddress } from '@/utils/address';
import { UPDATE_USER_ADDRESS } from '@/utils/apiPaths';
import { fetcher } from '@/utils/fetcher';
import { formatAddressFromGoogle } from '@/utils/help';
import { IAddress, MessageBoundary } from '@/utils/types';
import React, { useEffect, useState } from 'react';
import { ButtonSize, Colors, RadioButton, RadioGroup, Text, View } from 'react-native-ui-lib';
import { ArrowRightOutlineSvgImage } from './SVGIcons';
import { PrimaryButton } from './button';
import DummyInputAsButton from './dummyInputAsButton';
import DummySpace from './dummySpace';
import Input from './input';
import SQCard from './sqCard';

const AddressForm = ({
  address,
  unsavedAddress,
  cb,
}: {
  address: IGoogleAddress | null;
  unsavedAddress: IAddress;
  cb: (data: IAddress) => void;
}) => {
  const { nav } = useServices();
  const [error, setError] = useState<MessageBoundary | null>(null);
  const { loading, setLoadingTrue, setLoadingFalse } = useLoading(false);
  const [addressType, setAddressType] = useState<string>('home');
  const [userAddress, setUserAddress] = useState<
    Pick<
      IAddress,
      'addressLine1' | 'addressLine2' | 'city' | 'pinCode' | 'landmark' | 'formattedAddressByGoogle' | 'lat' | 'long'
    >
  >({
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: '',
    pinCode: '',
    lat: undefined,
    long: undefined,
    formattedAddressByGoogle: '',
  });

  useEffect(() => {
    const formattedAddress = formatAddressFromGoogle(address?.address_components);
    setUserAddress({
      addressLine1: '',
      addressLine2: '',
      landmark: '',
      lat: address?.geometry?.location?.lat || unsavedAddress?.lat,
      long: address?.geometry?.location?.lng || unsavedAddress?.long,
      pinCode: formattedAddress?.postal_code || unsavedAddress?.pinCode,
      city: unsavedAddress?.city,
      formattedAddressByGoogle: address?.formatted_address || unsavedAddress?.formattedAddressByGoogle,
    });
  }, [address, unsavedAddress]);

  const updateUserAddress = (key: keyof IAddress, value: string) => {
    if (key === 'addressLine1' && value?.length >= 10) {
      setError(null);
    }
    setUserAddress({ ...userAddress, [key]: value });
  };

  const handleSubmitSaveNewAddress = async () => {
    if (!userAddress?.addressLine1 || !userAddress?.city || !userAddress?.pinCode) {
      return setError({
        type: 'error',
        message: 'Fill all mandatory fields',
        inline: true,
      });
    }
    setLoadingTrue();
    const {
      data,
      isError,
      error: err,
    } = await fetcher<IAddress>(UPDATE_USER_ADDRESS, {
      method: 'POST',
      body: { ...userAddress, type: addressType },
    });
    setLoadingFalse();
    if (isError) {
      setError({
        type: 'error',
        message:
          err?.details?.errors?.filter(item => item?.path[0] === 'addressLine1')?.[0]?.message ||
          'Please enter your address',
        inline: true,
      });
    } else if (data?.id) {
      cb(data);
    }
  };

  return (
    <View flexG spread>
      <View>
        <Text small text2 marginV-s4>
          Please provide detailed address information to deliver items on time.
        </Text>
        <SQCard backgroundColor={Colors.screen2} size={ButtonSize.large} borderColor={Colors.transparent}>
          <Text small text3 marginB-s4>
            Select Address type
          </Text>
          <RadioGroup initialValue={addressType} onValueChange={setAddressType}>
            <View row>
              <View marginR-s4>
                <RadioButton value={'home'} label={'Home'} color={Colors.button1} size={20} />
              </View>
              <View marginR-s4>
                <RadioButton value={'office'} label={'Office'} color={Colors.button1} size={20} />
              </View>
              <RadioButton value={'other'} label={'Other'} color={Colors.button1} size={20} />
            </View>
          </RadioGroup>
          <DummySpace size="s4" />
          <DummyInputAsButton
            data={{ formatted_address: address?.formatted_address || unsavedAddress?.formattedAddressByGoogle }}
            placeholder="Home address selector"
            size={ButtonSize.small}
            onPress={() =>
              nav?.push('ModalStack', {
                screen: 'LocationSuggest',
                params: {
                  returnScreen: {
                    stack: 'LooseStack',
                    screen: 'AddressSelection',
                  },
                },
              })
            }
          />
          <DummySpace size="s4" />
          <Input
            keyboardType="default"
            placeholder="Address Line 1 (mandatory)"
            size={ButtonSize.small}
            value={userAddress?.addressLine1!}
            error={error}
            onChangeText={(value: string) => updateUserAddress('addressLine1', value)}
          />
          <DummySpace size="s4" />
          <Input
            keyboardType="default"
            placeholder="Address Line 2"
            size={ButtonSize.small}
            value={userAddress?.addressLine2!}
            onChangeText={(value: string) => updateUserAddress('addressLine2', value)}
          />
          <DummySpace size="s4" />
          <Input
            keyboardType="default"
            placeholder="Landmark"
            size={ButtonSize.small}
            value={userAddress?.landmark!}
            onChangeText={(value: string) => updateUserAddress('landmark', value)}
          />
          <DummySpace size="s4" />
          <View row spread>
            <View marginR-s2>
              <Input
                width="45%"
                keyboardType="default"
                placeholder="City (mandatory)"
                size={ButtonSize.small}
                value={userAddress?.city || unsavedAddress?.city!}
                onChangeText={(value: string) => updateUserAddress('city', value)}
              />
            </View>
            <View>
              <Input
                maxLength={6}
                width="45%"
                keyboardType="default"
                placeholder="Postal code"
                size={ButtonSize.small}
                value={userAddress?.pinCode || unsavedAddress?.pinCode!}
                onChangeText={(value: string) => updateUserAddress('pinCode', value)}
              />
            </View>
          </View>
        </SQCard>
        <DummySpace size="s4" />
      </View>
      <PrimaryButton
        fullWidth
        loading={loading}
        label="Save address"
        size={ButtonSize.large}
        iconPosition="right"
        iconSVG={ArrowRightOutlineSvgImage}
        onPress={handleSubmitSaveNewAddress}
      />
    </View>
  );
};

export default AddressForm;
