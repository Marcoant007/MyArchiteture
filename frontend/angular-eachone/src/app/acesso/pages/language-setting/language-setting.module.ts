import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSettingComponent } from './language-setting/language-setting.component';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [LanguageSettingComponent],
  imports: [
    CommonModule,
    SharedModule
  ], exports: [
    LanguageSettingComponent
  ]
})
export class LanguageSettingModule { }
