import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

 import { AuthGuard } from './core/auth/auth.guard';
//
import { LayoutComponent } from './layout/layout.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { ErrorComponent } from './page/error/error.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canLoad: [AuthGuard],
        data: {
          preload: true,
          authorities: ['ROLE_USER']
        }
      },
      {
        path: 'users',
        loadChildren: './user/user.module#UserModule',
        canLoad: [AuthGuard],
        data: {
          authorities: ['ROLE_ADMIN']
        }
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        //enableTracing: true, // <-- debugging purposes only
      })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
