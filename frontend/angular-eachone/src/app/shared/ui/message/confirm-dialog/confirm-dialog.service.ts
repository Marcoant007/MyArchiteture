
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfirmDialog } from './confirm-dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  private dialogRef: MatDialogRef<ConfirmDialogComponent>;

  constructor(private dialog: MatDialog) { }


  public open({ title, message, submessage, confirmText = 'Sim', cancelText = 'Não' }: ConfirmDialog) {
    this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title, message, submessage, confirmText, cancelText },
      panelClass: 'app-modal-workspace',
      disableClose: true
    });
  }

  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(take(1), map(res => {
      return res;
    }
    ));
  }
}
