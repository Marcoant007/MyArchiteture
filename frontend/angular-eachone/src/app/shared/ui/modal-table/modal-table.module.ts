import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalTableComponent } from './modal-table/modal-table.component';
import { TableModule } from '../table/table.module';



@NgModule({
  declarations: [ModalTableComponent],
  imports: [
    CommonModule,
    TableModule
  ],exports: [
    ModalTableComponent
  ]
})
export class ModalTableModule { }
