import { Injectable, Inject } from '@angular/core';
import { Title, DOCUMENT } from '@angular/platform-browser';
import { MenuService } from '../menu/menu.service';
import { I18NService } from '../i18n/i18n.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable()
export class TitleService {
  constructor(
    private title: Title,
    private menuService: MenuService,
    private i18nService: I18NService,
    @Inject(DOCUMENT) private doc: any) { }

  private _prefix = '';
  private _suffix = '';
  private _separator = ' - ';
  private _reverse = false;

  /** 设置分隔符 */
  set separator(value: string) {
    this._separator = value;
  }

  /** 设置前缀 */
  set prefix(value: string) {
    this._prefix = value;
  }

  /** 设置后缀 */
  set suffix(value: string) {
    this._suffix = value;
  }

  /** 设置是否反转 */
  set reverse(value: boolean) {
    this._reverse = value;
  }

  private getByElement(): string {
    const el = this.doc.querySelector('.content__title h1');
    if (el) {
      return el.firstChild.textContent.trim();
    }
    return '';
  }

  /**
   * 设置标题
   * 若不指定则从 `content__title` 中获取 `h1` 内容
   */
  setTitle(title?: string | string[]) {
    if (!title) {
      title = this.getByElement();
    }
    if (title && !Array.isArray(title)) {
      title = [title];
    }

    let newTitles = [];
    if (this._prefix) {
      newTitles.push(this._prefix);
    }
    if (title && title.length > 0) {
      newTitles.push(...(title as string[]));
    }
    if (this._suffix) {
      newTitles.push(this._suffix);
    }
    if (this._reverse) {
      newTitles = newTitles.reverse();
    }
    this.title.setTitle(newTitles.join(this._separator));
  }

  private getTitleBySnapshot(routeSnapshot: ActivatedRouteSnapshot) {

    let title: string;

    if (routeSnapshot.data && routeSnapshot.data['translate']) {
      title = this.i18nService.translate(routeSnapshot.data['translate']);
    } else if (routeSnapshot.data && routeSnapshot.data['title']) {
      title = routeSnapshot.data['title'];
    }

    if (routeSnapshot.firstChild) {
      title = this.getTitleBySnapshot(routeSnapshot.firstChild) || title;
    }
    return title;
  }

  setTitleByRouter(router: Router) {
    const title = this.getTitleBySnapshot(router.routerState.snapshot.root);
    if (title) {
      this.setTitle(title);
    } else {
      this.setTitleByUrl(router.url);
    }
  }

  /**
   * 根据URL地址从 `MenuService` 中获取对应的标题
   */
  setTitleByUrl(url: string) {
    const menus = this.menuService.getPathByUrl(url);
    if (!menus || menus.length <= 0) {
      this.setTitle();
      return;
    }

    const item = menus[menus.length - 1];
    let title;
    if (item.translate && this.i18nService) {
      title = this.i18nService.translate(item.translate);
    }
    this.setTitle(title || item.text);
  }
}
