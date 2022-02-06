import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnchorButtonComponent } from './anchor-button/anchor-button.component';



@NgModule({
  declarations: [AnchorButtonComponent],
  imports: [
    CommonModule
  ], exports:[
    AnchorButtonComponent
  ]
})
export class AnchorButtonModule { }
