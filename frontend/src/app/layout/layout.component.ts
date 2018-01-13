import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd, RouteConfigLoadStart, NavigationError } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

import { ScrollService } from '../core/scroll/scroll.service';
import { MenuService } from '../core/menu/menu.service';
import { SettingsService } from '../core/settings/settings.service';

import { User } from '../core/user/user';
import { AuthService } from '../core/auth/auth.service';





@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent implements OnInit {
  isFetching = false;

  constructor(router: Router,
    scrollService: ScrollService,
    private messageService: NzMessageService,
    public menuService: MenuService,
    public settings: SettingsService) {

    router.events.subscribe(evt => {
      if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
        this.isFetching = true;
      }
      if (evt instanceof NavigationError) {
        this.isFetching = false;
        // TODO: i18n
        messageService.error(`无法加载${evt.url}路由`, { nzDuration: 1000 * 3 });
        return;
      }
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      setTimeout(() => {
        scrollService.scrollToTop();
        this.isFetching = false;
      }, 100);
    });

  }

  ngOnInit() {

  }
}
