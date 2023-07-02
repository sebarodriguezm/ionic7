import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../providers/languages.service';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsComponent } from './utils/utils.component';


@NgModule({
  declarations: [
    UtilsComponent],
  imports: [
    CommonModule,
    TranslateModule,
  ],
  exports: [
    TranslateModule,
    UtilsComponent],
  providers: [LanguageService]
})
export class SharedModule { }
