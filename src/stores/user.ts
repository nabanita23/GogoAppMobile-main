import { IGeo, ILocation, IStore, PVoid } from '@/utils/types';
import { makeAutoObservable } from 'mobx';
import { clearPersistedStore, hydrateStore, makePersistable } from 'mobx-persist-store';

export class UserStore implements IStore {
  firstName?: string = undefined;
  lastName?: string = undefined;
  currentStore: number = -1;
  currentStoreName: string = '';
  currentLocation?: string = undefined;
  currentGeo: IGeo | null = null;
  recentLocations: ILocation[] = [];
  isUserSeller?: boolean = false;
  sellerBusinessStoreId?: number = undefined;
  sellerAllBusinesses?: any[] = [];

  setUserName = (firstName: string, lastName: string): void => {
    this.firstName = firstName;
    this.lastName = lastName;
  };

  setCurrentStore = (storeId: number, storeName: string): void => {
    this.currentStore = storeId;
    this.currentStoreName = storeName;
  };

  setCurrentLocationAndGeo = (address: string, geo: IGeo): void => {
    if (this?.currentLocation && this.currentGeo && this.currentLocation !== address) {
      this.recentLocations.push({
        address: this?.currentLocation,
        geo: this?.currentGeo!,
      });
    }
    this.currentLocation = address;
    this.currentGeo = geo;
  };

  setSellerBusinessStoreId = (value: number) => {
    this.sellerBusinessStoreId = value;
  };

  setSellerAllBusinesses = (value: any) => {
    this.sellerAllBusinesses = value;
    this.setSellerBusinessStoreId(value?.[value?.length - 1]?.id);
  };

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: UserStore.name,
      properties: [
        'firstName',
        'lastName',
        'currentStore',
        'currentLocation',
        'currentGeo',
        'sellerBusinessStoreId',
        'sellerAllBusinesses',
      ],
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
      this.firstName = undefined;
      this.lastName = undefined;
      this.currentStore = -1;
      this.currentLocation = undefined;
      this.currentGeo = null;
      this.recentLocations = [];
      this.isUserSeller = false;
      this.sellerBusinessStoreId = undefined;
      this.sellerAllBusinesses = [];
      resolve();
    });
  };
}
