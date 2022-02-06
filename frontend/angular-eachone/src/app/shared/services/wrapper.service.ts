import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class WrapperService {
  private subject = new Subject<boolean>();
  public isOpen: boolean = true;
  public controlKey: boolean;

  public handle() {
    this.isOpen = !this.isOpen;
    this.subject.next(this.isOpen);
  }

  public getObservable(): Observable<boolean> {
    return this.subject.asObservable();
  }

  public metodo() {
    this.handle();
  }
}
