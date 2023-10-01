import { useLoading } from '@/hooks/useLoading';
import React from 'react';
import { Alert, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, RESULTS, checkMultiple, openSettings, request } from 'react-native-permissions';
import { ButtonSize } from 'react-native-ui-lib';
import { LocationOutlineSvgImage } from './SVGIcons';
import { PrimaryButton } from './button';

const isAndroid = Platform.OS === 'android';

const MyLocation = ({ cb }: { cb: (details: any) => void }) => {
  const { loading, setLoadingTrue, setLoadingFalse } = useLoading();

  const openAlert = () =>
    Alert.alert(
      'Update Location Services',
      'Please go to settings and enable location service for GoGo App',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Open Settings',
          onPress: openLocationSettings,
        },
      ],
      { cancelable: true },
    );

  const openLocationSettings = () => {
    openSettings().catch(() => console.warn('cannot open settings'));
  };

  const checkHasLocationPermission = () => {
    return new Promise(resolve => {
      return checkMultiple([PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION]).then(
        statuses => {
          if (isAndroid && statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.DENIED) {
            return request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
              resolve(result === RESULTS.GRANTED);
            });
          }

          if (!isAndroid && statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.DENIED) {
            return request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(result => {
              resolve(result === RESULTS.GRANTED);
            });
          }

          if (
            statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] === RESULTS.BLOCKED ||
            statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] === RESULTS.BLOCKED
          ) {
            resolve(false);
          }

          resolve(true);
        },
      );
    });
  };

  const handleOnPress = async () => {
    setLoadingTrue();
    const hasLocationPermission = await checkHasLocationPermission();
    if (hasLocationPermission) {
      Geolocation.getCurrentPosition(
        position => {
          setLoadingFalse();
          cb(position);
        },
        () => {
          // See error code charts below.
          setLoadingFalse();
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
    } else {
      setLoadingFalse();
      openAlert();
    }
  };

  return (
    <PrimaryButton
      loading={loading}
      size={ButtonSize.large}
      label="Share your location"
      iconPosition="left"
      iconSVG={LocationOutlineSvgImage}
      onPress={handleOnPress}
    />
  );
};

export default MyLocation;
