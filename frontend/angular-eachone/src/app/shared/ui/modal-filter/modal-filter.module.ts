import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalFilterComponent } from './modal-filter/modal-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ModalFilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ModalFilterComponent
  ]
})
export class ModalFilterModule { }
