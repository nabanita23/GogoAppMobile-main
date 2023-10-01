import { DEVICE_SYNC } from '@/utils/apiPaths';
import { fetcher } from '@/utils/fetcher';
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { getDeviceId } from 'react-native-device-info';

const useFCMToken = () => {
  const postFCMTokenToRemote = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const { isError, error } = await fetcher(DEVICE_SYNC, {
      method: 'POST',
      body: {
        deviceId: await getDeviceId(),
        fcmToken: await messaging().getToken(),
      },
    });
    if (isError) {
      console.log('first', error);
    }
  };

  useEffect(() => {
    postFCMTokenToRemote();
  }, []);
};

export default useFCMToken;
