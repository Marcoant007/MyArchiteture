import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsComponent } from './maps/maps.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../../../environments/environment';



@NgModule({
    declarations: [MapsComponent],
    imports: [
        CommonModule,
        AgmCoreModule.forRoot({ apiKey: environment.API_KEY_GOOGLE })
    ], exports: [
        MapsComponent
    ]
})
export class MapsModule { }