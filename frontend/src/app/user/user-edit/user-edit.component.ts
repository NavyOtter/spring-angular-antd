import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { UserService } from '../../core/user/user.service';
import { User } from '../../core/user/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.less']
})
export class UserEditComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  user: User;

  form: FormGroup;
  loading = false;
  submitting = false;
  failed = false;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private msg: NzMessageService,
              private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z0-9]*$/)
        ]
      ],
      password: [
        null,
        [
          Validators.minLength(6)
        ]
      ],
      nickname: [
        null,
        [
          Validators.maxLength(20)
        ]
      ],
      name: [
        null,
        [
          Validators.maxLength(20)
        ]
      ],
      email: [
        null,
        [
          Validators.email,
          Validators.maxLength(100)
        ]
      ],
      phone: [
        null,
        [
          Validators.maxLength(20)
        ]
      ],
      authorities: [
        null,
        []
      ],
      enabled: [
        true,
        []
      ],
      activated: [
        true,
        []
      ]
    });
    this.subscription = this.route.params.subscribe(
      (params) => {
        const id = +params['id'];
        this.load(id);
      }
    );

  }

  load(id: any) {
    if (Number.isNaN(id)) {
      this.user = <User>{};
    } else {
      this.loading = true;
      this.userService.get(id).subscribe(
        (user) => {
          this.loading = false;
          this.user = user;
          this.form.patchValue(user);
        },
        (error) => {
          this.loading = false;
          this.msg.error('用户信息加载失败');

        });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  get username() {
    return this.form.controls.username;
  }

  get password() {
    return this.form.controls.password;
  }

  get nickname() {
    return this.form.controls.nickname;
  }

  get name() {
    return this.form.controls.name;
  }

  get email() {
    return this.form.controls.email;
  }

  get phone() {
    return this.form.controls.phone;
  }

  get authorities() {
    return this.form.controls.authorities;
  }

  get enabled() {
    return this.form.controls.enabled;
  }

  get activated() {
    return this.form.controls.activated;
  }

  submit() {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (this.form.valid) {
      this.submitting = true;
      this.failed = false;

    }
  }
}


