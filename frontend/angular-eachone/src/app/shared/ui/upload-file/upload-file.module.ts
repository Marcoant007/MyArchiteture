import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from '../tooltip/tooltip.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadFileComponent } from './upload-file/upload-file.component';

@NgModule({
  declarations: [UploadFileComponent],
  imports: [
    CommonModule,
    TooltipModule,
    ReactiveFormsModule,
  ],
  exports: [
    UploadFileComponent,
  ]
})
export class UploadFileModule { }
