import { Component, OnInit } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd";
import { map } from "rxjs/operators";

import { Criteria } from "../../core/model/criteria";
import { Page } from "../../core/model/page";
import { User } from "../../core/user/user";
import { UserCriteria } from "../../core/user/user-criteria";
import { UserService } from "../../core/user/user.service";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {
  constructor(
    private userService: UserService,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.load();
  }

  pi = 1;
  ps = 10;
  total = 0; // mock total
  list = [];
  loading = false;
  args: any = {};
  _indeterminate = false;
  _allChecked = false;

  events: any[] = [];

  load(pi?: number) {
    if (typeof pi !== "undefined") {
      this.pi = pi || 1;
    }

    this.loading = true;
    this._allChecked = false;
    this._indeterminate = false;

    let c: Criteria = {
      page: this.pi,
      size: this.ps
    };

    this.userService.query(c).subscribe(data => {
      this.loading = false;
      this.list = data.content;
      this.total = data.totalElements;
    });
  }

  clear() {
    this.args = {};
    this.load(1);
  }

  _checkAll() {
    this.list.forEach(item => (item.checked = this._allChecked));
    this.refChecked();
  }
  refChecked() {
    const checkedCount = this.list.filter(w => w.checked).length;
    this._allChecked = checkedCount === this.list.length;
    this._indeterminate = this._allChecked ? false : checkedCount > 0;
  }

  showMsg(msg: string) {
    this.message.info(msg);
  }

  refresh(){

  }
}
