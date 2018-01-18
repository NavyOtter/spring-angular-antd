import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../core/user/user';
import { AuthService } from '../../../core/auth/auth.service';
import { I18NService } from '../../../core/i18n/i18n.service';
import { SettingsService } from '../../../core/settings/settings.service';
import { MenuService } from '../../../core/menu/menu.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss']
})
export class HeaderUserComponent implements OnInit {

  principal: User;

  constructor(private router: Router,
    private settings: SettingsService,
    private authService: AuthService,
    private i18nService: I18NService,
    private menuService: MenuService,

  ) { }

  ngOnInit() {
    this.authService.getPrincipal().subscribe(
      (principal) => {
        this.principal = principal;
        const lang = principal.langKey;
        if (!!lang) {
          // lang = lang.replace(/_/g, '-');
          if (!this.settings.layout.lang) {
            this.i18nService.use(lang, false).subscribe(() => {
              this.menuService.resume();
              // this.reuseTabService.clear();
            });
            this.settings.setLayout('lang', lang);
          }
        }
      }
    );
  }

  logout() {
    this.authService.logout().subscribe();
    this.router.navigate(['login']);
  }

}
