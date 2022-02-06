import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import HelpCenterDTO from "src/app/shared/dtos/HelpCenterDTO";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HelpCenterService {
  constructor(private http: HttpClient) { }

  private API = environment.URL_SEVER


  public list( language: string, profile: string): Promise<any> {
    let params = Object();
    params.profile = profile
    params.language = language;
    return this.http.get(`${this.API}/helpCenter`,{params: params}).toPromise();
  }

  public getById(id: number): Promise<HelpCenterDTO> {
    return this.http.get<HelpCenterDTO>(`${this.API}/helpCenter/${id}`).toPromise();
  }
}
