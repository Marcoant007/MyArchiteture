import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private API = environment.URL_SEVER;

  async login(user: any): Promise<any> {
    return await this.http.post(`${this.API}/auth/login`, user).toPromise();
  }

  loginValidate(token: string) {
    return this.http.get(`${this.API}/auth/validate/${token}`).toPromise();
  }

  forgotPassword(email: any) {
    return this.http.post(`${this.API}/auth/forgotpassword/${email}`, {}).toPromise();
  }

}
