import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachAreaComponent } from './attach-area/attach-area.component';
import { ButtonModule } from '../button/button.module';
import { DirectivesModule } from '../../directives/directives.module';




@NgModule({
  declarations: [AttachAreaComponent],
  imports: [
    CommonModule,
    DirectivesModule,
    ButtonModule
  ],
  exports: [
    AttachAreaComponent
  ]
})
export class AttachAreaModule { }
