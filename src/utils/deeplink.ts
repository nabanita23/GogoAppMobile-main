import { utils } from '@react-native-firebase/app';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import messaging from '@react-native-firebase/messaging';
import { LinkingOptions, ParamListBase } from '@react-navigation/native';
import { Linking } from 'react-native';

const deepLinkGetInitialURL = async () => {
  // First, you would need to get the initial URL from your third-party integration
  // The exact usage depend on the third-party SDK you use
  // For example, to get to get the initial URL for Firebase Dynamic Links:
  const { isAvailable } = utils().playServicesAvailability;

  if (isAvailable) {
    const initialLink = await dynamicLinks().getInitialLink();

    if (initialLink) {
      return initialLink.url;
    }
  }

  // Check if app was opened from a deep link
  const url = await Linking.getInitialURL();

  // Check if there is an initial firebase notification
  const message = await messaging().getInitialNotification();

  // Get the `url` property from the notification which corresponds to a screen
  // This property needs to be set on the notification payload when sending it
  // Fallback to initial url
  return message?.data?.url || url;
};

const deepLinkSubscribe = (listener: any) => {
  // Listen to incoming links from Firebase Dynamic Links
  const unsubscribeFirebase = dynamicLinks().onLink(({ url }) => {
    listener(url);
  });

  // Listen to incoming links from deep linking
  const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
    listener(url);
  });

  // Listen to firebase push notifications
  const unsubscribeNotification = messaging().onNotificationOpenedApp(message => {
    const url = message?.data?.url;

    if (url) {
      // Call the listener to let React Navigation handle the URL
      listener(url);
    }
  });

  return () => {
    // Clean up the event listeners
    unsubscribeFirebase();
    unsubscribeNotification();
    linkingSubscription.remove();
  };
};

export const getDeepLinkingConfig = () => {
  //   const initialRoute: Tabs | Loose = 'ShopNavigator';
  const linking: LinkingOptions<ParamListBase & any> = {
    prefixes: ['mygogo://', 'https://mygogo.app', 'https://www.mygogo.app'],
    getInitialURL: deepLinkGetInitialURL,
    subscribe: deepLinkSubscribe,
    config: {
      screens: {
        RootStack: {
          screens: {
            ShopNavigator: {
              screens: {
                Shop: 'store/:shopId',
              },
            },
            SubscriptionNavigator: {
              screens: {
                Subscription: 'subscription',
              },
            },
            AccountNavigator: {
              screens: {
                Account: 'account',
              },
            },
            StoresNavigator: {
              screens: {
                Stores: 'stores',
              },
            },
          },
        },
        LooseStack: {
          screens: {
            Cart: 'cart',
            ProductListing: 'category/:categoryId/:categorySlug',
            OrderPlacedItemView: 'order/:oid',
          },
        },
        SellerStack: {
          screens: {
            SellerOrderReceivedItemView: 'order-received/:oid',
          },
        },
      },
    },
  };

  return linking;
};
