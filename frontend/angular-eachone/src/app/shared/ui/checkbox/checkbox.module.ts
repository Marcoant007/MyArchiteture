import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { TooltipModule } from '../tooltip/tooltip.module';



@NgModule({
  declarations: [CheckboxComponent],
  imports: [
    CommonModule,
    TooltipModule,
  ],
  exports: [
    CheckboxComponent
  ]
})
export class CheckboxModule { }
