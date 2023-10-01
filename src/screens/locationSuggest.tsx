import { AddressCard } from '@/components/addressCard';
import Container from '@/components/container';
import Divider from '@/components/divider';
import GooglePlacesInput from '@/components/googlePlacesInput';
import { PageHeader } from '@/components/header';
import LayoutWrapper from '@/components/layoutWrapper';
import MyLocation from '@/components/myLocation';
import { useDimensions } from '@/hooks/useDimensions';
import useFetcher from '@/hooks/useFetcher';
import { useServices } from '@/services';
import { UPDATE_USER_ADDRESS } from '@/utils/apiPaths';
import { IAddress } from '@/utils/types';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { FlatList } from 'react-native';
import { Colors, Fader, Spacings, View } from 'react-native-ui-lib';

export const LocationSuggest = observer(({ route }: { route: any }) => {
  const { dim } = useDimensions();
  const { nav } = useServices();
  const { data } = useFetcher(UPDATE_USER_ADDRESS);

  const cb = (details: any) => {
    nav.push('ModalStack', {
      screen: 'LocationMarker',
      params: { details, returnScreen: route?.params?.returnScreen },
    });
  };

  return (
    <LayoutWrapper withSafeView>
      <PageHeader title="Enter your location" withSpace />
      <Container>
        <GooglePlacesInput cb={cb} />
        <Divider label="or" />
        <MyLocation cb={cb} />
        {!route?.params?.returnScreen && data?.length > 0 && (
          <>
            <Divider label="Pick from recent" />
            <View style={{ zIndex: 1, marginTop: -Spacings.s4 }}>
              <Fader visible position={Fader.position.TOP} tintColor={Colors.screen1} />
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              scrollEventThrottle={16}
              data={data as IAddress[]}
              keyExtractor={item => `${item?.id}`}
              contentContainerStyle={{ paddingBottom: dim.height * 0.4, paddingTop: Spacings.s8 }}
              renderItem={({ item }: { item: IAddress }) => <AddressCard data={item} />}
            />
          </>
        )}
      </Container>
    </LayoutWrapper>
  );
});
