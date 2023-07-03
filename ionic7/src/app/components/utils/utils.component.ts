import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.scss'],
})
export class UtilsComponent  implements OnInit {

  constructor(
    private alert: AlertController,
    private toast: ToastController,
    private loading: LoadingController
  ) {}

  ngOnInit()
  {}
//alert es intrusivo necesita que el usuario haga algo
  async showAlert(title: string, message: string) {
    const alert = await this.alert.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  // message es no intrusivo solo muestra un mensaje  y desaparece solo 
  async message(msg:any, time:number, estilo = 'toast-success', color:any) {
    const toast = await this.toast.create({
      message: msg,
      duration: time * 1000,
      position: 'top',
      cssClass: estilo,
      color: color
    });

    toast.present();
  }

// loading es un spinner que se muestra mientras se realiza una tarea
 async showLoading(message: string) {
    const loading = await this.loading.create({
      message: message,
      spinner: 'circles',
      translucent: true
    });

    await loading.present();
  }
// loading es un spinner que se muestra mientras se realiza una tarea
  async hideLoading() {
    await this.loading.dismiss();
  }
// alerta de confirmacion 
  async showConfirmationAlert(title: string, message: string) {
    return new Promise<boolean>(async (resolve) => {
      const alert = await this.alert.create({
        header: title,
        message: message,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              resolve(false);
            }
          },
          {
            text: 'Confirmar',
            handler: () => {
              resolve(true);
            }
          }
        ]
      });

      await alert.present();
    });
  }
}