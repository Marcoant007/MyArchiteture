import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private API = "environment.URL_LC_PROJECT";

  constructor(private http: HttpClient) { }


  getpresignedurls(fileType: string) {
    return this.http.get(`${environment.URL_HT_AMAZON}/upload/${fileType}`).toPromise();
  }


  uploadfileAWSS3(fileuploadurl, file) {

    const headers = new HttpHeaders({ 'Content-Type': '*', 'x-amz-acl': 'public-read' });
    const req = new HttpRequest('PUT', fileuploadurl, file, { headers: headers });

    return this.http.request(req).toPromise();
  }

  uploadFileToBackNode(file: any, fileName: string) {
    const formData = new FormData();
    formData.append('file', file, fileName);
    return this.http.post(`${this.API}/upload/filetoback/`, formData).toPromise();
  }

}
