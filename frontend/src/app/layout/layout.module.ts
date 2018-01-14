import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { SharedModule } from "../shared/shared.module";
import { LayoutComponent } from "./layout.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { HeaderComponent } from "./header/header.component";
import { SidebarNavComponent } from "./sidebar-nav/sidebar-nav.component";
import { ReuseTabComponent } from "./reuse-tab/reuse-tab.component";
import { ReuseTabService } from "./reuse-tab/reuse-tab.service";
import { ReuseTabStrategy } from "./reuse-tab/reuse-tab-strategy";
import { HeaderUserComponent } from './header-user/header-user.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    SidebarNavComponent,
    ReuseTabComponent,
    HeaderUserComponent
  ],
  providers: [
    ReuseTabService,
    { provide: RouteReuseStrategy, useClass: ReuseTabStrategy, deps: [ ReuseTabService ] }
]
})
export class LayoutModule {}
