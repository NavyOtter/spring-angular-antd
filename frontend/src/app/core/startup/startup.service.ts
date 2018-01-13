import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { zip } from 'rxjs/observable/zip';
import { TranslateService } from '@ngx-translate/core';

import { I18NService } from '../i18n/i18n.service';
import { MenuService } from '../menu/menu.service';
import { SettingsService } from '../settings/settings.service';
import { TitleService } from '../title/title.service';

@Injectable()
export class StartupService {

  constructor( private menuService: MenuService,
    private translateService: TranslateService,
    private i18nService: I18NService,
    private settingService: SettingsService,
    private titleService: TitleService,
    private httpClient: HttpClient,
    private injector: Injector) { }

    load(): Promise<any> {

      return new Promise((resolve, reject) => {
          zip(
              this.httpClient.get(`assets/i18n/${this.i18nService.defaultLang}.json`),
              this.httpClient.get('assets/app-data.json')
          ).subscribe(([langData, appData]) => {
              // setting language data
              this.translateService.setTranslation(this.i18nService.defaultLang, langData);
              this.translateService.setDefaultLang(this.i18nService.defaultLang);

              // application data
              const res: any = appData;
              // 应用信息：包括站点名、描述、年份
              this.settingService.setApp(res.app);

              // 初始化菜单
              this.menuService.add(res.menu);
              // 设置页面标题的后缀
              this.titleService.suffix = res.app.name;

              resolve(res);
          }, (err: HttpErrorResponse) => {
              resolve(null);
          });
      });
  }
}
