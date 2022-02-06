import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusUserComponent } from './status-user/status-user.component';



@NgModule({
  declarations: [StatusUserComponent],
  imports: [
    CommonModule
  ],
  exports: [StatusUserComponent]
})
export class StatusUserModule { }
