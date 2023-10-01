import { stores } from '@/stores';
import { I18n } from 'i18n-js';
import { en, ru } from './translations';
import { IService, PVoid } from '@/utils/types';
export class TranslateService implements IService {
  private inited = false;
  private i18n = new I18n();

  init = async (): PVoid => {
    if (!this.inited) {
      this.setup();
      this.inited = true;
    }
  };

  do = (data: string) => this.i18n.t(data);

  setup = (): void => {
    const { ui } = stores;
    this.i18n.enableFallback = true;
    this.i18n.store({ en, ru });
    if (ui.isSystemLanguage) {
      this.i18n.locale = 'en';
    } else {
      this.i18n.locale = ui.language;
    }
  };
}
