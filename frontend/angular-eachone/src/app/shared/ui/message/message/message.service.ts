import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messageSubject = new Subject<Message>();

  constructor(
    private snackbar: MatSnackBar
  ) { }

  send(messageConfig: Message) {
    this.messageSubject.next(messageConfig);
  }

  messageObservable(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  public showMessage(msg: string): void {
    this.snackbar.open(msg, 'X', {
      duration: 5000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ['sucesso-snackbar']
    })
  }
}
