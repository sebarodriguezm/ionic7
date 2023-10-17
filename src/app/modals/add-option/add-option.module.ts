import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddOptionPageRoutingModule } from './add-option-routing.module';

import { AddOptionPage } from './add-option.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddOptionPageRoutingModule
  ],
  declarations: [AddOptionPage],
 schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AddOptionPageModule {}
