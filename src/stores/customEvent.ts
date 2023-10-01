import { IStore, PVoid } from '@/utils/types';
import { makeAutoObservable } from 'mobx';
import { clearPersistedStore, hydrateStore, makePersistable } from 'mobx-persist-store';

export class CustomEventStore implements IStore {
  refresh?: boolean = false;

  setRefreshTrue = (): void => {
    this.refresh = true;
  };

  setRefreshFalse = (): void => {
    this.refresh = false;
  };

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: CustomEventStore.name,
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
      this.refresh = false;
      resolve();
    });
  };
}
