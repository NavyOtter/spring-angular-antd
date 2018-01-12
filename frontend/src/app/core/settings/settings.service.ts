import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

const KEY = 'layout';

export interface App {
  name?: string;
  description?: string;
  year?: number;
  [key: string]: any;
}

export interface Layout {
  /** 是否固定顶部菜单 */
  fixed: boolean;
  /** 是否折叠右边菜单 */
  collapsed: boolean;
  /** 是否固定宽度 */
  boxed: boolean;
  /** 语言环境 */
  lang: string;
}

@Injectable()
export class SettingsService {

  app: App = {
    year: (new Date()).getFullYear()
  };

  private _layout: Layout = null;

  constructor(private localStorage: LocalStorageService, ) { }

  get layout(): Layout {
    if (!this._layout) {
      this._layout = Object.assign(<Layout>{
        fixed: true,
        collapsed: false,
        boxed: false,
        lang: null
      }, this.localStorage.retrieve(KEY));
      this.localStorage.store(KEY, this._layout);
    }
    return this._layout;
  }

  setLayout(name: string, value: any): boolean {
    if (typeof this.layout[name] !== 'undefined') {
      this.layout[name] = value;
      this.localStorage.store(KEY, this._layout);
      return true;
    }
    return false;
  }

  setApp(val: App) {
    this.app = Object.assign(this.app, val);
  }

}
