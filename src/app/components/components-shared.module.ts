import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { QuillModule } from 'ngx-quill';
import { HeaderComponent } from './header/header.component';






@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    QuillModule.forRoot({
      modules: {
        syntax: false
      }
    }),

  ],
  declarations: [
HeaderComponent
  ],
  exports: [
    CommonModule,
HeaderComponent

  ],
})
export class ComponentSharedModule { }
