import notifee, {
  AndroidBigPictureStyle,
  AndroidImportance,
  AndroidStyle,
  AndroidVisibility,
} from '@notifee/react-native';
import { Colors } from 'react-native-ui-lib';

const createChannel = async () => {
  const gogoDefaultChannel = await notifee.createChannel({
    id: 'gogoDefaultChannel',
    name: 'Gogo Default',
    importance: AndroidImportance.HIGH,
  });
  return gogoDefaultChannel;
};

export const showNotification = async (
  titleHtml: string,
  bodyHtml: string,
  largeIconUri: string,
  bigPictureUri: string,
  data: any,
) => {
  const channelId = await createChannel();
  let style: AndroidBigPictureStyle | {} = {};
  if (bigPictureUri) {
    style = {
      type: AndroidStyle.BIGPICTURE,
      picture: bigPictureUri,
    };
  }

  notifee.displayNotification({
    title: titleHtml,
    body: bodyHtml,
    android: {
      channelId,
      style: style as AndroidBigPictureStyle,
      smallIcon: 'ic_stat_ic_notification',
      color: Colors.primary,
      largeIcon: largeIconUri,
      // actions: [
      //   {
      //     title: 'Reply',
      //     icon: 'https://w7.pngwing.com/pngs/841/271/png-transparent-computer-icons-send-miscellaneous-angle-triangle-thumbnail.png',
      //     pressAction: {
      //       id: 'reply',
      //     },
      //     input: {
      //       allowFreeFormInput: false, // set to false
      //       choices: ['Yes', 'No', 'Maybe'],
      //       placeholder: 'Reply to Sarah...',
      //     },
      //   },
      // ],
      colorized: true,
      visibility: AndroidVisibility.PUBLIC,
      importance: AndroidImportance.HIGH,
      pressAction: {
        id: 'default',
      },
    },
    data,
  });
};

export const handlePushNotification = async (remoteMessage: any) => {
  if (remoteMessage?.data?.type === 'notification') {
    let { titleHtml, bodyHtml, largeIconUri, bigPictureUri, ...data } = remoteMessage.data;
    await showNotification(titleHtml, bodyHtml, largeIconUri, bigPictureUri, data);
  }
};
