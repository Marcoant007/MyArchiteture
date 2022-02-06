import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ModalFilterService {
  private subject = new Subject<boolean>();
  public modalOn: boolean = false;

  public handle() {
    this.modalOn = !this.modalOn;
    this.subject.next(this.modalOn);
  }

  public getObservable(): Observable<boolean> {
    return this.subject.asObservable();
  }

  public metodo() {
    this.handle();
  }
}


