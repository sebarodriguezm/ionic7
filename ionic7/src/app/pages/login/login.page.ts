import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { UtilsComponent } from 'src/app/components/utils/utils.component';
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
    private langService: LanguageService,
    private utils: UtilsComponent,
    private translate: TranslateService
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
      const errMsg = this.translate.instant('LOGIN.MissingData');
      this.utils.message(errMsg, 1, 'toast-error');
      // Mostrar mensaje de error al usuario o tomar medidas apropiadas
      return;
    }
  const loadingMsg = this.translate.instant('LOGIN.Loading');
  this.utils.showLoading(loadingMsg);
    this.crud.Login(this.admin)
      .then(() => {
        this.utils.hideLoading();
        this.router.navigate(['/menu/home']);
      })
      .catch((error:any) => {
        this.utils.hideLoading();
        const errMsg = this.translate.instant('LOGIN.Error');
        this.utils.message(errMsg, 1, 'toast-error');
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

  // Recuperar contraseña
  recoveryPass() {

    this.crud.resetPassword(this.admin.email).then((data: any) => {
      
      console.log('Correo enviado::> ', data);
     
      this.router.navigate(['/login']);
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

  // Se obtiene el idioma no seleccionado
  setOtherLang() {
    // se obtiene el idioma no seleccionado
    let nonSelected = this.langService.getNonSelectedLanguage();
    if (nonSelected.length) {
      this._otherLang = nonSelected[0];
      this.otherLang = this._otherLang.toUpperCase();
    }
  }

  // Se cambia el idioma
  changeLanguage() {
    this.langService.setLanguage(this._otherLang);
  }

  goRegister(){
    this.router.navigate(['/register']);
  }
}
