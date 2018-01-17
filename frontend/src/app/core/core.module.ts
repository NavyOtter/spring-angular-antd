import { NgModule, Optional, SkipSelf, LOCALE_ID, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { Ng2Webstorage } from 'ngx-webstorage';


import { StateStorageService } from './auth/state-storage.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { SettingsService } from './settings/settings.service';
import { ScrollService } from './scroll/scroll.service';
import { MenuService } from './menu/menu.service';
import { TitleService } from './title/title.service';
import { I18NService } from './i18n/i18n.service';
import { StartupService } from './startup/startup.service';

import { UserService } from './user/user.service';

import { registerLocaleData } from '@angular/common';
import localeZhHans from '@angular/common/locales/zh-Hans';

registerLocaleData(localeZhHans);

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `assets/i18n/`, '.json');
}

export function StartupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load();
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    Ng2Webstorage.forRoot({ prefix: 'app', separator: '-' })
  ],
  declarations: [
    HasAnyAuthorityDirective
  ],
  entryComponents: [
  ],
  exports: [
  ],
  providers: [
    StateStorageService,
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    I18NService,
    SettingsService,
    ScrollService,
    MenuService,
    TitleService,
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: StartupServiceFactory,
      deps: [StartupService],
      multi: true
    },
    UserService,
    HasAnyAuthorityDirective
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
