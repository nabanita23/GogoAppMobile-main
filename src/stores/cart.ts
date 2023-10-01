import { IStore, PVoid } from '@/utils/types';
import { makeAutoObservable } from 'mobx';
import { clearPersistedStore, hydrateStore, makePersistable } from 'mobx-persist-store';

export interface ICartStore {
  [key: string]: number;
}

export class CartStore implements IStore {
  localCart: ICartStore = {};
  totalUnits: number = 0;
  totalPrice: number = 0;

  inc = (pid: string): void => {
    this.totalUnits += 1;
    if (this.localCart[pid]) {
      this.localCart[pid] += 1;
    } else {
      this.localCart[pid] = 1;
    }
  };

  dec = (pid: string): void => {
    this.totalUnits > 0 ? (this.totalUnits -= 1) : 0;
    if (this.localCart[pid] > 1) {
      this.localCart[pid] -= 1;
    } else {
      delete this.localCart[pid];
    }
  };

  remove = (pid: string): void => {
    this.totalUnits -= this.localCart[pid];
    delete this.localCart[pid];
  };

  quantity = (pid: string): number => {
    return this.localCart[pid] ? this.localCart[pid] : 0;
  };

  updateTotalPrice = (price: number) => {
    this.totalPrice = price;
  };

  init = (data: ICartStore, totalUnits: number, totalPrice: number) => {
    this.localCart = data;
    this.totalPrice = totalPrice;
    this.totalUnits = totalUnits || Object.values(data).reduce((a, b) => a + b, 0);
  };

  loading = false;
  setLoading = (v: boolean): void => {
    this.loading = v;
  };

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: CartStore.name,
      properties: [],
    });
  }

  hydrate = async (): PVoid => {
    await hydrateStore(this);
  };

  clear = async (): PVoid => {
    await clearPersistedStore(this);
  };

  reset = (): PVoid => {
    return new Promise(resolve => {
      this.localCart = {};
      this.totalUnits = 0;
      this.totalPrice = 0;
      resolve();
    });
  };
}
