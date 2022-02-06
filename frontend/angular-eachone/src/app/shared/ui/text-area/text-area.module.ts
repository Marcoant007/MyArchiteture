import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAreaComponent } from './text-area/text-area.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { TooltipModule } from '../tooltip/tooltip.module';
import { TextAreaMultilineComponent } from './text-area-multiline/text-area-multiline.component';



@NgModule({
  declarations: [TextAreaComponent, TextAreaMultilineComponent],
  imports: [
    CommonModule,
    TooltipModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [TextAreaComponent, TextAreaMultilineComponent]
})
export class TextAreaModule { }
