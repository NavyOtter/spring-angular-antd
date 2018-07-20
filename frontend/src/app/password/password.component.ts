import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.less']
})
export class PasswordComponent implements OnInit {
  form: FormGroup;
  submitting = false;

  visible = false;
  status = 'pool';
  progress = 0;
  passwordProgressMap = {
    ok: 'success',
    pass: 'normal',
    pool: 'exception',
  };

  constructor(private fb: FormBuilder, private msg: NzMessageService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      oldPassword: [
        null,
        [
          Validators.required
        ]
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          PasswordComponent.checkPassword.bind(this)
        ]
      ],
      confirmPassword: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          PasswordComponent.passwordEqual.bind(this)
        ]
      ],
    });
  }

  static checkPassword(control: FormControl) {
    if (!control) return null;
    const self: any = this;
    self.visible = !!control.value;
    if (control.value && control.value.length > 9) self.status = 'ok';
    else if (control.value && control.value.length > 5) self.status = 'pass';
    else self.status = 'pool';

    if (self.visible)
      self.progress =
        control.value.length * 10 > 100 ? 100 : control.value.length * 10;
  }

  static passwordEqual(control: FormControl) {
    if (!control || !control.parent) return null;
    if (control.value !== control.parent.get('password').value) {
      return { equal: true };
    }
    return null;
  }

  get oldPassword() { return this.form.controls.oldPassword; }

  get password() { return this.form.controls.password; }

  get confirmPassword() { return this.form.controls.confirmPassword; }

  submit() {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (this.form.invalid) return;
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
      this.msg.success(`提交成功`);
    }, 1000);
  }
}

