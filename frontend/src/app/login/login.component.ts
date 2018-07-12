import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';

import { AuthService } from '../core/auth/auth.service';
import { StateStorageService } from '../core/auth/state-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  failed: boolean;
  loading: boolean;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private stateStorageService: StateStorageService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      rememberMe: [ true ]
    });
  }


  get username() { return this.form.controls.username; }

  get password() { return this.form.controls.password; }

  submitForm(): void {
    for (const i in this.form.controls) {
      this.form.controls[ i ].markAsDirty();
      this.form.controls[ i ].updateValueAndValidity();
    }
    if (this.form.valid) {
      this.loading = true;
      this.failed = false;
      this.authService.login(this.form.value).subscribe(
        (data) => {
          this.loading = false;
          const redirect = this.stateStorageService.getUrl();
          if (redirect) {
            this.stateStorageService.storeUrl(null);
            this.router.navigate([redirect]);
          } else {
            this.router.navigate(['']);
          }
          //this.menuService.resume();

        },
        (error) => {
          this.loading = false;
          this.failed = true;

        }

      );
    }
  }
}
