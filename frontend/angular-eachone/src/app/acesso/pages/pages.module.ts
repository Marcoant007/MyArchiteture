import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpCenterModule } from './help-center/help-center.module';
import { LanguageSettingModule } from './language-setting/language-setting.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PlanModule } from './wrapper-page/plan/plan.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HelpCenterModule,
    LanguageSettingModule,
    NotificationsModule,
    PlanModule
  ]
})
export class PagesModule { }
