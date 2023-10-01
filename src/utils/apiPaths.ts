// Auth
export const SIGN_IN_WITH_PHONE = 'auth/local';
export const VERIFY_PHONE_OTP = 'auth/verify-otp';
export const RESEND_PHONE_OTP = 'auth/resend-otp';

//User data
export const GET_USER = 'users/me?populate=*';
export const UPDATE_USER_ADDRESS = 'users/me/address';
export const POST_USER_ADDRESS = 'users/me/select-unsaved-address';
export const SELECT_USER_DELIVERY_ADDRESS = 'users/me/select-address/';
export const SELECT_CURRENT_MERCHANT = 'users/me/select-merchant/';
export const UPDATE_USER = 'users/me';
export const MY_STORES = 'users/me/merchants';
export const MY_PLACED_ORDERS = 'orders';
export const MY_PLACED_ORDERS_DETAILS = 'orders/';
export const MY_RECEIVED_ORDERS = 'merchant-orders';
export const PLACE_ORDER = 'users/me/place-store-order';

export const DEVICE_SYNC = 'device/sync';

// Search
export const STORE_SEARCH = 'search';

// Store
export const SUB_CATEGORIES = 'stores/{{storeId}}/categories/';
export const UPDATE_STORE_DATA = 'users/me/stores';
export const UPDATE_STORE_CATEGORIES = 'users/me/stores/{{storeId}}/setup';
export const SCAN_QR = 'users/me/merchants';
export const ALL_CATEGORIES = 'categories?populate[0]=images&populate[1]=productFilters&pagination[pageSize]=50';
export const STORE_CATEGORIES =
  'categories?filters[stores][id][$eq]={{storeId}}&populate[0]=images&populate[1]=productFilters&unid={{storeId}}';
export const PRODUCT_FILTERS_BY_CATEGORY = 'product-filters?populate[0]=images&filters[categories][slug]=';
export const PRODUCTS_BY_FILTER = 'products?populate[0]=images&filters[productFilters][slug]=';
export const PRODUCTS_BY_CATEGORY = 'products?populate[0]=images&populate[1]=cartItems&filters[categories][slug]=';

// Cart
export const GET_CART = 'users/me/store-cart';
export const REORDER = 'reorder/';
export const UPDATE_ITEM_IN_CART = 'users/me/cart-item';
