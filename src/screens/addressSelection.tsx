import { AbstractSolidImage } from '@/components/SVGIcons';
import { AddressCard } from '@/components/addressCard';
import AddressForm from '@/components/addressForm';
import { BSheet } from '@/components/bSheet';
import { PrimaryButton, SecondaryButton } from '@/components/button';
import { PageHeader } from '@/components/header';
import LayoutWrapper from '@/components/layoutWrapper';
import StateInProgress from '@/components/stateInProgress';
import useFetcher from '@/hooks/useFetcher';
import { useServices } from '@/services';
import { IGoogleAddress } from '@/utils/address';
import { GET_CART, UPDATE_USER_ADDRESS } from '@/utils/apiPaths';
import { IAddress, ICartData } from '@/utils/types';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { ButtonSize, Spacings, Text, View } from 'react-native-ui-lib';

export const AddressSelection = ({ route }: { route: any }) => {
  const { nav } = useServices();
  const bSheetRef = useRef<BottomSheetModal>(null);

  const { data: cartData }: { data: ICartData; loading: boolean } = useFetcher(GET_CART);
  const [addressByRoute, setAddressByRoute] = useState<IGoogleAddress | null>(route?.params?.address);
  const [hasSavedAddress, setHasSavedAddress] = useState<boolean>(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number>();
  const [savedAddressState, setSavedAddressState] = useState<any>([]);
  const { data: savedAddressesRemote, loading }: { data: IAddress[]; loading: boolean } = useFetcher(
    `${UPDATE_USER_ADDRESS}?updateUrl=${savedAddressState?.length || 0}`,
  );

  const openBottomSheet = () => bSheetRef?.current?.present();
  const closeBottomSheet = () => bSheetRef?.current?.close();

  useEffect(() => {
    setAddressByRoute(route?.params?.address);
  }, [route?.params?.address]);

  useEffect(() => {
    if (!hasSavedAddress) {
      setSavedAddressState(savedAddressesRemote);
      setHasSavedAddress(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedAddressesRemote, loading]);

  const onNewAddressSave = (data: IAddress) => {
    setSavedAddressState([data, ...(savedAddressState ?? [])]);
    setSelectedAddressId(data?.id);
    setHasSavedAddress(true);
    closeBottomSheet();
    setAddressByRoute(null);
  };

  const ListHeaderComponent = useCallback(() => {
    return (
      <View marginB-s4>
        <Text small text2>
          Pick from below addresses
        </Text>
      </View>
    );
  }, []);

  if (loading) {
    return <StateInProgress />;
  }

  const stateNotUpdatingHack = () => {
    if (savedAddressState?.length >= savedAddressesRemote?.length) {
      return savedAddressState;
    }
    return savedAddressesRemote;
  };

  return (
    <LayoutWrapper withSafeView withContainer>
      <PageHeader title="Confirm address" />
      {savedAddressesRemote?.length && !addressByRoute ? (
        <>
          <FlatList
            data={stateNotUpdatingHack()}
            ListHeaderComponent={<ListHeaderComponent />}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            keyExtractor={item => `${item?.id}`}
            contentContainerStyle={{ paddingBottom: 200 }}
            renderItem={({ item }: { item: IAddress }) => (
              <AddressCard
                data={item}
                selected={selectedAddressId ? item?.id === selectedAddressId : item?.selected}
                cb={(id: number) => setSelectedAddressId(id)}
              />
            )}
          />
          <View absB absL absR center paddingH-s4 paddingT-s4 row bg-screen1 spread>
            <View marginR-s4 flexG>
              <SecondaryButton
                label="New address"
                size={ButtonSize.large}
                onPress={() => {
                  openBottomSheet();
                  setSelectedAddressId(0);
                }}
              />
            </View>
            <View flexG>
              <PrimaryButton
                disabled={selectedAddressId === 0}
                label="Confirm Address"
                size={ButtonSize.large}
                onPress={() => nav.push('LooseStack', { screen: 'Cart' })}
              />
            </View>
          </View>
        </>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <AddressForm address={addressByRoute} unsavedAddress={cartData?.unsavedAddress} cb={onNewAddressSave} />
        </ScrollView>
      )}
      <BSheet ref={bSheetRef} points={['90%']}>
        <NativeViewGestureHandler disallowInterruption={true}>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Spacings.s4 }}>
            <Text h1 center text1>
              Add new address
            </Text>
            <AddressForm address={addressByRoute} unsavedAddress={cartData?.unsavedAddress} cb={onNewAddressSave} />
          </ScrollView>
        </NativeViewGestureHandler>
      </BSheet>
      <View
        absT
        absR
        style={{
          transform: [{ translateX: 300 }, { translateY: -430 }, { rotate: '-40deg' }],
          zIndex: -1,
        }}>
        {AbstractSolidImage('red', 500)}
      </View>
    </LayoutWrapper>
  );
};
