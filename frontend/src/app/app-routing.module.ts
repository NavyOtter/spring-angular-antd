import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/auth/auth.guard';
//
import { LayoutComponent } from './layout/layout.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { ErrorComponent } from './page/error/error.component';
import { LoginComponent } from './login/login.component';
import { SelectivePreloadingStrategy } from './core/preloading-strategy/selective-preloading-strategy';

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
        // canLoad: [AuthGuard],
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
          preload: false,
          authorities: ['ROLE_ADMIN']
        }
      },
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: '登录'
    }
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
    data: {
      title: '无权访问'
    }
  },
  {
    path: 'error',
    component: ErrorComponent,
    data: {
      title: '服务器出错'
    }
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {
      title: '页面不存在'
    }
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        //enableTracing: true, // <-- debugging purposes only
        preloadingStrategy: SelectivePreloadingStrategy
      })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
