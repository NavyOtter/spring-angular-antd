import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { switchMap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { UserService } from '../../core/user/user.service';
import { User } from '../../core/user/user';
import { I18NService } from '../../core/i18n/i18n.service';





@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  user: User;

  constructor(private route: ActivatedRoute,
    private messageService: NzMessageService,
    private i18nService: I18NService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (params) => {
        this.load(params['id']);
      }
    );

  }

  load(id: any) {
    if ('-' !== id) {
      this.userService.get(id).subscribe((user) => {
        this.user = user;
      });
    } else {
      this.user = <User>{
      };
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }


}
