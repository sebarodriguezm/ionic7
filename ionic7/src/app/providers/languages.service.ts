import { Injectable } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import { LanguageStorage } from '../core/constants/language.constant';


@Injectable()
export class LanguageService {

  constructor(private translate: TranslateService) {}

  initialize() {
    // se establecen los idiomas disponibles y defecto el idioma español
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');

    // se establece el idioma guardado en el local storage o el español
    let savedLanguage = localStorage.getItem(LanguageStorage);
    this.translate.use(savedLanguage || 'es');
  }

  // se obtienen todos los idiomas disponibles
  getAllLanguages() {
    return this.translate.getLangs();
  }

  // se obtiene el idioma actual
  getCurrentLanguage() {
    return this.translate.currentLang;
  }

  // se obtiene el idioma no seleccionado
  getNonSelectedLanguage() {
    let all = this.getAllLanguages();
    let current = this.getCurrentLanguage();

    return all.filter(l => l !== current);
  }

  // se establece el idioma seleccionado
  setLanguage(newLang: string) {
    this.translate.use(newLang);
// se guarda el idioma seleccionado en el local storage
    localStorage.setItem(LanguageStorage, newLang);
  }


  // se obtiene el evento de cambio de idioma
  get languageChange$() {
    return this.translate.onLangChange;
  }

}
