import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchSubject = new Subject<any>();

  constructor(
  ) { }

  send(searchText: any) {
    this.searchSubject.next(searchText);
  }

  searchObservable(): Observable<any> {
    return this.searchSubject.asObservable();
  }
}