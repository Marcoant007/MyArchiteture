import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MessageModal } from './messageModal';

@Injectable({
  providedIn: 'root'
})
export class MessageModalService {

  subject = new Subject<MessageModal>();
  public messageModal: MessageModal;
  openModal: boolean = false;

  constructor() { }
  public showModal(message: MessageModal){
    this.subject.next(message)
    return this.openModal = true;
    console.log('dentro do service')
  }

  public getObservable(): Observable<MessageModal>{
    return this.subject.asObservable()
  }
}
