import {
  Component,
  Input,
  ElementRef,
  TemplateRef,
  ContentChild,
  OnInit,
  OnDestroy,
  AfterViewInit,
  Inject,
  Renderer2,
  ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { MenuService } from '../../../core/menu/menu.service';
import { I18NService } from '../../../core/i18n/i18n.service';

@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.scss']
})
export class ContentHeaderComponent implements OnInit, OnDestroy {
  // region fields

  @Input() title: string;

  /**
   * 自动生成导航，以当前路由从主菜单中定位
   */
  @Input()
  get autoBreadcrumb() {
    return this._autoBreadcrumb;
  }
  set autoBreadcrumb(value: any) {
    this._autoBreadcrumb = coerceBooleanProperty(value);
  }
  private _autoBreadcrumb = true;

  paths: any[] = [];

  subscription: Subscription;

  @ContentChild('breadcrumb') breadcrumb: TemplateRef<any>;

  @ContentChild('logo') logo: TemplateRef<any>;

  @ContentChild('action') action: TemplateRef<any>;

  @ContentChild('content') content: TemplateRef<any>;

  @ContentChild('extra') extra: TemplateRef<any>;

  @ContentChild('tab') tab: TemplateRef<any>;

  // endregion

  constructor(
    private route: Router,
    private menuSrv: MenuService,
    private i18nSrv: I18NService,
    private el: ElementRef,
    private renderer: Renderer2,
    private translateService: TranslateService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscription = this.translateService.onLangChange.subscribe(
      (event) => {
        this.genBreadcrumb();
        this.changeDetectorRef.markForCheck();
        this.changeDetectorRef.detectChanges();
      }
    );
  }

  private genBreadcrumb() {
    if (this.breadcrumb || !this.autoBreadcrumb) {
      return;
    }
    const menus = this.menuSrv.getPathByUrl(this.route.url);
    if (menus.length <= 0) {
      return;
    }
    const paths: any[] = [];
    menus.forEach(item => {
      let title;
      if (item.translate) {
        title = this.i18nSrv.translate(item.translate);
      }
      paths.push({ title: title || item.text, link: item.link && [item.link] });
    });
    // add home
    paths.splice(0, 0, {
      title: this.i18nSrv.translate('menu.home') || 'Home',
      link: ['/']
    });
    this.paths = paths;
  }

  ngOnInit() {
    (this.el.nativeElement as HTMLElement).classList.add(
      'content__title',
      'app-content-header'
    );
    this.genBreadcrumb();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
