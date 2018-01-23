import { Component , HostBinding, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

import { SettingsService } from './core/settings/settings.service';
import { TitleService } from './core/title/title.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {

  @HostBinding('class.layout-fixed') get isFixed() { return this.settings.layout.fixed; }
  @HostBinding('class.layout-boxed') get isBoxed() { return this.settings.layout.boxed; }
  @HostBinding('class.aside-collapsed') get isCollapsed() { return this.settings.layout.collapsed; }

  constructor(
    private router: Router,
    private settings: SettingsService,
    private titleService: TitleService) {
  }

  ngOnInit() {
    this.router.events.pipe(
            filter(evt => evt instanceof NavigationEnd),
            map(() => this.router)
        )
        .subscribe(router => {
            this.titleService.setTitleByRouter(router);
        });
  }
}
