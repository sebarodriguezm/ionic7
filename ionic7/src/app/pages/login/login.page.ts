import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { LoadingController } from '@ionic/angular';
import { UserAdmDto } from 'src/app/core/dto/user-adm.dto';
import { CrudService } from 'src/app/providers/crudservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
admin: UserAdmDto = new UserAdmDto();
Recover: boolean = false;
  constructor(
    private crud: CrudService<UserAdmDto>,
    private router: Router,
    private loading: LoadingController
  ) { }

  ngOnInit() {
  }

  login() {
    // Validación de datos de entrada
    if (!this.admin || !this.admin.email || !this.admin.password) {
      console.error('Datos de inicio de sesión incompletos');
      // Mostrar mensaje de error al usuario o tomar medidas apropiadas
      return;
    }
  
    this.crud.Login(this.admin)
      .then(() => {
        this.router.navigate(['/menu']);
      })
      .catch((error:any) => {
        console.error('Error durante el inicio de sesión:', error);
        // Mostrar mensaje de error al usuario o tomar medidas apropiadas
      });
  }

  logout(){
    this.crud.logout();
  }

  showRecover(){
    this.Recover = !this.Recover
  }

  closeRecover(){
    this.Recover = false;
   
  }

  recoveryPass() {

    this.crud.resetPassword(this.admin.email).then((data: any) => {
      
      console.log('Correo enviado::> ', data);
     
      this.router.navigate(['/menu/transport']);
      this.closeRecover();
    },
      (err:any) => {
       
        //console.log('Error: ::>', err);
        let msg: string;
        if (err['code'] == "auth/user-not-found") {
          msg = "recovery.userNotFound";
        }
        else if (err['code'] == "auth/invalid-email") {
          msg = "recovery.invalidEmail";
        }
        else if (err['code'] == "auth/operation-not-allowed") {
          msg = "recovery.operationNotAllowed";
        }
        
      });
  }
}
