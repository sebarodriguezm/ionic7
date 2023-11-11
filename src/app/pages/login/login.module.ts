import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { CrudService } from '../../providers/crud.service';


import { UserRegistrationService } from '../../providers/user.registration.service';
import { ComponentSharedModule } from '../../components/components-shared.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ComponentSharedModule
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
