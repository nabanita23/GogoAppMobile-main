import {
  AccountOutlineSvgImage,
  AccountSolidSvgImage,
  ScanOutlineSvgImage,
  ScanSolidSvgImage,
  ShopOutlineSvgImage,
  ShopSolidSvgImage,
  StoresOutlineSvgImage,
  StoresSolidSvgImage,
  SubscriptionOutlineSvgImage,
  SubscriptionSolidSvgImage,
} from '@/components/SVGIcons';
import { getHeaderBlurEffect } from '@/utils/designSystem';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import { Colors, Spacings } from 'react-native-ui-lib';

export const screenDefaultOptions = (): NativeStackNavigationOptions => ({
  headerShown: false,
  headerShadowVisible: false,
  headerTintColor: Colors.textPrimary,

  // this setup makes large title work on iOS
  ...Platform.select({
    ios: {
      headerLargeTitle: true,
      headerTransparent: true,
      headerBlurEffect: getHeaderBlurEffect(),
    },
  }),
});

export const tabBarDefaultOptions = (routeName: string): BottomTabNavigationOptions => ({
  headerShown: false,
  tabBarActiveTintColor: Colors.text1,
  tabBarInactiveTintColor: Colors.text2,
  tabBarItemStyle: { padding: Platform.OS === 'ios' ? 0 : Spacings.s2 },
  tabBarStyle: {
    backgroundColor: Colors.screen1,
    borderColor: Colors.transparent,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    elevation: 0,
    paddingTop: Platform.OS === 'ios' ? Spacings.s2 : 0,
    height: Platform.OS === 'ios' ? 80 : 58,
  },
  tabBarIcon: ({ focused, color, size }) => getSvgImage(routeName, focused, color, size),
});

const getSvgImage = (routeName: string, focused: boolean, color: string, size: number): any => {
  if (routeName === 'ShopNavigator') {
    return focused ? ShopSolidSvgImage(Colors.teal400, size) : ShopOutlineSvgImage(Colors.text2, size);
  }
  if (routeName === 'SubscriptionNavigator') {
    return focused ? SubscriptionSolidSvgImage(Colors.sky300, size) : SubscriptionOutlineSvgImage(Colors.text2, size);
  }
  if (routeName === 'ScanNavigator') {
    return focused ? ScanSolidSvgImage(Colors.gray500, size) : ScanOutlineSvgImage(Colors.text2, size);
  }
  if (routeName === 'StoresNavigator') {
    return focused ? StoresSolidSvgImage(Colors.orange400, size) : StoresOutlineSvgImage(Colors.text2, size);
  }
  if (routeName === 'AccountNavigator') {
    return focused ? AccountSolidSvgImage(Colors.purple300, size) : AccountOutlineSvgImage(Colors.text2, size);
  }
};
