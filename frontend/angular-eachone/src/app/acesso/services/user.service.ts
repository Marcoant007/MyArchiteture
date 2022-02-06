import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import CreateUserDTO from 'src/app/shared/dtos/CreateUserDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private API = environment.URL_SEVER

  public list(): Promise<any> {
    return this.http.get(`${this.API}/users`).toPromise();
  }

  public create(user: CreateUserDTO) {
    return this.http.post(`${this.API}/users`, user).toPromise();
  }

  public getById(id: number): Promise<CreateUserDTO> {
    return this.http.get<CreateUserDTO>(`${this.API}/users/${id}`).toPromise()
  }

  public update(user: CreateUserDTO, id: number) {
    return this.http.put(`${this.API}/users/${id}`, user).toPromise();
  }

  public delete(id: number) {
    return this.http.delete(`${this.API}/users/${id}`).toPromise();
  }

  public changeStatus(id: number, status): Promise<CreateUserDTO> {
    return this.http.get<CreateUserDTO>(`${this.API}/users/change-status/${id}/${status}`).toPromise();
  }

  public findAllPagedByFilters(
    page: number,
    limit: number,
    params: any,
  ): Promise<any> {

    params.page = page;
    params.limit = limit;

    return this.http.get(`${this.API}/users`,
      {
        params: params
      }).toPromise()
  }

  public getUserTypes(): Promise<any> {
    return this.http.get(`${this.API}/users/userTypes`).toPromise();
  }

  public findByEmail(email: string): Promise<any> {
    return this.http.get(`${this.API}/users/email/${email}`).toPromise();
  }

  public configUserProfile(user: any, id: number) {
    return this.http.put(`${this.API}/users/configUser/${id}`, user).toPromise();
  }

  public resetPassword(password: string, confirmPassword: string, token: string) {
    return this.http.post(`${this.API}/auth/resetpassword/${token}`, { password: password, confirmPassword: confirmPassword }).toPromise();
  }

  findUserByOrganization(id: number, page: number, limit: number, name: string, userType: string): Promise<any> {
    let params = Object();
    params.id = id;
    params.page = page;
    params.limit = limit;
    params.name;
    params.userType;

    if (name) {
      params.name = name;
    }

    if (userType) {
      params.userType = userType;
    }

    return this.http.get(`${this.API}/users/usersByOrganizations/${params.id}`, {
      params: params
    }).toPromise();
  }
}
