import { AbstractTwoSolidImage, ArrowRightOutlineSvgImage } from '@/components/SVGIcons';
import { PrimaryButton } from '@/components/button';
import Container from '@/components/container';
import DummySpace from '@/components/dummySpace';
import { PageHeader } from '@/components/header';
import Input from '@/components/input';
import LayoutWrapper from '@/components/layoutWrapper';
import ScrollWrapper from '@/components/scrollWrapper';
import SQCard from '@/components/sqCard';
import { useLoading } from '@/hooks/useLoading';
import { useServices } from '@/services';
import { useStores } from '@/stores';
import { UPDATE_USER } from '@/utils/apiPaths';
import { fetcher } from '@/utils/fetcher';
import { IUser, MessageBoundary } from '@/utils/types';
import React, { useState } from 'react';
import { ButtonSize, Colors, Text, View } from 'react-native-ui-lib';

type IUserDataKeys = keyof Pick<IUser, 'firstName' | 'lastName' | 'aadharNumber'>;

type IUserData = Record<IUserDataKeys, string>;

const initialUserData: IUserData = {
  firstName: '',
  lastName: '',
  aadharNumber: '',
};

export const UserDetails = () => {
  const { user } = useStores();
  const { loading, setLoadingTrue, setLoadingFalse } = useLoading(false);
  const [firstNameError, setFirstNameError] = useState<MessageBoundary | null>(null);
  const [lastNameError, setLastNameError] = useState<MessageBoundary | null>(null);
  const [userData, setUserData] = useState(
    { firstName: user.firstName, lastName: user.lastName, aadharNumber: '' } || initialUserData,
  );
  const { nav } = useServices();

  const updateUserData = (key: IUserDataKeys, value: string | number) => {
    setUserData({ ...userData, [key]: value });
  };

  // const handleAadharValue = (value: string) => {
  //   updateUserData('aadharNumber', formatAadharNumber(value));
  // };

  const handleSubmit = async () => {
    setFirstNameError(null);
    setLastNameError(null);
    if (!userData.firstName) {
      return setFirstNameError({ type: 'error', message: 'Please enter First name', inline: true });
    }
    if (!userData.lastName) {
      return setLastNameError({ type: 'error', message: 'Please enter Middle/Last name', inline: true });
    }
    setLoadingTrue();
    const { data, isError } = await fetcher<IUserData>(UPDATE_USER, {
      method: 'PUT',
      body: userData,
    });
    if (!isError) {
      setLoadingFalse();
      user.setUserName(data?.firstName!, data?.lastName!);
      nav.push('SellerStack', { screen: 'SellerShopDetails' });
    }
  };

  return (
    <LayoutWrapper withSafeView>
      <Container>
        <PageHeader title="Basic Details" />
        <ScrollWrapper>
          <View paddingV-s4>
            <Text h2>Store owner details</Text>
            <Text small text2 marginT-s1>
              Your basic details such as name are required
            </Text>
          </View>
          <SQCard backgroundColor={Colors.screen2} size={ButtonSize.large} borderColor={Colors.transparent}>
            <Input
              error={firstNameError}
              placeholder="First name"
              size={ButtonSize.small}
              value={userData?.firstName!}
              onChangeText={(value: string) => updateUserData('firstName', value)}
            />
            <DummySpace size="s4" />
            <Input
              error={lastNameError}
              placeholder="Middle/Last name"
              size={ButtonSize.small}
              value={userData?.lastName!}
              onChangeText={(value: string) => updateUserData('lastName', value)}
            />
            {/* <DummySpace size="s4" />
            <Input
              maxLength={19}
              keyboardType="number-pad"
              placeholder="Enter your 16 digit aadhar number"
              size={ButtonSize.small}
              value={userData?.aadharNumber}
              onChangeText={handleAadharValue}
            /> */}
          </SQCard>
        </ScrollWrapper>
      </Container>
      <View
        absT
        absR
        style={{
          transform: [{ translateX: 300 }, { translateY: -370 }, { rotate: '-40deg' }],
          zIndex: -1,
        }}>
        {AbstractTwoSolidImage('red', 500)}
      </View>
      <View absB absL absR paddingH-s4 center>
        <PrimaryButton
          fullWidth
          loading={loading}
          label="Save & Continue"
          size={ButtonSize.large}
          iconPosition="right"
          iconSVG={ArrowRightOutlineSvgImage}
          onPress={handleSubmit}
        />
      </View>
    </LayoutWrapper>
  );
};
