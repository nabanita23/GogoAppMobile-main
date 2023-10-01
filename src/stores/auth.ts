import { IStore, PVoid } from '@/utils/types';
import { makeAutoObservable } from 'mobx';
import { clearPersistedStore, hydrateStore, makePersistable } from 'mobx-persist-store';

export class AuthStore implements IStore {
  isAuthenticated = false;
  accessToken: string | undefined = undefined;

  setAuthenticated = (): void => {
    this.isAuthenticated = true;
  };

  setToken = (accessToken: string) => {
    this.accessToken = accessToken;
  };

  loading = false;
  setLoading = (v: boolean): void => {
    this.loading = v;
  };

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: AuthStore.name,
      properties: ['accessToken', 'isAuthenticated'],
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
      this.isAuthenticated = false;
      this.accessToken = undefined;
      resolve();
    });
  };
}
