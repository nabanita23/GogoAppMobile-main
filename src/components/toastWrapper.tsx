import React from 'react';
import { ToastProvider } from 'react-native-toast-notifications';
import { Colors } from 'react-native-ui-lib';

export const ToastProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ToastProvider
      placement="top"
      duration={1500}
      animationType="slide-in"
      animationDuration={250}
      successColor={Colors.button1}
      dangerColor={Colors.button1}
      warningColor={Colors.button1}
      normalColor={Colors.button1}
      // icon={BoxSolidSvgImage('white', 20)}
      // successIcon={BoxSolidSvgImage('red', 20)}
      // dangerIcon={BoxSolidSvgImage('white', 20)}
      // warningIcon={BoxSolidSvgImage('white', 20)}
      textStyle={{ fontSize: 16, fontFamily: 'Outfit-Medium' }}
      offset={50} // offset for both top and bottom toasts
      offsetTop={50}
      offsetBottom={40}
      swipeEnabled={true}>
      {children}
    </ToastProvider>
  );
};
