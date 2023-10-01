import { handlePushNotification } from '@/services/notification';
import notifee, { EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { Linking, PermissionsAndroid } from 'react-native';

const useNotificationAction = () => {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

  useEffect(() => {
    const unsubscribeOnMessage = messaging().onMessage(async (remoteMessage: any) => {
      await handlePushNotification(remoteMessage);
    });

    notifee.onForegroundEvent(async ({ type, detail }: { type: any; detail: any }) => {
      if (
        (type === EventType.ACTION_PRESS || type === EventType.PRESS) &&
        detail?.notification?.data?.type === 'notification' &&
        detail.notification.data.url
      ) {
        const url = detail?.notification?.data?.url?.replace?.('https://mygogo.app/', 'mygogo://');
        await Linking.openURL(url);
      }
    });

    return unsubscribeOnMessage;
  }, []);
};

export default useNotificationAction;
