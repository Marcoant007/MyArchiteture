import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LimitScaleComponent } from './limit-scale/limit-scale.component';



@NgModule({
  declarations: [LimitScaleComponent],
  imports: [
    CommonModule
  ],
  exports: [
    LimitScaleComponent
  ]
})
export class LimitScaleModule { }
