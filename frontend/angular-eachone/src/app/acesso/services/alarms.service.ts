import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { AlarmController } from "../../../../../../backend/ut-gestao-alarmes/src/modules/events/infra/http/controllers/AlarmController.ts"


@Injectable({
    providedIn: 'root'
})
export class UseAlarm {

    constructor(private http: HttpClient) { }
    public alarmController: AlarmController;

    private API = environment.URL_SEVER

    public create(): Promise<any>{
        return this.http.post(`${this.API}/find-all`,  this.alarmController.createFromRequest );
    }


}