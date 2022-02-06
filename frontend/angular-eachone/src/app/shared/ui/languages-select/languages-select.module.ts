import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguagesSelectComponent } from './languages-select/languages-select.component';



@NgModule({
  declarations: [LanguagesSelectComponent],
  imports: [
    CommonModule
  ],
  exports: [LanguagesSelectComponent]
})
export class LanguagesSelectModule { }
