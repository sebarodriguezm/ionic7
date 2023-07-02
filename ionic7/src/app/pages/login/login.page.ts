import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserAdmDto } from 'src/app/core/dto/user-adm.dto';
import { CrudService } from 'src/app/providers/crudservice.service';
import { LanguageService } from 'src/app/providers/languages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage  implements OnInit, OnDestroy {
admin: UserAdmDto = new UserAdmDto();
Recover: boolean = false;
public otherLang = '';

private _otherLang = '';
private suscribeLang: Subscription = new Subscription;

  constructor(
    private crud: CrudService<UserAdmDto>,
    private router: Router,
    private loading: LoadingController,
    private langService: LanguageService
  ) { }

  ngOnInit() {
    this.langService.initialize();

    this.setOtherLang();

   this.suscribeLang = this.langService.languageChange$
       .subscribe(() => {
         this.setOtherLang();
       });
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

  ngOnDestroy() {
    this.suscribeLang?.unsubscribe();
  }

  setOtherLang() {
    // se obtiene el idioma no seleccionado
    let nonSelected = this.langService.getNonSelectedLanguage();
    if (nonSelected.length) {
      this._otherLang = nonSelected[0];
      this.otherLang = this._otherLang.toUpperCase();
    }
  }

  changeLanguage() {
    this.langService.setLanguage(this._otherLang);
  }
}
