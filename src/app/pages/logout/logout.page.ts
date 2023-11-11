import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { UserRegistrationService } from '../../providers/user.registration.service';
import { CrudService } from '../../providers/crud.service';



@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
  providers: [
    UserRegistrationService,
    CrudService
  ]
})
export class LogoutPage {


  constructor(
              private user: UserRegistrationService,
              public menuCtrl: MenuController,
              public toastController: ToastController,
              public alertCtrl: AlertController,
              public router: Router,
              ) {
    }

  ionViewWillEnter() {
    
    const title = 'Confirmación';
    const msg = 'Está seguro que desea salir de su sesión?';
    this.msgAlertLogout(title, msg);
  }

  async msgAlertLogout(title:any, msg:any) {
    const confirm = 'Confirmar';
    const alert = await this.alertCtrl.create({
      
      header: title,
      message: msg,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.goLogin();
          }
        }, {
          text: confirm,
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  async logout() {
    this.message('Sesión cerrada, vuelve pronto');
    await this.user.logoutUser();
    localStorage.clear();
    this.goLogin();
  }

  async message(msg:any, time = 3, estilo = 'toast-success') {
    const toast = await this.toastController.create({
      message: msg,
      duration: time * 1000,
      position: 'top',
      cssClass: estilo
    });

    toast.present();
  }

  async goLogin() {
    this.router.navigate(['/login']);
    console.log('gologin')
  }


}
