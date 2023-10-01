import { ButtonSizeProp } from 'react-native-ui-lib/src/components/button/ButtonTypes';

interface IService {
  init: () => PVoid;
}
type Services = Record<string, IService>;

interface IStore {
  hydrate?: () => PVoid;
  clear?: () => PVoid;
}
type Stores = Record<string, IStore>;

type PVoid = Promise<void>;
type AnyObj = Record<string, unknown>;
type PureFunc = () => void;
type PromiseFunc = (v?: any) => Promise<void>;

type DesignSystemColors = Record<string, string>;
type AppearanceMode = 'light' | 'dark';
type StatusBarStyle = 'light-content' | 'dark-content' | undefined;

type FetcherOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  external?: boolean;
};

type FetcherReturn<T> = {
  status: number;
  statusText: string;
  data?: T;
  meta?: T;
  isError?: boolean;
  error?: IError;
};

type IMeta = {
  pagination: IPagination;
};

type IPagination = {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
};

export interface IError {
  status: number;
  name: string;
  message: string;
  details: IErrorDetails;
}

export interface IErrorDetails {
  errors: IErrorBlock[];
}

export interface IErrorBlock {
  path: string[];
  message: string;
  name: string;
}

type PermissionStatus = 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked';

type IButtonBase = {
  fullWidth?: boolean;
  ghost?: boolean;
  color?: string;
  backgroundColor?: string;
  label?: string;
  onPress: PureFunc | PromiseFunc;
  disabled?: boolean;
  iconPosition?: 'left' | 'right' | 'top' | 'bottom';
  iconSVG?: Function;
  size?: ButtonSizeProp;
  loading?: boolean;
};

type ThemeColors = {
  // **1: primary // **2:secondary
  screen1: string;
  screen2: string;
  button1: string;
  button2: string;
  text1: string;
  text2: string;
  border1: string;
  border2: string;
};

type CurrentAppearance = {
  value: AppearanceMode;
  system: boolean;
};

type Language = 'en' | 'ru';

// SERVICES
type AppType = 'one_screen' | 'three_tabs';

// STORES
type UIAppearance = 'System' | 'Light' | 'Dark';
type UILanguage = 'System' | 'English' | 'Russian';

// SCREENS
// Props
type ExampleScreenProps = {
  value?: number;
};

// Settings
type AppearanceAction = {
  name: UIAppearance;
};

type LanguageAction = {
  name: UILanguage;
};

// API
// Responses
type CounterGetResponse = {
  value: number;
};

// SCREENS
// Props
type RootScreenProps = {
  screen?: string;
  params?: any;
};

export interface IImages {
  data: IImageItem[];
}

export interface IImageItem {
  id: number;
  attributes: IImageAttributes;
}

export interface IImageAttributes {
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: IImageFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: any;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
}

export interface IImage extends IImageAttributes {
  id: number;
}

export interface IImageFormats {
  large: IImageObject;
  small: IImageObject;
  medium: IImageObject;
  thumbnail: IImageObject;
}

export interface IImageObject {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: any;
  size: number;
  width: number;
  height: number;
}

export interface ICategory {
  id: number;
  attributes: ICategoryAttributes;
}

export interface ICategoryAttributes {
  ageConsentRequired: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  textColor: string;
  backgroundColor: string;
  slug: string;
  itemCount: number;
  bannerUrl?: string;
  name: string;
  images: IImages | null;
  productFilters?: IProductFilter[];
}

export interface IProductFilter {
  id: number;
  name: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  locale: string;
  textColor: string;
  backgroundColor: string;
  slug: string;
  imageSources: string | null;
  images: IImageAttributes[] | null;
}

export interface IProduct {
  id: number;
  nameWithoutBrand: string;
  inStock: boolean | null;
  quantity: number | null;
  quantityText: string | null;
  unitOfMeasure: string | null;
  weightInGrams: number | null;
  volumetricWeightInGrams: number | null;
  volumeInMl: number | null;
  dimensions: any;
  safeAge: boolean | null;
  eggSafe: boolean | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  productId: string;
  displayName: string;
  allowedMinQuantity: number | null;
  allowedMaxQuantity: number | null;
  description: string | null;
  mrp: number;
  sellingPrice: number;
  discountPercent: number;
  originPlace: string | null;
  imageSources: string | null;
  summary: string | null;
  images: (Omit<IImageItem, 'attributes'> & IImageAttributes)[] | null;
  cartItems: Record<string, string | number>[];
}

export interface ICartData {
  id: number;
  coupon: any;
  createdAt: string;
  updatedAt: string;
  deliveryFees: any;
  unsavedAddress: IAddress;
  promotions: any[];
  userAddress: IAddress;
  lastSelectedMerchant: IMerchant;
  items: ICartItem[];
  grandTotal: number;
  total: number;
  value: number;
  productTotal: number;
  discount: number;
  discountPercent: number;
  totalMrp: number;
  totalItems: number;
  quickDelivery: boolean;
  cartCalculation: ICartCalculation;
}

export interface ICartCalculation {
  packagingFee: number;
  handlingFee: number;
  minimumCartFee: number;
  transportFee: number;
  quickDeliveryFee: number;
}

export interface ICartItem {
  id: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  mrp: number;
  sellingPrice: number;
  storeId: string;
  discountPercent: number;
  product: IProduct;
}

export interface IUser {
  blocked: boolean;
  confirmed: boolean;
  createdAt: string;
  email: any;
  firstName: any;
  id: number;
  isSeller: any;
  lastName: any;
  phoneConfirmed: boolean;
  phoneNumber: string;
  provider: string;
  updatedAt: string;
  username: any;
  aadharNumber?: string;
  stores: IMerchant[];
}

export type MessageBoundary = {
  inline?: boolean;
  code?: number;
  type: 'warning' | 'error' | 'info' | 'success';
  message: string;
  link?: string;
};

export type IGeo = {
  longitude: number;
  latitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
};

export type ILocation = {
  address: string;
  geo: IGeo;
};

export interface IPlacedOrder {
  id: number;
  cartReferenceId: string;
  status: string;
  orderId: string;
  createdAt: string;
  updatedAt: string;
  paymentStatus: any;
  value: number;
  cashOnDelivery: boolean;
  quickDelivery: any;
  deliveryFee: any;
  quickDeliveryFee: any;
  totalItems: any;
  merchant: IMerchant;
  customer: IUser;
  deliveryAddress: IAddress;
  billingAddress: IAddress;
  orderItems: ICartItem[];
}

export interface IMerchant {
  owner?: {
    phoneNumber: string;
    whatsApp: string;
  };
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  pinCode: string;
  locality: string;
  lat: number;
  long: number;
  address: IAddress;
  phoneNumber: string;
  whatsApp: string;
  deliveryAvailable: boolean;
  deliveryMinOrderValue: number;
  quickDeliveryAvailable: boolean;
  quickDeliveryMinOrderValue: number;
  city: string;
  rating: number;
  standardDeliveryFee: number;
  quickDeliveryFee: number;
  freeDeliveryAboveOrderValue: number;
  freeQuickDeliveryAboveOrderValue: number;
  deliveryRating: number;
  landmark: any;
  slug: string;
  categoryOrder: any;
  phoneConfirmed: boolean;
  whatsAppConfirmed: boolean;
  upiId: any;
  gstin: number;
  tollFreeNumber: any;
  qrcodeImage: IImageAttributes;
  featuredImage: IImageAttributes;
  distanceInMeters: number;
  lastOrderedAt: string;
}

export interface IAddress {
  id?: number;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
  locality?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  pinCode?: string;
  landmark?: string;
  formattedAddressByGoogle?: string;
  addressByGoogle?: any;
  lat?: number;
  long?: number;
  phoneNumber?: any;
  whatsApp?: any;
  type?: string;
  lastOrderedAt?: any;
  selected?: boolean;
}

export interface IProduct {
  id: number;
  displayName: string;
}
