import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/providers/languages.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  pages = [
   
    { title: 'Login', url: '/login', icon: 'call-outline' },
    { title: 'Home', url: '/menu/home', icon: 'person-outline' },
    { title: 'Registro', url: '/register', icon: 'add-outline' },
    
 ];
 public otherLang = '';

 private _otherLang = '';
 private suscribeLang: Subscription = new Subscription;

 constructor(
   private langService: LanguageService
 ) {}

 ngOnInit() {
   this.langService.initialize();

   this.setOtherLang();

  this.suscribeLang = this.langService.languageChange$
      .subscribe(() => {
        this.setOtherLang();
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



}
