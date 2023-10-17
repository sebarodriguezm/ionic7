import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsPageRoutingModule } from './products-routing.module';

import { ProductsPage } from './products.page';
import { ComponentSharedModule } from 'src/app/components/components-shared.module';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsPageRoutingModule,
    ComponentSharedModule,
    QuillModule.forRoot({
      modules: {
        syntax: false
      }
    }),
  ],
  declarations: [ProductsPage]
})
export class ProductsPageModule {}
