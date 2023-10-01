import { PVoid, Stores } from '@/utils/types';
import React from 'react';
import './_hydration';
import { AuthStore } from './auth';
import { CartStore } from './cart';
import { CustomEventStore } from './customEvent';
import { UIStore } from './ui';
import { UserStore } from './user';

export const stores = {
  ui: new UIStore(),
  user: new UserStore(),
  auth: new AuthStore(),
  cart: new CartStore(),
  customEvent: new CustomEventStore(),
};

type ContextStores = typeof stores;

const storeContext = React.createContext<ContextStores>(stores);

export const StoresProvider = ({ children }: any) => (
  <storeContext.Provider value={stores}>{children}</storeContext.Provider>
);

export const useStores = (): ContextStores => React.useContext(storeContext);

export const hydrateStores = async (): PVoid => {
  for (const key in stores) {
    if (Object.prototype.hasOwnProperty.call(stores, key)) {
      const s = (stores as Stores)[key];

      if (s.hydrate) {
        await s.hydrate();
      }
    }
  }
};

export const resetStores = async (): PVoid => {
  for (const key in stores) {
    if (Object.prototype.hasOwnProperty.call(stores, key)) {
      const s: any = (stores as Stores)[key];
      if (key !== 'ui' && s.clear) {
        await s.clear();
        await s.reset();
      }
    }
  }
};
