import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChargesService {

  constructor(private http: HttpClient) { }

  private API = environment.URL_SEVER;

  findChargesByOrganization(id: number, page: number, limit: number, chargeType: string): Promise<any> {
    let params = Object()
    params.id = id;
    params.page = page;
    params.limit = limit;
    params.chargeType;

    if (chargeType) {
      params.chargeType = chargeType;
    }

    return this.http.get(`${this.API}/charge/chargeByOrganizations/${params.id}`, {
      params: params
    }).toPromise();
  }
}
