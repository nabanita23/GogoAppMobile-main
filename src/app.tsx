require('react-native-ui-lib/config').setConfig({ appScheme: 'default' });
import { NavigationContainer } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import { AuthNavigator, RootNavigator } from './screens';
import { useServices } from './services';
import { useStores } from './stores';
import { getDeepLinkingConfig } from './utils/deeplink';
import { getNavigationTheme, getThemeStatusBarStyle } from './utils/designSystem';

export const AppNavigator = observer((): JSX.Element => {
  const { auth } = useStores();
  const { nav } = useServices();
  const linking = getDeepLinkingConfig();
  useColorScheme();

  return (
    <>
      <StatusBar barStyle={getThemeStatusBarStyle()} translucent backgroundColor={Colors.transparent} />
      <NavigationContainer
        ref={nav.n}
        onReady={nav.onReady}
        onStateChange={nav.onStateChange}
        theme={getNavigationTheme()}
        linking={linking}>
        {auth.isAuthenticated ? <RootNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </>
  );
});
