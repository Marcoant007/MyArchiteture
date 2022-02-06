import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import PlanDTO from 'src/app/shared/dtos/PlanDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }

  private API = environment.URL_SEVER;

  public findAllPagedByFilters(
    page: number,
    limit: number,
  ) {
    let params = Object();
    params.page = page;
    params.limit = limit;

    return this.http.get<any>(`${this.API}/plan`).toPromise();
  }

  public create(plan: PlanDTO) {
    return this.http.post<any>(`${this.API}/plan`, plan).toPromise();
  }

  public findPlanById(id: number) {
    let idPlan = id;
    return this.http.get<PlanDTO>(`${this.API}/plan/${idPlan}`).toPromise();
  }

  public changeStatus(id: number, status: string) {
    return this.http.get<any>(`${this.API}/plan/change-plan-status/${id}/${status}`).toPromise();
  }

  public updatePlan(id: number, plan: PlanDTO) {
    return this.http.put(`${this.API}/plan/${id}`, plan).toPromise()
  }

  public deletePlan(id: number) {
    return this.http.delete(`${this.API}/plan/${id}`).toPromise()
  }
}
