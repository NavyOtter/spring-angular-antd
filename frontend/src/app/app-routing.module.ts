import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";

import { SelectivePreloadingStrategy } from "./selective-preloading-strategy";

import { AuthGuard } from "./core/auth/auth.guard";

import { LayoutComponent } from "./layout/layout.component";
import { ForbiddenComponent } from "./page/forbidden/forbidden.component";
import { NotFoundComponent } from "./page/not-found/not-found.component";
import { ErrorComponent } from "./page/error/error.component";
import { LoginComponent } from "./login/login.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "forbidden",
    component: ForbiddenComponent
  },
  {
    path: "error",
    component: ErrorComponent
  },
  {
    path: "",
    component: LayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: "dashboard",
        loadChildren: "app/dashboard/dashboard.module#DashboardModule",
        canLoad: [AuthGuard],
        data: {
          preload: true,
          authorities: ["ROLE_USER"]
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
        path: "test",
        loadChildren: "app/test/test.module#TestModule",
        canLoad: [AuthGuard],
        data: {
          authorities: ["ROLE_USER"]
        }
      }
    ]
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      //enableTracing: true, // <-- debugging purposes only
      preloadingStrategy: SelectivePreloadingStrategy
    })
  ],
  exports: [RouterModule],
  providers: [SelectivePreloadingStrategy]
})
export class AppRoutingModule {}
