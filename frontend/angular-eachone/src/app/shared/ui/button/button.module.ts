import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonAddComponent } from './button-add/button-add.component';
import { ButtonAttachComponent } from './button-attach/button-attach.component';
import { ButtonDownModelComponent } from './button-down-model/button-down-model.component';
import { ButtonRadiusComponent } from './button-radius/button-radius.component';
import { ButtonAreaComponent } from './button-area/button-area.component';



@NgModule({
  declarations: [
    ButtonAddComponent,
    ButtonAttachComponent,
    ButtonDownModelComponent,
    ButtonRadiusComponent,
    ButtonAreaComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    ButtonAddComponent,
    ButtonDownModelComponent,
    ButtonAttachComponent,
    ButtonRadiusComponent,
    ButtonAreaComponent
  ]
})
export class ButtonModule { }
