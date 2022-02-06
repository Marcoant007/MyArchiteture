import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintLayoutComponent } from './print-layout/print-layout.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [
        PrintLayoutComponent
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        RouterModule,
    ], exports: [
        PrintLayoutComponent
    ]
})
export class PrintModule { }