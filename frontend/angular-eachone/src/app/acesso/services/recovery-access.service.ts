import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecoveryAccessService {


  constructor(private http: HttpClient) { }

  private API = environment.URL_SEVER;

  public async recoverEmail(code?: number, registration?: string): Promise<any> {
    let data = {
      cpf: code,
      registration: registration
    }
    return await this.http.post(`${this.API}/retrieveaccess/recover`, data).toPromise();
  }

  public async recoverAccess(code?: number, email?: string): Promise<any> {
    let data = {
      cpfOrCode: code,
      email: email
    }
    return await this.http.post(`${this.API}/retrieveaccess/recoveryAccess`, data).toPromise();
  }
}
