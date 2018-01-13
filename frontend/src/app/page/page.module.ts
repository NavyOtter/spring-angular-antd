import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";

import { NotFoundComponent } from './not-found/not-found.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    NotFoundComponent,
    ForbiddenComponent,
    ErrorComponent
  ]
})
export class PageModule {}
