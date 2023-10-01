import { merge } from '@/utils/merge';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useColorScheme } from 'react-native';
import { screenDefaultOptions, tabBarDefaultOptions } from './options';
import { GenStackNavigatorProps, GenTabNavigatorProps, LooseScreenInfo, ModalScreenInfo } from './types';

export const genStackNavigator = (screens: GenStackNavigatorProps): JSX.Element => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useColorScheme(); // needs to be here to correctly change nav bar appearance

  const Stack = createNativeStackNavigator();
  const stackScreens = screens.map?.(it => (
    <Stack.Screen
      key={it.name}
      name={it.name}
      component={it.component}
      options={merge(screenDefaultOptions(), it.options())}
    />
  ));

  return <Stack.Navigator>{stackScreens}</Stack.Navigator>;
};

export const genTabNavigator = (screens: GenTabNavigatorProps): JSX.Element => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useColorScheme(); // needs to be here to correctly change tab bar appearance

  const Tab = createBottomTabNavigator();
  const tabScreens = screens.map?.(it => (
    <Tab.Screen key={it.name} name={it.name} component={it.component} options={it.options()} />
  ));

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...tabBarDefaultOptions(route.name),
      })}>
      {tabScreens}
    </Tab.Navigator>
  );
};

export const genRootNavigator = (app: React.FC, modals: ModalScreenInfo[], loose: LooseScreenInfo[]): JSX.Element => {
  const RootStack = createNativeStackNavigator();
  const appScreen = <RootStack.Screen name="RootStack" component={app} />;
  const modalScreens = modals?.map?.(m => <RootStack.Screen key={m.name} name={m.name} component={m.component} />);
  const looseScreens = loose?.map?.(m => <RootStack.Screen key={m.name} name={m.name} component={m.component} />);

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Group>{appScreen}</RootStack.Group>
      <RootStack.Group>{looseScreens}</RootStack.Group>
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>{modalScreens}</RootStack.Group>
    </RootStack.Navigator>
  );
};
