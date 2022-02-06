import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  private API = "environment.URL_LC_PROJECT";

  constructor(private http: HttpClient) { }

  donwloadLink(fileName: string, lat: number, lng: number) {
    return this.http.get(`${this.API}/download/?filename=${fileName}&lat=${lat}&lng=${lng}`).toPromise();
  }

  donwload(fileName: string) {
    return this.http.get(`${this.API}/download/document?filename=${fileName}`).toPromise();
  }

  getpresignedurls(fileName: string) {
    return this.http.get(`${environment.URL_HT_AMAZON}/download/${fileName}`).toPromise();
  }

  // downloadFile(downloadLink: string){
  //   return this.http.get(downloadLink)
  //   .map((response) => {
  //     let blob = new Blob([response], { type: 'text/csv' });
  //     let url = window.URL.createObjectURL(blob);
  //     window.open(url);
  //   });
  // }


}
