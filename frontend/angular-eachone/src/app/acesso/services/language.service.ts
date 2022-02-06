import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private http: HttpClient) { }

  private API = environment.URL_SEVER;

  public find() {
    return this.http.get<any>(`${this.API}/languages/`).toPromise();
  }

  public changeStatus(id: number, status: boolean) {
    return this.http.put<any>(`${this.API}/languages/changeStatus/${id}`, { status: status }).toPromise();
  }

  public findLanguages() {
    return this.http.get<any>(`${this.API}/languages/findEnable`).toPromise();
  }
}
