import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PeriodButtonModule } from '../period-button/period-button.module';
import { CalendarButtonModule } from '../calendar-button/calendar-button.module';
import { OptionsModule } from '../options/options.module';
import { ButtonModule } from '../button/button.module';
import { InputModule } from '../input/input.module';
import { BreadcumbModule } from '../breadcumb/breadcumb.module';
import { SecurityModule } from '../../securty/security.module';



@NgModule({
  declarations: [HeaderComponent],
  imports: [
    OptionsModule,
    CalendarButtonModule,
    PeriodButtonModule,
    CommonModule,
    ButtonModule,
    InputModule,
    BreadcumbModule,
    SecurityModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
