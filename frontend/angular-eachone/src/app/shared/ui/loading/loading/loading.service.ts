import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private showLoadingSubject = new Subject<any>();

  constructor() { }

  showLoading(showLoading: boolean) {
    this.showLoadingSubject.next(showLoading);
  }

  showLoadingObservable() {
    return this.showLoadingSubject.asObservable();
  }
}
