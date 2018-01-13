import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

import { AuthGuard } from './core/auth/auth.guard';

import { LayoutComponent } from './layout/layout.component';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { ErrorComponent } from './page/error/error.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    // canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
        // canLoad: [AuthGuard],
        data: {
          preload: true,
          // authorities: ['ROLE_USER']
        }
      },
      // {
      //   path: 'users',
      //   loadChildren: 'app/user/user.module#UserModule',
      //   canLoad: [AuthGuard],
      //   data: {
      //     authorities: ['ROLE_ADMIN']
      //   }
      // }
            {
        path: 'test',
        loadChildren: 'app/test/test.module#TestModule',
        // canLoad: [AuthGuard],
        data: {
          // authorities: ['ROLE_ADMIN']
        }
      }
    ]
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
        preloadingStrategy: SelectivePreloadingStrategy
      })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    SelectivePreloadingStrategy
  ]
})
export class AppRoutingModule { }
