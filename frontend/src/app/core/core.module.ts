import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { Ng2Webstorage } from 'ngx-webstorage';

import { AuthInterceptor } from './auth/auth.interceptor';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    Ng2Webstorage.forRoot({ prefix: 'app', separator: '-' })
  ],
  declarations: [
    HasAnyAuthorityDirective
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    HasAnyAuthorityDirective
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
