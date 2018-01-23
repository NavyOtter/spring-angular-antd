import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { Page } from '../../core/model/page';
import { User } from '../../core/user/user';
import { UserCriteria } from '../../core/user/user-criteria';
import { UserService } from '../../core/user/user.service';
import { I18NService } from '../../core/i18n/i18n.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  loading = false;

  q = <UserCriteria>{
    page: 1,
    size: 10
  };
  sortMap: any = {};

  data = <Page<User>>{
    totalElements: 0,
    content: []
  };

  constructor(
    private userService: UserService,
    private message: NzMessageService,
    private i18nService: I18NService
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;

    const c = Object.assign({}, this.q);
    c.page = this.q.page - 1;
    this.userService.query(c).subscribe(
      data => {
        this.loading = false;
        this.data = data;
      },
      error => {
        this.loading = false;
        this.message.error(this.i18nService.translate('error.load'));
      }
    );
  }

  clear() {
    this.sortMap = {};
    this.q = <UserCriteria>{
      page: 1,
      size: this.q.size
    };
    this.load();
  }

  sort(field: string, value: any) {
    this.sortMap = {};
    this.sortMap[field] = value;
    this.q.sort = value ? `${field},${value.slice(0, -3)}` : '';
    this.load();
  }

  showMsg(msg: string) {
    this.message.info(msg);
  }

  delete(user: User) {
    this.userService.delete(user.id).subscribe(
      () => {
        this.message.info('删除成功');
        this.load();
      },
      (error) => {
        this.message.error('删除失败');
      }
    );
  }

  edit() {
  }

  add() {
  }

}
