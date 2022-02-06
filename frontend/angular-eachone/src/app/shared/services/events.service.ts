import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";

export interface FiltersProps {
  page: number;
  limit: number;
  organizationId?: number;
  query?: string; //separar isso (level, source, category, description, userName) -> filtros
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private API = `${environment.URL_HT_ALARMS}/event`;

  constructor(
    private http: HttpClient,
  ) { }

  public findAllEventsPagedByFilters(
    { page, limit, organizationId, query }: FiltersProps
  ): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: String(page),
        limit: String(limit),
        organization: String(organizationId),
        query: query ? query : '',
      }
    });

    return this.http.get(`${this.API}/find-all`, { params }).toPromise();
  }

  public findEventById(eventId: number) {
    return this.http.get(`${this.API}/find-one/${eventId}`).toPromise();
  }

  public createEvent(event: any) {
    return this.http.post(`${this.API}/create`, event).toPromise();
  }
}
