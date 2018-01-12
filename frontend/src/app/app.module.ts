import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import './rxjs-operators';

import { AppComponent } from './app.component';

/* Feature Modules */
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
// import { PageModule } from './page/page.module';
// import { LoginModule } from './login/login.module';

/* Routing Module */
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    LayoutModule,
    // LoginModule,
    AppRoutingModule,
    // PageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
