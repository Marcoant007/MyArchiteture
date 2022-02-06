import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from '../tooltip/tooltip.module';



@NgModule({
  declarations: [ColorPickerComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TooltipModule
  ],
  exports: [
    ColorPickerComponent
  ]
})
export class ColorPickerModule { }
