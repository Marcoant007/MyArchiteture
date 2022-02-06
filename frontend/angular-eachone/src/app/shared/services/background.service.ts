import { Injectable, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackgroundService {

  private subject = new Subject<boolean>();

  @Input()
  public dashboard: boolean = false;

  public darkTheme: boolean = true;

  public handle() {

    this.subject.next(this.dashboard);
  }

  public getObservable(): Observable<boolean> {
    return this.subject.asObservable();
  }

  public metodo(){
    this.handle();
  }


  constructor() { }
}
