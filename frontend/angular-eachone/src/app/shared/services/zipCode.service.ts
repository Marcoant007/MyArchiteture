import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ZipCode } from '../models/zipCode';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})

export class ZipCodeService {
    constructor(private http: HttpClient) { }

    private API = `${environment.URL_HT_CLINIC}/zip-code`;

    public findAddress(zipCode: string) {

        return this.http.get<ZipCode>(`${this.API}/${zipCode}`).toPromise();
    }
}