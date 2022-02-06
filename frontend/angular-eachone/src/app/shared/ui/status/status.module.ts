import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleStatusComponent } from './circle-status/circle-status.component';



@NgModule({
  declarations: [CircleStatusComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CircleStatusComponent
  ]
})
export class StatusModule { }
