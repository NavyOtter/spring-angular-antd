import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

import { Page } from '../../core/model/page';
import { User } from '../../core/user/user';
import { UserCriteria } from '../../core/user/user-criteria';
import { UserService } from '../../core/user/user.service';


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

  data = <Page<User>>{
    totalElements: 0,
    content: []
  };

  constructor(
    private userService: UserService,
    private message: NzMessageService,
    private translateService: TranslateService,
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
        this.message.error(this.translateService.instant('error.load'));
      }
    );
  }

  clear() {
    this.q = <UserCriteria>{
      page: 1,
      size: this.q.size
    };
    this.load();
  }


  showMsg(msg: string) {
    this.message.info(msg);
  }

}
