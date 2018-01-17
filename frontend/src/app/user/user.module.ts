import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,

    UserRoutingModule
  ],
  declarations: [UserComponent, UserListComponent, UserEditComponent]
})
export class UserModule { }
