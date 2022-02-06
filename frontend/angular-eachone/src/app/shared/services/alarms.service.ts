import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

export interface FiltersProps {
  page: number;
  limit: number;
  userId?: number;
  organizationId?: number;
  checked?: string;
  query?: string; //separar isso (level, source, category, description, userName) -> filtros
}

@Injectable({
  providedIn: 'root'
})
export class AlarmsService {

  private API = `${environment.URL_HT_ALARMS}/alarm`;

  constructor(
    private http: HttpClient,
  ) { }

  public findAllAlarmsPagedByFilters(
    { page, limit, userId, organizationId, checked, query }: FiltersProps
  ): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: String(page),
        limit: String(limit),
        user: userId ? String(userId) : '',
        query: query ? query : '',
        organization: organizationId ? String(organizationId) : '',
        checked: checked ? checked : ''
      }
    });

    return this.http.get(`${this.API}/find-all`, { params }).toPromise();
  }

  public findAlarmById(alarmId: number): Promise<any> {
    return this.http.get(`${this.API}/find-one/${alarmId}`).toPromise();
  }

  public createAlarm(alarm: any): Promise<any> {
    return this.http.post(`${this.API}/create-alarm`, alarm).toPromise();
  }

  public checkAlarm(alarmId: number, userId: number): Promise<any> {
    return this.http.put(`${this.API}/check/${alarmId}`, { userId }).toPromise();
  }
}
