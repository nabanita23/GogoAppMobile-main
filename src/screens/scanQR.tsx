import { ScanOutlineSvgImage } from '@/components/SVGIcons';
import LottieAnimations from '@/components/animations';
import { SecondaryButton } from '@/components/button';
import Headline from '@/components/headline';
import LayoutWrapper from '@/components/layoutWrapper';
import { useDimensions } from '@/hooks/useDimensions';
import { useLoading } from '@/hooks/useLoading';
import { useServices } from '@/services';
import { useStores } from '@/stores';
import { SCAN_QR, SELECT_CURRENT_MERCHANT } from '@/utils/apiPaths';
import { fetcher } from '@/utils/fetcher';
import { restartApp } from '@/utils/help';
import { ICartData } from '@/utils/types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Platform } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { PERMISSIONS, RESULTS, checkMultiple, openSettings, request } from 'react-native-permissions';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useToast } from 'react-native-toast-notifications';
import { Colors, Text, View } from 'react-native-ui-lib';

const isAndroid = Platform.OS === 'android';

export const ScanQR = () => {
  const toast = useToast();
  const { dim } = useDimensions();
  const { nav } = useServices();
  const { user } = useStores();
  const [qrStatus, setQrStatus] = useState(false);
  const { loading, setLoadingTrue, setLoadingFalse } = useLoading(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(false);
  const scannerRef = useRef<any>();

  const openCameraSettings = () => {
    openSettings().catch(() => console.warn('cannot open settings'));
  };

  const openAlert = () =>
    Alert.alert(
      'Update Camera Permission',
      'Please go to settings and enable location service for GoGo App',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Open Settings',
          onPress: openCameraSettings,
        },
      ],
      { cancelable: true },
    );

  const checkHasCameraPermission = () => {
    return new Promise(resolve => {
      return checkMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.ANDROID.CAMERA]).then(statuses => {
        if (isAndroid && statuses[PERMISSIONS.ANDROID.CAMERA] === RESULTS.DENIED) {
          return request(PERMISSIONS.ANDROID.CAMERA).then(result => {
            resolve(result === RESULTS.GRANTED);
          });
        }

        if (!isAndroid && statuses[PERMISSIONS.IOS.CAMERA] === RESULTS.DENIED) {
          return request(PERMISSIONS.IOS.CAMERA).then(result => {
            resolve(result === RESULTS.GRANTED);
          });
        }

        if (
          statuses[PERMISSIONS.IOS.CAMERA] === RESULTS.BLOCKED ||
          statuses[PERMISSIONS.ANDROID.CAMERA] === RESULTS.BLOCKED
        ) {
          resolve(false);
        }

        resolve(true);
      });
    });
  };

  const initScanner = useCallback(async () => {
    const hasPermission = await checkHasCameraPermission();
    if (hasPermission) {
      scannerRef?.current?.reactivate();
      setHasCameraPermission(true);
    } else {
      openAlert();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initScanner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hasCameraPermission) {
      const interval = setInterval(() => {
        scannerRef?.current?.reactivate();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [hasCameraPermission]);

  const selectMerchantRemote = async (shopId: number) => {
    setLoadingTrue();
    const { data, isError } = await fetcher<ICartData>(`${SELECT_CURRENT_MERCHANT}${shopId}`, {
      method: 'PUT',
    });
    if (!isError) {
      setLoadingFalse();
      user.setCurrentStore(shopId, data?.lastSelectedMerchant?.name!);
      nav.jump('ShopNavigator', { screen: 'Shop', params: { shopId: shopId } });
    }
  };

  const onSuccess = async (e: any) => {
    const storeId = e.data.replace('https://www.mygogo.app/store/', '');
    const { isError } = await fetcher(SCAN_QR, { method: 'POST', body: { qrValue: `store_${storeId}` } });
    if (!isError) {
      if (e.data.includes('https://www.mygogo.app/store/')) {
        selectMerchantRemote(storeId);
        setQrStatus(true);
        setTimeout(() => {
          setQrStatus(false);
        }, 300);
      } else {
        toast.show('Not a valid store QR', { type: 'error' });
      }
    }
  };

  return (
    <LayoutWrapper withSafeView>
      <QRCodeScanner
        fadeIn
        reactivate
        reactivateTimeout={5000}
        ref={scannerRef}
        flashMode={RNCamera.Constants.FlashMode.auto}
        onRead={onSuccess}
        showMarker={true}
        customMarker={
          <LottieAnimations
            name="qr-scan"
            height={dim.width * 0.9}
            width={dim.width * 0.9}
            loop={!qrStatus}
            auto={false}
            playOnce={qrStatus ? [37, 69] : [2, 36]}
          />
        }
        topContent={
          <View centerV flex-1>
            <Headline title="Store scanner" subtitle="Point camera towards store QR" center />
          </View>
        }
        bottomContent={
          <View absB paddingB-s10 bottom>
            <SecondaryButton
              loading={loading}
              label="Reload Scanner"
              onPress={restartApp}
              iconPosition="left"
              iconSVG={ScanOutlineSvgImage}
            />
            <Text center small text2 marginT-s2>
              If scanner not working please reload scanner
            </Text>
          </View>
        }
        cameraContainerStyle={{
          backgroundColor: Colors.gray400,
          width: dim.width,
          height: dim.width,
          overflow: 'hidden',
        }}
      />
    </LayoutWrapper>
  );
};
