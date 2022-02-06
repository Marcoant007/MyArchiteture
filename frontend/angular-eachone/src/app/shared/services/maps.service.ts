import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Location } from 'src/app/projeto/models/location';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor(private http: HttpClient) { }

  private API = "environment.URL_LC_PROJECT";

  public findLatLngByCep(zip_code: string) {
    return this.http.get<Location>(`${this.API}/map/${zip_code}`).toPromise();
  }
}
