import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PainelComponent } from './painel/painel.component';
import { RouterModule } from '@angular/router';
import { InputModule } from '../input/input.module';
import { NotificationModule } from '../notification/notification.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClinicExchangeComponent } from './painel/clinic-exchange/clinic-exchange.component';

@NgModule({
  declarations: [PainelComponent, ClinicExchangeComponent],
  imports: [
    CommonModule,
    RouterModule,
    InputModule,
    FormsModule,
    NotificationModule,
    ReactiveFormsModule
  ]
})
export class PainelModule { }
