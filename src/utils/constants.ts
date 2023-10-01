import { Dimensions } from 'react-native';

export const hapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: true,
};

export const PageWithBottomTab = ['Shop', 'Subscription', 'ScanQR', 'Stores', 'Account'];

export const useConstants = () => {
  const dim = Dimensions.get('screen');

  return {
    dim,
  };
};
