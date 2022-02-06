import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchorSectionComponent } from './archor-section/archor-section.component';



@NgModule({
  declarations: [ArchorSectionComponent],
  imports: [
    CommonModule
  ],
  exports: [ArchorSectionComponent]
})
export class ArchorSectionModule { }
