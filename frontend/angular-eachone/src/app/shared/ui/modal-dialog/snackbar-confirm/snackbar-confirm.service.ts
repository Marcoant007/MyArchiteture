import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SnackbarAction } from './snackbar-confirm.component';

@Injectable({
    providedIn: 'root'
})
export class SnackbarActionService {

    private subject = new Subject<SnackbarAction>();

    public type: SnackbarAction;

    constructor() { }

    public typeAction(type: SnackbarAction) {
        this.subject.next(type);
    }

    public getObservableSnack(): Observable<SnackbarAction> {
        return this.subject.asObservable();
    }
}
