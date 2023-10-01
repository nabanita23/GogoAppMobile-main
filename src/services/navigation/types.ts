import { Loose, Modal, Screen, Tabs } from '@/screens';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

type BaseScreenInfo = {
  name: string;
  component: React.FC<any>;
  // component: React.FC<NativeStackScreenProps<ScreenProps, Screen>>; // idk why it doesn't work
};

type ScreenInfo = BaseScreenInfo & {
  options?: () => NativeStackNavigationOptions;
};
export type ScreenLayouts = {
  [key in Screen]: ScreenInfo;
};
export type GenStackNavigatorProps = ScreenInfo[];

export type TabScreenInfo = BaseScreenInfo & {
  options: () => BottomTabNavigationOptions;
};
export type TabScreenLayouts = {
  [key in Tabs]: TabScreenInfo;
};
export type GenTabNavigatorProps = TabScreenInfo[];

export type ModalScreenInfo = ScreenInfo;
export type ModalScreenLayouts = {
  [key in Modal]: ScreenInfo;
};

export type LooseScreenInfo = ScreenInfo;
export type LooseLayouts = {
  [key in Loose]: ScreenInfo;
};
