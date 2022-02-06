import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import InstitutionConfigDTO from 'src/app/shared/dtos/InstitutionConfigDTO';
import OrganizationAdminDTO from 'src/app/shared/dtos/OrganizationDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstitutionsService {

  constructor(private http: HttpClient) { }

  private API = environment.URL_SEVER;

  public create(instituitions: OrganizationAdminDTO) {
    return this.http.post(`${this.API}/instituition/register`, instituitions).toPromise();
  }

  public delete(id: number) {
    return this.http.delete(`${this.API}/instituition/${id}`).toPromise();
  }

  public findAllPagedByFilters(
    page: number,
    limit: number,
  ): Promise<any> {
    let params = Object();
    params.page = page;
    params.limit = limit;

    return this.http.get(`${this.API}/instituition`, { params: params }).toPromise()
  }

  public findInstituitionById(id: number) {
    let idOrganization = id;
    return this.http.get<InstitutionConfigDTO>(`${this.API}/instituition/${idOrganization}`).toPromise();
  }

  public updateInstitution(id: number, organization: InstitutionConfigDTO) {
    return this.http.put(`${this.API}/instituition/${id}`, organization).toPromise()
  }

  public uploadImageOrganization(file: File, id: number) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.API}/instituition/uploadImage/${id}`, formData).toPromise();
  }
}
