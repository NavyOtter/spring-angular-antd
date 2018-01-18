import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../core/auth/auth.service';
import { StateStorageService } from '../core/auth/state-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  failed: boolean;
  loading: boolean;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private stateStorageService: StateStorageService) {

    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [true]
    });
  }


  get username() { return this.form.controls.username; }

  get password() { return this.form.controls.password; }

  submit() {
    // for (const i in this.form.controls) {
    //   this.form.controls[i].markAsDirty();
    // }

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
        },
        (error) => {
          this.loading = false;
          this.failed = true;

        }

      );
    }

  }
}
