import { Injectable, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController, ModalController, ModalOptions, ToastOptions, IonContent } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  @ViewChild(IonContent, { static: false })
  content!: IonContent;
  showForm = false;
  efect = '';
  constructor(
    public toastController: ToastController,
    public router: Router,
    public loadingCtrl: LoadingController,
    private alertController: AlertController,
    private navController: NavController,
    private modalController: ModalController
  ) { }

   // ===== Message ========
  async message(msg:any, time = 3, estilo = 'toast-success', icon?: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: time * 1000,
      position: 'top',
      cssClass: estilo,
      icon: icon
    });

    toast.present();
  }

   // ===== Loading ========
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: '',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

   // ===== Modal ========
   async presentModal(opts: ModalOptions) {
    const modal = await this.modalController.create(opts);
    await modal.present();
  
    const { data } = await modal.onWillDismiss();

    if(data){
      return data;
    }
  }

  dismissModal(data?: any){
    this.modalController.dismiss(data)
  }


   // ===== Toast ========
   async presentToast(opts: ToastOptions) {
    const toast = await this.toastController.create(opts);
    toast.present();
  }

   // ===== Navigate ========
    goTo(url:string , id?:any) {
      this.router.navigateByUrl(`${url}`);
    }

    loader() {
      return this.loadingCtrl;
    }

    scrollToTop() {
      this.content.scrollToTop();
    }

    animation(){
      if(this.showForm){
        this.efect='efect-form';
      }else{
        this.efect='';
        
      }
    }
}
