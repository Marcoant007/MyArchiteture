import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleSwitchComponent } from './toggle-switch/toggle-switch.component';
import { TooltipModule } from '../tooltip/tooltip.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [ToggleSwitchComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        TooltipModule
    ], exports: [
        ToggleSwitchComponent
    ]
})
export class ToggleSwitchModule { }