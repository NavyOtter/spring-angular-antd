import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [LayoutComponent]
})
export class AppLayoutModule { }
