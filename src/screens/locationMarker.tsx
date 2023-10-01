import { ArrowRightOutlineSvgImage, MapSolidSvgImage } from '@/components/SVGIcons';
import LottieAnimations from '@/components/animations';
import { PrimaryButton } from '@/components/button';
import { PageHeader } from '@/components/header';
import LayoutWrapper from '@/components/layoutWrapper';
import { useDimensions } from '@/hooks/useDimensions';
import { useLoading } from '@/hooks/useLoading';
import { useServices } from '@/services';
import { useStores } from '@/stores';
import { IGoogleAddress } from '@/utils/address';
import { POST_USER_ADDRESS } from '@/utils/apiPaths';
import { fetcher } from '@/utils/fetcher';
import { IGeo } from '@/utils/types';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { ButtonSize, Colors, Fader, Text, View } from 'react-native-ui-lib';
import { ActivityIndicator, Platform, StyleSheet } from 'react-native/';

export const LocationMarker = observer(({ route }: { route: any }) => {
  const { user } = useStores();
  const { loading, setLoadingTrue, setLoadingFalse } = useLoading(false);
  const { nav } = useServices();
  const { dim } = useDimensions();
  const lat: number = route?.params?.details?.coords?.latitude || route?.params?.details?.geometry?.location?.lat;
  const lng: number = route?.params?.details?.coords?.longitude || route?.params?.details?.geometry?.location?.lng;
  const [address, setAddress] = useState<IGoogleAddress | null>();
  const [regionChanging, setRegionChanging] = useState<boolean>(false);
  const [region, setRegion] = useState<IGeo>({
    latitude: lat,
    latitudeDelta: 0.006,
    longitude: lng,
    longitudeDelta: 0.006,
  });

  useEffect(() => {
    fetchAddress(region);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateAddressRemote = async (data: any) => {
    setLoadingTrue();
    const { isError } = await fetcher(POST_USER_ADDRESS, {
      method: 'PUT',
      body: { addressByGoogle: data },
    });
    if (!isError) {
      user?.setCurrentLocationAndGeo(address?.formatted_address!, region);
      setLoadingFalse();
      nav.jump('ShopNavigator', { screen: 'Shop' });
    }
  };

  const fetchAddress = async (e: IGeo) => {
    try {
      const apiKey = 'AIzaSyCuqwXtomyL--2QxlqluYAVIMdwjToFVdE'; // Replace with your Google Maps API key
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${e.latitude},${e.longitude}&key=${apiKey}`;

      const { data } = await fetcher(url, { external: true });
      setRegionChanging(false);

      if (data?.results?.length > 0) {
        setAddress(data?.results?.[0]);
      } else {
        setAddress(null);
      }
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const onRegionChange = () => {
    setRegionChanging(true);
  };

  const onRegionChangeComplete = (e: IGeo) => {
    setRegion(e);
    fetchAddress(e);
  };

  const handleSubmit = () => {
    if (route?.params?.returnScreen?.stack) {
      nav.jump(route?.params?.returnScreen?.stack, { screen: route?.params?.returnScreen.screen, params: { address } });
    } else {
      updateAddressRemote(address);
    }
  };

  return (
    <LayoutWrapper withSafeView>
      <PageHeader title="Enter your location" withSpace />
      <View height={Platform.OS === 'ios' ? dim.height * 0.58 : dim.height * 0.65}>
        <MapView
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta ?? 0.006,
            longitudeDelta: region.longitudeDelta ?? 0.006,
          }}
          onRegionChange={onRegionChange}
          onRegionChangeComplete={onRegionChangeComplete}
          style={StyleSheet.absoluteFillObject}>
          {/* uncomment below line to check the accuracy of custom marker */}
          {/* <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} /> */}
        </MapView>
        <View absF center pointerEvents="none">
          <View style={{ marginTop: -100 }}>
            <LottieAnimations
              name="map-marker"
              height={200}
              width={200}
              loop={false}
              auto={false}
              playOnce={regionChanging ? [0, 55] : [55, 82]}
            />
          </View>
        </View>
        <Fader visible position={Fader.position.BOTTOM} tintColor={Colors.screen1} />
      </View>

      <View padding-s4>
        {regionChanging && (
          <View absF bg-screen1 center style={{ zIndex: 1 }}>
            <ActivityIndicator />
          </View>
        )}
        <View row centerV>
          {MapSolidSvgImage(Colors.gray400, 20)}
          <Text h3 marginL-s2>
            Selected address
          </Text>
        </View>
        <View height={90}>
          <Text marginV-s2 small text2 numberOfLines={3}>
            {address?.formatted_address}
          </Text>
        </View>
        <PrimaryButton
          loading={loading}
          size={ButtonSize.large}
          label="Confirm & Continue"
          iconPosition="right"
          iconSVG={ArrowRightOutlineSvgImage}
          onPress={handleSubmit}
        />
      </View>
    </LayoutWrapper>
  );
});
