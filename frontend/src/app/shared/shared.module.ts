import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AvatarModule } from 'ngx-avatar';
import { ContentHeaderComponent } from './component/content-header/content-header.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    AvatarModule,
    NgZorroAntdModule.forRoot({ extraFontName: 'anticon', extraFontUrl: './assets/fonts/iconfont' })
  ],
  declarations: [
    ContentHeaderComponent
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    AvatarModule,
    NgZorroAntdModule,

    ContentHeaderComponent

  ]
})
export class SharedModule { }
