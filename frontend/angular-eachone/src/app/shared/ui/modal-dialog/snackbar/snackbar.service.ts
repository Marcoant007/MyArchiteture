import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SnackbarMessage } from 'src/app/shared/messages/MessagesClass';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private subject = new Subject<SnackbarMessage>();

  public mesage: SnackbarMessage;

  constructor() { }

  public showSnackbar(mesage: SnackbarMessage) {
    this.subject.next(mesage);
  }

  public getObservable(): Observable<SnackbarMessage> {
    return this.subject.asObservable();
  }
}
