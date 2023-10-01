import { AppNavigator } from '@/app';
import Splash from '@/components/splash';
import SplashAnimated from '@/components/splashAnimated';
import { ToastProviderWrapper } from '@/components/toastWrapper';
import { ServicesProvider, initServices } from '@/services';
import { StoresProvider, hydrateStores } from '@/stores';
import { configureDesignSystem } from '@/utils/designSystem';
import { changeSystemButtonColor, hide, show } from '@/utils/systemButton';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Colors } from 'react-native-ui-lib';

export default (): JSX.Element => {
  const [appReady, setAppReady] = useState(false);

  const startApp = useCallback(async () => {
    hide();
    await hydrateStores();
    await initServices();
    await configureDesignSystem();
    await changeSystemButtonColor(Colors.screen1);
    setTimeout(async () => {
      setAppReady(true);
      show();
    }, 1200);
  }, []);

  useEffect(() => {
    startApp();
  }, [startApp]);

  if (!appReady) {
    return <Splash />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ToastProviderWrapper>
        <StoresProvider>
          <ServicesProvider>
            <BottomSheetModalProvider>
              <AppNavigator />
              <SplashAnimated hide={appReady} />
            </BottomSheetModalProvider>
          </ServicesProvider>
        </StoresProvider>
      </ToastProviderWrapper>
    </GestureHandlerRootView>
  );
};
