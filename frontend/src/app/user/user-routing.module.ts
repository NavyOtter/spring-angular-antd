import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', component: UserListComponent, data: { authorities: ['ROLE_ADMIN'] } },
      { path: ':id', component: UserEditComponent, data: { authorities: ['ROLE_ADMIN'] } },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
