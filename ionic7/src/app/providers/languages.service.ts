import { Injectable } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';
import { LanguageStorage } from '../core/constants/language.constant';


@Injectable()
export class LanguageService {

  constructor(private translate: TranslateService) {}

  initialize() {
    this.translate.addLangs(['es', 'pt']);
    this.translate.setDefaultLang('es');

    let savedLanguage = localStorage.getItem(LanguageStorage);
    this.translate.use(savedLanguage || 'es');
  }

  getAllLanguages() {
    return this.translate.getLangs();
  }

  getCurrentLanguage() {
    return this.translate.currentLang;
  }

  getNonSelectedLanguage() {
    let all = this.getAllLanguages();
    let current = this.getCurrentLanguage();

    return all.filter(l => l !== current);
  }

  setLanguage(newLang: string) {
    this.translate.use(newLang);

    localStorage.setItem(LanguageStorage, newLang);
  }

  get languageChange$() {
    return this.translate.onLangChange;
  }

}
