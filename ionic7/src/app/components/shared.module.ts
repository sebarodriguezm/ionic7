import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../providers/languages.service';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [TranslateModule],
  providers: [LanguageService]
})
export class SharedModule { }
