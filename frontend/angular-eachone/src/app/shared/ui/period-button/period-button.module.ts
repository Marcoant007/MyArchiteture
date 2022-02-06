import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeriodButtonComponent } from './period-button/period-button.component';



@NgModule({
  declarations: [PeriodButtonComponent],
  imports: [
    CommonModule
  ],
  exports:[
    PeriodButtonComponent
  ]
})
export class PeriodButtonModule { }
