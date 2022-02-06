import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SnackbarConfirmComponent } from './snackbar-confirm/snackbar-confirm.component';
@NgModule({
    declarations: [
      ModalDialogComponent,
      SnackbarComponent,
      SnackbarConfirmComponent
    ],
    imports: [
        CommonModule,
    ], exports: [
        ModalDialogComponent,
        SnackbarComponent,
        SnackbarConfirmComponent
    ]
})
export class ModalDialogModule { }
