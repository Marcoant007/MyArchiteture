import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitchListComponent } from './switch-list/switch-list.component';



@NgModule({
  declarations: [SwitchListComponent],
  imports: [
    CommonModule
  ],exports:[
    SwitchListComponent
  ]
})
export class SwitchListModule { }
