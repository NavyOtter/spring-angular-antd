import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { Ng2Webstorage } from 'ngx-webstorage';


import { StateStorageService } from './auth/state-storage.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

import { SettingsService } from './settings/settings.service';
import { ScrollService } from './scroll/scroll.service';
import { MenuService } from './menu/menu.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    Ng2Webstorage.forRoot({ prefix: 'app', separator: '-' })
  ],
  declarations: [
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
    SettingsService,
    ScrollService,
    MenuService
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
