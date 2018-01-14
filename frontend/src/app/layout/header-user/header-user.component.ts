import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../core/user/user';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.scss']
})
export class HeaderUserComponent implements OnInit {

  principal: User;

  constructor(private router: Router,
    private authService:AuthService) { }

  ngOnInit() {
    this.authService.getPrincipal().subscribe(
      (principal)=>{
        this.principal=principal;
        if (!this.principal.avatar){
          this.principal.avatar = 'assets/images/avatar.svg';
        }
      }
    )
  }

  logout() {
    this.authService.logout().subscribe();
    this.router.navigate(["login"]);
  }

}
