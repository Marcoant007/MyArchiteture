import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableUserComponent } from './table-user/table-user.component';
import { ButtonModule } from '../button/button.module';
import { StatusUserModule } from '../status-user/status-user.module';
import { TableEachoneComponent } from './table-eachone/table-eachone.component';
import { SecurityModule } from '../../securty/security.module';

@NgModule({
  declarations: [
    TableUserComponent,
    TableEachoneComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    StatusUserModule,
    SecurityModule
  ],
  exports: [
    TableUserComponent,
    TableEachoneComponent
  ]
})
export class TableModule { }
