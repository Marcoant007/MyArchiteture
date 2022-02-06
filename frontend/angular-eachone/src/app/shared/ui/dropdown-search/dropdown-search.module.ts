import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownSearchComponent } from './dropdown-search/dropdown-search.component';
import { InputModule } from '../input/input.module';



@NgModule({
  declarations: [DropdownSearchComponent],
  imports: [
    CommonModule,
    InputModule
  ],
  exports: [DropdownSearchComponent]
})
export class DropdownSearchModule { }
