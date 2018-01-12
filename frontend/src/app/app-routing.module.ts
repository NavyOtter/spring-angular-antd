import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

import { AuthGuard } from './core/auth/auth.guard';

import { LayoutComponent } from './layout/layout.component';

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
    ]
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
