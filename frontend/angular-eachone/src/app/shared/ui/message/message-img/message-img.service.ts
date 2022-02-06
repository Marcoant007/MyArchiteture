import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MessageImg } from './message-img';

@Injectable({
  providedIn: 'root'
})
export class MessageImgService {

  messageSubject = new Subject<MessageImg>();

  constructor() { }

  send(messageConfig: MessageImg) {
    this.messageSubject.next(messageConfig);
  }

  messageObservable(): Observable<any> {
    return this.messageSubject.asObservable();
  }

}
