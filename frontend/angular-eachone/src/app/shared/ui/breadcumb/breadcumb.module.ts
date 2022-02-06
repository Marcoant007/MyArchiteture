import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcumbComponent } from './breadcumb/breadcumb.component';
import { SecurityModule } from '../../securty/security.module';



@NgModule({
  declarations: [BreadcumbComponent],
  imports: [
    CommonModule,
    SecurityModule
  ],
  exports: [BreadcumbComponent]
})
export class BreadcumbModule { }
