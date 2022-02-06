import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message/message.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MessageImgComponent } from './message-img/message-img.component';



@NgModule({
  declarations: [MessageComponent, ConfirmDialogComponent, MessageImgComponent],
  imports: [
    CommonModule
  ],
  exports: [
    MessageComponent,
    ConfirmDialogComponent,
    MessageImgComponent
  ]
})
export class MessageModule { }
