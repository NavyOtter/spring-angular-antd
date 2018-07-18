import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { UserService } from '../../core/user/user.service';
import { User } from '../../core/user/user';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.less']
})
export class UserEditComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  user: User;

  constructor(private route: ActivatedRoute,
    private messageService: NzMessageService,
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
