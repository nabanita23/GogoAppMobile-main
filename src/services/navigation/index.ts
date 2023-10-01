import { ModalProps, ScreenProps } from '@/screens';
import { IService, PVoid } from '@/utils/types';
import { CommonActions, NavigationContainerRef, StackActions, TabActions } from '@react-navigation/native';
import React from 'react';
import { TabScreenLayouts } from './types';

export class NavService implements IService {
  private inited = false;

  n: React.RefObject<NavigationContainerRef<ScreenProps>> = React.createRef();
  r: string | undefined;

  init = async (): PVoid => {
    if (!this.inited) {
      this.inited = true;
    }
  };

  // on init methods
  onReady = (): void => {
    this.r = this.n.current?.getCurrentRoute()?.name;
  };

  onStateChange = (): void => {
    const prevName = this.r;
    const currentName = this.n.current?.getCurrentRoute()?.name;

    if (!!prevName && !!currentName) {
      const params = { from: prevName, to: currentName };

      // send some statistics
      // facebook.event('ScreenOpen', params);
      // yandex.event('ScreenOpen', params);
      console.log('onStateChange:', `${params.from} -> ${params.to}`);
    }

    this.r = currentName;
  };

  // Navigation methods
  push = <T extends keyof ScreenProps>(name: T, passProps?: ScreenProps[T]): void => {
    this.n.current?.dispatch(StackActions.push(name, passProps));
  };

  pop = (): void => {
    if (this.n.current?.canGoBack()) {
      this.n.current?.goBack();
    } else {
      this.navigate('RootStack', { screen: 'ShopNavigator', params: { screen: 'Shop' } });
    }
  };

  popToTop = (): void => {
    this.n.current?.dispatch(StackActions.popToTop());
  };

  show = <T extends keyof ModalProps>(name: T, passProps?: ScreenProps[T]): void => {
    this.navigate(name, passProps);
  };

  jump = <T extends keyof TabScreenLayouts>(name: T, passProps?: unknown): void => {
    this.navigate(name as keyof ScreenProps, passProps as any);
  };

  jumpTo = <T extends keyof TabScreenLayouts>(name: T, passProps?: any): void => {
    this.n.current?.dispatch(TabActions.jumpTo(name, passProps));
  };

  private navigate = <T extends keyof ScreenProps>(name: T | 'RootStack', passProps?: ScreenProps[T]): void => {
    this.n.current?.dispatch(
      CommonActions.navigate({
        name,
        params: passProps,
      }),
    );
  };
}
