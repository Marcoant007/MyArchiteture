import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private API = `${environment.URL_SEVER}/contact`;

  constructor(
    private http: HttpClient,
  ) { }

  public findUserActions(userId: number): Promise<any> {
    return this.http.get(`${this.API}/find-actions/${userId}`).toPromise();
  }

  public findUserContactInfo(userId: number): Promise<any> {
    return this.http.get(`${this.API}/find-one/${userId}`).toPromise();
  }

  public updateUserLinkToActions(userId: number, actions: number[]): Promise<any> {
    return this.http.put(`${this.API}/update/${userId}`, { actions }).toPromise();
  }
}
