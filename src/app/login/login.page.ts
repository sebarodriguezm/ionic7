import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../providers/user.registration.service';
import { MenuController, AlertController } from '@ionic/angular';
import { CrudService } from '../providers/crud.service';
import { UserDto } from '../core/dto/user.dto';
import { DbTables } from '../core/constants/db-tables.constant';
import { Storage } from '@ionic/storage-angular';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  Recover: boolean = false;
  public emailLog: string = '';
  public claveLog: string = '';
  public disableButton = false;
  showInput: boolean = false;
  showReg: boolean = false;

  selectedDate: number ;
  user:UserDto = new UserDto();
  id: string;
  namePattern = /^[A-Za-z]+ [A-Za-z]+$/;
  phonePattern = /^\d{9}$/;


  constructor(
    private regService: UserRegistrationService,
    public crud: CrudService<UserDto>,
    private utils: UtilsService,
    private storage: Storage,
    private alertController: AlertController,
    private menuCtrl: MenuController
    ) {
      this.crud = this.crud.newCrudInstance();
      this.crud.setTable(DbTables.Users);
  }

  async ngOnInit() {
   this.cerrarMenu();
    let datos = this.storage.get('currentUser');
    console.log('datos', datos)
   let id = await this.regService.verifyLogin();
   if (datos) {
    const userData = JSON.parse(await datos);
    this.id = userData.uid;
  
    console.log('ID del usuario:', this.id);
  } else {
    console.log('No se encontraron datos de usuario en el almacenamiento local.');
  }
/*    if(id){

     this.navController.navigateRoot('/cards');
   } 
  */ 
  }

  isValidPhoneNumber(phone: string): boolean {
    return this.phonePattern.test(phone);
  }

  cerrarMenu() {
    this.menuCtrl.close();
    this.menuCtrl.enable(false);
  }

  ionViewWillEnter() {
    localStorage.clear();
    this.cerrarMenu();
  }

  login() {
    // console.log('Click login');
    this.regService.loginUser(this.emailLog, this.claveLog).then((data:any) => {
      this.utils.goTo('/home');
      
    },
      (err:any) => {
        // console.log('Error: login::> ', err);
        const Message = 'Datos incorrectos';
        this.utils.message(Message,  4, 'toast-warning', 'alert');
      });

  }


  showRecover(){
    this.Recover = !this.Recover
  }

  recoveryPass() {

    this.regService.resetPassword(this.emailLog).then((data: any) => {
      
      console.log('Correo enviado::> ', data);
      this.utils.message('Se ha enviado un correo de recuperación de clave, abra el correo y siga las instrucciones', 4, 'toast-success', 'alert');
      this.showRecover();
    },
      (err:any) => {
       
        console.log('Error: ::>', err);
        let msg: string;
        if (err['code'] == "auth/wrong-password") {
          msg = 'Credenciales inválidas, por favor vuelve a intentarlo';
          this.utils.message(msg, 4, 'toast-warning');
        
        }
        else if (err['code'] == "auth/invalid-email") {
          msg = 'Correo inválido, por favor revise que el correo esté bien escrito';
          this.utils.message(msg, 4, 'toast-warning');
        
        }
        else if (err['code'] == "auth/user-disabled") {
          msg = 'Este usuario se encuentra deshabilitado';
        this.utils.message(msg, 4, 'toast-warning');

        }
        else if (err['code'] == "auth/user-not-found") {
          msg = 'Este correo no está registrado en nuestro sistema';
        this.utils.message(msg, 4, 'toast-warning');

        }


        
      });
  }

  showLogin(){
    this.showInput = ! this.showInput;
    
  }

  showRegister(){
    this.showReg = ! this.showReg;
  }

  async openCalendar() {
    const alert = await this.alertController.create({
      header: 'Seleccionar fecha',
      inputs: [
        {
          name: 'date',
          type: 'date',
          value: this.selectedDate,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Aceptar',
          handler: (data) => {
            const selectedDate = new Date(data.date);
            this.selectedDate = selectedDate.getTime();
            this.user.birthday = this.selectedDate
          },
        },
      ],
    });

    await alert.present();
  }

  register(){
    if (!this.user.fullName||!this.user.email||!this.user.sex) {
      this.utils.message('Completa todos los datos', 3, 'toast-warning');
    }
    else {
      this.regService.signupUser(this.user, this.claveLog, this.user.fullName, this.user.phone, this.user.email, this.user.sex, this.user.birthday).then((data: any) => {
        //console.log('create::> ', data);
        this.utils.message('Usuario creado exitosamente', 3, 'toas-success', 'checkmark-done');
       
      }).catch((err: string) => {
        //console.log('createUser>err', err);
        this.utils.message('Error al Registrar: ' + err, 8, 'toast-error');
      });
      
  }
        let arrySearch: any = [];
        arrySearch.push(this.user.fullName);
        this.user.arraySearch = this.crud.getArraySearchDes(arrySearch);
        console.log('id', this.id)
        this.crud.updateDocument(this.user);
        this.utils.goTo('/profile');
}

isEmail(email:any) {
  const patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return patronCorreo.test(email);
}

validator() {
  if (
    this.user.fullName && this.user.fullName.trim() !== '' &&
    this.user.birthday &&
    this.user.sex && this.user.sex.trim() !== ''
  ) {
    const name = this.user.fullName.split(' ');
    if (name.length > 1 && name[0].length > 0 && name[1].length > 0) {
      if (this.isEmail(this.user.email)) {
        if (this.user.phone) {
          const number = this.user.phone.toString();
          if (number.length === 9 && /^\d+$/.test(number)) {
            return true; // All checks passed
          }
        }
      }
    }
  }
  
  return false;
}

}

