import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  private API = `${environment.URL_HT_ALARMS}/action`;

  constructor(
    private http: HttpClient,
  ) { }

  public findAll() {
    return this.http.get(`${this.API}/find-all`).toPromise();
  }
}
