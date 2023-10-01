import { genRootNavigator, genStackNavigator, genTabNavigator } from '@/services/navigation/help';
import { LooseLayouts, ModalScreenLayouts, ScreenLayouts, TabScreenLayouts } from '@/services/navigation/types';
import { RootScreenProps } from '@/utils/types';
import { AddressSelection } from './addressSelection';
import { OTP } from './auth/otp';
import { SignIn } from './auth/signin';
import { SignUp } from './auth/signup';
import { Cart } from './cart';
import { LocationMarker } from './locationMarker';
import { LocationSuggest } from './locationSuggest';
import Offers from './offers';
import OrderPlacedItemView from './orderPlacedItemView';
import { OrderSuccess } from './orderSuccess';
import { ProductDetail } from './productDetail';
import { ProductListing } from './productListing';
import { ScanQR } from './scanQR';
import { Search } from './search';
import { Intro } from './seller/intro';
import OrderReceivedItemView from './seller/orderReceivedItemView';
import { ShopCategory } from './seller/shopCategory';
import { ShopDetails } from './seller/shopDetails';
import ShopFeatures from './seller/shopFeatures';
import { Success } from './seller/success';
import { UserDetails } from './seller/userDetails';
import { Settings } from './settings';
import { Shop } from './shop';
import { ShowQR } from './showQR';
import { Stores } from './stores';
import { Subscriptions } from './subscriptions';

// Describe your screens here
export type Tabs = 'ShopNavigator' | 'SubscriptionNavigator' | 'ScanNavigator' | 'StoresNavigator' | 'AccountNavigator';
export type Modal = 'ModalStack';
export type Loose = 'LooseStack' | 'SellerStack';
export type Screen =
  | 'SignIn'
  | 'SignUp'
  | 'OTP'
  | 'Shop'
  | 'Subscription'
  | 'Stores'
  | 'Account'
  | 'ShowQR'
  | 'ScanQR'
  | 'ProductListing'
  | 'ProductDetail'
  | 'Search'
  | 'LocationSuggest'
  | 'LocationMarker'
  | 'AddressSelection'
  | 'Cart'
  | 'Offers'
  | 'OrderSuccess'
  | 'OrderPlacedItemView'
  | 'SellerIntro'
  | 'SellerUserDetails'
  | 'SellerShopDetails'
  | 'SellerShopCategories'
  | 'SellerShopFeatures'
  | 'SellerOrderReceivedItemView'
  | 'SellerSuccess';

export type ModalProps = {
  ExampleModal: undefined;
};
export type ScreenProps = {
  Shop: RootScreenProps;
  Subscription: RootScreenProps;
  Scan: RootScreenProps;
  Stores: RootScreenProps;
  Account: RootScreenProps;
  ProductListing: RootScreenProps;
  ProductDetail: RootScreenProps;
  LooseStack: RootScreenProps;
  SellerStack: RootScreenProps;
  ModalStack: RootScreenProps;
  OTP: RootScreenProps;
} & ModalProps;

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

// Screens
const screens: ScreenLayouts = {
  SignIn: {
    name: 'SignIn',
    component: SignIn,
    options: () => ({
      title: 'SignIn',
    }),
  },
  SignUp: {
    name: 'SignUp',
    component: SignUp,
    options: () => ({
      title: 'SignUp',
    }),
  },
  OTP: {
    name: 'OTP',
    component: OTP,
    options: () => ({
      title: 'OTP',
    }),
  },
  Shop: {
    name: 'Shop',
    component: Shop,
    options: () => ({
      title: 'Shop',
    }),
  },
  Subscription: {
    name: 'Subscription',
    component: Subscriptions,
    options: () => ({
      title: 'Subscription',
    }),
  },
  Stores: {
    name: 'Stores',
    component: Stores,
    options: () => ({
      title: 'Stores',
    }),
  },
  Account: {
    name: 'Account',
    component: Settings,
    options: () => ({
      title: 'Settings',
    }),
  },
  ShowQR: {
    name: 'ShowQR',
    component: ShowQR,
    options: () => ({
      title: 'Settings',
    }),
  },
  ScanQR: {
    name: 'ScanQR',
    component: ScanQR,
    options: () => ({
      title: 'ScanQR',
    }),
  },
  ProductListing: {
    name: 'ProductListing',
    component: ProductListing,
    options: () => ({
      title: 'Product Listing',
    }),
  },
  ProductDetail: {
    name: 'ProductDetail',
    component: ProductDetail,
    options: () => ({
      title: 'Settings',
    }),
  },
  Search: {
    name: 'Search',
    component: Search,
    options: () => ({
      title: 'Search',
    }),
  },
  LocationSuggest: {
    name: 'LocationSuggest',
    component: LocationSuggest,
    options: () => ({
      title: 'LocationSuggest',
      transitionSpec: {
        open: config,
        close: config,
      },
    }),
  },
  LocationMarker: {
    name: 'LocationMarker',
    component: LocationMarker,
    options: () => ({
      title: 'LocationMarker',
      transitionSpec: {
        open: config,
        close: config,
      },
    }),
  },
  AddressSelection: {
    name: 'AddressSelection',
    component: AddressSelection,
    options: () => ({
      title: 'AddressSelection',
    }),
  },
  Cart: {
    name: 'Cart',
    component: Cart,
    options: () => ({
      title: 'Cart',
    }),
  },
  Offers: {
    name: 'Offers',
    component: Offers,
    options: () => ({
      title: 'Offers',
      transitionSpec: {
        open: config,
        close: config,
      },
    }),
  },
  OrderSuccess: {
    name: 'OrderSuccess',
    component: OrderSuccess,
    options: () => ({
      title: 'OrderSuccess',
    }),
  },
  OrderPlacedItemView: {
    name: 'OrderPlacedItemView',
    component: OrderPlacedItemView,
    options: () => ({
      title: 'OrderPlacedItemView',
    }),
  },
  SellerIntro: {
    name: 'SellerIntro',
    component: Intro,
    options: () => ({
      title: 'Intro',
    }),
  },
  SellerUserDetails: {
    name: 'SellerUserDetails',
    component: UserDetails,
    options: () => ({
      title: 'SellerOnboarding',
    }),
  },
  SellerShopDetails: {
    name: 'SellerShopDetails',
    component: ShopDetails,
    options: () => ({
      title: 'SellerOnboarding',
    }),
  },
  SellerShopCategories: {
    name: 'SellerShopCategories',
    component: ShopCategory,
    options: () => ({
      title: 'SellerOnboarding',
    }),
  },
  SellerShopFeatures: {
    name: 'SellerShopFeatures',
    component: ShopFeatures,
    options: () => ({
      title: 'SellerShopFeatures',
    }),
  },
  SellerSuccess: {
    name: 'SellerSuccess',
    component: Success,
    options: () => ({
      title: 'SellerSuccess',
    }),
  },
  SellerOrderReceivedItemView: {
    name: 'SellerOrderReceivedItemView',
    component: OrderReceivedItemView,
    options: () => ({
      title: 'SellerOrderReceivedItemView',
    }),
  },
};

const ShopStack = () => genStackNavigator([screens.Shop]);
const SubscriptionStack = () => genStackNavigator([screens.Subscription]);
const ScanStack = () => genStackNavigator([screens.ScanQR]);
const StoresStack = () => genStackNavigator([screens.Stores]);
const AccountStack = () => genStackNavigator([screens.Account]);
const AuthStack = () => genStackNavigator([screens.SignIn, screens.OTP]);
const LooseStack = () =>
  genStackNavigator([
    screens.ShowQR,
    screens.ProductListing,
    screens.ProductDetail,
    screens.Cart,
    screens.OrderSuccess,
    screens.OrderPlacedItemView,
    screens.AddressSelection,
  ]);
const SellerStack = () =>
  genStackNavigator([
    screens.SellerIntro,
    screens.SellerUserDetails,
    screens.SellerShopDetails,
    screens.SellerShopFeatures,
    screens.SellerShopCategories,
    screens.SellerSuccess,
    screens.SellerOrderReceivedItemView,
  ]);
const ModalStack = () =>
  genStackNavigator([screens.Search, screens.LocationMarker, screens.LocationSuggest, screens.Offers]);

// Tabs
const tabs: TabScreenLayouts = {
  ShopNavigator: {
    name: 'ShopNavigator',
    component: ShopStack,
    options: () => ({
      title: 'Shop',
    }),
  },
  SubscriptionNavigator: {
    name: 'SubscriptionNavigator',
    component: SubscriptionStack,
    options: () => ({
      title: 'Subscription',
    }),
  },
  ScanNavigator: {
    name: 'ScanNavigator',
    component: ScanStack,
    options: () => ({
      title: 'Scan',
    }),
  },
  StoresNavigator: {
    name: 'StoresNavigator',
    component: StoresStack,
    options: () => ({
      title: 'Stores',
    }),
  },
  AccountNavigator: {
    name: 'AccountNavigator',
    component: AccountStack,
    options: () => ({
      title: 'Account',
    }),
  },
};
const TabNavigator = () =>
  genTabNavigator([
    tabs.ShopNavigator,
    tabs.SubscriptionNavigator,
    tabs.ScanNavigator,
    tabs.StoresNavigator,
    tabs.AccountNavigator,
  ]);

// Loose
const loose: LooseLayouts = {
  LooseStack: {
    name: 'LooseStack',
    component: LooseStack,
    options: () => ({
      title: 'Loose',
    }),
  },
  SellerStack: {
    name: 'SellerStack',
    component: SellerStack,
    options: () => ({
      title: 'Seller',
    }),
  },
};

// Modals
const modals: ModalScreenLayouts = {
  ModalStack: {
    name: 'ModalStack',
    component: ModalStack,
    options: () => ({
      title: 'ModalStack',
    }),
  },
};

// Root Navigator
export const RootNavigator = (): JSX.Element =>
  genRootNavigator(TabNavigator, [modals.ModalStack], [loose.LooseStack, loose.SellerStack]);

export const AuthNavigator = (): JSX.Element => genRootNavigator(AuthStack, [], []);
