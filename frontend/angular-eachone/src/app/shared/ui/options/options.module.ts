import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionsComponent } from './options/options.component';
import { DropMenuModule } from "../drop-down/drop-menu.module";



@NgModule({
  declarations: [
    OptionsComponent
  ],
  imports: [
    CommonModule,
    DropMenuModule
  ],
  exports:[
    OptionsComponent
  ]
})
export class OptionsModule { }
