import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TxAuthorizedDirective } from './tx-authorized.directive';

@NgModule({
  declarations: [
    TxAuthorizedDirective,
  ],
  imports: [
    CommonModule,
  ],
  providers: [
  ],
  exports: [
    TxAuthorizedDirective,
  ]
})
export class SecurityModule { }
