import { stores } from '@/stores';
import { IService, PVoid } from '@/utils/types';

const { ui } = stores;

export class OnStartService implements IService {
  private inited = false;

  init = async (): PVoid => {
    if (!this.inited) {
      ui.incAppLaunces();

      this.inited = true;
    }
  };
}
